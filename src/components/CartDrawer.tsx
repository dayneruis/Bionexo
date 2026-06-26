"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart";
import { formatCop } from "@/lib/format";

// Cajón lateral que muestra el contenido del carrito.
// Se abre desde CartIcon y se cierra con el botón ✕, la tecla Escape
// o haciendo clic en el fondo oscuro.
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

  // Cerrar el cajón con la tecla Escape.
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
      {/* Fondo oscuro semitransparente que cierra el cajón al hacer clic */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Cajón lateral derecho */}
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl">
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b border-eco-forest/10 px-4 py-3">
          <h2 className="font-semibold text-eco-forest">
            {t("cart.title")} ({totalItems})
          </h2>
          <button
            onClick={closeCart}
            aria-label={t("cart.close")}
            className="rounded-full p-1 text-foreground/50 hover:bg-eco-forest/10 hover:text-eco-forest"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Lista de ítems (con scroll si son muchos) */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center text-foreground/50">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" x2="21" y1="6" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="text-sm">{t("cart.empty")}</p>
              <button
                onClick={closeCart}
                className="text-sm text-eco-cyan underline-offset-2 hover:underline"
              >
                {t("cart.continueShopping")}
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => {
                const name = locale === "en" ? item.nameEn : item.nameEs;
                const key = `${item.id}__${item.variantLabel ?? ""}`;
                return (
                  <li key={key} className="flex gap-3">
                    {/* Miniatura del producto */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-eco-forest/5">
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
                      <p className="text-sm font-medium leading-tight">{name}</p>
                      {item.variantLabel && (
                        <p className="text-xs text-foreground/50">{item.variantLabel}</p>
                      )}
                      <p className="text-xs text-foreground/40">📍 {item.originCity}</p>

                      <div className="flex items-center justify-between">
                        {/* Selector de cantidad */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              cambiarCantidad(item.id, item.variantLabel, item.quantity - 1)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-eco-forest/20 text-sm hover:border-eco-forest"
                            aria-label="Disminuir cantidad"
                          >
                            −
                          </button>
                          <span className="w-5 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              cambiarCantidad(item.id, item.variantLabel, item.quantity + 1)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-eco-forest/20 text-sm hover:border-eco-forest"
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-eco-forest">
                          {formatCop(item.priceCop * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Botón quitar ítem */}
                    <button
                      onClick={() => quitar(item.id, item.variantLabel)}
                      aria-label={t("cart.remove")}
                      className="self-start pt-0.5 text-foreground/30 transition-colors hover:text-red-500"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
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

        {/* Pie del cajón: subtotal + botón de checkout */}
        {items.length > 0 && (
          <div className="border-t border-eco-forest/10 px-4 py-4">
            <div className="mb-3 flex justify-between text-sm">
              <span className="text-foreground/70">{t("cart.subtotal")}</span>
              <span className="font-bold text-eco-forest">{formatCop(subtotalCop)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full rounded-full bg-eco-forest py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-eco-green"
            >
              {t("cart.goToCheckout")}
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
