import type { Metadata } from "next";
import Link from "next/link";

import { ModeloCard } from "@/components/features/modelo-card";
import { SectionHeading } from "@/components/features/section-heading";
import { buttonVariants } from "@/components/ui/button-variants";
import { CATEGORIAS, obtenerModelosPorCategoria } from "@/lib/modelos";

export const metadata: Metadata = {
  title: "Modelos / Quiver",
  description:
    "Quiver de Locos Bro Surfboards: shortboards, funboards y longboards hechos a mano en Miramar. Consultá medidas y modelos.",
};

export default function ModelosPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-16 px-4 py-12 md:gap-24 md:px-8 md:py-20">
      <header className="space-y-8">
        <SectionHeading
          as="h1"
          description="Estos son los modelos base del taller. Todas las medidas se ajustan a vos: si no ves lo que buscás, la shapeamos a medida."
          eyebrow="Modelos / Quiver"
          title="El quiver de Locos Bro"
        />

        <nav aria-label="Categorías del quiver" className="flex flex-wrap gap-2">
          {CATEGORIAS.map((categoria) => (
            <a
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
              href={`#${categoria.id}`}
              key={categoria.id}
            >
              {categoria.nombre}
            </a>
          ))}
        </nav>
      </header>

      {CATEGORIAS.map((categoria) => {
        const modelos = obtenerModelosPorCategoria(categoria.id);

        if (modelos.length === 0) {
          return null;
        }

        return (
          <section
            aria-labelledby={`${categoria.id}-titulo`}
            className="scroll-mt-24 space-y-8"
            id={categoria.id}
            key={categoria.id}
          >
            <SectionHeading
              description={categoria.descripcion}
              id={`${categoria.id}-titulo`}
              title={categoria.nombre}
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {modelos.map((modelo) => (
                <ModeloCard key={modelo.slug} modelo={modelo} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-secondary/60 p-8 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl">¿No encontrás tu tabla ideal?</h2>
          <p className="max-w-xl text-muted-foreground">
            Hacemos tablas a medida: contanos cómo surfeás y la diseñamos con vos.
          </p>
        </div>
        <Link className={buttonVariants({ variant: "accent", size: "lg" })} href="/contacto#formulario">
          Pedir tabla a medida
        </Link>
      </section>
    </main>
  );
}
