"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

import { Logo } from "@/components/features/logo";
import { MODELOS } from "@/lib/modelos";
import { ENLACES_BARRA, esRutaActiva } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function fondoEsClaro(origen: Element | null) {
  let nodo: Element | null = origen;

  while (nodo && nodo !== document.documentElement) {
    const fondo = getComputedStyle(nodo).backgroundColor;
    const canales = fondo.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);

    if (canales && (canales[4] === undefined || Number(canales[4]) > 0.5)) {
      const luminancia = (0.299 * Number(canales[1]) + 0.587 * Number(canales[2]) + 0.114 * Number(canales[3])) / 255;
      return luminancia > 0.6;
    }

    nodo = nodo.parentElement;
  }

  return true;
}

const claseEnlace = "group relative inline-block px-1 py-2";

const claseTexto = "relative z-10 text-sm font-medium uppercase tracking-[0.25em]";

const claseLinea =
  "pointer-events-none absolute -top-1.5 left-0 z-20 h-px w-full";

const claseDesliz =
  "pointer-events-none absolute -top-1.5 left-0 z-20 h-px w-full transition-transform duration-500 ease-out";

export function SiteNavbar() {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [sobreClaro, setSobreClaro] = useState(false);
  const [sobre, setSobre] = useState<string | null>(null);

  useLayoutEffect(() => {
    let frame = 0;

    function medir() {
      const header = document.querySelector("header");
      if (!header) return;

      header.style.pointerEvents = "none";
      const muestra = document.elementFromPoint(window.innerWidth / 2, 8);
      header.style.pointerEvents = "";

      const claro = fondoEsClaro(muestra);
      setSobreClaro((anterior) => (anterior === claro ? anterior : claro));
    }

    function alMover() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(medir);
    }

    medir();
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover);
    const observer = new MutationObserver(alMover);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
    };
  }, [pathname]);

  useEffect(() => {
    setMenuAbierto(false);
    setSobre(null);
  }, [pathname]);

  useEffect(() => {
    if (!menuAbierto) return;

    function alPresionarTecla(evento: KeyboardEvent) {
      if (evento.key === "Escape") setMenuAbierto(false);
    }

    window.addEventListener("keydown", alPresionarTecla);
    return () => window.removeEventListener("keydown", alPresionarTecla);
  }, [menuAbierto]);

  function lineas(href: string, activo: boolean, clara: boolean) {
    const color = clara ? "bg-black" : "bg-white";
    const desliza = sobre === href;

    return (
      <>
        {activo ? <span className={cn(claseLinea, color)} /> : null}
        <span
          className={cn(
            claseDesliz,
            color,
            desliza ? "origin-left scale-x-100" : "origin-right scale-x-0",
          )}
        />
      </>
    );
  }

  const colorTexto = sobreClaro ? "text-black" : "text-white";

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 h-24 bg-transparent", sobreClaro ? "text-black" : "text-white")}>
        <nav
          aria-label="Navegación principal"
          className="flex h-full items-center justify-between px-5 md:px-12"
        >
          <Link className="shrink-0" href="/">
            <Logo
              alt="Locos Bro Surfboards, ir al inicio"
              className="h-9 w-auto md:h-10"
              preload
              variante={sobreClaro ? "negro" : "blanco"}
            />
          </Link>

          <ul
            className="hidden items-center gap-8 md:flex lg:gap-10"
            onBlur={(evento) => {
              const destino = evento.relatedTarget;
              if (!(destino instanceof Node) || !evento.currentTarget.contains(destino)) setSobre(null);
            }}
            onMouseLeave={() => setSobre(null)}
          >
            {ENLACES_BARRA.map((enlace) => {
              const activo = esRutaActiva(pathname, enlace.href);
              const esQuiver = enlace.href === "/modelos";
              const marca = lineas(enlace.href, activo, sobreClaro);

              if (!esQuiver) {
                return (
                  <li
                    key={enlace.href}
                    onFocus={() => setSobre(enlace.href)}
                    onMouseEnter={() => setSobre(enlace.href)}
                  >
                    <Link aria-current={activo ? "page" : undefined} className={claseEnlace} href={enlace.href}>
                      <span className={cn(claseTexto, colorTexto)}>
                        {enlace.label}
                        {marca}
                      </span>
                    </Link>
                  </li>
                );
              }

              return (
                <li
                  className="group/menu relative"
                  key={enlace.href}
                  onFocus={() => setSobre(enlace.href)}
                  onMouseEnter={() => setSobre(enlace.href)}
                >
                  <Link
                    aria-current={activo ? "page" : undefined}
                    aria-haspopup="true"
                    className="group relative inline-flex items-center gap-1.5 px-1 py-2"
                    href={enlace.href}
                  >
                    <span className={cn(claseTexto, colorTexto)}>
                      {enlace.label}
                      {marca}
                    </span>
                    <ChevronDown
                      aria-hidden
                      className="size-3 opacity-80 transition-transform duration-300 group-hover/menu:rotate-180 group-focus-within/menu:rotate-180"
                    />
                  </Link>
                  <div className="invisible pointer-events-none absolute left-0 top-full z-50 translate-y-2 pt-4 opacity-0 transition-all duration-300 group-hover/menu:visible group-hover/menu:pointer-events-auto group-hover/menu:translate-y-0 group-hover/menu:opacity-100 group-focus-within/menu:visible group-focus-within/menu:pointer-events-auto group-focus-within/menu:translate-y-0 group-focus-within/menu:opacity-100">
                    <ul className="flex max-h-[calc(100svh-8rem)] flex-col gap-2.5 overflow-y-auto bg-black p-4">
                      {MODELOS.map((modelo) => (
                        <li key={modelo.slug}>
                          <Link
                            className="text-[15px] font-normal leading-[28.8px] text-white transition-colors duration-300 hover:text-[#a7a7a7]"
                            href={`/modelos#${modelo.slug}`}
                          >
                            {modelo.nombre}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            aria-controls="menu-movil"
            aria-expanded={menuAbierto}
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            className={cn(
              "inline-flex size-10 items-center justify-center md:hidden",
              sobreClaro ? "text-black" : "text-white",
            )}
            onClick={() => setMenuAbierto((abierto) => !abierto)}
            type="button"
          >
            {menuAbierto ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </nav>
      </header>

      {menuAbierto ? (
        <div
          className="fixed inset-x-0 top-24 z-40 max-h-[calc(100svh-6rem)] overflow-y-auto border-t border-white/15 bg-black md:hidden"
          id="menu-movil"
        >
          <ul
            className="flex flex-col px-5 py-4"
            onBlur={(evento) => {
              const destino = evento.relatedTarget;
              if (!(destino instanceof Node) || !evento.currentTarget.contains(destino)) setSobre(null);
            }}
            onMouseLeave={() => setSobre(null)}
          >
            {ENLACES_BARRA.map((enlace) => {
              const activo = esRutaActiva(pathname, enlace.href);
              const esQuiver = enlace.href === "/modelos";

              return (
                <li
                  key={enlace.href}
                  onFocus={() => setSobre(enlace.href)}
                  onMouseEnter={() => setSobre(enlace.href)}
                >
                  <Link aria-current={activo ? "page" : undefined} className={claseEnlace} href={enlace.href}>
                    <span className={cn(claseTexto, "text-white")}>
                      {enlace.label}
                      {lineas(enlace.href, activo, false)}
                    </span>
                  </Link>
                  {esQuiver ? (
                    <ul className="flex flex-col gap-2.5 pb-3 pl-1">
                      {MODELOS.map((modelo) => (
                        <li key={modelo.slug}>
                          <Link
                            className="text-[15px] font-normal leading-[28.8px] text-white"
                            href={`/modelos#${modelo.slug}`}
                          >
                            {modelo.nombre}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
}
