import { Metadata } from "next";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: "PDF a Imágenes",
  description:
    "Convierte tus archivos PDF a imágenes de alta calidad con este conversor en línea.",
};
