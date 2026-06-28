"use client";

import { useTranslations } from "next-intl";
import { useCart } from "@/lib/cart";
import { whatsappUrl } from "@/lib/contact-config";
import type { ProductForCart } from "./ProductActions";

// Los dos botones de cada producto:
//   • "Agregar al carrito" → agrega el ítem y abre el cajón del carrito.
//   • "Me interesa / Contáctame" → abre WhatsApp del ECOMMERCE (no del productor).
// El número de WhatsApp viene de contact-config.ts (nunca del productor).
// En Fase 4 se conectará a una pasarela de pago sin tocar el resto de la ficha.
export default function ContactButtons({
  product,
  selectedVariant,
}: {
  product: ProductForCart;
  selectedVariant?: string;
}) {
  const t = useTranslations();
  const { agregar, openCart } = useCart();

  const interestMessage = t("product.whatsappInterestMessage", {
    product: product.nameEs,
  });

  function handleAddToCart() {
    agregar({
      id: product.id,
      slug: product.slug,
      nameEs: product.nameEs,
      nameEn: product.nameEn,
      priceCop: product.priceCop,
      imageUrl: product.imageUrl,
      originCity: product.originCity,
      variantLabel: selectedVariant,
    });
    openCart();
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={handleAddToCart}
        className="inline-flex flex-1 items-center justify-center rounded-full bg-eco-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-eco-green"
      >
        {t("common.buy")}
      </button>
      <a
        href={whatsappUrl(interestMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-1 items-center justify-center rounded-full border border-eco-forest px-6 py-3 text-sm font-semibold text-eco-forest transition-colors hover:bg-eco-forest/10"
      >
        {t("common.interested")}
      </a>
    </div>
  );
}
