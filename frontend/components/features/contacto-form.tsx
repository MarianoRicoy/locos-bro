"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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

type PedidoInicial = "tal-cual" | "a-medida";

type ContactoFormProps = {
  modelos: ModeloOpcion[];
  /** Slug del modelo a preseleccionar (viene de /contacto?modelo=slug). */
  modeloInicial?: string;
  /** Viene de la ficha: la tabla tal cual, o esa misma tabla adaptada. */
  pedidoInicial?: PedidoInicial;
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

const claseCampo =
  "h-11 rounded-sm border-2 border-foreground bg-background px-3 text-base aria-invalid:border-dashed aria-invalid:bg-neutral-200 md:text-base";
const claseSelect =
  "h-11 w-full rounded-sm border-2 border-foreground bg-background px-3 text-base text-foreground outline-none transition-colors aria-invalid:border-dashed aria-invalid:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-neutral-500";

function FieldError({ id, mensaje }: { id: string; mensaje?: string }) {
  if (!mensaje) {
    return null;
  }

  return (
    <p
      className="feedback-message border-l-4 border-foreground pl-2 text-sm font-semibold"
      id={id}
      role="alert"
    >
      {mensaje}
    </p>
  );
}

function mensajeInicial(pedido: PedidoInicial | undefined, nombre?: string): string {
  if (!pedido || !nombre) {
    return "";
  }

  if (pedido === "tal-cual") {
    return `Quiero la ${nombre} tal cual está en el quiver.`;
  }

  return `Quiero la ${nombre} adaptada a mis medidas, mi nivel y las olas que surfeo.`;
}

export function ContactoForm({ modelos, modeloInicial, pedidoInicial }: ContactoFormProps) {
  const [enviado, setEnviado] = useState<{ canal: Canal; url: string } | null>(null);
  const nombreInicial = modelos.find((item) => item.slug === modeloInicial)?.nombre;

  const textoInicial = mensajeInicial(pedidoInicial, nombreInicial);

  const {
    register,
    handleSubmit,
    setValue,
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
      mensaje: textoInicial,
    },
  });

  useEffect(() => {
    if (modeloInicial) {
      setValue("modelo", modeloInicial);
    }
    if (textoInicial) {
      setValue("mensaje", textoInicial);
    }
  }, [modeloInicial, setValue, textoInicial]);

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
            Teléfono <span className="font-normal normal-case tracking-normal text-muted-foreground">(opcional)</span>
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
            defaultValue={modeloInicial ?? ""}
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
            Altura y peso <span className="font-normal normal-case tracking-normal text-muted-foreground">(opcional)</span>
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
            Nivel de surf <span className="font-normal normal-case tracking-normal text-muted-foreground">(opcional)</span>
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
          className="min-h-32 rounded-sm border-2 border-foreground bg-background px-3 py-2.5 text-base aria-invalid:border-dashed aria-invalid:bg-neutral-200 md:text-base"
          defaultValue={textoInicial}
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
          className="feedback-message rounded-sm border-2 border-foreground bg-foreground px-4 py-3 text-sm text-background"
          role="status"
        >
          {enviado.canal === "whatsapp"
            ? "Abrimos WhatsApp con tu consulta lista para enviar. "
            : "Abrimos tu aplicación de correo con la consulta lista para enviar. "}
          Si no se abrió,{" "}
          <a
            className="font-semibold text-white underline underline-offset-2 hover:text-neutral-300"
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
