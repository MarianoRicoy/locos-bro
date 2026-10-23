import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/features/section";
import { SectionHeading } from "@/components/features/section-heading";
import { buttonVariants } from "@/components/ui/button-variants";
import { IMAGENES, PLACEHOLDER_BASE64 } from "@/lib/media";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "La Fábrica",
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
    <main className="flex-1">
      <Section
        as="header"
        innerClassName="grid items-end gap-8 py-14 md:grid-cols-2 md:gap-14 md:py-20"
        tone="oscuro"
      >
        <SectionHeading as="h1" eyebrow="La Fábrica" title="Del bloque a la ola, todo en el mismo taller" />
        <p className="text-base leading-relaxed text-white/75 md:text-lg">
          Locos Bro es una fábrica de tablas de surf de Miramar. Trabajamos de forma artesanal: cada tabla
          se shapea, se lamina y se termina en nuestro taller, con atención al detalle y pensando en las
          olas de la costa bonaerense.
        </p>
      </Section>

      <Section aria-label="Fotos del taller" innerClassName="py-12 md:py-16" tone="claro">
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {IMAGENES.taller.map((foto, indice) => (
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border-2 border-foreground bg-secondary"
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

      <Section aria-labelledby="proceso-titulo" innerClassName="space-y-12" tone="oscuro">
        <SectionHeading
          description="Cuatro etapas, un mismo cuidado. Así se fabrica una tabla de Locos Bro."
          eyebrow="Proceso"
          id="proceso-titulo"
          title="Cómo hacemos tu tabla"
        />

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESO.map((paso, indice) => (
            <li className="space-y-3 rounded-sm border-2 border-white p-6" key={paso.titulo}>
              <span aria-hidden="true" className="font-titulo text-5xl text-neutral-500">
                {String(indice + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl">{paso.titulo}</h3>
              <p className="text-sm leading-relaxed text-white/70">{paso.texto}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        aria-labelledby="visita-titulo"
        innerClassName="grid gap-10 md:grid-cols-2"
        tone="claro"
      >
        <div className="space-y-6">
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

        <ul className="space-y-6 self-center border-l-4 border-foreground pl-6 text-base">
          <li className="flex items-start gap-3">
            <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0" />
            <div>
              <p>{contact.location.address}</p>
              <a
                className="mt-1 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
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
            <Clock aria-hidden="true" className="mt-1 size-5 shrink-0" />
            <div>
              {contact.horarios.map((linea) => (
                <p key={linea}>{linea}</p>
              ))}
            </div>
          </li>
        </ul>
      </Section>
    </main>
  );
}
