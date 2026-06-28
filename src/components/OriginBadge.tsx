import { useTranslations } from "next-intl";

// Muestra el origen del producto adaptándose al tipo:
// - Producto colombiano → ícono 📍 + Ciudad, Departamento
// - Producto internacional → ícono 🌍 + País de origen
// Los datos del productor (quién lo hace) NO aparecen aquí por el modelo
// de intermediación: solo se muestra el lugar geográfico de procedencia.
export default function OriginBadge({
  isInternational,
  originCountry,
  originCity,
  originDepartment,
}: {
  isInternational: boolean;
  originCountry?: string | null;
  originCity: string;
  originDepartment: string;
}) {
  const t = useTranslations("product");

  if (isInternational && originCountry) {
    return (
      <p className="text-sm text-foreground/60">
        🌍{" "}
        <span className="font-medium text-foreground/80">{t("originCountry")}:</span>{" "}
        {originCountry}
      </p>
    );
  }

  return (
    <p className="text-sm text-foreground/60">
      📍{" "}
      <span className="font-medium text-foreground/80">{t("originCity")}:</span>{" "}
      {originCity}, {originDepartment}
    </p>
  );
}
