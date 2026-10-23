import type { Metadata } from "next";

import { CustomOrderCta } from "@/components/features/custom-order-cta";
import { FabricaTeaser } from "@/components/features/fabrica-teaser";
import { HistoriaTeaser } from "@/components/features/historia-teaser";
import { LogoPortada } from "@/components/features/logo-portada";
import { QuiverDestacado } from "@/components/features/quiver-destacado";
import { obtenerMetadataHome } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return obtenerMetadataHome();
}

export default function Home() {
  return (
    <main className="flex-1">
      {/* HeroSection (Lucas y Chori) quedó afuera. Si no vuelve, borrar components/features/hero-section.tsx. */}
      <LogoPortada />
      <QuiverDestacado />
      <HistoriaTeaser />
      <FabricaTeaser />
      <CustomOrderCta />
    </main>
  );
}
