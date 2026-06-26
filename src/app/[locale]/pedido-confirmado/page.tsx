import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/db";
import { formatCop } from "@/lib/format";

// Número de WhatsApp de ejemplo: el dueño debe reemplazarlo por el real.
const WHATSAPP_PHONE = "573000000000";

// Construye el mensaje de WhatsApp con el resumen del pedido.
// El negocio recibe este mensaje del comprador para confirmar y procesar el envío.
function buildWhatsAppMessage(order: {
  id: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  destCity: string;
  destAddress: string;
  subtotalCop: number;
  shippingCop: number;
  totalCop: number;
  items: {
    productNameEs: string;
    quantity: number;
    unitPriceCop: number;
    variantLabel: string | null;
  }[];
}): string {
  const shortId = order.id.slice(-6).toUpperCase();

  const lineasProductos = order.items
    .map((i) => {
      const variante = i.variantLabel ? ` (${i.variantLabel})` : "";
      return `  • ${i.productNameEs}${variante} ×${i.quantity} = ${formatCop(i.unitPriceCop * i.quantity)}`;
    })
    .join("\n");

  return [
    `🛒 Nuevo pedido Bionexo #${shortId}`,
    ``,
    `👤 Cliente: ${order.buyerName}`,
    `📧 Email: ${order.buyerEmail}`,
    `📱 Teléfono: ${order.buyerPhone}`,
    `📍 Ciudad: ${order.destCity}`,
    `🏠 Dirección: ${order.destAddress}`,
    ``,
    `📦 Productos:`,
    lineasProductos,
    ``,
    `Subtotal: ${formatCop(order.subtotalCop)}`,
    `Envío: ${formatCop(order.shippingCop)}`,
    `✅ TOTAL: ${formatCop(order.totalCop)}`,
  ].join("\n");
}

// Página de confirmación: muestra el número de pedido y un botón para
// confirmar por WhatsApp al negocio. Se carga con el ID del pedido en la URL.
export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  if (!id) redirect("/");

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) redirect("/");

  const t = await getTranslations();
  const shortId = order.id.slice(-6).toUpperCase();
  const waMessage = buildWhatsAppMessage(order);
  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      {/* Ícono de éxito */}
      <div className="mb-4 flex justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-eco-forest/10 text-3xl">
          ✅
        </span>
      </div>

      <h1 className="text-2xl font-bold text-eco-forest">
        {t("confirmation.title")}
      </h1>
      <p className="mt-1 text-eco-forest/70">
        {t("confirmation.subtitle", { orderId: shortId })}
      </p>
      <p className="mt-4 text-foreground/70">{t("confirmation.message")}</p>

      {/* Resumen del pedido */}
      <div className="mt-6 rounded-xl border border-eco-forest/10 p-4 text-left text-sm">
        <p className="mb-1 text-foreground/60">
          <strong className="text-eco-forest">{order.buyerName}</strong> ·{" "}
          {order.destCity}
        </p>
        <p className="text-foreground/50">{order.destAddress}</p>
        <hr className="my-2 border-eco-forest/10" />
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-foreground/70">
            <span>
              {item.productNameEs}
              {item.variantLabel ? ` (${item.variantLabel})` : ""} ×{item.quantity}
            </span>
            <span>{formatCop(item.unitPriceCop * item.quantity)}</span>
          </div>
        ))}
        <hr className="my-2 border-eco-forest/10" />
        <div className="flex justify-between font-semibold text-eco-forest">
          <span>Total</span>
          <span>{formatCop(order.totalCop)}</span>
        </div>
      </div>

      {/* Botón de confirmación por WhatsApp */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-eco-forest px-8 py-3 font-semibold text-white transition-colors hover:bg-eco-green"
      >
        {/* Ícono de WhatsApp */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.529 5.842L0 24l6.348-1.499A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 0 1-5.012-1.374l-.36-.213-3.724.879.893-3.626-.234-.372A9.795 9.795 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
        </svg>
        {t("confirmation.whatsappBtn")}
      </a>

      <div className="mt-4">
        <Link
          href="/tienda"
          className="text-sm text-eco-cyan underline-offset-2 hover:underline"
        >
          {t("confirmation.continueShopping")}
        </Link>
      </div>
    </div>
  );
}
