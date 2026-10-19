export type CategoriaModeloId = "shortboards" | "funboards" | "longboards";

export interface CategoriaModelo {
  id: CategoriaModeloId;
  nombre: string;
  descripcion: string;
}

export interface Modelo {
  /** Identificador único, usado en la URL de consulta (/contacto?modelo=slug). */
  slug: string;
  nombre: string;
  categoria: CategoriaModeloId;
  /** Rango de medidas en pies y pulgadas. Ej: `5'8" – 6'2"`. */
  medidas: string;
  /** Descripción corta (1–2 líneas). */
  descripcion: string;
  /** Ruta de la foto dentro de `public/`. */
  imagen: string;
  destacado?: boolean;
}
