import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Leaf, Tag, Recycle, Handshake, Globe } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCategories, getFeaturedProducts } from "@/lib/catalog";
import ProductGrid from "@/components/ProductGrid";
import CategoryCard from "@/components/CategoryCard";
import SearchHero from "@/components/SearchHero";

// Ícono + clave de traducción de cada una de las 5 tarjetas de "¿Qué es Bionexo?"
const WHAT_IS_CARDS = [
  { Icon: Leaf, titleKey: "whatIs1Title", textKey: "whatIs1Text" },
  { Icon: Tag, titleKey: "whatIs2Title", textKey: "whatIs2Text" },
  { Icon: Recycle, titleKey: "whatIs3Title", textKey: "whatIs3Text" },
  { Icon: Handshake, titleKey: "whatIs4Title", textKey: "whatIs4Text" },
  { Icon: Globe, titleKey: "whatIs5Title", textKey: "whatIs5Text" },
] as const;

// Portada del sitio:
// 1. Hero de texto + botón "Explorar"
// 2. Sección de búsqueda con mosaico de imágenes (SearchHero)
// 3. "¿Qué es Bionexo?" (5 tarjetas con ícono)
// 4. Productos destacados
// 5. Acceso rápido a las 10 categorías
export default async function HomePage() {
  const t = await getTranslations();
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Portada de marca: imagen visual de presentación, antes del hero de texto */}
      <section className="pt-2">
        <div className="overflow-hidden rounded-3xl">
          <Image
            src="/portada-marca.png"
            alt={`${t("brand.name")} — ${t("brand.tagline")}`}
            width={1718}
            height={916}
            className="h-48 w-full object-cover sm:h-64 md:h-72"
            priority
          />
        </div>
      </section>

      {/* Hero principal */}
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

      {/* Barra de búsqueda con mosaico de imágenes de fondo */}
      <section className="py-6">
        <SearchHero />
      </section>

      {/* ¿Qué es Bionexo? */}
      <section className="py-8">
        <h2 className="mb-6 text-2xl font-bold text-eco-forest">{t("home.whatIsTitle")}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {WHAT_IS_CARDS.map(({ Icon, titleKey, textKey }) => (
            <div
              key={titleKey}
              className="rounded-2xl border border-eco-green/10 bg-white p-6 text-center shadow-sm transition-all hover:border-eco-green hover:shadow-md"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-eco-cream text-eco-green">
                <Icon size={24} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-bold text-eco-forest">{t(`home.${titleKey}`)}</h3>
              <p className="text-sm text-slate-600">{t(`home.${textKey}`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tirilla de valores: imagen horizontal con los valores de la marca */}
      <section className="pb-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-eco-green/10 bg-white p-4 shadow-sm sm:p-6">
          <Image
            src="/tirilla-valores.jpeg"
            alt={t("home.whatIsTitle")}
            width={1536}
            height={125}
            className="h-auto w-full object-contain"
          />
        </div>
      </section>

      {/* Productos destacados */}
      <section className="py-8">
        <h2 className="mb-6 text-2xl font-bold text-eco-forest">{t("home.featuredTitle")}</h2>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* Explorar por categoría */}
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
