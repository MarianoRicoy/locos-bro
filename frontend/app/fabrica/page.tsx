import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/features/section-heading";
import { buttonVariants } from "@/components/ui/button-variants";
import { IMAGENES, PLACEHOLDER_BASE64 } from "@/lib/media";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Fábrica (Miramar)",
  description:
    "Conocé el taller de Locos Bro Surfboards en Miramar: cómo shapeamos, laminamos y terminamos cada tabla de surf a mano.",
};

const PROCESO = [
  {
    titulo: "Shape",
    texto: "Partimos de un blank y lo llevamos a forma: outline, rocker, rails y concave, según el modelo.",
  },
  {
    titulo: "Laminado",
    texto: "Fibra de vidrio y resina aplicadas a mano para una tabla liviana, resistente y flexible.",
  },
  {
    titulo: "Colores y detalles",
    texto: "Tintes, líneas y logos. Cada tabla puede tener su propia identidad visual.",
  },
  {
    titulo: "Lijado y pulido",
    texto: "Pasada tras pasada hasta lograr una terminación pareja, lista para el agua.",
  },
];

export default function FabricaPage() {
  const { contact } = siteConfig;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-20 px-4 py-12 md:gap-28 md:px-8 md:py-20">
      <header className="grid items-end gap-8 md:grid-cols-2 md:gap-14">
        <SectionHeading as="h1" eyebrow="Fábrica (Miramar)" title="Del bloque a la ola, todo en un mismo taller" />
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          Locos Bro es una fábrica de tablas de surf de Miramar. Trabajamos de forma artesanal: cada tabla
          se shapea, se lamina y se termina en nuestro taller, con atención al detalle y pensando en las
          olas de la costa bonaerense.
        </p>
      </header>

      <section aria-label="Fotos del taller" className="grid gap-4 md:grid-cols-3 md:gap-6">
        {IMAGENES.taller.map((foto, indice) => (
          <div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-secondary ring-1 ring-border"
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
      </section>

      <section aria-labelledby="proceso-titulo" className="space-y-10">
        <SectionHeading
          description="Cuatro etapas, un mismo cuidado. Así se fabrica una tabla de Locos Bro."
          eyebrow="Proceso"
          id="proceso-titulo"
          title="Cómo hacemos tu tabla"
        />

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESO.map((paso, indice) => (
            <li className="space-y-3 rounded-2xl border border-border bg-card p-6" key={paso.titulo}>
              <span className="text-4xl font-black text-madera" aria-hidden="true">
                {String(indice + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl">{paso.titulo}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{paso.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="visita-titulo"
        className="grid gap-8 rounded-3xl bg-secondary/60 p-8 md:grid-cols-2 md:p-12"
      >
        <div className="space-y-5">
          <SectionHeading
            description="Podés pasar por el taller a ver modelos, tocar los materiales y charlar tu pedido en persona."
            eyebrow="Visitanos"
            id="visita-titulo"
            title="Estamos en Miramar"
          />
          <Link className={buttonVariants({ variant: "default" })} href="/contacto#formulario">
            Coordinar una visita
          </Link>
        </div>

        <ul className="space-y-5 self-center text-base">
          <li className="flex items-start gap-3">
            <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
            <div>
              <p>{contact.location.address}</p>
              <a
                className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                href={contact.location.mapsUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Cómo llegar
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Clock aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
            <div>
              {contact.horarios.map((linea) => (
                <p key={linea}>{linea}</p>
              ))}
            </div>
          </li>
        </ul>
      </section>
    </main>
  );
}
