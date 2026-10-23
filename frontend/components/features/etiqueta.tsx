import { cn } from "@/lib/utils";

/**
 * Etiqueta de sección: texto chico en mayúsculas con una raya adelante ("— QUIVER").
 * Hereda el color de la sección (negro sobre claro, blanco sobre oscuro).
 */
export function Etiqueta({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] before:h-0.5 before:w-8 before:bg-current",
        className,
      )}
    >
      {children}
    </p>
  );
}
