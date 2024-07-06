"use client";
import { Button } from "@nextui-org/button";
import { CircularProgress } from "@nextui-org/progress";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Close, Pdf, Upload } from "../icons";
import { text } from "../primitives";
import { DragAndDrop } from "./drag-and-drop";

const base_url = process.env.NEXT_PUBLIC_APP_URL;

export interface FileTemp {
  file: File;
  url: string;
  name: string;
  size: number;
  status: "loading" | "success" | "error";
}

interface Props {
  uploadURL: string;
  deleteURL: string;
  files: FileTemp[];
  setFiles: Dispatch<SetStateAction<FileTemp[]>>;
  maxFiles?: number;
}

export const FileUploader = ({
  files,
  setFiles,
  uploadURL,
  deleteURL,
  maxFiles,
}: Props) => {
  const handleChange = (files: FileList) => {
    if (!files) return;
    for (let i = 0; i < files["length"]; i++) {
      if (maxFiles && files.length + i > maxFiles) {
        break;
      }
      const file = files[i];
      if (file.type !== "application/pdf") continue;
      setFiles((prevState) => [
        ...prevState,
        {
          file,
          url: "",
          name: file.name,
          size: file.size,
          status: "loading",
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {(!maxFiles || files.length < maxFiles) && (
        <DragAndDrop onChange={handleChange} />
      )}

      <div className="flex flex-col gap-1 w-full overflow-y-auto max-h-60">
        {files.map((file, index) => (
          <FileCard
            key={index}
            file={file}
            index={index}
            setFiles={setFiles}
            uploadURL={uploadURL}
            deleteURL={deleteURL}
          />
        ))}
      </div>
    </div>
  );
};

const FileCard = ({
  file,
  index,
  setFiles,
  uploadURL,
  deleteURL,
}: {
  file: FileTemp;
  index: number;
  setFiles: Dispatch<SetStateAction<FileTemp[]>>;
  uploadURL: string;
  deleteURL: string;
}) => {
  const [progress, setProgress] = useState(file.status === "success" ? 100 : 0);

  const setState = (state: Partial<FileTemp>) => {
    setFiles((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              ...state,
            }
          : item
      )
    );
  };

  const uploadFile = () => {
    try {
      const formData = new FormData();
      formData.append("file", file.file);

      const request = new XMLHttpRequest();

      request.upload.onprogress = (e) => {
        const progress = (e.loaded / e.total) * 100;
        setProgress(progress);
      };

      request.onload = (e) => {
        const body = JSON.parse(request.responseText);
        console.log(body);
        setProgress(100);
        setState({ status: "success", url: body.data.url });
      };

      request.onerror = (e) => {
        console.error(e);
        setProgress(0);
        setState({ status: "error" });
      };

      request.open("POST", uploadURL, true);
      request.send(formData);

      return request;
    } catch (error) {
      console.error(error);
      setProgress(0);
      setState({ status: "error" });
      return null;
    }
  };

  useEffect(() => {
    if (file.status === "success") return;
    const request = uploadFile();
    return () => {
      request?.abort();
    };
  }, []);

  const handleDelete = () => {
    try {
      setState({ status: "loading" });
      
      const file_url = file.url.replace(base_url + "/uploads/", "");
      const url = deleteURL + "/" + file_url;

      const request = new XMLHttpRequest();

      request.onload = (e) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
      };

      request.onprogress = (e) => {
        console.log(e);
        setProgress((e.loaded / e.total) * 100);
      };

      request.open("DELETE", url, true);
      request.send();
    } catch (error) {
      setProgress(0);
      console.error(error);
    }
  };

  console.log(progress);
  return (
    <div key={index} className="flex items-center justify-between w-full">
      <div className="flex gap-4">
        <Pdf className="text-red-500" size={36} />
        <div>
          <p className={text({ size: "xs", font: "bold" })}>{file.name}</p>
          <p className={text({ color: "disabled", size: "xs" })}>
            {Math.round(file.size / 1024)} KB
          </p>
        </div>
      </div>

      {file.status === "loading" ? (
        <CircularProgress
          aria-label="Loading..."
          size="sm"
          value={progress}
          color="primary"
          showValueLabel={true}
        />
      ) : file.status === "success" ? (
        <Button isIconOnly variant="light" onClick={handleDelete}>
          <Close />
        </Button>
      ) : (
        <Button isIconOnly variant="light" onClick={uploadFile}>
          <Upload />
        </Button>
      )}
    </div>
  );
};
