"use client";
import clsx from "clsx";
import { DragEventHandler, useRef, useState } from "react";
import { Upload } from "../icons";

interface DragAndDropProps {
  onChange: (files: FileList) => void;
}

export const DragAndDrop = ({ onChange }: DragAndDropProps) => {
  const container = useRef<HTMLLabelElement>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

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

  return (
    <label
      ref={container}
      className={clsx(
        "flex flex-col items-center justify-center w-full h-40 border-2",
        "border-dashed rounded-lg cursor-pointer transition-all",
        "hover:border-primary hover:text-primary p-4 bg-content1",
        {
          "border-primary text-primary": dragActive,
          "border-gray-500 text-gray-500": !dragActive,
        }
      )}
      draggable
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        onChange(e.dataTransfer.files);
      }}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <Upload size={48} />
        <p>
          <span className="font-semibold"> Haga clic para cargar </span>o
          arrastre y suelte tus PDFs aquí
        </p>
      </div>
      <input
        type="file"
        className="hidden"
        multiple
        accept=".pdf"
        onChange={(e) => {
          e.preventDefault();
          let files = e.target.files;
          if (!files) return;
          onChange(files);
        }}
      />
    </label>
  );
};
