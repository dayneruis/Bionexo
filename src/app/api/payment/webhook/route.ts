import { NextRequest, NextResponse } from "next/server";

// ══════════════════════════════════════════════════════════════════════════════
// WEBHOOK DE PASARELA DE PAGO — PLACEHOLDER PARA FASE 4
// ══════════════════════════════════════════════════════════════════════════════
//
// El proveedor de pagos (Wompi / PayU / ePayco) llama a este endpoint con POST
// cada vez que se confirma, rechaza o cancela un pago. Esta ruta es el punto
// donde en Fase 4 se actualizará el estado del pedido en la base de datos.
//
// PASOS PARA IMPLEMENTAR EN FASE 4:
//   1. Verificar la firma/hash del proveedor para asegurar que el POST es legítimo.
//   2. Leer el ID del pedido y el estado del pago del cuerpo de la petición.
//   3. Llamar a prisma.order.update() para cambiar el estado del pedido.
//   4. Enviar un correo o notificación al comprador si el pago fue confirmado.
//   5. Registrar en logs cualquier evento inesperado.
// ══════════════════════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  // Por ahora solo registramos en consola que llegó un evento.
  // En Fase 4 este bloque se reemplaza por la lógica real del proveedor.
  const body = await request.json().catch(() => ({}));

  console.log("[WEBHOOK PAGO - PLACEHOLDER] Evento recibido:", body);

  // Responder 200 para que el proveedor no reintente el envío.
  return NextResponse.json(
    { ok: true, message: "Webhook recibido. Integración pendiente para Fase 4." },
    { status: 200 },
  );
}
