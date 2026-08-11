// Formatea un precio en pesos colombianos (COP) sin decimales, ej: $185.000.
export function formatCop(priceCop: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(priceCop);
}

// Formatea un precio en dólares americanos (USD), ej: USD 44.05.
export function formatUsd(priceUsd: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(priceUsd);
}

// Formatea una fecha en el idioma del sitio, ej: "13 de julio de 2026" (es)
// o "July 13, 2026" (en). Usado en el listado y la ficha de Noticias e Historias.
export function formatDate(fecha: Date, locale: "es" | "en") {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-CO", {
    dateStyle: "long",
  }).format(fecha);
}

// Divide el contenido de una noticia en párrafos, uno por cada salto de línea
// que escribió el admin (sin importar si dejó una o varias líneas en blanco
// entre ellos). Se usa para mostrar cada párrafo con su propio espacio visual,
// en vez de depender de que el texto pegado tenga líneas en blanco.
export function paragraphsFromText(texto: string): string[] {
  return texto
    .split(/\r\n|\r|\n/)
    .map((linea) => linea.trim())
    .filter((linea) => linea.length > 0);
}
