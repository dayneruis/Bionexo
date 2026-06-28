import { prisma } from "@/lib/db";
import type { Locale } from "@/i18n/routing";

// Helpers para leer el catálogo desde la base de datos.
// Los datos del productor y el margen NUNCA se incluyen en estas consultas
// para respetar el modelo de intermediación (esos datos son de uso interno).

export function getCategories() {
  return prisma.category.findMany({ orderBy: { nameEs: "asc" } });
}

export function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { featured: true },
    include: { category: true },
  });
}

export function getProductsByCategoryId(categoryId: string) {
  return prisma.product.findMany({
    where: { categoryId },
    include: { variants: true },
  });
}

export function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    // Se excluye explícitamente el productor para no exponerlo al cliente
    include: { category: true, variants: true },
  });
}

// Búsqueda combinada: filtra por texto, departamento/municipio o internacionalidad.
// Usada por la tienda y por las páginas de categoría cuando hay filtros activos.
// IMPORTANTE: el campo `producer` y `margin` no se incluyen aquí a propósito.
export function searchProducts(options: {
  query?: string;
  department?: string;
  municipality?: string;
  isInternational?: boolean;
  categoryId?: string;
}) {
  return prisma.product.findMany({
    where: {
      // Filtro de texto: busca en nombre y descripción (español e inglés)
      ...(options.query?.trim()
        ? {
            OR: [
              { nameEs: { contains: options.query.trim() } },
              { nameEn: { contains: options.query.trim() } },
              { descriptionEs: { contains: options.query.trim() } },
              { descriptionEn: { contains: options.query.trim() } },
            ],
          }
        : {}),

      // Filtro geográfico
      ...(options.isInternational
        ? { isInternational: true }
        : {
            ...(options.department
              ? { originDepartment: options.department, isInternational: false }
              : {}),
            ...(options.municipality ? { originCity: options.municipality } : {}),
          }),

      // Filtro por categoría (para las páginas de categoría)
      ...(options.categoryId ? { categoryId: options.categoryId } : {}),
    },
    include: { category: true, variants: true },
    orderBy: { nameEs: "asc" },
  });
}

type Localizable = Record<string, unknown>;

export function localize<T extends Localizable>(
  item: T,
  locale: Locale,
): { name: string; description: string } {
  const suffix = locale === "en" ? "En" : "Es";
  return {
    name: String(item[`name${suffix}`] ?? ""),
    description: String(item[`description${suffix}`] ?? ""),
  };
}
