import type { Metadata } from "next";

import { ReproductorArchivo } from "@/components/features/reproductor-archivo";
import { Section } from "@/components/features/section";
import { VisorArchivo } from "@/components/features/visor-archivo";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "La historia de Locos Bro Surfboards, contada desde el taller de Miramar.",
};

const PARRAFOS = [
  `Locos Bro no nació de un plan de negocios, nació en el mar y en un galpón hace más de 22
  años. Al principio, éramos simplemente un grupo de amigos surfistas de la playa que nos
  juntábamos a reparar nuestras propias tablas para poder seguir surfeando.`,
  `Con el tiempo, la necesidad y la curiosidad pudieron más, y junto a Lucas tomamos la decisión
  de empezar a fabricar. La primera tabla de nuestra historia fue para mi hijo Joaquín, que hoy
  ya tiene 23 años. El método fue pura autogestión: agarramos un longboard partido, lo
  descascaramos por completo y ahí mismo arrancó la locura.`,
  `En aquella época no existía la información que abunda hoy; sabíamos reparar el foam y la
  fibra, pero no teníamos ni idea de cómo shapear una tabla desde cero. Nuestra única escuela fue
  un video llamado "Shaping 101" que rebobinábamos y mirábamos una y otra vez en una casetera
  vieja. A base de prueba y error, de esa primera tabla pasamos a hacerle tablas a mi sobrino, a
  mi hermano Agustin y a toda la banda de amigos.`,
  `Así se formó Locos Bro. Entre el polvo, la resina y los amigos, manteniendo hasta hoy la misma
  esencia: tablas hechas a mano por surfistas de alma.`,
];

export default function NosotrosPage() {
  return (
    <main className="flex-1">
      <Section as="header" innerClassName="space-y-10 py-20 md:py-36" tone="oscuro">
        <h1 className="text-xl font-normal text-white md:text-2xl">— Nuestra historia</h1>
        <p className="max-w-4xl text-5xl leading-[1.25] sm:text-6xl md:text-7xl">
          De la playa al taller.
        </p>
      </Section>

      <Section
        aria-label="Nuestra historia completa"
        innerClassName="py-10 md:py-14"
        tone="claro"
      >
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="space-y-6 text-lg leading-relaxed lg:w-1/2">
            {PARRAFOS.map((parrafo) => (
              <p key={parrafo.slice(0, 24)}>{parrafo}</p>
            ))}
          </div>

          <div className="flex w-full flex-col gap-5 lg:w-1/2">
            <VisorArchivo />
            <ReproductorArchivo />
          </div>
        </div>
      </Section>
    </main>
  );
}
