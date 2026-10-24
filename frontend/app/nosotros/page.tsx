import type { Metadata } from "next";

import { Section } from "@/components/features/section";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "La historia de Locos Bro Surfboards, contada desde el taller de Miramar.",
};

const PARRAFOS = [
  `Locos Bro no nació de un plan de negocios, nació en el agua y en un galpón hace más de 22
  años. Al principio, éramos simplemente un grupo de amigos surfistas de la playa que nos
  juntábamos a reparar nuestras propias tablas para poder seguir yendo al mar.`,
  `Con el tiempo, la necesidad y la curiosidad pudieron más, y junto a Lucas tomamos la decisión
  de empezar a fabricar. La primera tabla de nuestra historia fue para mi hijo Joaquín, que hoy
  ya tiene 23 años. El método fue pura autogestión: agarramos un longboard partido, lo
  descascaramos por completo y ahí mismo arrancó la locura.`,
  `En aquella época no existía la información que abunda hoy; sabíamos reparar el foam y la
  fibra, pero no teníamos ni idea de cómo shapear una tabla desde cero. Nuestra única escuela fue
  un video llamado "Shaping 101" que rebobinábamos y mirábamos una y otra vez en una casetera
  vieja. A base de prueba y error, de esa primera tabla pasamos a hacerle tablas a mi sobrino, a
  mi hermano y a toda la banda de amigos.`,
  `Así se formó Locos Bro. Entre el polvo, la resina y los amigos, manteniendo hasta hoy la misma
  esencia: tablas hechas a mano por surfistas de alma.`,
];

export default function NosotrosPage() {
  return (
    <main className="flex-1">
      <Section as="header" innerClassName="space-y-6 py-16 md:py-28" tone="oscuro">
        <h1 className="text-xl font-normal text-white">— Nuestra historia</h1>
        <p className="max-w-3xl text-4xl leading-[1.15] sm:text-5xl md:text-6xl">
          Más de 22 años en el agua, en el mismo galpón.
        </p>
      </Section>

      <Section aria-label="Nuestra historia completa" tone="claro">
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed">
          {PARRAFOS.map((parrafo) => (
            <p key={parrafo.slice(0, 24)}>{parrafo}</p>
          ))}
        </div>
      </Section>
    </main>
  );
}
