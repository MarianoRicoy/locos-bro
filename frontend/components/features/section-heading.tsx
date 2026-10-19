type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Nivel semántico del título. Por defecto h2. */
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  id,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
      ) : null}
      <Tag className="text-3xl leading-[1.05] text-foreground md:text-5xl" id={id}>
        {title}
      </Tag>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
