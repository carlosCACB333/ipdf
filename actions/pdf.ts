"use server";

import { axios } from "@/utils/axios";

export const mergePdfs = async (urls: string[]) => {
  const response = await axios<{ url: string }>("/api/pdf/merge", {
    method: "POST",
    body: JSON.stringify({
      urls,
    }),
  });
  return response;
};

export const pagesToImages = async (url: string) => {
  const response = await axios<string[]>("/api/pdf/pages/images", {
    method: "POST",
    body: JSON.stringify({ url }),
  });

  return response;
};

export const removePages = async (url: string, pages: number[]) => {
  const response = await axios<{ url: string }>("/api/pdf/remove/pages", {
    method: "POST",
    body: JSON.stringify({ url, pages }),
  });

  return response;
};

export const pdfToImages = async (url: string) => {
  const response = await axios<{ zip: string; urls: string[] }>(
    "/api/pdf/to/images",
    {
      method: "POST",
      body: JSON.stringify({ url }),
    }
  );

  return response;
};

export const pdfToText = async (url: string) => {
  const response = await axios<{ text: string }>("/api/pdf/to/text", {
    method: "POST",
    body: JSON.stringify({ url }),
  });

  return response;
};

export const getImages = async (url: string) => {
  const response = await axios<{ zip: string; urls: string[] }>(
    "/api/pdf/get/images",
    {
      method: "POST",
      body: JSON.stringify({ url }),
    }
  );

  return response;
};
