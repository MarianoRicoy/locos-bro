"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { ARCHIVO } from "@/lib/archivo";

/** Tiempo en pantalla de cada foto antes de pasar a la siguiente. */
const MS_FOTO = 1000;
/** Los videos duran ~6s; se les da un poco más de aire. */
const MS_VIDEO = 8000;

/**
 * Proyector de archivo de /nosotros: un marco donde las fotos y los videos
 * pasan solos, en loop, sin controles. Con prefers-reduced-motion no hay
 * fundido entre piezas (el pase igual continúa, es la única forma de verlas).
 */
export function VisorArchivo() {
  const [indice, setIndice] = useState(0);
  const item = ARCHIVO[indice];

  useEffect(() => {
    const espera = item.tipo === "video" ? MS_VIDEO : MS_FOTO;
    const id = window.setTimeout(
      () => setIndice((i) => (i + 1) % ARCHIVO.length),
      espera,
    );
    return () => window.clearTimeout(id);
  }, [indice, item.tipo]);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-black bg-black">
      {item.tipo === "foto" ? (
        <Image
          alt={item.alt}
          className="visor-pieza object-contain"
          fill
          key={item.src}
          sizes="(max-width: 1280px) 100vw, 1216px"
          src={item.src}
        />
      ) : (
        <video
          aria-label={item.alt}
          autoPlay
          className="visor-pieza h-full w-full object-contain"
          key={item.src}
          loop
          muted
          playsInline
          src={item.src}
        />
      )}
    </div>
  );
}
