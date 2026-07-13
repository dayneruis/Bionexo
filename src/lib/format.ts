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
