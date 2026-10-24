import Image from "next/image";
import Link from "next/link";

import { RevelaScroll } from "@/components/features/revela-scroll";
import { Section } from "@/components/features/section";
import { buttonVariants } from "@/components/ui/button-variants";
import { IMAGENES, PLACEHOLDER_BASE64 } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * Bloque "Nuestra historia" del home: foto a la izquierda, texto a la derecha.
 * Mismas proporciones que "Our Story" de PandaTech. La fila mide como máximo
 * 1400 px y queda centrada. Adentro, la foto es el 50 %, hay un 6 % de
 * separación y el texto ocupa el resto. El alto sale de su foto (1028×1364).
 *
 * Misma jerarquía que "Our Story" de PandaTech: etiqueta chica ("— Nuestra
 * historia"), título grande y párrafo. El texto es un adelanto corto de la
 * historia completa, que está entera en /nosotros.
 *
 * El "aire" entre etiqueta, título y párrafo es igual que en Panda: no hay
 * margen entre ellos, el espacio sale del interlineado suelto de cada uno
 * (sobre todo el título, 1.4). Solo antes del botón hay un margen real (~18px
 * en Panda).
 */
export function HistoriaTeaser() {
  return (
    <Section
      aria-labelledby="historia-titulo"
      innerClassName="mx-auto flex w-full max-w-[1400px] flex-col px-0 py-0 md:flex-row md:items-center md:px-0 md:py-0"
      tone="oscuro"
    >
      <RevelaScroll className="relative aspect-[1028/1364] w-full shrink-0 overflow-hidden bg-neutral-900 md:w-1/2">
        <Image
          alt={IMAGENES.historiaHome.alt}
          blurDataURL={PLACEHOLDER_BASE64}
          className="object-cover object-center"
          fill
          placeholder="blur"
          sizes="(max-width: 767px) 100vw, 50vw"
          src={IMAGENES.historiaHome.src}
        />
      </RevelaScroll>

      <div className="w-full px-5 py-10 md:ml-[6%] md:w-[44%] md:px-0 md:py-0">
        <RevelaScroll>
          <p className="text-xl font-normal text-white">— Nuestra historia</p>
        </RevelaScroll>
        <RevelaScroll retraso={100}>
          <h2 className="text-4xl leading-[1.4] md:text-5xl md:leading-[1.4]" id="historia-titulo">
            De la playa al taller
          </h2>
        </RevelaScroll>
        <RevelaScroll retraso={200}>
          <p className="text-base leading-[1.8] text-white/75">
            Locos Bro no nació de un plan de negocios, nació en el agua y en un galpón hace más
            de 22 años. Al principio, éramos simplemente un grupo de amigos surfistas de la playa
            que nos juntábamos a reparar nuestras propias tablas para poder seguir yendo al mar.
          </p>
        </RevelaScroll>
        <RevelaScroll className="mt-5" retraso={300}>
          {/* Más grande, sin redondeo y sin negrita que el resto de los botones del
              sitio: a pedido, calcado del botón de "Our Story" de PandaTech. */}
          <Link
            className={cn(buttonVariants({ variant: "blanco" }), "h-auto rounded-none px-8 py-5 font-normal")}
            href="/nosotros"
          >
            Leer la historia
          </Link>
        </RevelaScroll>
      </div>
    </Section>
  );
}
