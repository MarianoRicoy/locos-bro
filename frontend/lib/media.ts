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
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzAnIGhlaWdodD0nMzAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzMwJyBoZWlnaHQ9JzMwJyBmaWxsPScjZTdlMmQ2Jy8+PC9zdmc+";

export type ImagenSitio = {
  src: string;
  alt: string;
};

export const IMAGENES = {
  /** Portada del home (formato vertical 4:5 recomendado). */
  hero: {
    src: "/images/placeholders/hero.svg",
    alt: "Tabla de surf recién laminada en el taller de Locos Bro, Miramar",
  },
  /** Foto genérica de tabla (formato vertical 3:4). */
  tabla: {
    src: "/images/placeholders/tabla.svg",
    alt: "Tabla de surf de Locos Bro Surfboards",
  },
  /** Fotos del taller / fábrica (formato horizontal 4:3 recomendado). */
  taller: [
    {
      src: "/images/placeholders/taller.svg",
      alt: "Shaper trabajando un blank en el taller de Locos Bro",
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
