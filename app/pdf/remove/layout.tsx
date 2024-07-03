import { Metadata } from "next";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: "Eliminar páginas",
  description:
    "Utiliza nuestra herramienta gratuita para eliminar páginas de tus PDFs. ¡Rápido, intuitivo y eficiente!",
};
