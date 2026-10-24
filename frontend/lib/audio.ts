export type Tema = {
  titulo: string;
  src: string;
};

/** Temas del walkman de /nosotros (archivos en public/audio). */
export const TEMAS: Tema[] = [
  { titulo: "Midnight Oil — King of the Mountain", src: "/audio/midnight-oil-king-of-the-mountain.mp3" },
  { titulo: "Seems Twice · 07", src: "/audio/seems-twice-07.mp3" },
  { titulo: "The Cruel Sea — Seems Twice", src: "/audio/the-cruel-sea-seems-twice.mp3" },
  { titulo: "INXS — Heaven Sent", src: "/audio/inxs-heaven-sent.mp3" },
  { titulo: "The Offspring — Original Prankster", src: "/audio/the-offspring-original-prankster.mp3" },
  { titulo: "Green Day — Warning", src: "/audio/green-day-warning.mp3" },
  { titulo: "We're Only Gonna Die For Our Arrogance", src: "/audio/were-only-gonna-die.mp3" },
];
