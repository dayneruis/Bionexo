import { copToUsd } from "@/lib/exchange";
import { formatCop, formatUsd } from "@/lib/format";

// Componente servidor: muestra el precio en COP y su equivalente en USD.
// La tasa se lee de la caché local (SQLite) y se refresca cada 6 horas
// consultando la API de Frankfurter. Si la API falla, usa tasa de respaldo.
export default async function PriceDisplay({ priceCop }: { priceCop: number }) {
  const priceUsd = await copToUsd(priceCop);

  return (
    <div className="flex flex-col">
      <span className="text-2xl font-bold text-foreground">
        {formatCop(priceCop)}
      </span>
      <span className="text-sm text-foreground/50">≈ {formatUsd(priceUsd)}</span>
    </div>
  );
}
