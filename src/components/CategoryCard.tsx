import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Category } from "@/generated/prisma/client";
import { localize } from "@/lib/catalog";
import { type Locale } from "@/i18n/routing";

// Tarjeta de categoría: lleva a la página dedicada de esa categoría
// (cada una de las 8 categorías del catálogo tiene su propia página).
export default function CategoryCard({ category }: { category: Category }) {
  const locale = useLocale() as Locale;
  const { name, description } = localize(category, locale);

  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="flex flex-col gap-2 rounded-2xl border border-eco-forest/10 bg-gradient-to-br from-eco-lime/10 to-eco-cyan/10 p-5 transition-shadow hover:shadow-md"
    >
      <h3 className="font-semibold text-eco-forest">{name}</h3>
      <p className="text-sm text-foreground/70">{description}</p>
    </Link>
  );
}
