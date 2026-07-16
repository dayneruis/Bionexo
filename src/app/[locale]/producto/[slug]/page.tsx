import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProductBySlug, localize } from "@/lib/catalog";
import { esDisponiblePublico } from "@/lib/availability";
import { type Locale } from "@/i18n/routing";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import PriceDisplay from "@/components/PriceDisplay";
import ProductActions from "@/components/ProductActions";
import OriginBadge from "@/components/OriginBadge";

// Ficha de producto vista por el CLIENTE.
// Modelo de intermediación: NUNCA se muestran datos del productor
// (nombre, teléfono, redes). Solo se expone información comercial del producto.
// Lo que se muestra: nombre, descripción, precio, variantes, disponibilidad,
// origen geográfico, tamaño, garantía.
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

          {/* Precio en COP con equivalente en USD */}
          <PriceDisplay priceCop={product.priceCop} />

          <AvailabilityBadge available={esDisponiblePublico(product)} />

          {/* Unidades disponibles: ajuste manual desde el panel. Si es 0, la
              insignia de arriba ya dice "No disponible", así que se omite. */}
          {product.stock > 0 && (
            <p className="text-sm text-foreground/60">
              📦 {t("product.stockAvailable", { count: product.stock })}
            </p>
          )}

          {/* Origen geográfico: ciudad/departamento o país si es internacional */}
          <OriginBadge
            isInternational={product.isInternational}
            originCountry={product.originCountry}
            originCity={product.originCity}
            originDepartment={product.originDepartment}
          />

          {/* Tamaño o medida del producto (si aplica) */}
          {product.size && (
            <p className="text-sm text-foreground/60">
              📐{" "}
              <span className="font-medium text-foreground/80">{t("product.size")}:</span>{" "}
              {product.size}
            </p>
          )}

          {/* Garantía: se muestra si el campo está activo */}
          <p className="text-sm text-foreground/60">
            🛡️{" "}
            <span className="font-medium text-foreground/80">{t("product.warranty")}:</span>{" "}
            {product.warranty
              ? product.warrantyDuration
                ? `${t("product.warrantyYes")} — ${product.warrantyDuration}`
                : t("product.warrantyYes")
              : t("product.warrantyNo")}
          </p>

          {/* Descripción */}
          <div>
            <p className="mb-1 text-sm font-semibold text-eco-forest">
              {t("product.description")}
            </p>
            <p className="text-foreground/80">{description}</p>
          </div>

          {/* Selector de variantes + botones de acción */}
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
