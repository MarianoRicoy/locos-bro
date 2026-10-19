import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

export async function obtenerMetadataHome(): Promise<Metadata> {
  const descripcion =
    "Tablas de surf hechas a mano en Miramar. Shortboards, funboards y longboards de la fábrica Locos Bro, y pedidos a medida para tu estilo y tus olas.";

  return {
    title: `${siteConfig.name} | Fábrica de tablas de surf en Miramar`,
    description: descripcion,
    applicationName: siteConfig.name,
    keywords: [
      "tablas de surf",
      "fábrica de tablas de surf",
      "shaper Miramar",
      "surfboards Argentina",
      "tablas a medida",
      "shortboard",
      "funboard",
      "longboard",
      "Locos Bro",
    ],
    openGraph: {
      title: siteConfig.name,
      description: descripcion,
      locale: "es_AR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: descripcion,
    },
  };
}
