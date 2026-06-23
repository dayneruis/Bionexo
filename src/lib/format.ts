// Formatea un precio en pesos colombianos (COP) sin decimales, ej: $185.000.
// La conversión automática a USD queda para la Fase 2, según el plan del proyecto.
export function formatCop(priceCop: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(priceCop);
}
