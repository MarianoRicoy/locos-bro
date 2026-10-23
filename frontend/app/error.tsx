"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Etiqueta } from "@/components/features/etiqueta";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";

export default function Error({
  error,
  reset,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  unstable_retry?: () => void;
}) {
  useEffect(() => {
    console.error("Locos Bro App Error:", error);
  }, [error]);

  const handleRetry = () => {
    if (typeof unstable_retry === "function") {
      unstable_retry();
    } else {
      reset();
    }
  };

  return (
    <main className="relative flex min-h-[70vh] flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mx-auto max-w-lg space-y-6">
        <Etiqueta>Aviso</Etiqueta>

        <h1 className="text-5xl md:text-7xl">Algo salió mal</h1>

        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          Ocurrió un inconveniente inesperado. Podés intentar recargar la sección o volver al inicio.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button onClick={handleRetry} size="lg" type="button">
            Reintentar
          </Button>
          <Link className={buttonVariants({ variant: "outline", size: "lg" })} href="/">
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
