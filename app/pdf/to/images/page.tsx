"use client";

import { FileTemp, FileUploader } from "@/components/common/file-uploader";
import { Step, Wizard } from "@/components/common/wizard";
import { Image } from "@nextui-org/image";
import { useState } from "react";
import { toast } from "sonner";
const url = process.env.NEXT_PUBLIC_APP_URL;

export default function Home() {
  const [files, setFiles] = useState<FileTemp[]>([]);
  const [zip, setZip] = useState<string>("");
  const [urls, setUrls] = useState<string[]>([]);

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

      setZip(data.data.zip);
      setUrls(data.data.urls);
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
        isDisabled={!zip}
        href={zip}
        onPrev={() => true}
        buttonTitle="Descargar imágenes"
      >
        <section className="flex flex-wrap gap-1 overflow-x-auto max-h-[70dvh]">
          {urls.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt={`Imagen ${index + 1}`}
              width="100%"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          ))}
        </section>
      </Step>
    </Wizard>
  );
}
