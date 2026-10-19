/**
 * Configuración centralizada de la información pública de Locos Bro Surfboards.
 *
 * IMPORTANTE: los datos de contacto son GENÉRICOS (de ejemplo).
 * Reemplazarlos por los reales antes de publicar el sitio.
 */

export const siteConfig = {
  name: "Locos Bro Surfboards",
  shortName: "Locos Bro",
  tagline: "Fábrica de tablas de surf · Miramar, Argentina",
  description:
    "Locos Bro Surfboards: histórica fábrica de tablas de surf de Miramar, Argentina. Shortboards, funboards y longboards hechas a mano, y tablas a medida.",

  // URL base pública: toma la variable de entorno o usa un fallback seguro para desarrollo local
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",

  contact: {
    email: "hola@locosbro.com.ar",

    whatsapp: {
      display: "+54 9 2291 00-0000",
      // Formato wa.me: solo dígitos, con código de país (54) y sin el 0 ni el 15.
      number: "5492291000000",
      url: "https://wa.me/5492291000000",
    },

    location: {
      address: "Calle 00 N° 000, Miramar, Provincia de Buenos Aires",
      city: "Miramar, Buenos Aires, Argentina",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Miramar%2C+Buenos+Aires%2C+Argentina",
    },

    horarios: ["Lunes a viernes · 9 a 13 h y 15 a 19 h", "Sábados · con cita previa"],
  },

  social: {
    instagram: {
      handle: "@locosbro.surf",
      url: "https://instagram.com/locosbro.surf",
    },
    facebook: {
      handle: "Locos Bro Surfboards",
      url: "https://facebook.com/locosbro.surf",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Arma un link de WhatsApp con un mensaje precargado. */
export function whatsappLink(mensaje: string): string {
  return `${siteConfig.contact.whatsapp.url}?text=${encodeURIComponent(mensaje)}`;
}
