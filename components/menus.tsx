"use client ";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { NavbarItem } from "@nextui-org/navbar";
import { ChevronDown, FileX, Files } from "./icons";

interface Menu {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const menus: Menu[] = [
  {
    title: "Unir PDFs",
    description: "Combina varios archivos PDF en uno solo",
    icon: <Files />,
    href: "/pdf/merge",
  },
  {
    title: "Eliminar páginas",
    description: "Elimina páginas no deseadas de tu archivo PDF",
    icon: <FileX />,
    href: "/pdf/remove",
  },
];

export const Menus = () => {
  return (
    <>
      <Dropdown>
        <NavbarItem>
          <DropdownTrigger>
            <Button
              disableRipple
              className="p-0 bg-transparent data-[hover=true]:bg-transparent"
              endContent={<ChevronDown size={16} />}
              radius="sm"
              variant="light"
            >
              Herramientas
            </Button>
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu
          aria-label="Herramientas"
          className="w-[340px]"
          itemClasses={{
            base: "gap-4",
          }}
        >
          {menus.map((menu) => (
            <DropdownItem
              key={menu.title}
              description={menu.description}
              href={menu.href}
              startContent={menu.icon}
            >
              {menu.title}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};
