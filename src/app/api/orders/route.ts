import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Cuerpo esperado del POST de checkout.
type OrderBody = {
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  destCity: string;
  destAddress: string;
  isInternacional: boolean;
  items: {
    productId: string;
    productNameEs: string;
    productNameEn: string;
    originCity: string;
    variantLabel: string | null;
    unitPriceCop: number;
    quantity: number;
  }[];
  shippingCop: number;
  shippingDetail: string; // JSON serializado del desglose por zona
  subtotalCop: number;
  totalCop: number;
};

// Recibe el pedido del checkout, lo guarda en la BD y devuelve el ID.
// El cliente usa ese ID para redirigir a la página de confirmación.
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OrderBody;

    const order = await prisma.order.create({
      data: {
        buyerName: body.buyerName,
        buyerEmail: body.buyerEmail,
        buyerPhone: body.buyerPhone,
        destCity: body.destCity,
        destAddress: body.destAddress,
        isInternational: body.isInternacional,
        shippingCop: body.shippingCop,
        shippingDetail: body.shippingDetail,
        subtotalCop: body.subtotalCop,
        totalCop: body.totalCop,
        items: {
          create: body.items.map((item) => ({
            productId: item.productId,
            productNameEs: item.productNameEs,
            productNameEn: item.productNameEn,
            originCity: item.originCity,
            variantLabel: item.variantLabel,
            unitPriceCop: item.unitPriceCop,
            quantity: item.quantity,
          })),
        },
      },
    });

    return NextResponse.json({ orderId: order.id }, { status: 201 });
  } catch (err) {
    console.error("[orders] Error al crear pedido:", err);
    return NextResponse.json(
      { error: "No se pudo crear el pedido" },
      { status: 500 },
    );
  }
}
