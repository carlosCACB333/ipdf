"use client";

import { getImages } from "@/actions/pdf";
import { FileTemp, FileUploader } from "@/components/common/file-uploader";
import { Step, Wizard } from "@/components/common/wizard";
import { text } from "@/components/primitives";
import { Image } from "@nextui-org/image";
import { useState } from "react";
import { toast } from "sonner";


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

      const res = await getImages(file.url);
      if (res.status !== "SUCCESS") {
        toast.error(res.message || "ocurrió un error");
        return false;
      }

      setImages(res.data!.urls);
      setZip(res.data!.zip);
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
            uploadURL={"/api/upload"}
            deleteURL={"/api/delete"}
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
