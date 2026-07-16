// Funciones de uso INTERNO para el panel de administración (Fase 3, Parte 2).
// A diferencia de catalog.ts (que es para la tienda pública), estas funciones
// SÍ devuelven productos no disponibles, porque el admin necesita verlos y
// reactivarlos. NO incluyen todavía producer/margin (eso llega en la Parte 4).

import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import { ZONAS_DE_VENTA, type DatosProducto, type MunicipioVentaInput, type VarianteInput, type ZonaDeVenta } from "@/lib/product-types";

// Los tipos y la lista de zonas viven en product-types.ts (sin Prisma) porque
// el componente de CLIENTE ProductForm.tsx también los necesita. Se
// reexportan aquí para no romper al resto del código de servidor que ya los
// importaba desde este archivo.
export { ZONAS_DE_VENTA };
export type { DatosProducto, MunicipioVentaInput, VarianteInput, ZonaDeVenta };

// Lista todos los productos (disponibles y no disponibles) para el listado del panel.
export function listarProductosAdmin(query?: string) {
  const texto = query?.trim();
  return prisma.product.findMany({
    where: texto
      ? {
          OR: [
            { nameEs: { contains: texto } },
            { nameEn: { contains: texto } },
          ],
        }
      : undefined,
    include: { category: true },
    orderBy: { nameEs: "asc" },
  });
}

// Producto completo (con variantes) para precargar el formulario de edición.
export function getProductoParaEditar(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { variants: true, saleMunicipalities: true },
  });
}

export function crearProducto(datos: DatosProducto) {
  const { saleMunicipalities, variants, ...resto } = datos;
  return prisma.product.create({
    data: {
      ...resto,
      variants: { create: variants },
      saleMunicipalities: { create: saleMunicipalities },
    },
  });
}

// Reemplaza las variantes y municipios de venta existentes por los que llegan
// del formulario: es más simple y confiable que tratar de "adivinar" cuáles cambiaron.
export function actualizarProducto(id: string, datos: DatosProducto) {
  const { saleMunicipalities, variants, ...resto } = datos;
  return prisma.product.update({
    where: { id },
    data: {
      ...resto,
      variants: {
        deleteMany: {},
        create: variants,
      },
      saleMunicipalities: {
        deleteMany: {},
        create: saleMunicipalities,
      },
    },
  });
}

// "Dar de baja" / reactivar: el proyecto no maneja cantidades de inventario,
// solo el estado disponible/no disponible (ver CLAUDE.md, sección 5).
export function cambiarDisponibilidad(id: string, available: boolean) {
  return prisma.product.update({ where: { id }, data: { available } });
}

// Valida y limpia lo que llega del formulario del panel antes de tocar la base
// de datos. Devuelve { error } si algo obligatorio falta o tiene un tipo raro.
export function validarDatosProducto(body: unknown): DatosProducto | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Datos inválidos." };
  }
  const b = body as Record<string, unknown>;

  const camposTexto = ["nameEs", "nameEn", "descriptionEs", "descriptionEn", "categoryId", "slug"] as const;
  for (const campo of camposTexto) {
    if (typeof b[campo] !== "string" || (b[campo] as string).trim() === "") {
      return { error: `Falta el campo obligatorio: ${campo}` };
    }
  }

  if (typeof b.priceCop !== "number" || !Number.isFinite(b.priceCop) || b.priceCop < 0) {
    return { error: "El precio debe ser un número válido mayor o igual a 0." };
  }

  const isInternational = Boolean(b.isInternational);
  if (isInternational) {
    if (typeof b.originCountry !== "string" || !b.originCountry.trim()) {
      return { error: "Falta el país de origen para un producto internacional." };
    }
  } else {
    if (typeof b.originCity !== "string" || !b.originCity.trim()) {
      return { error: "Falta la ciudad de origen." };
    }
    if (typeof b.originDepartment !== "string" || !b.originDepartment.trim()) {
      return { error: "Falta el departamento de origen." };
    }
  }

  const warranty = Boolean(b.warranty);
  const slug = slugify(b.slug as string);
  if (!slug) {
    return { error: "El slug quedó vacío después de limpiarlo. Usa letras y números." };
  }

  // Margen de intermediación: regla de negocio documentada en CLAUDE.md (3–30 %).
  const margin = typeof b.margin === "number" ? b.margin : Number(b.margin);
  if (!Number.isFinite(margin) || margin < 3 || margin > 30) {
    return { error: "El margen debe ser un número entre 3 y 30 (%)." };
  }

  // Unidades disponibles: ajuste manual, entero mayor o igual a 0.
  const stock = typeof b.stock === "number" ? b.stock : Number(b.stock);
  if (!Number.isInteger(stock) || stock < 0) {
    return { error: "Las unidades disponibles deben ser un número entero mayor o igual a 0." };
  }

  const producerId =
    typeof b.producerId === "string" && b.producerId.trim() ? b.producerId.trim() : null;

  // Zona de venta: A DÓNDE se vende el producto (distinto de originCity/originDepartment,
  // que son DE DÓNDE es).
  const saleZone = ZONAS_DE_VENTA.includes(b.saleZone as ZonaDeVenta)
    ? (b.saleZone as ZonaDeVenta)
    : null;
  if (!saleZone) {
    return { error: "La zona de venta debe ser nacional, internacional o local." };
  }

  const saleMunicipalitiesRaw = Array.isArray(b.saleMunicipalities) ? b.saleMunicipalities : [];
  const saleMunicipalities: MunicipioVentaInput[] = saleMunicipalitiesRaw
    .filter(
      (m): m is { department: unknown; municipality: unknown } =>
        typeof m === "object" && m !== null,
    )
    .map((m) => ({
      department: typeof m.department === "string" ? m.department.trim() : "",
      municipality: typeof m.municipality === "string" ? m.municipality.trim() : "",
    }))
    .filter((m) => m.department !== "" && m.municipality !== "");

  if (saleZone === "local" && saleMunicipalities.length === 0) {
    return { error: "Elige al menos un municipio para la zona de venta local." };
  }

  const variantsRaw = Array.isArray(b.variants) ? b.variants : [];
  const variants: VarianteInput[] = variantsRaw
    .filter(
      (v): v is { type: unknown; value: unknown } => typeof v === "object" && v !== null,
    )
    .map((v) => ({
      type: typeof v.type === "string" ? v.type.trim() : "",
      value: typeof v.value === "string" ? v.value.trim() : "",
    }))
    .filter((v) => v.type !== "" && v.value !== "");

  return {
    slug,
    nameEs: (b.nameEs as string).trim(),
    nameEn: (b.nameEn as string).trim(),
    descriptionEs: (b.descriptionEs as string).trim(),
    descriptionEn: (b.descriptionEn as string).trim(),
    priceCop: Math.round(b.priceCop),
    available: Boolean(b.available),
    featured: Boolean(b.featured),
    imageUrl:
      typeof b.imageUrl === "string" && b.imageUrl.trim()
        ? b.imageUrl.trim()
        : `https://picsum.photos/seed/${slug}/600/450`,
    originCity: isInternational ? "" : (b.originCity as string).trim(),
    originDepartment: isInternational ? "" : (b.originDepartment as string).trim(),
    isInternational,
    originCountry: isInternational ? (b.originCountry as string).trim() : null,
    size: typeof b.size === "string" && b.size.trim() ? b.size.trim() : null,
    warranty,
    warrantyDuration:
      warranty && typeof b.warrantyDuration === "string" && b.warrantyDuration.trim()
        ? b.warrantyDuration.trim()
        : null,
    categoryId: b.categoryId as string,
    variants,
    producerId,
    margin,
    stock,
    saleZone,
    // Los municipios locales solo tienen sentido cuando la zona es "local";
    // si cambian de zona sin borrar la lista, igual queda vacía en la base.
    saleMunicipalities: saleZone === "local" ? saleMunicipalities : [],
  };
}
