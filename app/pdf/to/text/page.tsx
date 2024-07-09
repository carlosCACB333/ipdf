"use client";

import { FileTemp, FileUploader } from "@/components/common/file-uploader";
import { Step, Wizard } from "@/components/common/wizard";
import { Textarea } from "@nextui-org/input";
import { useState } from "react";
import { toast } from "sonner";
const url = process.env.NEXT_PUBLIC_APP_URL;

export default function Home() {
  const [files, setFiles] = useState<FileTemp[]>([]);
  const [result, setResult] = useState<string>("");

  const file = files.find((file) => file.status === "success");

  const handlePdfToText = async () => {
    try {
      if (!file) {
        toast.error("Sube al menos un archivo");
        return false;
      }

      const response = await fetch(`${url}/api/pdf/to/text`, {
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

      setResult(data.data.text);
      return true;
    } catch (error) {
      toast.error("Ocurrió un error");
      return false;
    }
  };

  return (
    <Wizard
      persistState
      title="PDF a texto"
      description="Extrae el texto de tus archivos PDF de forma rápida y sencilla"
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
        title="Resultado"
        description="Tu archivo PDF ha sido convertido a texto"
        isDisabled
        href={result}
        onPrev={() => true}
        buttonTitle=""
      >
        <section className="overflow-x-auto max-h-[70dvh]">
          <Textarea
            variant="bordered"
            labelPlacement="outside"
            value={result}
            maxRows={28}
          />
        </section>
      </Step>
    </Wizard>
  );
}
