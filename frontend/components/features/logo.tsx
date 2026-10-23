import Image from "next/image";

import { LOGOS } from "@/lib/media";
import { siteConfig } from "@/lib/site-config";

type LogoProps = {
  /** "negro" sobre fondos claros, "blanco" sobre fondos oscuros. */
  variante?: "negro" | "blanco";
  /** Controla el tamaño. El logo es cuadrado: fijá solo la altura y dejá `w-auto`. */
  className?: string;
  alt?: string;
  /** Precarga la imagen (usar solo en el logo del navbar, visible sin scroll). */
  preload?: boolean;
};

/**
 * Logo oficial de Locos Bro.
 * El PNG original es de 3072 px: se declara 256 px para que Next genere versiones livianas (1x / 2x).
 */
export function Logo({
  variante = "negro",
  className = "h-14 w-auto",
  alt = siteConfig.name,
  preload = false,
}: LogoProps) {
  return (
    <Image
      alt={alt}
      className={className}
      height={256}
      preload={preload}
      src={LOGOS[variante]}
      width={256}
    />
  );
}
