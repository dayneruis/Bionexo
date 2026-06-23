import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Este middleware intercepta cada visita y decide qué idioma mostrar:
// si la URL no trae /es o /en, redirige agregando el idioma por defecto.
export default createMiddleware(routing);

export const config = {
  // Se aplica a todas las rutas excepto archivos estáticos y assets internos de Next.js.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
