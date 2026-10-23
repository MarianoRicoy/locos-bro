/**
 * Imágenes del sitio — punto único de reemplazo.
 *
 * Hoy todas apuntan a placeholders SVG en `public/images/placeholders/`.
 * Para usar las fotos reales del taller:
 *   1. Copiá la foto a `public/images/` (ej: `public/images/taller/shape-01.jpg`).
 *   2. Cambiá la ruta acá (ej: "/images/taller/shape-01.jpg").
 * Los modelos del quiver usan su propio campo `imagen` en `lib/modelos.ts`.
 */

export const PLACEHOLDER_BASE64 =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzAnIGhlaWdodD0nMzAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzMwJyBoZWlnaHQ9JzMwJyBmaWxsPScjZDRkNGQ0Jy8+PC9zdmc+";

/** Logo oficial (cuadrado, PNG 2048 px con transparencia). "negro" para fondos claros, "blanco" para fondos negros. */
export const LOGOS = {
  negro: "/images/placeholders/logo-negro.png",
  blanco: "/images/placeholders/logo-blanco.png",
} as const;

export type ImagenSitio = {
  src: string;
  alt: string;
};

export const IMAGENES = {
  /** Portada del home (foto cuadrada de Lucas y Chori en el taller). */
  hero: {
    src: "/images/fotos/lucas-y-chori.jpg",
    alt: "Lucas y Chori en el taller de Locos Bro, junto a una tabla recién shapeada",
  },
  /** Foto genérica de tabla (formato vertical 3:4). */
  tabla: {
    src: "/images/placeholders/tabla.svg",
    alt: "Tabla de surf de Locos Bro Surfboards",
  },
  /** Foto de la sección "Nuestra historia" del home. */
  historiaHome: {
    src: "/images/fotos/lucas-1.jpg",
    alt: "Lucas surfeando un tubo en una tabla de Locos Bro",
  },
  /** Fotos de archivo para /historia (formato horizontal 4:3 recomendado). */
  historia: [
    {
      src: "/images/fotos/tablas-pared.jpg",
      alt: "Tablas de Locos Bro apoyadas contra la pared del taller",
    },
    {
      src: "/images/placeholders/taller.svg",
      alt: "Foto de archivo: sesión de surf en Miramar",
    },
    {
      src: "/images/placeholders/taller.svg",
      alt: "Foto de archivo: tablas de Locos Bro apoyadas en la playa",
    },
  ],
  /** Fotos del taller / fábrica (formato horizontal 4:3 recomendado). */
  taller: [
    {
      src: "/images/fotos/chori-1.jpg",
      alt: "Chori shapeando una tabla en el taller de Locos Bro",
    },
    {
      src: "/images/placeholders/taller.svg",
      alt: "Laminado de una tabla con fibra de vidrio y resina",
    },
    {
      src: "/images/placeholders/taller.svg",
      alt: "Tablas terminadas listas para retirar en la fábrica de Miramar",
    },
  ],
} as const satisfies Record<string, ImagenSitio | readonly ImagenSitio[]>;
