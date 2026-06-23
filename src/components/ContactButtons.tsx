"use client";

import { useTranslations } from "next-intl";

// Número de WhatsApp de ejemplo: el dueño del negocio debe reemplazarlo por el real.
const WHATSAPP_PHONE_PLACEHOLDER = "573000000000";

function whatsappLink(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// Los dos botones de cada producto. Hoy ambos abren WhatsApp con un mensaje
// pre-llenado distinto; en una fase futura "Comprar" podrá apuntar a una
// pasarela de pago real sin tener que tocar el resto de la ficha de producto.
export default function ContactButtons({ productName }: { productName: string }) {
  const t = useTranslations();

  const buyMessage = t("product.whatsappBuyMessage", { product: productName });
  const interestMessage = t("product.whatsappInterestMessage", { product: productName });

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={whatsappLink(WHATSAPP_PHONE_PLACEHOLDER, buyMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-1 items-center justify-center rounded-full bg-eco-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-eco-green"
      >
        {t("common.buy")}
      </a>
      <a
        href={whatsappLink(WHATSAPP_PHONE_PLACEHOLDER, interestMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-1 items-center justify-center rounded-full border border-eco-forest px-6 py-3 text-sm font-semibold text-eco-forest transition-colors hover:bg-eco-forest/10"
      >
        {t("common.interested")}
      </a>
    </div>
  );
}
