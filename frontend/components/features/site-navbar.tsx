"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/features/logo";
import { ENLACES_PRINCIPALES, esRutaActiva } from "@/lib/navigation";

export function SiteNavbar() {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [conSombra, setConSombra] = useState(false);

  useEffect(() => {
    function alScrollear() {
      setConSombra(window.scrollY > 8);
    }

    alScrollear();
    window.addEventListener("scroll", alScrollear, { passive: true });
    return () => window.removeEventListener("scroll", alScrollear);
  }, []);

  // Cierra el menú móvil con Escape
  useEffect(() => {
    if (!menuAbierto) {
      return;
    }

    function alPresionarTecla(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        setMenuAbierto(false);
      }
    }

    window.addEventListener("keydown", alPresionarTecla);
    return () => window.removeEventListener("keydown", alPresionarTecla);
  }, [menuAbierto]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-background/90 backdrop-blur-md transition-shadow ${
        conSombra ? "border-border shadow-sm" : "border-transparent"
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-3 md:px-8"
      >
        <Link aria-label="Locos Bro Surfboards, ir al inicio" className="shrink-0 text-primary" href="/">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {ENLACES_PRINCIPALES.map((enlace) => {
            const activo = esRutaActiva(pathname, enlace.href);

            return (
              <li key={enlace.href}>
                <Link
                  aria-current={activo ? "page" : undefined}
                  className={`rounded-md px-3 py-2 text-sm font-bold transition-colors lg:px-4 ${
                    activo
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/75 hover:bg-muted hover:text-foreground"
                  }`}
                  href={enlace.href}
                >
                  {enlace.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          aria-controls="menu-movil"
          aria-expanded={menuAbierto}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted md:hidden"
          onClick={() => setMenuAbierto((anterior) => !anterior)}
          type="button"
        >
          {menuAbierto ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {menuAbierto ? (
        <div className="border-t border-border bg-background md:hidden" id="menu-movil">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {ENLACES_PRINCIPALES.map((enlace) => {
              const activo = esRutaActiva(pathname, enlace.href);

              return (
                <li key={enlace.href}>
                  <Link
                    aria-current={activo ? "page" : undefined}
                    className={`block rounded-md px-3 py-3 text-lg font-bold transition-colors ${
                      activo ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                    }`}
                    href={enlace.href}
                    onClick={() => setMenuAbierto(false)}
                  >
                    {enlace.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
