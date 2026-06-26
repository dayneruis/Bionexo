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
// y datos del comprador. Al confirmar, guarda el pedido en la BD y abre
// WhatsApp en la página de confirmación.
export default function CheckoutForm() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { items, subtotalCop, vaciar } = useCart();

  // Datos del comprador
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Resultado del calculador de envío
  const [shippingCop, setShippingCop] = useState(0);
  const [shippingDetail, setShippingDetail] = useState<DetalleEnvio[]>([]);
  const [destCity, setDestCity] = useState("");
  const [isInternacional, setIsInternacional] = useState(false);

  // Estado de la petición
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalCop = subtotalCop + shippingCop;
  const destOk = destCity.trim() !== "" || isInternacional;
  const canSubmit = name && email && phone && address && destOk && !loading;

  // El ShippingCalculator llama a esto cada vez que el usuario cambia la ciudad.
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

      vaciar(); // Limpiar el carrito después de confirmar el pedido.
      router.push(`/pedido-confirmado?id=${orderId}`);
    } catch {
      setError(t("checkout.errorSubmit"));
      setLoading(false);
    }
  }

  // Si el carrito está vacío, mostrar mensaje y enlace a la tienda.
  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-foreground/60">{t("checkout.emptyCart")}</p>
        <Link
          href="/tienda"
          className="mt-4 inline-block text-eco-cyan underline-offset-2 hover:underline"
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
        <h2 className="font-semibold text-eco-forest">{t("checkout.summary")}</h2>

        {/* Lista de ítems del carrito */}
        <ul className="flex flex-col gap-3">
          {items.map((item) => {
            const itemName = locale === "en" ? item.nameEn : item.nameEs;
            return (
              <li
                key={`${item.id}__${item.variantLabel ?? ""}`}
                className="flex gap-3 rounded-xl border border-eco-forest/10 p-3"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-eco-forest/5">
                  <Image
                    src={item.imageUrl}
                    alt={itemName}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-medium">{itemName}</p>
                  {item.variantLabel && (
                    <p className="text-xs text-foreground/50">{item.variantLabel}</p>
                  )}
                  <p className="text-xs text-foreground/40">
                    📍 {t("product.originCity")}: {item.originCity}
                  </p>
                </div>
                <div className="shrink-0 text-right text-sm">
                  <p className="font-semibold text-eco-forest">
                    {formatCop(item.priceCop * item.quantity)}
                  </p>
                  <p className="text-xs text-foreground/40">×{item.quantity}</p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Calculador de envío origen-destino */}
        <ShippingCalculator items={items} onShippingChange={handleShippingChange} />

        {/* Resumen de totales */}
        <div className="rounded-xl border border-eco-forest/20 p-4 text-sm">
          <div className="flex justify-between text-foreground/70">
            <span>{t("checkout.subtotal")}</span>
            <span>{formatCop(subtotalCop)}</span>
          </div>
          <div className="flex justify-between text-foreground/70">
            <span>{t("checkout.shipping")}</span>
            <span>{shippingCop > 0 ? formatCop(shippingCop) : "—"}</span>
          </div>
          <hr className="my-2 border-eco-forest/10" />
          <div className="flex justify-between text-base font-bold text-eco-forest">
            <span>{t("checkout.total")}</span>
            <span>{formatCop(totalCop)}</span>
          </div>
        </div>
      </div>

      {/* ── Columna derecha: datos del comprador ── */}
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-eco-forest">{t("checkout.buyerInfo")}</h2>

        {/* Nombre */}
        <div>
          <label htmlFor="co-name" className="mb-1 block text-sm font-medium text-eco-forest">
            {t("checkout.name")}
          </label>
          <input
            id="co-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border border-eco-forest/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-forest/30"
          />
        </div>

        {/* Correo */}
        <div>
          <label htmlFor="co-email" className="mb-1 block text-sm font-medium text-eco-forest">
            {t("checkout.email")}
          </label>
          <input
            id="co-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-eco-forest/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-forest/30"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="co-phone" className="mb-1 block text-sm font-medium text-eco-forest">
            {t("checkout.phone")}
          </label>
          <input
            id="co-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full rounded-lg border border-eco-forest/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-forest/30"
          />
        </div>

        {/* Dirección de entrega */}
        <div>
          <label htmlFor="co-address" className="mb-1 block text-sm font-medium text-eco-forest">
            {t("checkout.address")}
          </label>
          <input
            id="co-address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Calle 45 # 23-10, Apto 301"
            className="w-full rounded-lg border border-eco-forest/20 px-3 py-2 text-sm placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-eco-forest/30"
          />
        </div>

        {/* Aviso si falta la ciudad de destino */}
        {!destOk && (
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
            {t("checkout.needCity")}
          </p>
        )}

        {/* Error de envío del formulario */}
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}

        {/* Botón de confirmación */}
        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-2 w-full rounded-full bg-eco-forest py-3 text-sm font-semibold text-white transition-colors hover:bg-eco-green disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? t("checkout.processing") : t("checkout.confirm")}
        </button>
      </div>
    </form>
  );
}
