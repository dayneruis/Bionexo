import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCategories, getFeaturedProducts } from "@/lib/catalog";
import ProductGrid from "@/components/ProductGrid";
import CategoryCard from "@/components/CategoryCard";

// Portada del sitio: mensaje de bienvenida, productos destacados (5 a 8,
// según el CLAUDE.md) y acceso rápido a las 8 categorías.
export default async function HomePage() {
  const t = await getTranslations();
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <section className="flex flex-col gap-4 py-8 text-center sm:py-12">
        <h1 className="text-3xl font-bold text-eco-forest sm:text-4xl">
          {t("home.heroTitle")}
        </h1>
        <p className="mx-auto max-w-2xl text-foreground/80">{t("home.heroSubtitle")}</p>
        <Link
          href="/tienda"
          className="mx-auto mt-2 inline-flex rounded-full bg-eco-forest px-6 py-3 text-sm font-semibold text-white hover:bg-eco-green"
        >
          {t("home.heroCta")}
        </Link>
      </section>

      <section className="py-8">
        <h2 className="mb-6 text-2xl font-bold text-eco-forest">{t("home.featuredTitle")}</h2>
        <ProductGrid products={featuredProducts} />
      </section>

      <section className="py-8">
        <h2 className="mb-6 text-2xl font-bold text-eco-forest">{t("home.categoriesTitle")}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
}
