import Link from "next/link";

import { Etiqueta } from "@/components/features/etiqueta";
import { Section } from "@/components/features/section";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export function CustomOrderCta() {
  return (
    <Section
      aria-labelledby="custom-titulo"
      innerClassName="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]"
      tone="claro"
    >
      <div className="space-y-4">
        <Etiqueta>Custom orders</Etiqueta>
        <h2 className="text-4xl leading-[1.08] md:text-6xl" id="custom-titulo">
          ¿Tenés una tabla en la cabeza? La shapeamos.
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Contanos cómo surfeás, qué olas buscás y qué medidas imaginás. Armamos tu tabla a medida, con
          el modelo, la resina y la terminación que quieras.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:items-end">
        <Link
          className={`${buttonVariants({ variant: "default", size: "lg" })} w-full md:w-auto`}
          href="/contacto#formulario"
        >
          Empezar mi pedido
        </Link>
        <a
          className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full md:w-auto`}
          href={whatsappLink(`Hola ${siteConfig.shortName}! Quiero consultar por una tabla a medida.`)}
          rel="noopener noreferrer"
          target="_blank"
        >
          Escribir por WhatsApp
        </a>
      </div>
    </Section>
  );
}
