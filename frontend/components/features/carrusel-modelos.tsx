"use client";

import { useEffect, useRef } from "react";

import { useModeloModal } from "@/components/features/modelo-modal";
import { ModeloTile } from "@/components/features/modelo-tile";
import type { Modelo } from "@/types/modelo";

/**
 * Carrusel infinito de modelos: la lista se duplica y la pista se desplaza el 50 % en bucle.
 * El desplazamiento va por requestAnimationFrame y se redondea a píxeles físicos, así los
 * bordes de 1px no se reparten entre dos píxeles (con una animación CSS parpadean).
 * No se frena al pasar el mouse. Se pausa con la ficha abierta o con foco de teclado
 * (":focus-visible", no ":focus-within": si fuera focus-within, el foco que el modal
 * devuelve al cerrarse con el mouse dejaría el carrusel pausado para siempre). Queda
 * desplazable a mano con `prefers-reduced-motion`.
 * En escritorio cada cuadrado tarda 10 s en recorrer su ancho; en el celular, 5 s.
 */
export function CarruselModelos({ modelos }: { modelos: Modelo[] }) {
  const { abierto } = useModeloModal();
  const copias = [...modelos, ...modelos];
  const carruselRef = useRef<HTMLDivElement>(null);
  const pistaRef = useRef<HTMLUListElement>(null);
  const pausadoRef = useRef(abierto);

  useEffect(() => {
    pausadoRef.current = abierto;
  }, [abierto]);

  useEffect(() => {
    const carrusel = carruselRef.current;
    const pista = pistaRef.current;
    if (!carrusel || !pista) return;

    const movimientoReducido = matchMedia("(prefers-reduced-motion: reduce)");
    const escritorio = matchMedia("(min-width: 768px)");
    let mitad = 0;
    let izquierda = 0;
    let desplazamiento = 0;
    let anterior: number | undefined;
    let frame = 0;

    const medir = () => {
      mitad = pista.getBoundingClientRect().width / 2;
      izquierda = carrusel.getBoundingClientRect().left;
    };
    const observador = new ResizeObserver(medir);
    observador.observe(carrusel);
    observador.observe(pista);

    const avanzar = (ahora: number) => {
      frame = requestAnimationFrame(avanzar);
      const delta = Math.min(ahora - (anterior ?? ahora), 100);
      anterior = ahora;

      if (movimientoReducido.matches) {
        pista.style.transform = "";
        return;
      }
      if (!mitad || pausadoRef.current || carrusel.matches(":has(:focus-visible)")) return;

      const segundos = modelos.length * (escritorio.matches ? 10 : 5);
      desplazamiento = (desplazamiento + (mitad / segundos) * (delta / 1000)) % mitad;
      const escala = devicePixelRatio;
      const x = Math.round((izquierda - desplazamiento) * escala) / escala - izquierda;
      pista.style.transform = `translate3d(${x}px, 0, 0)`;
    };
    frame = requestAnimationFrame(avanzar);

    return () => {
      cancelAnimationFrame(frame);
      observador.disconnect();
    };
  }, [modelos.length]);

  return (
    <div
      aria-label="Quiver de Locos Bro"
      aria-roledescription="carrusel"
      className="carrusel overflow-hidden"
      ref={carruselRef}
      role="region"
    >
      <ul className="carrusel-pista" ref={pistaRef}>
        {copias.map((modelo, indice) => {
          const esCopia = indice >= modelos.length;

          return (
            <li className={esCopia ? "carrusel-copia shrink-0" : "shrink-0"} inert={esCopia} key={`${modelo.slug}-${indice}`}>
              <ModeloTile
                className="aspect-square w-full rounded-[6px] border-0"
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
