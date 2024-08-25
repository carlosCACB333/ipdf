import { Res } from "@/types";

const GENERIC_ERR_MSG =
  "Ocurrió un error inesperado. Por favor, intenta de nuevo";

interface FetchOptions extends RequestInit {
  baseUrl?: string;
  headers?: HeadersInit;
  params?: Record<string, string>;
}

export async function axios<
  T extends Record<string, any> = Record<string, any>
>(url: string, options: FetchOptions = {}): Promise<Res<T>> {
  const {
    baseUrl = process.env.CORE_APP_URL,
    headers = {},
    params,
    ...restOptions
  } = options;

  let fullUrl = `${baseUrl}${url}`;

  if (params) {
    const queryString = new URLSearchParams(params).toString();
    fullUrl += `?${queryString}`;
  }

  const defaultHeaders: HeadersInit = {
    ...(restOptions.body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json",
        }),
    ...headers,
  };

  try {
    const response = await fetch(fullUrl, {
      headers: defaultHeaders,
      ...restOptions,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json = (await response.json()) as Res<T>;

    if (json.status === "FAILED" && !json.message) {
      json.message = GENERIC_ERR_MSG;
    }

    return json;
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      status: "FAILED",
      message: GENERIC_ERR_MSG,
    } as Res<T>;
  }
}
