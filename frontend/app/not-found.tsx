import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mx-auto max-w-lg space-y-6">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-resina">Error 404</p>

        <h1 className="text-4xl text-foreground md:text-6xl">Página no encontrada</h1>

        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          La página que buscás no existe o fue movida. Volvé al inicio o mirá el quiver completo.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link className={buttonVariants({ variant: "default", size: "lg" })} href="/">
            Volver al inicio
          </Link>
          <Link className={buttonVariants({ variant: "outline", size: "lg" })} href="/modelos">
            Ver quiver
          </Link>
        </div>
      </div>
    </main>
  );
}
