"use client";

import { FileTemp, FileUploader } from "@/components/common/file-uploader";
import { Step, Wizard } from "@/components/common/wizard";
import { text } from "@/components/primitives";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";
const url = process.env.NEXT_PUBLIC_APP_URL;

interface Image {
  url: string;
  isSelect: boolean;
}

export default function Home() {
  const [files, setFiles] = useState<FileTemp[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [result, setResult] = useState<string>("");

  const file = files.find((file) => file.status === "success");
  const isPending = files.some((file) => file.status === "loading");

  const onUpload = async () => {
    try {
      if (!file) {
        toast.error("Sube al menos un archivo");
        return false;
      }

      if (isPending) {
        toast.error("Espera a que el archivo termine de subir");
        return false;
      }

      const response = await fetch(`${url}/api/pdf/pages/images`, {
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

      setImages(
        data.data.map((url: string) => ({ url, isSelect: false } as Image))
      );

      return true;
    } catch (error) {
      toast.error("Ocurrió un error");
      return false;
    }
  };

  const onRemovePages = async () => {
    try {
      if (!file) {
        toast.error("Sube al menos un archivo");
        return false;
      }
      const pages = images
        .map((image, index) => {
          if (image.isSelect) {
            return index + 1;
          }
        })
        .filter((page) => page !== undefined);

      if (pages.length === 0) {
        toast.error("Selecciona al menos una página");
        return false;
      }

      const response = await fetch(`${url}/api/pdf/remove/pages`, {
        method: "POST",
        body: JSON.stringify({ url: file.url, pages }),
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
      title="Eliminar páginas de tus PDFs"
      description="Elimina páginas de tus PDFs de forma sencilla y rápida"
    >
      <Step
        title="Sube tu PDF"
        description="Arrastra o selecciona tu PDF"
        onNext={onUpload}
        isDisabled={!file || isPending}
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
        title="Selecciona las páginas"
        description="Selecciona las páginas a eliminar"
        onPrev={() => true}
        onNext={onRemovePages}
      >
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <h1 className={text({ font: "bold", size: "lg" })}>
            Selecciona las páginas a eliminar
          </h1>
          <div className="flex flex-wrap gap-1 justify-center overflow-x-auto max-h-96">
            {images.map((image, index) => (
              <div
                key={index}
                className={clsx(
                  "cursor-pointer overflow-hidden",
                  "rounded-lg transition-all shadow-md border-2",

                  {
                    "border-primary": image.isSelect,
                    "border-transparent": !image.isSelect,
                  }
                )}
                onClick={() => {
                  setImages((prev) =>
                    prev.map((img, i) =>
                      i === index ? { ...img, isSelect: !img.isSelect } : img
                    )
                  );
                }}
              >
                <img
                  src={image.url}
                  alt={`page-${index}`}
                  style={{
                    filter: image.isSelect ? "brightness(0.5)" : "none",
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </Step>
      <Step
        title="Descargar PDF"
        description="Haz clic en el botón para descargar tu PDF"
        onPrev={() => true}
        isDisabled={!result}
        href={result}
        buttonTitle="Descargar PDF"
      >
        <section className="flex h-full flex-col items-center justify-center gap-4 py-8 md:py-10">
          <h4 className={text({ color: "disabled" })}>
            Tu PDF está listo para descargar en el siguiente enlace
          </h4>
        </section>
      </Step>
    </Wizard>
  );
}
