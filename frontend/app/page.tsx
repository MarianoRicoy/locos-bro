import type { Metadata } from "next";

import { CustomOrderCta } from "@/components/features/custom-order-cta";
import { FabricaTeaser } from "@/components/features/fabrica-teaser";
import { HeroSection } from "@/components/features/hero-section";
import { QuiverDestacado } from "@/components/features/quiver-destacado";
import { obtenerMetadataHome } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return obtenerMetadataHome();
}

export default function Home() {
  return (
    <>
      <HeroSection />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-20 px-4 py-16 md:gap-28 md:px-8 md:py-24">
        <QuiverDestacado />
        <FabricaTeaser />
        <CustomOrderCta />
      </main>
    </>
  );
}
