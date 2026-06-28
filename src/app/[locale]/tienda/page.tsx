import { getLocale, getTranslations } from "next-intl/server";
import { getCategories, searchProducts } from "@/lib/catalog";
import CategoryCard from "@/components/CategoryCard";
import ProductGrid from "@/components/ProductGrid";
import GeoFilter from "@/components/GeoFilter";
import { type Locale } from "@/i18n/routing";

// Tienda general.
// Sin filtros activos: muestra las 10 categorías para explorar.
// Con filtro geográfico o búsqueda de texto: muestra los productos que coinciden
// de todas las categorías, con el filtro visible al tope.
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    depto?: string;
    mpio?: string;
    origen?: string;
  }>;
}) {
  const { q, depto, mpio, origen } = await searchParams;
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  void locale; // se usa implícitamente en los componentes hijos

  const hayFiltro = !!(q?.trim() || depto || mpio || origen);

  const [categories, products] = await Promise.all([
    !hayFiltro ? getCategories() : Promise.resolve([]),
    hayFiltro
      ? searchProducts({
          query: q,
          department: depto,
          municipality: mpio,
          isInternational: origen === "internacional",
        })
      : Promise.resolve([]),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-eco-forest">{t("shop.title")}</h1>
      <p className="mt-2 text-foreground/80">{t("shop.subtitle")}</p>

      {/* Filtro geográfico por departamento y municipio */}
      <div className="mt-6">
        <GeoFilter
          deptoActual={depto}
          mpioActual={mpio}
          origenInternacional={origen === "internacional"}
          queryActual={q}
        />
      </div>

      <div className="mt-8">
        {hayFiltro ? (
          <>
            {/* Etiqueta que indica qué se está mostrando */}
            {q?.trim() && (
              <p className="mb-4 text-sm text-foreground/60">
                {t("search.results", { q: q.trim() })}
              </p>
            )}
            {(depto || mpio || origen === "internacional") && (
              <p className="mb-4 text-sm text-foreground/60">
                {t("shop.filteredProducts")}:{" "}
                {origen === "internacional"
                  ? t("geo.international")
                  : [depto, mpio].filter(Boolean).join(" › ")}
              </p>
            )}
            <ProductGrid
              products={products}
              emptyMessage={t("search.noResults")}
            />
          </>
        ) : (
          /* Vista por defecto: grilla de categorías */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
