import { axios } from "@/utils/axios";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();

  if (!form.has("file")) {
    return Response.json({
      status: "FAILED",
      message: "No se ha enviado ningún archivo",
    });
  }

  const response = await axios<{ url: string }>("/api/pdf/upload", {
    method: "POST",
    body: form,
  });

  if (response.status !== "SUCCESS") {
    return Response.json(response, {
      status: 400,
    });
  }

  return Response.json(response);
}
