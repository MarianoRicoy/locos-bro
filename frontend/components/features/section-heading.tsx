import { Etiqueta } from "@/components/features/etiqueta";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Nivel semántico del título. Por defecto h2. */
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
};

/**
 * Hereda el color de la sección (negro sobre claro, blanco sobre oscuro).
 * Las fuentes de los títulos (h1 Poppins bold, h2–h4 ABeeZee) vienen de globals.css.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  id,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {eyebrow ? (
        <Etiqueta>{eyebrow}</Etiqueta>
      ) : null}
      <Tag className="text-4xl leading-[1.08] md:text-6xl" id={id}>
        {title}
      </Tag>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed opacity-75 md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
