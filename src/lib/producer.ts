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
