import { prisma } from "@/lib/db";
import type { Locale } from "@/i18n/routing";

// Estos helpers leen el catálogo desde la base de datos y ya devuelven
// los textos (nombre/descripción) en el idioma que pidió la página,
// para que los componentes no tengan que preocuparse por es/en.

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
    include: { category: true, variants: true },
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
