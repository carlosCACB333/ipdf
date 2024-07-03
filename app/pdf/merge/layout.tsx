import { Metadata } from "next";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: "Unir PDFs",
  description:
    "Utiliza nuestra herramienta gratuita para unir tus PDFs en un solo archivo. ¡Rápido, intuitivo y eficiente!",
};
