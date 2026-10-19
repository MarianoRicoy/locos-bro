"use client";

import { usePathname } from "next/navigation";

import { SiteFooter } from "@/components/features/site-footer";
import { SiteNavbar } from "@/components/features/site-navbar";
import { TextMarquee } from "@/components/features/text-marquee";

const RUTAS_SIN_CHROME = ["/construccion"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ocultarChrome = RUTAS_SIN_CHROME.includes(pathname);
  const esHome = pathname === "/";

  if (ocultarChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteNavbar />
      {children}
      {esHome ? <TextMarquee /> : null}
      <SiteFooter />
    </>
  );
}
