import { useTranslations } from "next-intl";
import { whatsappUrl } from "@/lib/contact-config";

// Botón "Vender en Bionexo": abre WhatsApp del ecommerce con un mensaje
// prellenado para que un proveedor interesado inicie el contacto.
// Se usa tanto en el Header como en el pie de página (Footer).
export default function SellButton({ className }: { className?: string }) {
  const t = useTranslations("common");

  return (
    <a
      href={whatsappUrl(t("sellWhatsappMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "inline-flex items-center justify-center rounded-full border-2 border-eco-green px-4 py-1.5 text-sm font-bold text-eco-green transition-colors hover:bg-eco-green hover:text-white"
      }
    >
      {t("sellButton")}
    </a>
  );
}
