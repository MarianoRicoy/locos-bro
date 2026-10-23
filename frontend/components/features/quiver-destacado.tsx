import { CarruselModelos } from "@/components/features/carrusel-modelos";
import { ModeloModalProvider } from "@/components/features/modelo-modal";
import { MODELOS } from "@/lib/modelos";

/**
 * Quiver del home, justo debajo del logo: la fila de tablas,
 * en negro, de borde a borde. Cada cuadrado abre la ficha del modelo.
 */
export function QuiverDestacado() {
  return (
    <ModeloModalProvider>
      <section aria-label="El quiver" className="bg-black pb-16 pt-14 text-white md:pb-24 md:pt-20">
        <CarruselModelos modelos={MODELOS} />
      </section>
    </ModeloModalProvider>
  );
}
