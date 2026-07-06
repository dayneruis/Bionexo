import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/db";
import { formatCop } from "@/lib/format";
import { whatsappUrl } from "@/lib/contact-config";
import WhatsAppIcon from "@/components/WhatsAppIcon";

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
// confirmar por WhatsApp al ECOMMERCE (número tomado de contact-config.ts).
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
  const waUrl = whatsappUrl(waMessage);

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

      {/* Botón de confirmación por WhatsApp (abre el chat del ECOMMERCE) */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-eco-forest px-8 py-3 font-semibold text-white transition-colors hover:bg-eco-green"
      >
        <WhatsAppIcon />
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
