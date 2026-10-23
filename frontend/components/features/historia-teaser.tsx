import Image from "next/image";
import Link from "next/link";

import { Etiqueta } from "@/components/features/etiqueta";
import { Section } from "@/components/features/section";
import { buttonVariants } from "@/components/ui/button-variants";
import { IMAGENES, PLACEHOLDER_BASE64 } from "@/lib/media";

/**
 * Bloque "Nuestra historia" del home: foto a la izquierda, texto a la derecha.
 * Mismas proporciones que "Our Story" de PandaTech. La fila mide como máximo
 * 1400 px y queda centrada. Adentro, la foto es el 50 %, hay un 6 % de
 * separación y el texto ocupa el resto. El alto sale de su foto (1028×1364).
 */
export function HistoriaTeaser() {
  return (
    <Section
      aria-labelledby="historia-titulo"
      innerClassName="mx-auto flex w-full max-w-[1400px] flex-col px-0 py-0 md:flex-row md:items-center md:px-0 md:py-0"
      tone="oscuro"
    >
      <div className="relative aspect-[1028/1364] w-full shrink-0 overflow-hidden bg-neutral-900 md:w-1/2">
        <Image
          alt={IMAGENES.historiaHome.alt}
          blurDataURL={PLACEHOLDER_BASE64}
          className="object-cover object-center"
          fill
          placeholder="blur"
          sizes="(max-width: 767px) 100vw, 50vw"
          src={IMAGENES.historiaHome.src}
        />
      </div>

      <div className="w-full space-y-6 px-5 py-10 md:ml-[6%] md:w-[44%] md:px-0 md:py-0">
        <Etiqueta>Nuestra historia</Etiqueta>
        <h2 className="text-4xl leading-[1.08] md:text-5xl" id="historia-titulo">
          El mismo taller de siempre
        </h2>
        <p className="text-base leading-relaxed text-white/75">
          Locos Bro nació en Miramar, entre hermanos, blanks y el olor a resina. Años después
          seguimos en el mismo taller: tablas hechas a mano, una por una, para estas olas.
        </p>
        <Link className={buttonVariants({ variant: "blanco" })} href="/historia">
          Leer la historia
        </Link>
      </div>
    </Section>
  );
}
