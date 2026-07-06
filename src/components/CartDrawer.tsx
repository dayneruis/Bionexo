"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart";
import { formatCop } from "@/lib/format";
import { whatsappUrl } from "@/lib/contact-config";
import { buildCartWhatsAppMessage } from "@/lib/cart-whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

// Cajón lateral del carrito: se abre desde CartIcon.
// Se cierra con el botón ✕, la tecla Escape o haciendo clic en el fondo oscuro.
export default function CartDrawer() {
  const {
    items,
    totalItems,
    subtotalCop,
    isOpen,
    closeCart,
    quitar,
    cambiarCantidad,
  } = useCart();
  const t = useTranslations();
  const locale = useLocale();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeCart]);

  if (!isOpen) return null;

  return (
    <>
      {/* Fondo oscuro */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Cajón lateral derecho */}
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl">

        {/* Encabezado con banda de color */}
        <div className="flex items-center justify-between bg-eco-forest px-5 py-4">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" x2="21" y1="6" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <h2 className="font-semibold text-white">
              {t("cart.title")}
              {totalItems > 0 && (
                <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                  {totalItems}
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label={t("cart.close")}
            className="rounded-full p-1.5 text-white/70 hover:bg-white/20 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Lista de ítems */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center text-slate-400">
              <div className="rounded-full bg-eco-cream p-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <p className="text-sm font-medium">{t("cart.empty")}</p>
              <button
                onClick={closeCart}
                className="rounded-full border border-eco-forest/20 px-4 py-2 text-sm text-eco-forest hover:border-eco-forest hover:bg-eco-forest/5"
              >
                {t("cart.continueShopping")}
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((item) => {
                const name = locale === "en" ? item.nameEn : item.nameEs;
                const key = `${item.id}__${item.variantLabel ?? ""}`;
                return (
                  <li key={key} className="flex gap-3 rounded-xl border border-eco-green/20 bg-white p-3 shadow-sm">
                    {/* Miniatura */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-eco-cream">
                      <Image
                        src={item.imageUrl}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Datos y controles */}
                    <div className="flex flex-1 flex-col gap-1">
                      <p className="text-sm font-semibold leading-tight text-eco-forest">{name}</p>
                      {item.variantLabel && (
                        <p className="text-xs text-slate-400">{item.variantLabel}</p>
                      )}
                      <p className="text-xs text-slate-400">📍 {item.originCity}</p>

                      <div className="mt-1 flex items-center justify-between">
                        {/* Selector de cantidad */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => cambiarCantidad(item.id, item.variantLabel, item.quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-eco-forest/20 text-sm hover:border-eco-forest hover:bg-eco-forest/5"
                            aria-label="Disminuir cantidad"
                          >
                            −
                          </button>
                          <span className="w-5 text-center text-sm font-bold text-eco-forest">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => cambiarCantidad(item.id, item.variantLabel, item.quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-eco-forest/20 text-sm hover:border-eco-forest hover:bg-eco-forest/5"
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-bold text-eco-forest">
                          {formatCop(item.priceCop * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Botón quitar */}
                    <button
                      onClick={() => quitar(item.id, item.variantLabel)}
                      aria-label={t("cart.remove")}
                      className="self-start rounded-full p-1 text-slate-300 hover:bg-red-50 hover:text-red-500"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Pie del cajón: subtotal + botón */}
        {items.length > 0 && (
          <div className="border-t border-eco-forest/10 bg-eco-forest/3 px-5 py-5">
            <div className="mb-4 flex justify-between">
              <span className="text-sm text-slate-500">{t("cart.subtotal")}</span>
              <span className="text-lg font-extrabold text-eco-forest">{formatCop(subtotalCop)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full rounded-full bg-eco-green py-3.5 text-center text-sm font-bold text-white shadow-lg hover:bg-eco-forest"
            >
              {t("cart.goToCheckout")} →
            </Link>

            {/* Vía inmediata de compra mientras la pasarela de pago (Fase 4)
                no está activa: arma un mensaje de WhatsApp con la lista del carrito. */}
            <a
              href={whatsappUrl(buildCartWhatsAppMessage(items, locale, subtotalCop))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border-2 border-eco-green py-3 text-center text-sm font-bold text-eco-green transition-colors hover:bg-eco-green hover:text-white"
            >
              <WhatsAppIcon size={16} />
              {t("common.orderWhatsappButton")}
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
