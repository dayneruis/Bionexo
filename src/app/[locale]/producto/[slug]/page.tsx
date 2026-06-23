import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProductBySlug, localize } from "@/lib/catalog";
import { formatCop } from "@/lib/format";
import { type Locale } from "@/i18n/routing";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import VariantSelector from "@/components/VariantSelector";
import ContactButtons from "@/components/ContactButtons";

// Ficha de producto: imágenes, descripción, precio, variantes, disponibilidad
// y los dos botones de acción ("Comprar" y "Me interesa / Contáctame").
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
      <Link href={`/categoria/${product.category.slug}`} className="text-sm text-eco-cyan hover:underline">
        ← {t("common.back")}
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-eco-forest/5">
          <Image src={product.imageUrl} alt={name} fill className="object-cover" sizes="50vw" />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-eco-cyan">{categoryName}</p>
          <h1 className="text-2xl font-bold text-eco-forest">{name}</h1>
          <p className="text-2xl font-bold text-foreground">{formatCop(product.priceCop)}</p>
          <AvailabilityBadge available={product.available} />

          <div>
            <p className="mb-1 text-sm font-semibold text-eco-forest">{t("product.description")}</p>
            <p className="text-foreground/80">{description}</p>
          </div>

          <VariantSelector variants={product.variants} />

          <div className="mt-4">
            <ContactButtons productName={name} />
          </div>
        </div>
      </div>
    </div>
  );
}
