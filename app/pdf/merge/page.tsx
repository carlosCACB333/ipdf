"use client";
import { Step, Wizard } from "@/components/common/wizard";
import { Close, Upload } from "@/components/icons";
import { text } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { ChangeEventHandler, DragEventHandler, useRef, useState } from "react";
import { toast } from "sonner";

const url = process.env.NEXT_PUBLIC_APP_URL;

export default function Home() {
  const container = useRef<HTMLLabelElement>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [output, setOutput] = useState<string | undefined>(undefined);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    let files = e.target.files;
    if (!files) return;
    for (let i = 0; i < files["length"]; i++) {
      const file = files[i];
      if (file.type !== "application/pdf") continue;
      setFiles((prevState) => [...prevState, file]);
    }
  };

  const handleDrop: DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    let files = e.dataTransfer.files;
    for (let i = 0; i < files["length"]; i++) {
      const file = files[i];
      if (file.type !== "application/pdf") continue;
      setFiles((prevState) => [...prevState, file]);
    }
  };

  const handleDragLeave: DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver: DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragEnter: DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const mergePdfs = async () => {
    try {
      if (files.length < 2) {
        toast.error("Debes subir al menos dos PDFs");
        return false;
      }

      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      const response = await fetch(`${url}/api/pdf/merge`, {
        method: "POST",
        body: formData,
        headers: {
          "Access-Control-Allow-Origin": "*",
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
      >
        <section className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col gap-2 w-full">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between w-full p-4 bg-content1 rounded-lg"
              >
                <p className={text({ color: "disabled" })}>{file.name}</p>
                <Button
                  isIconOnly
                  variant="light"
                  onClick={() =>
                    setFiles((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  <Close />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center w-full">
            <label
              ref={container}
              className={clsx(
                "flex flex-col items-center justify-center w-full h-64 border-2",
                "border-dashed rounded-lg cursor-pointer transition-all",
                "hover:border-primary hover:text-primary p-4",
                {
                  "border-primary text-primary": dragActive,
                  "border-gray-500 text-gray-500": !dragActive,
                }
              )}
              draggable
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload size={48} />
                <p>
                  <span className="font-semibold"> Haga clic para cargar </span>
                  o arrastre y suelte tus PDFs aquí
                </p>
                <p>PDFs hasta 10MB</p>
              </div>
              <input
                type="file"
                className="hidden"
                multiple
                accept=".pdf"
                onChange={handleChange}
              />
            </label>
          </div>

          <br />
        </section>
      </Step>
      <Step
        title="Descargar PDF"
        description="Haz clic en el botón para descargar tu PDF unido"
        buttonTitle="Descargar PDF"
        href={`${url}/${output}`}
        onNext={async () => {
          return false;
        }}
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
