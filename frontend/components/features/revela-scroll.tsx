"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Envoltorio para animar un bloque con fade + leve subida la primera vez que
 * entra en pantalla, como los bloques de texto de PandaTech. Se dispara una
 * sola vez (no se repite al volver a scrollear); `retraso` sirve para
 * escalonar varios bloques dentro de la misma sección.
 */
export function RevelaScroll({
  children,
  className,
  retraso = 0,
}: {
  children: React.ReactNode;
  className?: string;
  retraso?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        setVisible(true);
        observador.disconnect();
      },
      { threshold: 0.2 },
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      className={cn("revela", visible && "revela-visible", className)}
      ref={ref}
      style={retraso ? { transitionDelay: `${retraso}ms` } : undefined}
    >
      {children}
    </div>
  );
}
