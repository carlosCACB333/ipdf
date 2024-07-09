import { FileText, FileX, Files, PngFile } from "@/components/icons";
import { IconSvgProps } from "@/types";

export interface Menu {
  title: string;
  description: string;
  Icon: React.FC<IconSvgProps>;
  href: string;
}

export const menus: Menu[] = [
  {
    title: "Unir PDFs",
    description: "Combina varios archivos PDF en uno solo",
    Icon: Files,
    href: "/pdf/merge",
  },
  {
    title: "Eliminar páginas",
    description: "Elimina páginas no deseadas de tu archivo PDF",
    Icon: FileX,
    href: "/pdf/remove",
  },
  {
    title: "PDF a Imágenes",
    description: "Convierte tus archivos PDF a imágenes de alta calidad",
    Icon: PngFile,
    href: "/pdf/to/images",
  },
  {
    title: "Extraer texto",
    description: "Extrae el texto de tu archivo PDF",
    Icon: FileText,
    href: "/pdf/to/text",
  },
];
