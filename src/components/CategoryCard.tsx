import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Category } from "@/generated/prisma/client";
import { localize } from "@/lib/catalog";
import { type Locale } from "@/i18n/routing";

// Tarjeta de categoría con fondo eco-cream y hover verde vivo.
export default function CategoryCard({ category }: { category: Category }) {
  const locale = useLocale() as Locale;
  const { name, description } = localize(category, locale);

  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="group flex flex-col gap-2 rounded-2xl border border-eco-green/20 bg-eco-cream p-5 transition-all hover:border-eco-green/50 hover:bg-eco-lime/10 hover:shadow-md"
    >
      <h3 className="font-bold text-eco-forest transition-colors group-hover:text-eco-green">
        {name}
      </h3>
      <p className="text-sm text-slate-600">{description}</p>
      <span className="mt-auto text-xs font-semibold text-eco-cyan opacity-0 transition-opacity group-hover:opacity-100">
        Ver productos →
      </span>
    </Link>
  );
}
