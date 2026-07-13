import { prisma } from "@/lib/db";
import { Prisma } from "@/generated/prisma/client";
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
  // Se arman los distintos filtros como piezas separadas y se unen con AND,
  // porque el filtro geográfico necesita su propio "OR" interno (ver abajo)
  // y no se puede mezclar con el "OR" del filtro de texto en el mismo objeto.
  const filtros: Prisma.ProductWhereInput[] = [];

  // Filtro de texto: busca en nombre y descripción (español e inglés)
  if (options.query?.trim()) {
    const texto = options.query.trim();
    filtros.push({
      OR: [
        { nameEs: { contains: texto } },
        { nameEn: { contains: texto } },
        { descriptionEs: { contains: texto } },
        { descriptionEn: { contains: texto } },
      ],
    });
  }

  // Filtro geográfico: cuando el visitante elige una ubicación, se muestran
  // los productos que cumplan CUALQUIERA de estos 3 casos (OR), porque los
  // tres son formas distintas de "poder comprarlo estando en esa ubicación":
  //   1) Venta nacional (saleZone = "nacional"): se consigue en todo el país,
  //      sin importar la ubicación elegida.
  //   2) Origen: el producto ES de esa ubicación (comportamiento que ya
  //      existía, filtro por originDepartment / originCity).
  //   3) Venta local en ese municipio: el producto tiene saleZone = "local"
  //      y esa ubicación está en su lista de municipios de venta.
  if (options.isInternational) {
    // Internacional: origen internacional O venta internacional.
    filtros.push({ OR: [{ isInternational: true }, { saleZone: "internacional" }] });
  } else if (options.department) {
    const filtroOrigen: Prisma.ProductWhereInput = options.municipality
      ? {
          originDepartment: options.department,
          originCity: options.municipality,
          isInternational: false,
        }
      : { originDepartment: options.department, isInternational: false };

    const filtroVentaLocal: Prisma.ProductWhereInput = {
      saleZone: "local",
      saleMunicipalities: {
        some: options.municipality
          ? { department: options.department, municipality: options.municipality }
          : { department: options.department },
      },
    };

    filtros.push({ OR: [{ saleZone: "nacional" }, filtroOrigen, filtroVentaLocal] });
  }

  // Filtro por categoría (para las páginas de categoría)
  if (options.categoryId) {
    filtros.push({ categoryId: options.categoryId });
  }

  return prisma.product.findMany({
    where: filtros.length > 0 ? { AND: filtros } : {},
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
