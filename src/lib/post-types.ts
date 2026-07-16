// Tipos y constantes del formulario de publicación que también usa el
// componente de CLIENTE PostForm.tsx (y TogglePublicadoButton.tsx). Este
// archivo NO debe importar nada de "@/lib/db" (Prisma/better-sqlite3): ese
// paquete usa el módulo "fs" de Node y no se puede empaquetar para el
// navegador. Por eso viven separados de admin-posts.ts (que sí usa la base
// de datos y es SOLO de servidor). admin-posts.ts los reexporta para el
// código de servidor.

export const ESTADOS_POST = ["publicado", "borrador"] as const;
export type EstadoPost = (typeof ESTADOS_POST)[number];

export type DatosPost = {
  slug: string;
  titleEs: string;
  titleEn: string;
  summaryEs: string;
  summaryEn: string;
  contentEs: string;
  contentEn: string;
  coverImageUrl: string;
  videoUrl: string | null;
  publishedAt: Date;
  status: EstadoPost;
};
