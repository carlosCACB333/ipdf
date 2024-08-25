import { Lock, MoodSmile, Rocket } from "@/components/icons";
import { text } from "@/components/primitives";
import { menus } from "@/config/menus";
import { Card, CardBody } from "@nextui-org/card";
import { lookup } from "dns";
import Link from "next/link";
import { hostname } from "os";

export default async function Home() {
  const myIp: String = await new Promise((resolve, reject) => {
    lookup(hostname(), (err, address) => {
      if (err) {
        reject(err);
      }
      resolve(address);
    });
  }
  );


  return (
    <section className="flex flex-col items-center justify-center gap-16 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={text({ size: "xl", color: 'violet' })}>{myIp}</h1>
        <br />
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

      <div>
        <h2 className={text({ size: "lg", font: "bold" })}>
          ¿Qué quieres hacer?
        </h2>
        <p className={text({ color: "disabled" })}>
          Elige una de las opciones a continuación para comenzar a trabajar con
          tus PDFs.
        </p>
        <br />
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {menus.map((menu) => (
            <Card key={menu.title} isPressable as={Link} href={menu.href}>
              <CardBody>
                <div className="flex items-center gap-4 cursor-pointer">
                  <menu.Icon className="text-primary" size={60} />
                  <div>
                    <h3 className={text({ font: "bold" })}>{menu.title}</h3>
                    <p className={text({ color: "disabled", size: "sm" })}>
                      {menu.description}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h2
          className={text({
            size: "lg",
            font: "bold",
          })}
        >
          ¡Descubre iPDF!
        </h2>
        <p className={text({ color: "disabled" })}>
          Conoce algunas de las características que hacen de iPDF la mejor
          solución para trabajar con tus PDFs.
        </p>
        <br />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card shadow="sm">
            <CardBody>
              <Rocket size={40} />
              <h3 className={text({ size: "md", font: "bold" })}>
                Rápido y eficiente
              </h3>
              <p className={text({ color: "disabled", size: "sm" })}>
                Trabaja con tus PDFs de manera ágil y sin complicaciones.
              </p>
            </CardBody>
          </Card>
          <Card shadow="sm">
            <CardBody>
              <Lock size={40} />
              <h3 className={text({ size: "md", font: "bold" })}>
                Seguro y confiable
              </h3>
              <p className={text({ color: "disabled", size: "sm" })}>
                Tus datos están protegidos con las mejores prácticas de
                seguridad.
              </p>
            </CardBody>
          </Card>
          <Card shadow="sm">
            <CardBody>
              <MoodSmile size={40} />
              <h3 className={text({ size: "md", font: "bold" })}>
                Fácil de usar
              </h3>
              <p className={text({ color: "disabled", size: "sm" })}>
                Interfaz intuitiva y amigable para que puedas trabajar sin
                problemas.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
      <br />
      <br />
      <br />
    </section>
  );
}
