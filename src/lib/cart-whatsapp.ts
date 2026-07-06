import { type CartItem } from "@/lib/cart";
import { formatCop } from "@/lib/format";

// Arma el mensaje de WhatsApp para "Hacer mi pedido por WhatsApp": lista los
// productos del carrito (nombre, cantidad y subtotal) y el total general.
// Se usa como vía inmediata de compra mientras la pasarela de pago (Fase 4)
// no está activa. Reutilizado por CartDrawer y CheckoutForm.
export function buildCartWhatsAppMessage(
  items: CartItem[],
  locale: string,
  subtotalCop: number,
): string {
  const lineasProductos = items
    .map((item) => {
      const nombre = locale === "en" ? item.nameEn : item.nameEs;
      const variante = item.variantLabel ? ` (${item.variantLabel})` : "";
      return `  • ${nombre}${variante} ×${item.quantity} = ${formatCop(item.priceCop * item.quantity)}`;
    })
    .join("\n");

  return [
    `🛒 Quiero hacer este pedido en Bionexo:`,
    ``,
    lineasProductos,
    ``,
    `Total: ${formatCop(subtotalCop)}`,
  ].join("\n");
}
