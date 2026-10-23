"use client";

import type { CSSProperties } from "react";

import { useModeloModal } from "@/components/features/modelo-modal";
import { ModeloTile } from "@/components/features/modelo-tile";
import type { Modelo } from "@/types/modelo";

/**
 * Carrusel infinito de modelos. El movimiento es CSS puro (ver `.carrusel-pista` en globals.css):
 * la lista se duplica y se desplaza el 50 % en bucle. No se frena al pasar el mouse.
 * Se pausa con foco o con la ficha abierta, y queda desplazable a mano con `prefers-reduced-motion`.
 */
export function CarruselModelos({ modelos }: { modelos: Modelo[] }) {
  const { abierto } = useModeloModal();
  const copias = [...modelos, ...modelos];

  return (
    <div
      aria-label="Quiver de Locos Bro"
      aria-roledescription="carrusel"
      className="carrusel overflow-hidden"
      data-pausado={abierto}
      role="region"
    >
      <ul className="carrusel-pista" style={{ "--modelos": modelos.length } as CSSProperties}>
        {copias.map((modelo, indice) => {
          const esCopia = indice >= modelos.length;

          return (
            <li className={esCopia ? "carrusel-copia shrink-0" : "shrink-0"} inert={esCopia} key={`${modelo.slug}-${indice}`}>
              <ModeloTile
                className="aspect-square w-full transform-gpu rounded-[6px] border-0 ring-1 ring-inset ring-[#4d4d4d] [backface-visibility:hidden]"
                modelo={modelo}
                overlay="titulo"
                sizes="(max-width: 767px) 50vw, 20vw"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
