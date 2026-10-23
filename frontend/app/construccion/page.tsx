import type { Metadata } from "next";

import { Logo } from "@/components/features/logo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sitio en construcción",
  description: `${siteConfig.name}: estamos preparando el sitio.`,
  robots: { index: false, follow: false },
};

export default function ConstruccionPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-black px-6 text-center text-white">
      <Logo alt="Locos Bro Surfboards" className="h-48 w-auto md:h-64" preload variante="blanco" />
      <p className="max-w-md text-lg text-white/75">
        Estamos shapeando el sitio nuevo. Muy pronto vamos a estar de vuelta.
      </p>
      <a
        className="text-sm font-medium tracking-wide text-neutral-300 hover:text-white hover:underline"
        href={siteConfig.social.instagram.url}
        rel="noopener noreferrer"
        target="_blank"
      >
        Seguinos en Instagram {siteConfig.social.instagram.handle}
      </a>
    </main>
  );
}
