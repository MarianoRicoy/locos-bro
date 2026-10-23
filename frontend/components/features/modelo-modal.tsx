"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { Etiqueta } from "@/components/features/etiqueta";
import { buttonVariants } from "@/components/ui/button-variants";
import { CATEGORIAS, obtenerModeloPorSlug } from "@/lib/modelos";
import type { Modelo } from "@/types/modelo";

type ModeloModalContexto = {
  /** Abre la ficha del modelo con ese slug. */
  abrir: (slug: string) => void;
  /** `true` mientras la ficha está abierta (el carrusel se pausa). */
  abierto: boolean;
};

const ModeloModalContext = createContext<ModeloModalContexto | null>(null);

export function useModeloModal(): ModeloModalContexto {
  const contexto = useContext(ModeloModalContext);

  if (!contexto) {
    throw new Error("useModeloModal debe usarse dentro de <ModeloModalProvider>.");
  }

  return contexto;
}

/**
 * Provee un único modal (ficha de modelo) para todo lo que haya adentro:
 * carrusel del home, grilla de /modelos, etc. Cualquier tile llama a `abrir(slug)`.
 */
export function ModeloModalProvider({ children }: { children: React.ReactNode }) {
  // `slug` se conserva al cerrar para que el contenido no desaparezca durante la animación de salida.
  const [estado, setEstado] = useState<{ slug: string | null; abierto: boolean }>({
    slug: null,
    abierto: false,
  });

  const abrir = useCallback((slug: string) => setEstado({ slug, abierto: true }), []);
  const cerrar = useCallback(() => setEstado((previo) => ({ ...previo, abierto: false })), []);

  const valor = useMemo(() => ({ abrir, abierto: estado.abierto }), [abrir, estado.abierto]);
  const modelo = obtenerModeloPorSlug(estado.slug ?? undefined);

  return (
    <ModeloModalContext.Provider value={valor}>
      {children}

      <Dialog.Root
        onOpenChange={(abierto) => {
          if (!abierto) cerrar();
        }}
        open={estado.abierto}
      >
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-[60] bg-black/85 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
          <Dialog.Viewport className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-3 sm:items-center sm:p-6">
            {modelo ? <FichaModelo modelo={modelo} /> : null}
          </Dialog.Viewport>
        </Dialog.Portal>
      </Dialog.Root>
    </ModeloModalContext.Provider>
  );
}

const ETIQUETAS_MEDIDAS = [
  { clave: "largo", etiqueta: "Largo" },
  { clave: "ancho", etiqueta: "Ancho" },
  { clave: "espesor", etiqueta: "Espesor" },
] as const;

function FichaModelo({ modelo }: { modelo: Modelo }) {
  const categoria = CATEGORIAS.find((item) => item.id === modelo.categoria);

  return (
    <Dialog.Popup
      className="group/seccion relative my-auto w-full max-w-3xl border-2 border-white bg-black text-white outline-none transition duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0"
      data-tone="oscuro"
    >
      <div className="flex items-center justify-between gap-4 border-b-2 border-white p-4 md:p-5">
        {modelo.logo ? (
          <Image
            alt=""
            aria-hidden
            className="h-14 w-auto md:h-16"
            height={modelo.logo.alto}
            src={modelo.logo.src}
            width={modelo.logo.ancho}
          />
        ) : (
          <span />
        )}

        <Dialog.Close
          aria-label="Cerrar ficha"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm border-2 border-white transition-colors outline-none hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-neutral-400"
        >
          <X aria-hidden className="size-5" />
        </Dialog.Close>
      </div>

      <div className="relative aspect-[3/1] w-full">
        <Image
          alt={`Tabla ${modelo.nombre} de Locos Bro, vista desde arriba`}
          className="object-contain p-4 md:p-8"
          fill
          sizes="(max-width: 768px) 92vw, 768px"
          src={modelo.imagen.src}
        />
      </div>

      <div className="space-y-6 border-t-2 border-white p-5 md:p-8">
        <div className="space-y-3">
          {categoria ? <Etiqueta>{categoria.nombre}</Etiqueta> : null}
          <Dialog.Title className="break-words text-4xl leading-[1.08] sm:text-6xl md:text-7xl">{modelo.nombre}</Dialog.Title>
        </div>

        <dl className="grid grid-cols-3 gap-3">
          {ETIQUETAS_MEDIDAS.map(({ clave, etiqueta }) => (
            <div className="border-2 border-white p-3" key={clave}>
              <dt className="text-[0.65rem] font-medium uppercase tracking-[0.15em] text-neutral-400 md:text-xs">
                {etiqueta}
              </dt>
              <dd className="mt-1 text-base font-semibold leading-tight md:text-2xl">
                {modelo[clave] ?? <span className="text-neutral-500">A consultar</span>}
              </dd>
            </div>
          ))}
        </dl>

        {modelo.nota ? (
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-neutral-300">{modelo.nota}</p>
        ) : null}

        {modelo.descripcion ? (
          <Dialog.Description className="max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg">
            {modelo.descripcion}
          </Dialog.Description>
        ) : null}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Link
            className={buttonVariants({ variant: "blanco", size: "lg" })}
            href={`/contacto?modelo=${modelo.slug}&pedido=tal-cual#formulario`}
          >
            La quiero tal cual
          </Link>
          <Link
            className={buttonVariants({ variant: "invertido", size: "lg" })}
            href={`/contacto?modelo=${modelo.slug}&pedido=a-medida#formulario`}
          >
            La quiero a mi medida
          </Link>
        </div>
        <Link className="inline-flex text-sm text-neutral-400 underline-offset-4 hover:text-white hover:underline" href="/modelos">
          Ver todo el quiver
        </Link>
      </div>
    </Dialog.Popup>
  );
}
