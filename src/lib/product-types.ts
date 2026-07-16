// Tipos y constantes del formulario de producto que también usa el
// componente de CLIENTE ProductForm.tsx. Este archivo NO debe importar nada
// de "@/lib/db" (Prisma/better-sqlite3): ese paquete usa el módulo "fs" de
// Node y no se puede empaquetar para el navegador. Por eso estos tipos viven
// separados de admin-products.ts (que sí usa la base de datos y es SOLO de
// servidor). admin-products.ts los reexporta para el código de servidor.

export type VarianteInput = { type: string; value: string };

// Municipio de venta local: department/municipality se guardan como texto,
// igual que originCity/originDepartment (mismo patrón, sin tabla de códigos).
export type MunicipioVentaInput = { department: string; municipality: string };

export const ZONAS_DE_VENTA = ["nacional", "internacional", "local"] as const;
export type ZonaDeVenta = (typeof ZONAS_DE_VENTA)[number];

export type DatosProducto = {
  slug: string;
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  priceCop: number;
  available: boolean;
  featured: boolean;
  imageUrl: string;
  originCity: string;
  originDepartment: string;
  isInternational: boolean;
  originCountry: string | null;
  size: string | null;
  warranty: boolean;
  warrantyDuration: string | null;
  categoryId: string;
  variants: VarianteInput[];
  // Intermediación (Fase 3, Parte 4): SOLO uso interno, nunca se expone al cliente.
  producerId: string | null;
  margin: number;
  // Unidades disponibles: ajuste manual desde el panel, SÍ visible al cliente
  // en la ficha pública. Si llega a 0, el producto se muestra como no disponible
  // (ver src/lib/availability.ts).
  stock: number;
  // Zona de venta (bloque de cierre de Fase 3): A DÓNDE se vende, distinto del
  // origen (DE DÓNDE es). Ver comentario en prisma/schema.prisma.
  saleZone: ZonaDeVenta;
  saleMunicipalities: MunicipioVentaInput[];
};
