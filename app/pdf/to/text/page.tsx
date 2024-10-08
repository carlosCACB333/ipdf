"use client";

import { pdfToText } from "@/actions/pdf";
import { FileTemp, FileUploader } from "@/components/common/file-uploader";
import { Step, Wizard } from "@/components/common/wizard";
import { Textarea } from "@nextui-org/input";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [files, setFiles] = useState<FileTemp[]>([]);
  const [result, setResult] = useState<string>("");

  const file = files.find((file) => file.status === "success");

  const handlePdfToText = async () => {

    if (!file) {
      toast.error("Sube al menos un archivo");
      return false;
    }

    const res = await pdfToText(file.url);

    if (res.status !== "SUCCESS") {
      toast.error(res.message || "ocurrió un error");
      return false;
    }

    setResult(res.data!.text);
    return true;

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
            uploadURL={"/api/upload"}
            deleteURL={"/api/delete"}
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
