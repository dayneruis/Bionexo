import { defineRouting } from "next-intl/routing";

// Definimos los idiomas que soporta el sitio y cuál se usa por defecto.
// "es" (español) es el idioma principal del negocio; "en" (inglés) es el segundo.
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
});

export type Locale = (typeof routing.locales)[number];
