"use client";
import { FileTemp, FileUploader } from "@/components/common/file-uploader";
import { Step, Wizard } from "@/components/common/wizard";
import { text } from "@/components/primitives";
import { useState } from "react";
import { toast } from "sonner";

const url = process.env.NEXT_PUBLIC_APP_URL;

export default function Home() {
  const [files, setFiles] = useState<FileTemp[]>([]);
  const [output, setOutput] = useState<string | undefined>(undefined);

  const filesUp = files.filter((file) => file.status === "success");
  const isPending = files.some((file) => file.status === "loading");

  const mergePdfs = async () => {
    try {
      if (isPending) {
        toast.error("Espera a que los archivos terminen de subir");
        return false;
      }

      if (filesUp.length < 2) {
        toast.error("Debes subir al menos dos PDFs");
        return false;
      }

      const response = await fetch(`${url}/api/pdf/merge`, {
        method: "POST",
        body: JSON.stringify({
          urls: filesUp.map((file) => file.url),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      console.log(json);
      if (json.status !== "SUCCESS") {
        toast.error("Error al unir los PDFs");
        return false;
      }

      toast.success("PDFs unidos correctamente");
      setOutput(json.data.url);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <Wizard
      title="Unir PDFs"
      description="Une tus PDFs en un solo archivo siguiendo estos sencillos pasos"
    >
      <Step
        title="Subir PDFs"
        description="Arrastra y suelta tus PDFs o haz clic para seleccionarlos"
        onNext={mergePdfs}
        isDisabled={filesUp.length < 2 || isPending}
      >
        <section className="">
          <FileUploader
            files={files}
            setFiles={setFiles}
            uploadURL={`${url}/api/pdf/upload`}
            deleteURL={`${url}/api/pdf/delete`}
          />
          <br />
        </section>
      </Step>
      <Step
        title="Descargar PDF"
        description="Haz clic en el botón para descargar tu PDF unido"
        buttonTitle="Descargar PDF"
        href={output}
        onPrev={() => {
          setOutput(undefined);
          return true;
        }}
      >
        <section className="flex  items-center justify-center h-full">
          <p
            className={text({
              size: "md",
              color: "disabled",
            })}
          >
            Tu PDF unido está listo para ser descargado. Haz clic en el botón
            para descargarlo.
          </p>
        </section>
      </Step>
    </Wizard>
  );
}
