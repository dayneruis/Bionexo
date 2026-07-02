import { useTranslations } from "next-intl";

// Insignia simple que muestra "Disponible" o "No disponible".
// El negocio no maneja cantidades de stock, solo este estado booleano.
export default function AvailabilityBadge({ available }: { available: boolean }) {
  const t = useTranslations("common");

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        available
          ? "bg-eco-lime/20 text-eco-forest"
          : "bg-foreground/10 text-foreground/60"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${available ? "bg-eco-green" : "bg-foreground/40"}`}
      />
      {available ? t("available") : t("unavailable")}
    </span>
  );
}
