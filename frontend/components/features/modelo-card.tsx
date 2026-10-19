import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { Card } from "@/components/ui/card";
import { CATEGORIAS } from "@/lib/modelos";
import { PLACEHOLDER_BASE64 } from "@/lib/media";
import type { Modelo } from "@/types/modelo";

type ModeloCardProps = {
  modelo: Modelo;
  /** Marca la imagen como prioritaria (solo para cards visibles sin scroll). */
  prioridad?: boolean;
};

/**
 * Plantilla de card de modelo de tabla: foto, título, medidas + descripción corta
 * y botón "Consultar modelo" (lleva al formulario de contacto con el modelo precargado).
 */
export function ModeloCard({ modelo, prioridad = false }: ModeloCardProps) {
  const categoria = CATEGORIAS.find((item) => item.id === modelo.categoria);

  return (
    <Card className="h-full gap-0 bg-card py-0 ring-1 ring-border transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/10">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary">
        <Image
          alt={`${modelo.nombre}, ${categoria?.nombre ?? "tabla de surf"} de Locos Bro`}
          blurDataURL={PLACEHOLDER_BASE64}
          className="object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
          fill
          placeholder="blur"
          preload={prioridad}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={modelo.imagen}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div className="space-y-2">
          {categoria ? (
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {categoria.nombre}
            </p>
          ) : null}
          <h3 className="text-2xl leading-tight text-foreground">{modelo.nombre}</h3>
          <p className="text-sm font-bold text-resina">
            <span className="sr-only">Medidas: </span>
            {modelo.medidas}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">{modelo.descripcion}</p>
        </div>

        <Link
          aria-label={`Consultar modelo ${modelo.nombre}`}
          className={`${buttonVariants({ variant: "default" })} mt-auto w-full`}
          href={`/contacto?modelo=${modelo.slug}#formulario`}
        >
          Consultar modelo
        </Link>
      </div>
    </Card>
  );
}
