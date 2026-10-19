"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MODELO_A_MEDIDA } from "@/lib/modelos";
import { siteConfig, whatsappLink } from "@/lib/site-config";

type ModeloOpcion = {
  slug: string;
  nombre: string;
  medidas: string;
};

type ContactoFormProps = {
  modelos: ModeloOpcion[];
  /** Slug del modelo a preseleccionar (viene de /contacto?modelo=slug). */
  modeloInicial?: string;
};

const NIVELES = ["Principiante", "Intermedio", "Avanzado"] as const;

const esquema = z.object({
  nombre: z.string().trim().min(2, "Contanos tu nombre."),
  email: z.string().trim().email("Ingresá un email válido."),
  telefono: z.string().trim().optional(),
  modelo: z.string().min(1, "Elegí un modelo o tabla a medida."),
  alturaPeso: z.string().trim().optional(),
  nivel: z.string().optional(),
  mensaje: z.string().trim().min(10, "Contanos un poco más (mínimo 10 caracteres)."),
});

type ValoresFormulario = z.infer<typeof esquema>;
type Canal = "whatsapp" | "email";

const claseCampo = "h-11 rounded-md bg-background px-3 text-base md:text-base";
const claseSelect =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30";

function FieldError({ id, mensaje }: { id: string; mensaje?: string }) {
  if (!mensaje) {
    return null;
  }

  return (
    <p className="feedback-message text-sm text-destructive" id={id} role="alert">
      {mensaje}
    </p>
  );
}

export function ContactoForm({ modelos, modeloInicial }: ContactoFormProps) {
  const [enviado, setEnviado] = useState<{ canal: Canal; url: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValoresFormulario>({
    resolver: zodResolver(esquema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      modelo: modeloInicial ?? "",
      alturaPeso: "",
      nivel: "",
      mensaje: "",
    },
  });

  function armarMensaje(valores: ValoresFormulario): string {
    const modelo = modelos.find((item) => item.slug === valores.modelo);
    const descripcionModelo =
      valores.modelo === MODELO_A_MEDIDA
        ? "Tabla a medida (custom)"
        : modelo
          ? `${modelo.nombre} (${modelo.medidas})`
          : valores.modelo;

    const lineas = [
      `Hola ${siteConfig.shortName}! Les escribo desde la web.`,
      "",
      `Nombre: ${valores.nombre}`,
      `Email: ${valores.email}`,
      valores.telefono ? `Teléfono: ${valores.telefono}` : null,
      `Modelo: ${descripcionModelo}`,
      valores.alturaPeso ? `Altura / peso: ${valores.alturaPeso}` : null,
      valores.nivel ? `Nivel: ${valores.nivel}` : null,
      "",
      valores.mensaje,
    ];

    return lineas.filter((linea): linea is string => linea !== null).join("\n");
  }

  function enviar(valores: ValoresFormulario, canal: Canal) {
    const mensaje = armarMensaje(valores);

    const url =
      canal === "whatsapp"
        ? whatsappLink(mensaje)
        : `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
            `Consulta desde la web: ${valores.nombre}`,
          )}&body=${encodeURIComponent(mensaje)}`;

    setEnviado({ canal, url });

    if (canal === "whatsapp") {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.assign(url);
    }
  }

  const alEnviarPorWhatsapp = handleSubmit((valores) => enviar(valores, "whatsapp"));
  const alEnviarPorEmail = handleSubmit((valores) => enviar(valores, "email"));

  return (
    <form className="space-y-5" noValidate onSubmit={alEnviarPorWhatsapp}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            aria-describedby={errors.nombre ? "nombre-error" : undefined}
            aria-invalid={Boolean(errors.nombre)}
            autoComplete="name"
            className={claseCampo}
            id="nombre"
            {...register("nombre")}
          />
          <FieldError id="nombre-error" mensaje={errors.nombre?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            className={claseCampo}
            id="email"
            type="email"
            {...register("email")}
          />
          <FieldError id="email-error" mensaje={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="telefono">
            Teléfono <span className="font-normal text-muted-foreground">(opcional)</span>
          </Label>
          <Input
            autoComplete="tel"
            className={claseCampo}
            id="telefono"
            type="tel"
            {...register("telefono")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="modelo">Modelo</Label>
          <select
            aria-describedby={errors.modelo ? "modelo-error" : undefined}
            aria-invalid={Boolean(errors.modelo)}
            className={claseSelect}
            id="modelo"
            {...register("modelo")}
          >
            <option value="">Elegí una opción</option>
            <option value={MODELO_A_MEDIDA}>Tabla a medida (custom)</option>
            <optgroup label="Quiver">
              {modelos.map((modelo) => (
                <option key={modelo.slug} value={modelo.slug}>
                  {modelo.nombre} · {modelo.medidas}
                </option>
              ))}
            </optgroup>
          </select>
          <FieldError id="modelo-error" mensaje={errors.modelo?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="alturaPeso">
            Altura y peso <span className="font-normal text-muted-foreground">(opcional)</span>
          </Label>
          <Input
            className={claseCampo}
            id="alturaPeso"
            placeholder="Ej: 1,75 m · 72 kg"
            {...register("alturaPeso")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nivel">
            Nivel de surf <span className="font-normal text-muted-foreground">(opcional)</span>
          </Label>
          <select className={claseSelect} id="nivel" {...register("nivel")}>
            <option value="">Sin especificar</option>
            {NIVELES.map((nivel) => (
              <option key={nivel} value={nivel}>
                {nivel}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mensaje">Contanos qué tabla imaginás</Label>
        <Textarea
          aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
          aria-invalid={Boolean(errors.mensaje)}
          className="min-h-32 rounded-md bg-background px-3 py-2.5 text-base md:text-base"
          id="mensaje"
          placeholder="Medidas que tenés en mente, tipo de olas, colores, fecha en que la necesitás…"
          {...register("mensaje")}
        />
        <FieldError id="mensaje-error" mensaje={errors.mensaje?.message} />
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Button className="w-full sm:w-auto" size="lg" type="submit">
          Enviar por WhatsApp
        </Button>
        <Button
          className="w-full sm:w-auto"
          onClick={alEnviarPorEmail}
          size="lg"
          type="button"
          variant="outline"
        >
          Enviar por email
        </Button>
      </div>

      {enviado ? (
        <p
          aria-live="polite"
          className="feedback-message rounded-md bg-mar-claro/40 px-4 py-3 text-sm text-foreground"
          role="status"
        >
          {enviado.canal === "whatsapp"
            ? "Abrimos WhatsApp con tu consulta lista para enviar. "
            : "Abrimos tu aplicación de correo con la consulta lista para enviar. "}
          Si no se abrió,{" "}
          <a
            className="font-bold text-primary underline underline-offset-2"
            href={enviado.url}
            rel="noopener noreferrer"
            target={enviado.canal === "whatsapp" ? "_blank" : undefined}
          >
            hacé click acá
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
