"use client";

import { useTranslations } from "next-intl";
import type { Variant } from "@/generated/prisma/client";

// Muestra las variantes del producto (talla, color, material) agrupadas por tipo.
// Ahora es controlado: recibe la variante seleccionada y notifica al padre
// cuando el usuario elige una. El padre (ProductActions) combina este estado
// con el botón "Agregar al carrito".
export default function VariantSelector({
  variants,
  selected,
  onSelect,
}: {
  variants: Variant[];
  selected?: string;
  onSelect?: (label: string) => void;
}) {
  const t = useTranslations("common");

  if (variants.length === 0) return null;

  // Agrupar variantes por tipo (ej: todas las tallas juntas, todos los colores juntos).
  const groups = variants.reduce<Record<string, string[]>>((acc, v) => {
    acc[v.type] = [...(acc[v.type] ?? []), v.value];
    return acc;
  }, {});

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-eco-forest">{t("variants")}</p>
      <div className="flex flex-col gap-2">
        {Object.entries(groups).map(([type, values]) => (
          <div key={type} className="flex flex-wrap items-center gap-2 text-sm">
            <span className="capitalize text-foreground/60">{type}:</span>
            {values.map((value) => {
              // La etiqueta combina tipo + valor para identificar la selección.
              const label = `${type}: ${value}`;
              const isSelected = selected === label;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onSelect?.(label)}
                  className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                    isSelected
                      ? "border-eco-forest bg-eco-forest text-white"
                      : "border-eco-forest/20 text-foreground/80 hover:border-eco-forest/60"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
