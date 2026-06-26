import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProductBySlug, localize } from "@/lib/catalog";
import { type Locale } from "@/i18n/routing";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import PriceDisplay from "@/components/PriceDisplay";
import ProductActions from "@/components/ProductActions";

// Ficha de producto: imagen, descripción, precio COP + USD, ciudad de origen,
// disponibilidad, variantes (con selección) y los dos botones de acción.
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const { name, description } = localize(product, locale);
  const categoryName = localize(product.category, locale).name;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link
        href={`/categoria/${product.category.slug}`}
        className="text-sm text-eco-cyan hover:underline"
      >
        ← {t("common.back")}
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-10 sm:grid-cols-2">
        {/* Imagen del producto */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-eco-forest/5">
          <Image
            src={product.imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>

        {/* Información del producto */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-eco-cyan">{categoryName}</p>
          <h1 className="text-2xl font-bold text-eco-forest">{name}</h1>

          {/* Precio en COP con equivalente en USD (tasa del día) */}
          <PriceDisplay priceCop={product.priceCop} />

          <AvailabilityBadge available={product.available} />

          {/* Ciudad de origen del producto */}
          <p className="text-sm text-foreground/60">
            📍{" "}
            <span className="font-medium text-foreground/80">
              {t("product.originCity")}:
            </span>{" "}
            {product.originCity}
          </p>

          {/* Descripción */}
          <div>
            <p className="mb-1 text-sm font-semibold text-eco-forest">
              {t("product.description")}
            </p>
            <p className="text-foreground/80">{description}</p>
          </div>

          {/* Selector de variantes + botones (comparten el estado de la variante elegida) */}
          <ProductActions
            product={{
              id: product.id,
              slug: product.slug,
              nameEs: product.nameEs,
              nameEn: product.nameEn,
              priceCop: product.priceCop,
              imageUrl: product.imageUrl,
              originCity: product.originCity,
            }}
            variants={product.variants}
          />
        </div>
      </div>
    </div>
  );
}
