import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const RUTAS: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/nosotros", changeFrequency: "monthly", priority: 0.8 },
  { path: "/historia", changeFrequency: "monthly", priority: 0.8 },
  { path: "/modelos", changeFrequency: "weekly", priority: 0.9 },
  { path: "/fabrica", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contacto", changeFrequency: "monthly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.baseUrl.replace(/\/+$/, "");

  return RUTAS.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
