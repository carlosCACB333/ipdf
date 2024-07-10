import { Metadata } from "next";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: "Extraer imágenes de PDF",
  description: "Extrae las imágenes de tu archivo PDF",
};
