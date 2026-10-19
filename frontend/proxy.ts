import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RUTA_CONSTRUCCION = "/construccion";
const COOKIE_ACCESO = "locosbro_acceso";
const PARAM_ACCESO = "acceso";

/**
 * Modo "sitio en construcción" (OPCIONAL).
 *
 * Solo se activa si existe la variable de entorno PREVIEW_SECRET. Sin ella, el sitio es público.
 * Con ella, quien no tenga la cookie ve /construccion; para entrar: `/?acceso=<PREVIEW_SECRET>`.
 */
export function proxy(request: NextRequest) {
  const claveAcceso = process.env.PREVIEW_SECRET;

  if (!claveAcceso) {
    return NextResponse.next();
  }

  const { pathname, searchParams } = request.nextUrl;

  // 1. Activar acceso con ?acceso=CLAVE -> guarda cookie y limpia la URL.
  if (searchParams.get(PARAM_ACCESO) === claveAcceso) {
    const url = request.nextUrl.clone();
    url.searchParams.delete(PARAM_ACCESO);
    const response = NextResponse.redirect(url);
    response.cookies.set(COOKIE_ACCESO, claveAcceso, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 días
    });
    return response;
  }

  // 2. Si tiene la cookie válida, accede al sitio real con normalidad.
  if (request.cookies.get(COOKIE_ACCESO)?.value === claveAcceso) {
    return NextResponse.next();
  }

  // 3. Sin acceso: dejar pasar solo la vista de construcción.
  if (pathname === RUTA_CONSTRUCCION) {
    return NextResponse.next();
  }

  // 4. Cualquier otra ruta redirige a la vista de construcción.
  const url = request.nextUrl.clone();
  url.pathname = RUTA_CONSTRUCCION;
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Aplica a todas las rutas excepto assets estáticos, imágenes y archivos con extensión.
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
