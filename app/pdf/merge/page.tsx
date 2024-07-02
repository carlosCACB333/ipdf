"use client";
import { Close, Upload } from "@/components/icons";
import { text } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { ChangeEventHandler, DragEventHandler, useRef, useState } from "react";

export default function Home() {
  const container = useRef<HTMLLabelElement>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [merged, setMerged] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleMerge = async () => {
    try {
      if (files.length < 2) return;
      setLoading(true);
      const url = process.env.NEXT_PUBLIC_APP_URL;
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      const response = await fetch(`${url}/pdf/merge`, {
        method: "POST",
        body: formData,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log(response);
      const blob = await response.blob();
      const merged = new File([blob], "merged.pdf", {
        type: "application/pdf",
      });
      setMerged(merged);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className={text({ color: "blue", size: "lg" })}>
        Unir PDFs en uno solo
      </h1>
      <br />

      <div className="flex flex-col gap-4 w-full">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between w-full p-4 border border-gray-500 rounded-lg"
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
              <span className="font-semibold"> Haga clic para cargar </span>o
              arrastre y suelte tus PDFs aquí
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

      <Button
        size="lg"
        color="primary"
        fullWidth
        isDisabled={files.length < 2 || loading}
        onClick={handleMerge}
      >
        Unir PDFs
      </Button>

      <br />

      {merged && (
        <Link href={URL.createObjectURL(merged)} download={merged.name}>
          Descargar PDF unido
        </Link>
      )}
    </section>
  );
}
