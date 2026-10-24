"use client";

import { CassetteTape, Pause, Play, SkipBack, SkipForward, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { TEMAS } from "@/lib/audio";

/**
 * Walkman de /nosotros: play/pausa, stop y avance/retroceso de los temas de
 * public/audio. Vive debajo del proyector de archivo. Si no hay temas cargados
 * no se muestra nada.
 */
export function ReproductorArchivo() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [indice, setIndice] = useState(0);
  const [sonando, setSonando] = useState(false);

  const tema = TEMAS[indice];
  const hayTemas = TEMAS.length > 0;

  // Al cambiar de tema recargamos el <audio>; si estaba sonando, sigue sonando.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hayTemas) return;
    audio.load();
    if (sonando) void audio.play().catch(() => setSonando(false));
  }, [indice, hayTemas]); // eslint-disable-line react-hooks/exhaustive-deps -- `sonando` se lee fresco, no dispara el efecto

  if (!hayTemas) return null;

  const mover = (delta: number) => setIndice((i) => (i + delta + TEMAS.length) % TEMAS.length);

  const alternar = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (sonando) {
      audio.pause();
      setSonando(false);
    } else {
      void audio.play().then(() => setSonando(true)).catch(() => setSonando(false));
    }
  };

  const parar = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setSonando(false);
  };

  const botonClase =
    "inline-flex size-10 items-center justify-center border-2 border-black bg-white text-black transition-colors outline-none hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-neutral-500";

  return (
    <div className="w-full border-2 border-black bg-white p-3 sm:p-4">
      <audio
        onEnded={() => mover(1)}
        preload="none"
        ref={audioRef}
        src={tema.src}
      />

      <div className="flex items-center gap-3">
        <CassetteTape
          aria-hidden
          className={`size-8 shrink-0 text-black transition-transform ${sonando ? "animate-spin [animation-duration:3s]" : ""}`}
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-black">{tema.titulo}</p>
        </div>

        <div className="flex shrink-0 gap-1.5">
          <button aria-label="Tema anterior" className={botonClase} onClick={() => mover(-1)} type="button">
            <SkipBack aria-hidden className="size-4" />
          </button>
          <button
            aria-label={sonando ? "Pausar" : "Reproducir"}
            className={botonClase}
            onClick={alternar}
            type="button"
          >
            {sonando ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
          </button>
          <button aria-label="Detener" className={botonClase} onClick={parar} type="button">
            <Square aria-hidden className="size-4" />
          </button>
          <button aria-label="Tema siguiente" className={botonClase} onClick={() => mover(1)} type="button">
            <SkipForward aria-hidden className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
