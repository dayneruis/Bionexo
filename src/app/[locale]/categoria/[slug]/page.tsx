import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import {
  getCategoryBySlug,
  getProductsByCategoryId,
  searchProducts,
  localize,
} from "@/lib/catalog";
import { type Locale } from "@/i18n/routing";
import ProductGrid from "@/components/ProductGrid";
import GeoFilter from "@/components/GeoFilter";

// Página dedicada de una categoría.
// Sin filtro geográfico: muestra todos los productos de la categoría.
// Con filtro: muestra solo los de esa categoría que coinciden con el origen elegido.
export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ depto?: string; mpio?: string; origen?: string }>;
}) {
  const { slug } = await params;
  const { depto, mpio, origen } = await searchParams;

  const category = await getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("category");
  const { name, description } = localize(category, locale);

  const hayFiltroGeo = !!(depto || mpio || origen);

  // Si hay filtro activo, usar la búsqueda combinada; de lo contrario listar todo
  const products = hayFiltroGeo
    ? await searchProducts({
        categoryId: category.id,
        department: depto,
        municipality: mpio,
        isInternational: origen === "internacional",
      })
    : await getProductsByCategoryId(category.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-eco-forest">{name}</h1>
      <p className="mt-2 max-w-2xl text-foreground/80">{description}</p>

      {/* Filtro geográfico dentro de la categoría */}
      <div className="mt-6">
        <GeoFilter
          deptoActual={depto}
          mpioActual={mpio}
          origenInternacional={origen === "internacional"}
        />
      </div>

      <h2 className="mt-8 mb-6 text-xl font-semibold text-eco-forest">
        {t("productsInCategory")}
      </h2>
      <ProductGrid products={products} emptyMessage={t("empty")} />
    </div>
  );
}
