import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Etiqueta } from "@/components/features/etiqueta";
import { Section } from "@/components/features/section";
import { SectionHeading } from "@/components/features/section-heading";
import { buttonVariants } from "@/components/ui/button-variants";
import { CAPITULOS_HISTORIA } from "@/lib/historia";
import { IMAGENES, PLACEHOLDER_BASE64 } from "@/lib/media";

export const metadata: Metadata = {
  title: "Historia",
  description:
    "La historia de Locos Bro Surfboards: hermanos, taller y años en el agua en Miramar, Argentina.",
};

export default function HistoriaPage() {
  return (
    <main className="flex-1">
      <Section as="header" innerClassName="space-y-6 py-16 md:py-28" tone="oscuro">
        <Etiqueta>Historia · El legado</Etiqueta>
        <h1 className="max-w-5xl text-5xl leading-[1.05] sm:text-6xl md:text-8xl">
          Sangre, sal y el mismo taller de <span className="text-neutral-400">siempre</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-white/75">
          Pioneros, hermanos y locales. Esta es la historia de una fábrica que se hizo en la calle y en el
          agua.
        </p>
      </Section>

      <Section aria-labelledby="capitulos-titulo" innerClassName="space-y-12" tone="claro">
        <h2 className="sr-only" id="capitulos-titulo">
          Capítulos de la historia
        </h2>

        <ol className="grid gap-x-10 gap-y-12 md:grid-cols-2">
          {CAPITULOS_HISTORIA.map((capitulo, indice) => (
            <li className="space-y-3 border-t-4 border-foreground pt-5" key={capitulo.titulo}>
              <span aria-hidden="true" className="font-titulo text-5xl text-neutral-500">
                {String(indice + 1).padStart(2, "0")}
              </span>
              <h3 className="text-3xl md:text-4xl">{capitulo.titulo}</h3>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {capitulo.texto}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section aria-labelledby="archivo-titulo" innerClassName="space-y-10" tone="oscuro">
        <SectionHeading
          description="Fotos de archivo, de la playa y del taller. Acá van las imágenes reales."
          eyebrow="Archivo"
          id="archivo-titulo"
          title="Años en el agua"
        />

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {IMAGENES.historia.map((foto, indice) => (
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border-2 border-white bg-neutral-900"
              key={`${foto.alt}-${indice}`}
            >
              <Image
                alt={foto.alt}
                blurDataURL={PLACEHOLDER_BASE64}
                className="object-cover"
                fill
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, 33vw"
                src={foto.src}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section
        aria-labelledby="historia-cta-titulo"
        innerClassName="flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-16"
        tone="claro"
      >
        <h2 className="max-w-2xl text-3xl md:text-5xl" id="historia-cta-titulo">
          La historia sigue. ¿Te sumás?
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link className={buttonVariants({ variant: "default", size: "lg" })} href="/modelos">
            Ver quiver
          </Link>
          <Link className={buttonVariants({ variant: "outline", size: "lg" })} href="/contacto#formulario">
            Hablemos
          </Link>
        </div>
      </Section>
    </main>
  );
}
