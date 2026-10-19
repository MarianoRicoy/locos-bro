import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export function CustomOrderCta() {
  return (
    <section
      aria-labelledby="custom-titulo"
      className="overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground md:px-14 md:py-16"
    >
      <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Custom orders</p>
          <h2 className="text-3xl leading-[1.05] md:text-5xl" id="custom-titulo">
            ¿Tenés una tabla en la cabeza? La shapeamos.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            Contanos cómo surfeás, qué olas buscás y qué medidas imaginás. Armamos tu tabla a medida,
            con el modelo, la resina y la terminación que quieras.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <Link
            className={`${buttonVariants({ variant: "accent", size: "lg" })} w-full md:w-auto`}
            href="/contacto#formulario"
          >
            Empezar mi pedido
          </Link>
          <a
            className={`${buttonVariants({
              variant: "outline",
              size: "lg",
            })} w-full border-primary-foreground/40 text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground/10 md:w-auto`}
            href={whatsappLink(`Hola ${siteConfig.shortName}! Quiero consultar por una tabla a medida.`)}
            rel="noopener noreferrer"
            target="_blank"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
