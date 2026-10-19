import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/features/logo";
import { FacebookIcon, InstagramIcon, WhatsappIcon } from "@/components/features/social-icons";
import { ENLACES_PRINCIPALES } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";

const claseEnlace = "transition-colors hover:text-accent";
const claseBotonSocial =
  "inline-flex size-10 items-center justify-center rounded-full border border-primary-foreground/25 transition-colors hover:border-accent hover:text-accent";

export function SiteFooter() {
  const { contact, social } = siteConfig;

  return (
    <footer className="mt-auto bg-primary text-primary-foreground">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 md:grid-cols-12 md:px-8 md:py-16">
        <section className="space-y-4 md:col-span-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/75">
            Fábrica de tablas de surf en Miramar. Shape, laminado y terminación hechos a mano en
            nuestro taller.
          </p>

          <ul aria-label="Redes sociales" className="flex items-center gap-3 pt-1">
            <li>
              <a
                aria-label={`Instagram ${social.instagram.handle}`}
                className={claseBotonSocial}
                href={social.instagram.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <InstagramIcon className="size-4" />
              </a>
            </li>
            <li>
              <a
                aria-label={`Facebook ${social.facebook.handle}`}
                className={claseBotonSocial}
                href={social.facebook.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FacebookIcon className="size-4" />
              </a>
            </li>
            <li>
              <a
                aria-label={`WhatsApp ${contact.whatsapp.display}`}
                className={claseBotonSocial}
                href={contact.whatsapp.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <WhatsappIcon className="size-4" />
              </a>
            </li>
          </ul>
        </section>

        <nav aria-label="Navegación del pie de página" className="space-y-4 md:col-span-3 md:col-start-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Navegación</h3>
          <ul className="space-y-2 text-sm">
            {ENLACES_PRINCIPALES.map((enlace) => (
              <li key={enlace.href}>
                <Link className={claseEnlace} href={enlace.href}>
                  {enlace.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="space-y-4 md:col-span-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Taller y contacto</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
              <a
                className={claseEnlace}
                href={contact.location.mapsUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {contact.location.address}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
              <a
                className={claseEnlace}
                href={contact.whatsapp.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                WhatsApp {contact.whatsapp.display}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
              <a className={claseEnlace} href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
              <span className="text-primary-foreground/75">
                {contact.horarios.map((linea) => (
                  <span className="block" key={linea}>
                    {linea}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </section>
      </div>

      <div className="border-t border-primary-foreground/15">
        <p className="mx-auto w-full max-w-7xl px-4 py-5 text-xs text-primary-foreground/60 md:px-8">
          © {new Date().getFullYear()} {siteConfig.name}. Hecho a mano en Miramar, Argentina.
        </p>
      </div>
    </footer>
  );
}
