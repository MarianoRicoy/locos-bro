import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "La historia de Locos Bro Surfboards, contada desde el taller de Miramar.",
};

export default function NosotrosPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-background px-6 pb-24 pt-24 text-foreground">
      <h1 className="text-center text-3xl md:text-5xl">En breve nuestra historia</h1>
    </main>
  );
}
