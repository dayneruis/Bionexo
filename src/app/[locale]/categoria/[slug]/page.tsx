import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { getCategoryBySlug, getProductsByCategoryId, localize } from "@/lib/catalog";
import { type Locale } from "@/i18n/routing";
import ProductGrid from "@/components/ProductGrid";

// Página dedicada de una sola categoría (cada una de las 8 tiene la suya),
// con su descripción y los productos que le pertenecen.
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("category");
  const products = await getProductsByCategoryId(category.id);
  const { name, description } = localize(category, locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-eco-forest">{name}</h1>
      <p className="mt-2 max-w-2xl text-foreground/80">{description}</p>

      <h2 className="mt-8 mb-6 text-xl font-semibold text-eco-forest">
        {t("productsInCategory")}
      </h2>
      <ProductGrid products={products} emptyMessage={t("empty")} />
    </div>
  );
}
