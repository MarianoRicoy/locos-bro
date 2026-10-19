import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/features/section-heading";
import { buttonVariants } from "@/components/ui/button-variants";
import { IMAGENES, PLACEHOLDER_BASE64 } from "@/lib/media";

const PILARES = [
  { titulo: "Hecha a mano", texto: "Shape, laminado, lijado y pulido, uno por uno." },
  { titulo: "A tu medida", texto: "Diseñamos según tu peso, altura, nivel y tus olas." },
  { titulo: "Taller local", texto: "Hecho en Miramar, por gente que surfea acá." },
];

export function FabricaTeaser() {
  return (
    <section aria-labelledby="fabrica-titulo" className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-secondary ring-1 ring-border">
        <Image
          alt={IMAGENES.taller[0].alt}
          blurDataURL={PLACEHOLDER_BASE64}
          className="object-cover"
          fill
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 50vw"
          src={IMAGENES.taller[0].src}
        />
      </div>

      <div className="space-y-8">
        <SectionHeading
          description="Somos una fábrica local de Miramar. Acá la tabla no sale de un molde: sale de un bloque, de unas manos y de muchas horas de taller."
          eyebrow="Fábrica (Miramar)"
          id="fabrica-titulo"
          title="El taller donde nace cada tabla"
        />

        <ul className="grid gap-5 xl:grid-cols-3">
          {PILARES.map((pilar) => (
            <li className="space-y-1.5 border-l-2 border-resina pl-4" key={pilar.titulo}>
              <p className="font-black text-foreground">{pilar.titulo}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{pilar.texto}</p>
            </li>
          ))}
        </ul>

        <Link className={buttonVariants({ variant: "outline" })} href="/fabrica">
          Conocé la fábrica
        </Link>
      </div>
    </section>
  );
}
