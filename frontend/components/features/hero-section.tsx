import Image from "next/image";
import Link from "next/link";

import { Etiqueta } from "@/components/features/etiqueta";
import { Section } from "@/components/features/section";
import { buttonVariants } from "@/components/ui/button-variants";
import { IMAGENES, PLACEHOLDER_BASE64 } from "@/lib/media";

/** Fuera del home por ahora. Si no vuelve a usarse, borrar este archivo. */
export function HeroSection() {
  return (
    <Section
      aria-labelledby="hero-titulo"
      innerClassName="grid items-center gap-10 py-12 md:grid-cols-2 md:gap-14 md:py-20"
      tone="oscuro"
    >
      <div className="space-y-7">
        <Etiqueta>Miramar · Argentina · Fábrica de tablas</Etiqueta>

        <h1 className="text-5xl leading-[1.05] sm:text-6xl lg:text-7xl" id="hero-titulo">
          Hechas a mano. <span className="text-neutral-400">Surfeadas por locales.</span>
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-white/75">
          Locos Bro es una fábrica de hermanos en Miramar. Shape, resina y años en el agua
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
          <Link className={buttonVariants({ variant: "blanco", size: "lg" })} href="/modelos">
            Ver quiver
          </Link>
          <Link className={buttonVariants({ variant: "invertido", size: "lg" })} href="/contacto#formulario">
            Pedí tu tabla a medida
          </Link>
        </div>
      </div>

      <div className="relative aspect-square w-full overflow-hidden rounded-sm border-2 border-white bg-neutral-900">
        <Image
          alt={IMAGENES.hero.alt}
          blurDataURL={PLACEHOLDER_BASE64}
          className="object-cover"
          fill
          placeholder="blur"
          preload
          sizes="(max-width: 768px) 100vw, 50vw"
          src={IMAGENES.hero.src}
        />
      </div>
    </Section>
  );
}
