import { IMAGENES } from "@/lib/media";
import type { CategoriaModelo, CategoriaModeloId, Modelo } from "@/types/modelo";

/**
 * Quiver de Locos Bro.
 *
 * ⚠️ Los modelos y medidas son EJEMPLOS. Reemplazalos por el quiver real:
 * agregá, quitá o editá objetos de `MODELOS`. Las cards, el listado y el
 * selector del formulario de contacto se actualizan solos.
 */

export const CATEGORIAS: CategoriaModelo[] = [
  {
    id: "shortboards",
    nombre: "Shortboards",
    descripcion: "Rápidas y maniobrables, para surfear de forma vertical y exigente.",
  },
  {
    id: "funboards",
    nombre: "Funboards",
    descripcion: "El punto medio: más volumen para remar fácil sin perder diversión.",
  },
  {
    id: "longboards",
    nombre: "Longboards",
    descripcion: "Glide, estilo y caminatas de punta a punta.",
  },
];

export const MODELOS: Modelo[] = [
  {
    slug: "short-clasica",
    nombre: "Short Clásica",
    categoria: "shortboards",
    medidas: `5'8" – 6'2"`,
    descripcion: "Tri-fin versátil para olas chicas y medianas. Fácil de leer y muy divertida.",
    imagen: IMAGENES.tabla.src,
    destacado: true,
  },
  {
    slug: "short-performance",
    nombre: "Short Performance",
    categoria: "shortboards",
    medidas: `5'10" – 6'4"`,
    descripcion: "Rocker marcado y rails finos para olas con potencia y maniobras exigentes.",
    imagen: IMAGENES.tabla.src,
  },
  {
    slug: "funboard-mini-mal",
    nombre: "Mini Mal",
    categoria: "funboards",
    medidas: `7'0" – 8'0"`,
    descripcion: "Remada fácil y muy estable. Ideal para progresar o para días de poco swell.",
    imagen: IMAGENES.tabla.src,
    destacado: true,
  },
  {
    slug: "funboard-fish",
    nombre: "Fish Funboard",
    categoria: "funboards",
    medidas: `6'2" – 7'0"`,
    descripcion: "Cola swallow y mucho volumen: velocidad y flow en olas blandas.",
    imagen: IMAGENES.tabla.src,
  },
  {
    slug: "longboard-clasico",
    nombre: "Longboard Clásico",
    categoria: "longboards",
    medidas: `9'0" – 9'6"`,
    descripcion: "Single fin, rails redondeados y glide infinito. Surf de estilo clásico.",
    imagen: IMAGENES.tabla.src,
    destacado: true,
  },
  {
    slug: "longboard-noserider",
    nombre: "Noserider",
    categoria: "longboards",
    medidas: `9'2" – 9'8"`,
    descripcion: "Nariz ancha y concave para colgar los cinco con estabilidad.",
    imagen: IMAGENES.tabla.src,
  },
];

export const MODELO_A_MEDIDA = "a-medida";

export function obtenerModelosPorCategoria(categoria: CategoriaModeloId): Modelo[] {
  return MODELOS.filter((modelo) => modelo.categoria === categoria);
}

export function obtenerModelosDestacados(): Modelo[] {
  return MODELOS.filter((modelo) => modelo.destacado);
}

export function obtenerModeloPorSlug(slug: string | undefined): Modelo | undefined {
  return MODELOS.find((modelo) => modelo.slug === slug);
}
