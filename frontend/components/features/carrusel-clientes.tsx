"use client";

import { useEffect, useRef } from "react";

/**
 * Marquee de clientes (home): misma mecánica que CarruselModelos — lista
 * duplicada desplazada el 50 % por requestAnimationFrame, redondeada a píxeles
 * físicos para que el borde no parpadee. Hoy las piezas son placeholders
 * "Próximamente"; cuando lleguen las fotos reales se reemplaza el contenido del
 * <li>. Se pausa con foco de teclado (":focus-visible"); queda desplazable a
 * mano con `prefers-reduced-motion` (las copias se ocultan por CSS).
 */
export function CarruselClientes() {
  const carruselRef = useRef<HTMLDivElement>(null);
  const pistaRef = useRef<HTMLUListElement>(null);

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
      if (!mitad || carrusel.matches(":has(:focus-visible)")) return;

      const segundos = 6 * (escritorio.matches ? 10 : 5);
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
  }, []);

  const casilleros = Array.from({ length: 6 });

  return (
    <div
      aria-label="Clientes de Locos Bro"
      aria-roledescription="carrusel"
      className="carrusel overflow-hidden"
      ref={carruselRef}
      role="region"
    >
      <ul className="carrusel-pista" ref={pistaRef}>
        {[...casilleros, ...casilleros].map((_, indice) => {
          const esCopia = indice >= casilleros.length;

          return (
            <li className={esCopia ? "carrusel-copia shrink-0" : "shrink-0"} inert={esCopia} key={indice}>
              <div className="flex aspect-square w-full items-center justify-center rounded-[6px] border-2 border-dashed border-white/50">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                  Próximamente
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
