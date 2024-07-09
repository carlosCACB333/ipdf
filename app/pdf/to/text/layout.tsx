import { Metadata } from "next";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: "PDF a texto",
  description: "Extrae el texto de tus archivos PDF de forma rápida y sencilla",
};
