import Link from "next/link";

import { ModeloCard } from "@/components/features/modelo-card";
import { SectionHeading } from "@/components/features/section-heading";
import { buttonVariants } from "@/components/ui/button-variants";
import { obtenerModelosDestacados } from "@/lib/modelos";

export function QuiverDestacado() {
  const modelos = obtenerModelosDestacados();

  return (
    <section aria-labelledby="quiver-titulo" className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          description="Tres formas de entender el surf, todas shapeadas y laminadas a mano en nuestro taller."
          eyebrow="Quiver"
          id="quiver-titulo"
          title="Modelos para cada ola"
        />
        <Link className={`${buttonVariants({ variant: "outline" })} self-start md:self-auto`} href="/modelos">
          Ver todo el quiver
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modelos.map((modelo) => (
          <ModeloCard key={modelo.slug} modelo={modelo} />
        ))}
      </div>
    </section>
  );
}
