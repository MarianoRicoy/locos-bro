export type CategoriaModeloId = "shortboards" | "funboards" | "longboards";

export interface CategoriaModelo {
  id: CategoriaModeloId;
  nombre: string;
  descripcion: string;
}

/** Imagen dentro de `public/` con sus dimensiones reales (evita saltos de layout). */
export interface ImagenModelo {
  src: string;
  ancho: number;
  alto: number;
}

export interface Modelo {
  /** Identificador único, usado en la URL de consulta (/contacto?modelo=slug). */
  slug: string;
  nombre: string;
  categoria: CategoriaModeloId;
  /** Medidas en pies y pulgadas. Ej: `6'8"`, `19"`, `2 1/2"`. Si faltan, se muestra "a consultar". */
  largo?: string;
  ancho?: string;
  espesor?: string;
  /** Texto libre extra (ej: cola de golondrina). */
  nota?: string;
  /** Descripción corta (1–2 líneas). Opcional. */
  descripcion?: string;
  /** Tabla vista desde arriba (horizontal, fondo negro). */
  imagen: ImagenModelo;
  /** Logo del modelo en blanco con fondo transparente. */
  logo?: ImagenModelo;
}
