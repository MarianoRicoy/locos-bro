import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { IMAGENES, PLACEHOLDER_BASE64 } from "@/lib/media";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-titulo" className="bg-secondary/60">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:gap-14 md:px-8 md:py-20">
        <div className="space-y-7">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Fábrica de tablas de surf · Miramar, Argentina
          </p>

          <h1 className="text-5xl leading-[0.95] text-foreground sm:text-6xl lg:text-7xl" id="hero-titulo">
            Tablas hechas a mano para el mar de casa.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            En Locos Bro shapeamos, laminamos y terminamos cada tabla en nuestro taller de Miramar.
            Del blank en bruto a tu próxima sesión, con el oficio de siempre.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link className={buttonVariants({ variant: "default", size: "lg" })} href="/modelos">
              Ver quiver
            </Link>
            <Link className={buttonVariants({ variant: "outline", size: "lg" })} href="/contacto#formulario">
              Pedí tu tabla a medida
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-secondary ring-1 ring-border">
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
      </div>
    </section>
  );
}
