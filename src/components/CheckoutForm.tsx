"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useCart } from "@/lib/cart";
import { type DetalleEnvio } from "@/lib/shipping";
import { formatCop } from "@/lib/format";
import ShippingCalculator from "./ShippingCalculator";

// Formulario completo del checkout: resumen del carrito, calculador de envío
// y datos del comprador. Al confirmar guarda el pedido en la BD y muestra
// el enlace de WhatsApp en la página de confirmación.
export default function CheckoutForm() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { items, subtotalCop, vaciar } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [shippingCop, setShippingCop] = useState(0);
  const [shippingDetail, setShippingDetail] = useState<DetalleEnvio[]>([]);
  const [destCity, setDestCity] = useState("");
  const [isInternacional, setIsInternacional] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalCop = subtotalCop + shippingCop;
  const destOk = destCity.trim() !== "" || isInternacional;
  const canSubmit = name && email && phone && address && destOk && !loading;

  function handleShippingChange(
    total: number,
    city: string,
    intl: boolean,
    detalle: DetalleEnvio[],
  ) {
    setShippingCop(total);
    setDestCity(city);
    setIsInternacional(intl);
    setShippingDetail(detalle);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerName: name,
          buyerEmail: email,
          buyerPhone: phone,
          destCity: isInternacional ? "Internacional" : destCity,
          destAddress: address,
          isInternacional,
          items: items.map((i) => ({
            productId: i.id,
            productNameEs: i.nameEs,
            productNameEn: i.nameEn,
            originCity: i.originCity,
            variantLabel: i.variantLabel ?? null,
            unitPriceCop: i.priceCop,
            quantity: i.quantity,
          })),
          shippingCop,
          shippingDetail: JSON.stringify(shippingDetail),
          subtotalCop,
          totalCop,
        }),
      });

      if (!res.ok) throw new Error("Error del servidor");
      const { orderId } = (await res.json()) as { orderId: string };

      vaciar();
      router.push(`/pedido-confirmado?id=${orderId}`);
    } catch {
      setError(t("checkout.errorSubmit"));
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-eco-cream">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-eco-forest/40" aria-hidden="true">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" x2="21" y1="6" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <p className="text-foreground/60">{t("checkout.emptyCart")}</p>
        <Link
          href="/tienda"
          className="mt-4 inline-block rounded-full bg-eco-forest px-6 py-2.5 text-sm font-semibold text-white hover:bg-eco-green"
        >
          {t("checkout.goToShop")}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-2">

      {/* ── Columna izquierda: resumen del carrito + envío ── */}
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-bold text-eco-forest">{t("checkout.summary")}</h2>

        {/* Lista de ítems */}
        <ul className="flex flex-col gap-3">
          {items.map((item) => {
            const itemName = locale === "en" ? item.nameEn : item.nameEs;
            return (
              <li
                key={`${item.id}__${item.variantLabel ?? ""}`}
                className="flex gap-3 rounded-xl border border-eco-forest/10 bg-white p-3 shadow-sm"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-eco-cream">
                  <Image
                    src={item.imageUrl}
                    alt={itemName}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-semibold text-eco-forest">{itemName}</p>
                  {item.variantLabel && (
                    <p className="text-xs text-foreground/50">{item.variantLabel}</p>
                  )}
                  <p className="text-xs text-foreground/40">
                    📍 {t("product.originCity")}: {item.originCity}
                  </p>
                </div>
                <div className="shrink-0 text-right text-sm">
                  <p className="font-bold text-eco-forest">
                    {formatCop(item.priceCop * item.quantity)}
                  </p>
                  <p className="text-xs text-foreground/40">×{item.quantity}</p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Calculador de envío */}
        <ShippingCalculator items={items} onShippingChange={handleShippingChange} />

        {/* Cuadro de totales */}
        <div className="rounded-xl border border-eco-forest/15 bg-eco-cream p-5 text-sm">
          <div className="flex justify-between text-foreground/70">
            <span>{t("checkout.subtotal")}</span>
            <span>{formatCop(subtotalCop)}</span>
          </div>
          <div className="mt-1 flex justify-between text-foreground/70">
            <span>{t("checkout.shipping")}</span>
            <span>{shippingCop > 0 ? formatCop(shippingCop) : "—"}</span>
          </div>
          <hr className="my-3 border-eco-forest/10" />
          <div className="flex justify-between text-base font-extrabold text-eco-forest">
            <span>{t("checkout.total")}</span>
            <span>{formatCop(totalCop)}</span>
          </div>
        </div>
      </div>

      {/* ── Columna derecha: datos del comprador ── */}
      <div className="flex flex-col gap-5">
        <h2 className="text-lg font-bold text-eco-forest">{t("checkout.buyerInfo")}</h2>

        {/* Campo de texto reutilizable inline */}
        {[
          { id: "co-name",    label: t("checkout.name"),    value: name,    set: setName,    type: "text" },
          { id: "co-email",   label: t("checkout.email"),   value: email,   set: setEmail,   type: "email" },
          { id: "co-phone",   label: t("checkout.phone"),   value: phone,   set: setPhone,   type: "tel" },
          { id: "co-address", label: t("checkout.address"), value: address, set: setAddress, type: "text" },
        ].map(({ id, label, value, set, type }) => (
          <div key={id}>
            <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-eco-forest">
              {label}
            </label>
            <input
              id={id}
              type={type}
              value={value}
              onChange={(e) => set(e.target.value)}
              required
              className="w-full rounded-xl border border-eco-forest/20 bg-white px-4 py-3 text-sm placeholder:text-foreground/30 focus:border-eco-green focus:outline-none focus:ring-2 focus:ring-eco-green/20"
            />
          </div>
        ))}

        {/* Aviso si falta ciudad */}
        {!destOk && (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
            ⚠️ {t("checkout.needCity")}
          </p>
        )}

        {/* Error del servidor */}
        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* ── PUNTO DE INTEGRACIÓN PASARELA (Fase 4) ──────────────────────────
            En Fase 4 se reemplaza este bloque por el SDK de Wompi / PayU / ePayco.
            Ver: src/lib/payment-config.ts para la configuración del proveedor.
            El webhook de confirmación está en: src/app/api/payment/webhook/route.ts
        ──────────────────────────────────────────────────────────────────────── */}
        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-2 w-full rounded-full bg-eco-forest py-4 text-sm font-bold text-white shadow-lg hover:bg-eco-green disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? t("checkout.processing") : t("checkout.confirm")}
        </button>

        <p className="text-center text-xs text-foreground/50">
          {t("checkout.paymentNote")}
        </p>
      </div>
    </form>
  );
}
