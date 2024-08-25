"use client";

import { pdfToImages } from "@/actions/pdf";
import { FileTemp, FileUploader } from "@/components/common/file-uploader";
import { Step, Wizard } from "@/components/common/wizard";
import { Image } from "@nextui-org/image";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [files, setFiles] = useState<FileTemp[]>([]);
  const [zip, setZip] = useState<string>("");
  const [urls, setUrls] = useState<string[]>([]);

  const file = files.find((file) => file.status === "success");

  const handlePdfToImages = async () => {

    if (!file) {
      toast.error("Sube al menos un archivo");
      return false;
    }

    const res = await pdfToImages(file.url);

    if (res.status !== "SUCCESS") {
      toast.error(res.message || "ocurrió un error");
      return false;
    }

    setZip(res.data!.zip);
    setUrls(res.data!.urls);
    return true;

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
            uploadURL={"/api/upload"}
            deleteURL={"/api/delete"}
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
