import { text } from "@/components/primitives";
import { menus } from "@/config/menus";
import { Card, CardBody } from "@nextui-org/card";
import Link from "next/link";
export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-16 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1>
          <span className={text({ size: "xl" })}>Solución&nbsp;</span>
          <span className={text({ size: "xl", color: "blue" })}>
            Todo-en-Uno &nbsp;
          </span>
          <span className={text({ size: "xl" })}>para tusPDFs&nbsp;</span>
        </h1>
        <h2 className={text({ color: "disabled" })}>
          Con iPDF, transforma, edita y optimiza tus PDFs en línea con
          facilidad. ¡Rápido, intuitivo y eficiente!
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {menus.map((menu) => (
          <Card key={menu.title} className="w-[300px]">
            <CardBody>
              <Link href={menu.href}>
                <div className="flex items-center gap-4 cursor-pointer">
                  <menu.Icon className="text-primary" size={60} />
                  <div>
                    <h3 className={text({ font: "bold" })}>{menu.title}</h3>
                    <p className={text({ color: "disabled", size: "xs" })}>
                      {menu.description}
                    </p>
                  </div>
                </div>
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
