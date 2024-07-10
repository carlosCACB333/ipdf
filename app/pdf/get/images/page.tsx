"use client";

import { FileTemp, FileUploader } from "@/components/common/file-uploader";
import { Step, Wizard } from "@/components/common/wizard";
import { text } from "@/components/primitives";
import { Image } from "@nextui-org/image";
import { useState } from "react";
import { toast } from "sonner";

const url = process.env.NEXT_PUBLIC_APP_URL;

export default function Home() {
  const [files, setFiles] = useState<FileTemp[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [zip, setZip] = useState<string>("");

  const file = files.find((file) => file.status === "success");

  const handlePdfToText = async () => {
    try {
      if (!file) {
        toast.error("Sube al menos un archivo");
        return false;
      }

      const response = await fetch(`${url}/api/pdf/get/images`, {
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

      setImages(data.data.urls);
      setZip(data.data.zip);
      return true;
    } catch (error) {
      toast.error("Ocurrió un error");
      return false;
    }
  };

  return (
    <Wizard
      persistState
      title="Extraer imágenes de PDF"
      description="Extrae las imágenes de tu archivo PDF"
    >
      <Step
        title="Sube tu PDF"
        description="Arrastra o selecciona tu PDF"
        onNext={handlePdfToText}
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
        title="Imágenes extraídas"
        description="Imágenes extraídas de tu PDF"
        isDisabled={images.length === 0}
        onPrev={() => true}
        buttonTitle="Descargar ZIP"
        href={zip}
      >
        <section className="overflow-x-auto max-h-[70dvh]">
          {images.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  width="100%"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          ) : (
            <p
              className={text({
                size: "sm",
                color: "disabled",
                class: "text-center",
              })}
            >
              No hay imágenes para mostrar
            </p>
          )}
        </section>
      </Step>
    </Wizard>
  );
}
