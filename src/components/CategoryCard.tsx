import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Category } from "@/generated/prisma/client";
import { localize } from "@/lib/catalog";
import { CATEGORY_IMAGES } from "@/lib/category-images";
import { type Locale } from "@/i18n/routing";

// Tarjeta de categoría: foto pareja (mismo recorte y proporción en todas)
// + título y descripción cortos. Mismo patrón visual que ProductCard.
export default function CategoryCard({ category }: { category: Category }) {
  const locale = useLocale() as Locale;
  const { name, description } = localize(category, locale);
  const imageUrl = CATEGORY_IMAGES[category.slug];

  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-eco-green/20 bg-eco-cream transition-all hover:border-eco-green/50 hover:shadow-md"
    >
      {imageUrl && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-eco-cream">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-bold text-eco-forest transition-colors group-hover:text-eco-green">
          {name}
        </h3>
        <p className="text-sm text-slate-600">{description}</p>
        <span className="mt-auto text-xs font-semibold text-eco-cyan opacity-0 transition-opacity group-hover:opacity-100">
          Ver productos →
        </span>
      </div>
    </Link>
  );
}
