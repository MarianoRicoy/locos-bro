export interface EnlaceNavegacion {
  label: string;
  href: string;
}

/** Secciones principales del sitio (navbar + footer). */
export const ENLACES_PRINCIPALES: EnlaceNavegacion[] = [
  { label: "Inicio", href: "/" },
  { label: "Modelos / Quiver", href: "/modelos" },
  { label: "Fábrica (Miramar)", href: "/fabrica" },
  { label: "Custom Orders / Contacto", href: "/contacto" },
];

export function esRutaActiva(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
