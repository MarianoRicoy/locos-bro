import { CarruselClientes } from "@/components/features/carrusel-clientes";
import { Section } from "@/components/features/section";
import { SectionHeading } from "@/components/features/section-heading";

/**
 * "Nuestros clientes" en el home: marquee de fotos de la banda con sus tablas.
 * Por ahora muestra casilleros "Próximamente" hasta que haya fotos reales.
 */
export function ClientesTeaser() {
  return (
    <Section aria-labelledby="clientes-titulo" innerClassName="space-y-10" tone="oscuro">
      <SectionHeading
        description="Parte de la banda que ya tiene una Locos Bro abajo del brazo."
        eyebrow="Nuestros clientes"
        id="clientes-titulo"
        title="Los que ya las tienen en el agua"
      />
      <CarruselClientes />
    </Section>
  );
}
