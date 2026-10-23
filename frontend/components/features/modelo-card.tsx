"use client";

import Link from "next/link";

import { useModeloModal } from "@/components/features/modelo-modal";
import { ModeloTile } from "@/components/features/modelo-tile";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card } from "@/components/ui/card";
import { CATEGORIAS, resumenMedidas } from "@/lib/modelos";
import type { Modelo } from "@/types/modelo";

type ModeloCardProps = {
  modelo: Modelo;
};

/**
 * Card de modelo para el listado: cuadrado con la tabla (abre la ficha), nombre, medidas,
 * descripción corta y botón "Consultar" (formulario de contacto con el modelo precargado).
 * Debe usarse dentro de <ModeloModalProvider>.
 */
export function ModeloCard({ modelo }: ModeloCardProps) {
  const { abrir } = useModeloModal();
  const categoria = CATEGORIAS.find((item) => item.id === modelo.categoria);

  return (
    <Card
      className="h-full scroll-mt-28 gap-0 bg-card py-0 transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_theme(colors.neutral.500)]"
      id={modelo.slug}
    >
      <ModeloTile
        className="aspect-square h-auto w-full rounded-none border-0 border-b-2"
        modelo={modelo}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div className="space-y-2">
          {categoria ? (
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {categoria.nombre}
            </p>
          ) : null}
          <h3 className="text-3xl leading-[1.08]">{modelo.nombre}</h3>
          <p className="inline-block bg-foreground px-2 py-0.5 text-sm font-semibold text-background">
            <span className="sr-only">Medidas: </span>
            {resumenMedidas(modelo)}
          </p>
          {modelo.descripcion ? (
            <p className="text-sm leading-relaxed text-muted-foreground">{modelo.descripcion}</p>
          ) : null}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3">
          <button
            aria-haspopup="dialog"
            className={buttonVariants({ variant: "outline", size: "sm" })}
            onClick={() => abrir(modelo.slug)}
            type="button"
          >
            Ver ficha
          </button>
          <Link
            aria-label={`Consultar modelo ${modelo.nombre}`}
            className={buttonVariants({ variant: "default", size: "sm" })}
            href={`/contacto?modelo=${modelo.slug}#formulario`}
          >
            Consultar
          </Link>
        </div>
      </div>
    </Card>
  );
}
