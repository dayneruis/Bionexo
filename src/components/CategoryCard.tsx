import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Category } from "@/generated/prisma/client";
import { localize } from "@/lib/catalog";
import { type Locale } from "@/i18n/routing";

// Tarjeta de categoría con gradiente eco y hover de sombra.
export default function CategoryCard({ category }: { category: Category }) {
  const locale = useLocale() as Locale;
  const { name, description } = localize(category, locale);

  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="group flex flex-col gap-2 rounded-2xl border border-eco-forest/10 bg-eco-cream p-5 transition-all hover:border-eco-green/50 hover:bg-eco-lime/10 hover:shadow-md"
    >
      <h3 className="font-semibold text-eco-forest transition-colors group-hover:text-eco-green">
        {name}
      </h3>
      <p className="text-sm text-foreground/70">{description}</p>
      <span className="mt-auto text-xs font-medium text-eco-cyan opacity-0 transition-opacity group-hover:opacity-100">
        Ver productos →
      </span>
    </Link>
  );
}
