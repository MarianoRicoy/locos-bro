import type { CategoriaModelo, CategoriaModeloId, ImagenModelo, Modelo } from "@/types/modelo";

/**
 * Quiver de Locos Bro.
 *
 * Los 12 modelos salen de la hoja de modelos del taller. Para agregar o editar uno:
 * sumá un objeto a `MODELOS` (imagen en `public/images/modelos/`). El carrusel,
 * el listado, el modal y el selector del formulario de contacto se actualizan solos.
 *
 * ⚠️ Revisar medidas y textos: se transcribieron desde una imagen de baja resolución.
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

const DIR = "/images/modelos";

function tabla(slug: string, ancho: number, alto: number): ImagenModelo {
  return { src: `${DIR}/${slug}.jpg`, ancho, alto };
}

function logo(slug: string, ancho: number, alto: number): ImagenModelo {
  return { src: `${DIR}/${slug}-logo.png`, ancho, alto };
}

export const MODELOS: Modelo[] = [
  {
    slug: "easy",
    nombre: "Easy",
    categoria: "shortboards",
    largo: `6'8"`,
    ancho: `19"`,
    espesor: `2 1/2"`,
    descripcion:
      "Corta, ancha, divertida y rápida. Una tabla ideal para todos los niveles de surf.",
    imagen: tabla("easy", 367, 110),
    logo: logo("easy", 261, 116),
  },
  {
    slug: "10m",
    nombre: "10M",
    categoria: "shortboards",
    largo: `5'6"`,
    ancho: `18 7/8"`,
    espesor: `2 5/8"`,
    imagen: tabla("10m", 366, 113),
    logo: logo("10m", 185, 135),
  },
  {
    slug: "canon",
    nombre: "Cañón",
    categoria: "shortboards",
    largo: `6'0"`,
    ancho: `18 1/2"`,
    espesor: `2 1/4"`,
    descripcion:
      "Velocidad y maniobrabilidad son sus principales cualidades. Infaltable en el quiver de nuestros riders.",
    imagen: tabla("canon", 366, 113),
    logo: logo("canon", 239, 186),
  },
  {
    slug: "disco",
    nombre: "Disco",
    categoria: "shortboards",
    largo: `5'10"`,
    ancho: `19 1/2"`,
    espesor: `2 3/8"`,
    descripcion:
      "Nariz de entrada reducida, espuma extra en la zona del pecho y triple cóncavo. La recomendamos para surfistas avanzados.",
    imagen: tabla("disco", 359, 111),
    logo: logo("disco", 189, 192),
  },
  {
    slug: "pirana",
    nombre: "Piraña",
    categoria: "shortboards",
    largo: `5'6"`,
    ancho: `18 7/8"`,
    espesor: `2 1/2"`,
    imagen: tabla("pirana", 368, 117),
    logo: logo("pirana", 267, 162),
  },
  {
    slug: "helice",
    nombre: "Hélice",
    categoria: "shortboards",
    largo: `5'2"`,
    ancho: `19 3/4"`,
    espesor: `2 3/4"`,
    descripcion:
      "Corta y rechoncha, tri-fin. El diseño de la hélice se desarrolló junto a Rob Machado en 2007.",
    imagen: tabla("helice", 337, 116),
    logo: logo("helice", 159, 190),
  },
  {
    slug: "huevo",
    nombre: "Huevo",
    categoria: "shortboards",
    largo: `5'5"`,
    ancho: `19 3/8"`,
    espesor: `2 3/16"`,
    nota: "Cola de golondrina",
    descripcion:
      "Más tracción que el típico estilo retro. Es el modelo más rápido y más divertido de esta línea.",
    imagen: tabla("huevo", 362, 115),
    logo: logo("huevo", 125, 174),
  },
  {
    slug: "k47",
    nombre: "K47",
    categoria: "shortboards",
    largo: `6'0"`,
    ancho: `18 3/8"`,
    espesor: `2 1/4"`,
    descripcion:
      "Pensada para todo tipo de olas de rendimiento: beach breaks, point breaks y fondos de arrecife.",
    imagen: tabla("k47", 360, 105),
    logo: logo("k47", 315, 136),
  },
  {
    slug: "gun",
    nombre: "Gun",
    categoria: "shortboards",
    imagen: tabla("gun", 368, 87),
    logo: logo("gun", 265, 175),
  },
  {
    slug: "pinon",
    nombre: "Piñón",
    categoria: "shortboards",
    largo: `5'9"`,
    ancho: `20 1/2"`,
    espesor: `2 3/8"`,
    descripcion:
      "Mucho volumen en la zona del pecho: acelera a voluntad y navega con presión en el bolsillo. La cola ofrece un despegue más extremo.",
    imagen: tabla("pinon", 357, 113),
    logo: logo("pinon", 289, 174),
  },
  {
    slug: "tango",
    nombre: "Tango",
    categoria: "shortboards",
    largo: `5'6"`,
    ancho: `19 7/8"`,
    espesor: `2 5/16"`,
    descripcion: "Más ancha y completa, de nariz reducida y rocker marcado.",
    imagen: tabla("tango", 323, 104),
    logo: logo("tango", 295, 185),
  },
  {
    slug: "transformers",
    nombre: "Transformers",
    categoria: "shortboards",
    largo: `5'4" a 6'6"`,
    ancho: `18 1/2" a 21"`,
    espesor: `2" a 3"`,
    descripcion:
      "Tabla chica de alto rendimiento que se usa como un skate en el agua. Se llama Transformers porque se puede surfear con 2, 3 o 4 quillas.",
    imagen: tabla("transformers", 356, 119),
    logo: logo("transformers", 298, 129),
  },
];

export const MODELO_A_MEDIDA = "a-medida";

/** Texto corto de medidas: `6'8" × 19" × 2 1/2"`, o "A consultar" si no hay datos. */
export function resumenMedidas(modelo: Modelo): string {
  const partes = [modelo.largo, modelo.ancho, modelo.espesor].filter(Boolean);
  return partes.length > 0 ? partes.join(" × ") : "A consultar";
}

export function obtenerModelosPorCategoria(categoria: CategoriaModeloId): Modelo[] {
  return MODELOS.filter((modelo) => modelo.categoria === categoria);
}

export function obtenerModeloPorSlug(slug: string | undefined): Modelo | undefined {
  return MODELOS.find((modelo) => modelo.slug === slug);
}
