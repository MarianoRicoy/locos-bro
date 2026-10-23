import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  /** "claro": blanco con texto negro. "oscuro": negro puro con texto blanco. */
  tone?: "claro" | "oscuro";
  /** Etiqueta contenedora (usar "header" para la cabecera de página). */
  as?: "section" | "header";
  /** Clases extra para el contenedor interno (ancho máximo, paddings). */
  innerClassName?: string;
};

const TONOS = {
  claro: "bg-background text-foreground",
  oscuro: "bg-black text-white",
} as const;

/**
 * Bloque de ancho completo con fondo alternable (blanco / negro puro).
 * Las páginas lo usan para alternar secciones y dar ritmo de alto contraste.
 */
export function Section({
  tone = "claro",
  as: Tag = "section",
  className,
  innerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn("group/seccion", TONOS[tone], Tag === "header" && "pt-24", className)}
      data-tone={tone}
      {...props}
    >
      <div className={cn("mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24", innerClassName)}>
        {children}
      </div>
    </Tag>
  );
}
