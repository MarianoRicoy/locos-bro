export default function Loading() {
  return (
    <div
      aria-label="Cargando contenido"
      aria-live="polite"
      className="flex min-h-[60vh] flex-1 items-center justify-center"
      role="status"
    >
      <span className="size-10 animate-spin rounded-full border-4 border-mar-claro border-t-primary motion-reduce:animate-none" />
      <span className="sr-only">Cargando…</span>
    </div>
  );
}
