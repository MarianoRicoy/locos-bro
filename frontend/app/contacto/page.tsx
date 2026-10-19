import { ArrowUpRight, Clock, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

import { ContactoForm } from "@/components/features/contacto-form";
import { SectionHeading } from "@/components/features/section-heading";
import { FacebookIcon, InstagramIcon, WhatsappIcon } from "@/components/features/social-icons";
import { MODELOS, obtenerModeloPorSlug } from "@/lib/modelos";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Custom Orders / Contacto",
  description:
    "Pedí tu tabla de surf a medida o consultá por un modelo del quiver de Locos Bro Surfboards, en Miramar.",
};

type ContactoPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ContactoPage({ searchParams }: ContactoPageProps) {
  const { modelo } = await searchParams;
  const slugModelo = Array.isArray(modelo) ? modelo[0] : modelo;
  const modeloInicial = obtenerModeloPorSlug(slugModelo)?.slug;

  const { contact, social } = siteConfig;

  const enlaceContacto = "inline-flex items-center gap-3 transition-colors hover:text-primary";

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-12 px-4 py-12 md:px-8 md:py-20">
      <header>
        <SectionHeading
          as="h1"
          description="Consultá por un modelo del quiver o contanos qué tabla imaginás. Te respondemos por WhatsApp o por mail."
          eyebrow="Custom Orders / Contacto"
          title="Hagamos tu próxima tabla"
        />
      </header>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <section
          aria-labelledby="formulario-titulo"
          className="scroll-mt-24 rounded-3xl border border-border bg-card p-6 md:p-10 lg:col-span-7"
          id="formulario"
        >
          <h2 className="mb-6 text-2xl md:text-3xl" id="formulario-titulo">
            Consulta o pedido a medida
          </h2>
          <ContactoForm
            modeloInicial={modeloInicial}
            modelos={MODELOS.map(({ slug, nombre, medidas }) => ({ slug, nombre, medidas }))}
          />
        </section>

        <aside aria-label="Datos de contacto" className="space-y-8 lg:col-span-5">
          <ul className="space-y-5 text-base">
            <li>
              <a className={enlaceContacto} href={contact.whatsapp.url} rel="noopener noreferrer" target="_blank">
                <WhatsappIcon className="size-5 shrink-0 text-primary" />
                <span>WhatsApp {contact.whatsapp.display}</span>
              </a>
            </li>
            <li>
              <a className={enlaceContacto} href={`mailto:${contact.email}`}>
                <Mail aria-hidden="true" className="size-5 shrink-0 text-primary" />
                <span>{contact.email}</span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p>{contact.location.address}</p>
                <a
                  className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                  href={contact.location.mapsUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Cómo llegar
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                {contact.horarios.map((linea) => (
                  <p key={linea}>{linea}</p>
                ))}
              </div>
            </li>
          </ul>

          <div className="space-y-3 border-t border-border pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Seguinos</p>
            <ul className="flex flex-wrap gap-3">
              <li>
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-bold transition-colors hover:border-primary hover:text-primary"
                  href={social.instagram.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <InstagramIcon className="size-4" />
                  {social.instagram.handle}
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-bold transition-colors hover:border-primary hover:text-primary"
                  href={social.facebook.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FacebookIcon className="size-4" />
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
