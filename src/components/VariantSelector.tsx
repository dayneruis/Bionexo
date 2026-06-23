import { useTranslations } from "next-intl";
import type { Variant } from "@/generated/prisma/client";

// Muestra las variantes del producto (talla, color, material) agrupadas por tipo.
// En esta fase es solo informativo: no hay carrito, así que no se "selecciona"
// nada todavía, simplemente se listan las opciones disponibles.
export default function VariantSelector({ variants }: { variants: Variant[] }) {
  const t = useTranslations("common");

  if (variants.length === 0) {
    return null;
  }

  const groups = variants.reduce<Record<string, string[]>>((acc, variant) => {
    acc[variant.type] = [...(acc[variant.type] ?? []), variant.value];
    return acc;
  }, {});

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-eco-forest">{t("variants")}</p>
      <div className="flex flex-col gap-2">
        {Object.entries(groups).map(([type, values]) => (
          <div key={type} className="flex items-center gap-2 text-sm">
            <span className="capitalize text-foreground/60">{type}:</span>
            <div className="flex flex-wrap gap-2">
              {values.map((value) => (
                <span
                  key={value}
                  className="rounded-full border border-eco-forest/20 px-3 py-1 text-foreground/80"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
