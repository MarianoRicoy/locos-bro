/**
 * Capítulos de la página /historia.
 *
 * ⚠️ Texto BASE, sin fechas ni datos duros. Reemplazalo por la historia real:
 * fundadores, año de fundación, hitos, anécdotas. Agregá o quitá objetos libremente.
 */
export interface CapituloHistoria {
  titulo: string;
  texto: string;
}

export const CAPITULOS_HISTORIA: CapituloHistoria[] = [
  {
    titulo: "El origen",
    texto:
      "Antes de que hubiera marca hubo un taller, un blank y unos hermanos que querían mejores tablas para el mar de acá. Nadie les regaló nada: lo aprendieron lijando, equivocándose y volviendo a empezar.",
  },
  {
    titulo: "El taller",
    texto:
      "El mismo galpón, el mismo olor a resina. Acá no hay línea de producción: hay manos, plantillas gastadas y tablas que salen una por una, como siempre.",
  },
  {
    titulo: "Los hermanos",
    texto:
      "Locos Bro no es un nombre inventado por una agencia. Es una banda, una forma de ir al agua juntos y de bancarse entre todos, con calle, con respeto y con orgullo de lugar.",
  },
  {
    titulo: "El localismo",
    texto:
      "Conocemos cada banco de arena y cada viento de Miramar. Las tablas se piensan para surfear estas olas, no para una vidriera.",
  },
  {
    titulo: "Hoy",
    texto:
      "Años en el agua después, seguimos en el taller. Pioneros por haber empezado primero, y por no haber soltado nunca.",
  },
];
