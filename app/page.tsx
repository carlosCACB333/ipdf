import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

import { GithubIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({})}>Tu Solución&nbsp;</h1>
        <h1 className={title({ color: "blue" })}>Todo-en-Uno &nbsp;</h1>
        <h1 className={title({})}>para PDFs&nbsp;</h1>

        <h2 className={subtitle({ class: "mt-4" })}>
          Con iPDF, transforma, edita y optimiza tus PDFs en línea con
          facilidad. ¡Rápido, intuitivo y eficiente!
        </h2>
        <br />
        <small className="text-green-600">
          Este proyecto está en desarrollo activo, si quieres contribuir o
          tienes alguna sugerencia, no dudes en avisarnos en el siguiente
          repositorio de GitHub.
        </small>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}
