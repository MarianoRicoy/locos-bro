"use client";

import Image from "next/image";

import { useModeloModal } from "@/components/features/modelo-modal";
import { cn } from "@/lib/utils";
import type { Modelo } from "@/types/modelo";

type ModeloTileProps = {
  modelo: Modelo;
  /** Tamaño del cuadrado (por defecto el del carrusel). */
  className?: string;
  /** Sizes de next/image según el ancho real del cuadrado. */
  sizes?: string;
  /**
   * "titulo": el nombre aparece abajo a la izquierda al pasar el mouse (carrusel del home).
   * "logo": velo con el logo del modelo (listado de /modelos).
   */
  overlay?: "titulo" | "logo";
};

/**
 * Cuadrado negro con la tabla. Es un <button>: al hacer clic abre la ficha (modal).
 * En el carrusel la tabla va derecha y el nombre aparece abajo a la izquierda;
 * en el listado, va en diagonal y el hover muestra el logo. En pantallas táctiles
 * el nombre queda siempre visible.
 */
export function ModeloTile({
  modelo,
  className = "size-60 md:size-72",
  sizes = "(max-width: 768px) 240px, 288px",
  overlay = "logo",
}: ModeloTileProps) {
  const { abrir } = useModeloModal();

  return (
    <button
      aria-haspopup="dialog"
      aria-label={`Ver ficha de ${modelo.nombre}`}
      className={cn(
        "group/tile relative block overflow-hidden rounded-sm border-2 border-foreground bg-black outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      onClick={() => abrir(modelo.slug)}
      type="button"
    >
      <Image
        alt=""
        className={
          overlay === "titulo"
            ? "object-contain p-2 will-change-transform transition-transform duration-300 group-hover/tile:scale-105 group-focus-visible/tile:scale-105"
            : "-rotate-[28deg] object-contain p-3 transition-transform duration-300 group-hover/tile:-rotate-[22deg] group-hover/tile:scale-110 group-focus-visible/tile:-rotate-[22deg] group-focus-visible/tile:scale-110"
        }
        fill
        sizes={sizes}
        src={modelo.imagen.src}
      />

      {overlay === "titulo" ? (
        <>
          <span className="pointer-events-none absolute bottom-4 left-4 text-left font-titulo text-[30px] font-normal leading-[1.1] text-white opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100 [@media(hover:none)]:opacity-100">
            {modelo.nombre}
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] ring-1 ring-inset ring-[#4d4d4d]"
          />
        </>
      ) : (
        <>
          {/* Hover / foco (solo dispositivos con mouse): logo del modelo sobre fondo oscuro. */}
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/85 p-4 text-center text-white opacity-0 transition-opacity duration-200 group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100 [@media(hover:none)]:hidden">
            {modelo.logo ? (
              <Image
                alt=""
                className="h-16 w-auto max-w-[80%] object-contain"
                height={modelo.logo.alto}
                src={modelo.logo.src}
                width={modelo.logo.ancho}
              />
            ) : (
              <span className="font-titulo text-2xl">{modelo.nombre}</span>
            )}
            <span className="border-2 border-white px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em]">
              Ver ficha
            </span>
          </span>

          {/* Táctil: no hay hover, el nombre se ve siempre. */}
          <span className="absolute inset-x-0 bottom-0 hidden bg-black/80 py-1.5 text-center text-xs font-medium tracking-[0.1em] text-white [@media(hover:none)]:block">
            {modelo.nombre}
          </span>
        </>
      )}
    </button>
  );
}
