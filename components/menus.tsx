"use client ";

import { menus } from "@/config/menus";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { NavbarItem } from "@nextui-org/navbar";
import { ChevronDown } from "./icons";

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
              startContent={<menu.Icon size={28} className="text-primary" />}
            >
              {menu.title}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};
