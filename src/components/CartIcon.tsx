"use client";

import { useCart } from "@/lib/cart";
import { useTranslations } from "next-intl";

// Ícono del carrito en el encabezado. Muestra un badge con la cantidad
// de ítems y al hacer clic abre el cajón lateral (CartDrawer).
export default function CartIcon() {
  const { totalItems, openCart } = useCart();
  const t = useTranslations("cart");

  return (
    <button
      onClick={openCart}
      aria-label={t("open")}
      className="relative flex h-9 w-9 items-center justify-center rounded-full text-eco-forest transition-colors hover:bg-eco-forest/10"
    >
      {/* Ícono de bolsa de compras */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" x2="21" y1="6" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>

      {/* Badge con la cantidad (oculto si el carrito está vacío) */}
      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-eco-green text-[10px] font-bold text-white">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
}
