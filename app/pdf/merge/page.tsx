"use client";
import { mergePdfs } from "@/actions/pdf";
import { FileTemp, FileUploader } from "@/components/common/file-uploader";
import { Step, Wizard } from "@/components/common/wizard";
import { text } from "@/components/primitives";
import { useState } from "react";
import { toast } from "sonner";


export default function Home() {
  const [files, setFiles] = useState<FileTemp[]>([]);
  const [output, setOutput] = useState<string | undefined>(undefined);

  const filesUp = files.filter((file) => file.status === "success");
  const isPending = files.some((file) => file.status === "loading");

  const handleMergePdfs = async () => {

    if (isPending) {
      toast.error("Espera a que los archivos terminen de subir");
      return false;
    }

    if (filesUp.length < 2) {
      toast.error("Debes subir al menos dos PDFs");
      return false;
    }

    const res = await mergePdfs(filesUp.map((file) => file.url));

    if (res.status !== "SUCCESS") {
      toast.error("Error al unir los PDFs");
      return false;
    }

    toast.success("PDFs unidos correctamente");
    setOutput(res.data!.url);
    return true;

  };

  return (
    <Wizard
      title="Unir PDFs"
      description="Une tus PDFs en un solo archivo siguiendo estos sencillos pasos"
    >
      <Step
        title="Subir PDFs"
        description="Arrastra y suelta tus PDFs o haz clic para seleccionarlos"
        onNext={handleMergePdfs}
        isDisabled={filesUp.length < 2 || isPending}
      >
        <section className="overflow-x-auto max-h-[70dvh]">
          <FileUploader
            files={files}
            setFiles={setFiles}
            uploadURL={"/api/upload"}
            deleteURL={"/api/delete"}
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
        <section className="flex items-center justify-center h-full">
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
