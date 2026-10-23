import { ArrowUpRight, Clock, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

import { ContactoForm } from "@/components/features/contacto-form";
import { Etiqueta } from "@/components/features/etiqueta";
import { Section } from "@/components/features/section";
import { SectionHeading } from "@/components/features/section-heading";
import { FacebookIcon, InstagramIcon, WhatsappIcon } from "@/components/features/social-icons";
import { MODELOS, obtenerModeloPorSlug, resumenMedidas } from "@/lib/modelos";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Pedí tu tabla de surf a medida o consultá por un modelo del quiver de Locos Bro Surfboards, en Miramar.",
};

type ContactoPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ContactoPage({ searchParams }: ContactoPageProps) {
  const { modelo, pedido } = await searchParams;
  const slugModelo = Array.isArray(modelo) ? modelo[0] : modelo;
  const pedidoCrudo = Array.isArray(pedido) ? pedido[0] : pedido;
  const modeloInicial = obtenerModeloPorSlug(slugModelo)?.slug;
  const pedidoInicial = pedidoCrudo === "tal-cual" || pedidoCrudo === "a-medida" ? pedidoCrudo : undefined;

  const { contact, social } = siteConfig;

  const enlaceContacto = "inline-flex items-center gap-3 underline-offset-4 transition-colors hover:underline";
  const chipSocial =
    "inline-flex items-center gap-2 rounded-sm border-2 border-foreground px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background";

  return (
    <main className="flex-1">
      <Section as="header" innerClassName="py-14 md:py-20" tone="oscuro">
        <SectionHeading
          as="h1"
          description="Consultá por un modelo del quiver o contanos qué tabla imaginás. Te respondemos por WhatsApp o por mail."
          eyebrow="Custom Orders / Contacto"
          title="Hagamos tu próxima tabla"
        />
      </Section>

      <Section innerClassName="grid gap-10 py-12 md:py-20 lg:grid-cols-12 lg:gap-14" tone="claro">
        <section
          aria-labelledby="formulario-titulo"
          className="scroll-mt-24 rounded-sm border-2 border-foreground bg-card p-6 md:p-10 lg:col-span-7"
          id="formulario"
        >
          <h2 className="mb-6 text-3xl md:text-4xl" id="formulario-titulo">
            Consulta o pedido a medida
          </h2>
          <ContactoForm
            modeloInicial={modeloInicial}
            pedidoInicial={pedidoInicial}
            modelos={MODELOS.map((modelo) => ({
              slug: modelo.slug,
              nombre: modelo.nombre,
              medidas: resumenMedidas(modelo),
            }))}
          />
        </section>

        <aside aria-label="Datos de contacto" className="space-y-8 lg:col-span-5">
          <ul className="space-y-5 text-base">
            <li>
              <a className={enlaceContacto} href={contact.whatsapp.url} rel="noopener noreferrer" target="_blank">
                <WhatsappIcon className="size-5 shrink-0" />
                <span>WhatsApp {contact.whatsapp.display}</span>
              </a>
            </li>
            <li>
              <a className={enlaceContacto} href={`mailto:${contact.email}`}>
                <Mail aria-hidden="true" className="size-5 shrink-0" />
                <span>{contact.email}</span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
              <div>
                <p>{contact.location.address}</p>
                <a
                  className="mt-1 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
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
              <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
              <div>
                {contact.horarios.map((linea) => (
                  <p key={linea}>{linea}</p>
                ))}
              </div>
            </li>
          </ul>

          <div className="space-y-3 border-t-2 border-foreground pt-6">
            <Etiqueta>Seguinos</Etiqueta>
            <ul className="flex flex-wrap gap-3">
              <li>
                <a className={chipSocial} href={social.instagram.url} rel="noopener noreferrer" target="_blank">
                  <InstagramIcon className="size-4" />
                  {social.instagram.handle}
                </a>
              </li>
              <li>
                <a className={chipSocial} href={social.facebook.url} rel="noopener noreferrer" target="_blank">
                  <FacebookIcon className="size-4" />
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </Section>
    </main>
  );
}
