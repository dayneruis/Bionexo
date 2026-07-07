// Funciones de uso INTERNO para consultar datos del productor.
// NUNCA llamar estas funciones desde páginas o APIs públicas del cliente.
// Uso reservado para: reportes internos y panel de administración (Fase 3).

import { prisma } from "@/lib/db";

// Devuelve el productor asignado a un producto, junto con los datos del producto.
export function getProductoConProductor(productId: string) {
  return prisma.product.findUnique({
    where: { id: productId },
    include: { producer: true },
  });
}

// Lista todos los productores registrados con el conteo de productos que tienen asignados.
export function listarProductores() {
  return prisma.producer.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });
}

// Devuelve todos los productos de un productor específico con su margen de intermediación.
// Usado en reportes internos de cobro.
export function getProductosDeProductor(producerId: string) {
  return prisma.product.findMany({
    where: { producerId },
    select: {
      id: true,
      nameEs: true,
      priceCop: true,
      margin: true,
      available: true,
    },
  });
}

// ─── Gestión desde el panel (Fase 3, Parte 4) ────────────────────────────────

export type DatosProductor = {
  name: string;
  contactName: string;
  phone: string;
  email: string | null;
  notes: string | null;
};

export function crearProductor(datos: DatosProductor) {
  return prisma.producer.create({ data: datos });
}

export function actualizarProductor(id: string, datos: DatosProductor) {
  return prisma.producer.update({ where: { id }, data: datos });
}

// Productor completo para precargar el formulario de edición del panel.
export function getProductorParaEditar(id: string) {
  return prisma.producer.findUnique({ where: { id } });
}

// Valida y limpia lo que llega del formulario de productor antes de tocar la
// base de datos (mismo patrón que validarDatosProducto en admin-products.ts).
export function validarDatosProductor(body: unknown): DatosProductor | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Datos inválidos." };
  }
  const b = body as Record<string, unknown>;

  const camposTexto = ["name", "contactName", "phone"] as const;
  for (const campo of camposTexto) {
    if (typeof b[campo] !== "string" || (b[campo] as string).trim() === "") {
      return { error: `Falta el campo obligatorio: ${campo}` };
    }
  }

  return {
    name: (b.name as string).trim(),
    contactName: (b.contactName as string).trim(),
    phone: (b.phone as string).trim(),
    email: typeof b.email === "string" && b.email.trim() ? b.email.trim() : null,
    notes: typeof b.notes === "string" && b.notes.trim() ? b.notes.trim() : null,
  };
}
