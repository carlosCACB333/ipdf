import { axios } from "@/utils/axios";
import { type NextRequest } from "next/server";

type Params = {
  id: string;
};

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const id = params.id;

  if (!id) {
    return Response.json({
      status: "FAILED",
      message: "No se ha enviado ningún archivo",
    });
  }

  const response = await axios<{ url: string }>("/api/pdf/delete/" + id, {
    method: "DELETE",
  });

  if (response.status !== "SUCCESS") {
    return Response.json(response, {
      status: 400,
    });
  }

  return Response.json(response);
}
