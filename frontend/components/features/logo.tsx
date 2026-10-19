import { siteConfig } from "@/lib/site-config";

type LogoProps = {
  className?: string;
};

/**
 * Wordmark provisorio de Locos Bro.
 * Para usar el logo real: reemplazar el contenido por un <Image src="/images/logo.svg" ... />.
 */
export function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="text-2xl font-black uppercase tracking-tight">Locos Bro</span>
      <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.32em] opacity-70">
        Surfboards · Miramar
      </span>
      <span className="sr-only">{siteConfig.name}</span>
    </span>
  );
}
