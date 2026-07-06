import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { ADMIN_SESSION_COOKIE, verificarTokenSesion } from "./lib/admin-auth";

const intlMiddleware = createMiddleware(routing);

// Única ruta de /admin accesible SIN sesión: es la que crea la sesión.
const RUTA_LOGIN_ADMIN = "/admin/login";

// Este middleware intercepta cada visita:
// - Si la URL empieza con /admin, es el panel privado: se queda FUERA del
//   enrutamiento de idiomas (es solo en español) y exige una sesión válida.
// - Para el resto del sitio, decide qué idioma mostrar como antes.
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === RUTA_LOGIN_ADMIN) {
      return NextResponse.next();
    }

    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const sesion = await verificarTokenSesion(token);
    if (!sesion) {
      return NextResponse.redirect(new URL(RUTA_LOGIN_ADMIN, request.url));
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Se aplica a todas las rutas excepto archivos estáticos y assets internos de Next.js.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
