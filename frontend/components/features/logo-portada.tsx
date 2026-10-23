const LOGO_WORDMARK = "/images/fotos/locoslogo%201.svg";

/**
 * Primera pantalla del home: negro absoluto y el wordmark en blanco.
 * Entra como el título de PandaTech: fade y un leve movimiento hacia arriba,
 * apenas carga la página. El archivo es vectorial, así que agrandarlo no lo pixela.
 */
export function LogoPortada() {
  return (
    <section
      aria-label="Locos Bro"
      className="logo-portada flex min-h-svh items-center justify-center px-6 pt-24"
    >
      {/* El archivo es negro. El filtro lo pinta de blanco sin redibujar los trazos. */}
      <img
        alt="Locos Bro"
        className="logo-entrada h-auto w-[clamp(280px,62vw,1600px)]"
        height={315}
        src={LOGO_WORDMARK}
        width={800}
      />
    </section>
  );
}
