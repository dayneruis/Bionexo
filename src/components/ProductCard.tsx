import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/generated/prisma/client";
import { localize } from "@/lib/catalog";
import { formatCop } from "@/lib/format";
import { type Locale } from "@/i18n/routing";
import AvailabilityBadge from "./AvailabilityBadge";

// Tarjeta resumida de un producto para la portada y grillas de tienda/categoría.
export default function ProductCard({ product }: { product: Product }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const { name } = localize(product, locale);

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-eco-green/20 bg-white shadow-sm transition-all hover:border-eco-green/50 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-eco-cream">
        <Image
          src={product.imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-bold leading-snug text-eco-forest group-hover:text-eco-green">
          {name}
        </h3>
        <p className="text-lg font-bold text-eco-green">{formatCop(product.priceCop)}</p>
        <div className="mt-auto flex items-center justify-between pt-1">
          <AvailabilityBadge available={product.available} />
          <span className="text-sm font-semibold text-eco-cyan underline-offset-2 group-hover:underline">
            {t("viewProduct")} →
          </span>
        </div>
      </div>
    </Link>
  );
}
