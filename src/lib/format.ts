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
