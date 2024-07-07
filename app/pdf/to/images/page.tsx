"use client";

import { FileTemp, FileUploader } from "@/components/common/file-uploader";
import { Step, Wizard } from "@/components/common/wizard";
import { text } from "@/components/primitives";
import { useState } from "react";
import { toast } from "sonner";
const url = process.env.NEXT_PUBLIC_APP_URL;

export default function Home() {
  const [files, setFiles] = useState<FileTemp[]>([]);
  const [result, setResult] = useState<string>("");

  const file = files.find((file) => file.status === "success");

  const handlePdfToImages = async () => {
    try {
      if (!file) {
        toast.error("Sube al menos un archivo");
        return false;
      }

      const response = await fetch(`${url}/api/pdf/to/images`, {
        method: "POST",
        body: JSON.stringify({ url: file.url }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.status !== "SUCCESS") {
        toast.error(data.message || "ocurrió un error");
        return false;
      }

      setResult(data.data.url);
      return true;
    } catch (error) {
      toast.error("Ocurrió un error");
      return false;
    }
  };

  return (
    <Wizard
      persistState
      title="PDF a Imágenes"
      description="Convierte tus archivos PDF a imágenes"
    >
      <Step
        title="Sube tu PDF"
        description="Arrastra o selecciona tu PDF"
        onNext={handlePdfToImages}
        isDisabled={!file}
      >
        <section className="">
          <FileUploader
            files={files}
            setFiles={setFiles}
            uploadURL={`${url}/api/pdf/upload`}
            deleteURL={`${url}/api/pdf/delete`}
            maxFiles={1}
          />
          <br />
        </section>
      </Step>

      <Step
        title="Descargar imágenes"
        description="Haz clic en el botón para descargar tus imágenes"
        isDisabled={!result}
        href={result}
        onPrev={() => true}
        buttonTitle="Descargar imágenes"
      >
        <section className="flex h-full flex-col items-center justify-center gap-4 py-8 md:py-10">
          <h4 className={text({ color: "disabled" })}>
            Haz clic en el botón para descargar tus imágenes
          </h4>
        </section>
      </Step>
    </Wizard>
  );
}
