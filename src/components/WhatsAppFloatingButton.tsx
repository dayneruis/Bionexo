"use client";

import { useTranslations } from "next-intl";
import { whatsappUrl } from "@/lib/contact-config";
import WhatsAppIcon from "./WhatsAppIcon";

// Botón flotante fijo en la esquina inferior derecha, visible en todas las
// páginas (se monta una sola vez en el layout raíz). Es para consultas
// generales, distinto del botón "Hacer mi pedido por WhatsApp" del carrito.
export default function WhatsAppFloatingButton() {
  const t = useTranslations("common");

  return (
    <a
      href={whatsappUrl(t("generalWhatsappMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("chatWhatsapp")}
      title={t("chatWhatsapp")}
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
