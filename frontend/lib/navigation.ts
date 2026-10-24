export interface EnlaceNavegacion {
  label: string;
  href: string;
}

/** Secciones principales del sitio (pie de página). */
export const ENLACES_PRINCIPALES: EnlaceNavegacion[] = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Quiver", href: "/modelos" },
  { label: "La Fábrica", href: "/fabrica" },
  { label: "Contacto", href: "/contacto" },
];

/** Barra superior. Las redes no van acá. */
export const ENLACES_BARRA: EnlaceNavegacion[] = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Quiver", href: "/modelos" },
  { label: "La Fábrica", href: "/fabrica" },
  { label: "Contacto", href: "/contacto" },
];

export function esRutaActiva(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
