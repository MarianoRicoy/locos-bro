import type { Metadata } from "next";
import Link from "next/link";

import { ModeloCard } from "@/components/features/modelo-card";
import { ModeloModalProvider } from "@/components/features/modelo-modal";
import { Section } from "@/components/features/section";
import { SectionHeading } from "@/components/features/section-heading";
import { buttonVariants } from "@/components/ui/button-variants";
import { CATEGORIAS, obtenerModelosPorCategoria } from "@/lib/modelos";

export const metadata: Metadata = {
  title: "Quiver",
  description:
    "Quiver de Locos Bro Surfboards: shortboards, funboards y longboards hechos a mano en Miramar. Consultá medidas y modelos.",
};

export default function ModelosPage() {
  const categoriasConModelos = CATEGORIAS.filter(
    (categoria) => obtenerModelosPorCategoria(categoria.id).length > 0,
  );

  const ctaOscuro = categoriasConModelos.length % 2 !== 0;

  return (
    <main className="flex-1">
      <Section as="header" innerClassName="space-y-8 py-14 md:py-20" tone="oscuro">
        <SectionHeading
          as="h1"
          description="Estos son los modelos base del taller: tocá una tabla para ver su ficha. Todas las medidas se ajustan a vos: si no ves lo que buscás, la shapeamos a medida."
          eyebrow="Quiver"
          title="El quiver de Locos Bro"
        />

        <nav aria-label="Categorías del quiver" className="flex flex-wrap gap-3">
          {categoriasConModelos.map((categoria) => (
            <a
              className="rounded-sm border-2 border-white px-4 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-black"
              href={`#${categoria.id}`}
              key={categoria.id}
            >
              {categoria.nombre}
            </a>
          ))}
        </nav>
      </Section>

      <ModeloModalProvider>
        {categoriasConModelos.map((categoria, indice) => {
          const modelos = obtenerModelosPorCategoria(categoria.id);

          return (
            <Section
              aria-labelledby={`${categoria.id}-titulo`}
              className="scroll-mt-24"
              id={categoria.id}
              innerClassName="space-y-10"
              key={categoria.id}
              tone={indice % 2 === 0 ? "claro" : "oscuro"}
            >
              <SectionHeading
                description={categoria.descripcion}
                id={`${categoria.id}-titulo`}
                title={categoria.nombre}
              />

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {modelos.map((modelo) => (
                  <ModeloCard key={modelo.slug} modelo={modelo} />
                ))}
              </div>
            </Section>
          );
        })}
      </ModeloModalProvider>

      <Section
        innerClassName="flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-16"
        tone={ctaOscuro ? "oscuro" : "claro"}
      >
        <div className="space-y-2">
          <h2 className="text-3xl md:text-5xl">¿No encontrás tu tabla ideal?</h2>
          <p className="max-w-xl opacity-75">
            Hacemos tablas a medida: contanos cómo surfeás y la diseñamos con vos.
          </p>
        </div>
        <Link
          className={buttonVariants({ variant: ctaOscuro ? "blanco" : "default", size: "lg" })}
          href="/contacto#formulario"
        >
          Pedir tabla a medida
        </Link>
      </Section>
    </main>
  );
}
