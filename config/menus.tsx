import { FileX, Files } from "@/components/icons";
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
    Icon: FileX,
    href: "/pdf/to/images",
  },
];
