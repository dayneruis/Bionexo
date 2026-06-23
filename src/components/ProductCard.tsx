import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/generated/prisma/client";
import { localize } from "@/lib/catalog";
import { formatCop } from "@/lib/format";
import { type Locale } from "@/i18n/routing";
import AvailabilityBadge from "./AvailabilityBadge";

// Tarjeta resumida de un producto, usada en la portada (destacados) y en
// las grillas de tienda/categoría. Solo muestra lo esencial; el detalle
// completo (variantes, descripción, botones) vive en la ficha de producto.
export default function ProductCard({ product }: { product: Product }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const { name } = localize(product, locale);

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-eco-forest/10 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-eco-forest/5">
        <Image
          src={product.imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-semibold text-eco-forest">{name}</h3>
        <p className="text-lg font-bold text-foreground">{formatCop(product.priceCop)}</p>
        <div className="mt-auto flex items-center justify-between">
          <AvailabilityBadge available={product.available} />
          <span className="text-sm font-medium text-eco-cyan group-hover:underline">
            {t("viewProduct")}
          </span>
        </div>
      </div>
    </Link>
  );
}
