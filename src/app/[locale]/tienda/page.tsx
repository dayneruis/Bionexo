import { getTranslations } from "next-intl/server";
import { getCategories } from "@/lib/catalog";
import CategoryCard from "@/components/CategoryCard";

// Tienda general: agrupa las 8 categorías en un solo lugar.
export default async function ShopPage() {
  const t = await getTranslations("shop");
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-eco-forest">{t("title")}</h1>
      <p className="mt-2 text-foreground/80">{t("subtitle")}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
