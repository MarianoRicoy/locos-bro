const MENSAJE = "Hechas a mano en Miramar";
const REPETICIONES_POR_SECUENCIA = 6;

function MarqueeSequence({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div aria-hidden={ariaHidden} className="marquee-sequence">
      {Array.from({ length: REPETICIONES_POR_SECUENCIA }).map((_, indice) => (
        <span className="inline-flex items-center" key={indice}>
          <span className="whitespace-nowrap px-6 text-2xl font-black uppercase tracking-tight md:px-8 md:text-4xl">
            {MENSAJE}
          </span>
          <span aria-hidden="true" className="text-accent">
            ◆
          </span>
        </span>
      ))}
    </div>
  );
}

export function TextMarquee() {
  return (
    <section aria-label={MENSAJE} className="marquee bg-mar-claro/40 py-5 text-primary md:py-6">
      <div className="marquee-track">
        <MarqueeSequence />
        <MarqueeSequence ariaHidden />
      </div>
    </section>
  );
}
