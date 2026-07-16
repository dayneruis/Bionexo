// Funciones de uso INTERNO para el panel de administración de "Noticias e
// Historias". A diferencia de posts.ts (lectura pública), estas SÍ devuelven
// publicaciones en borrador, porque el admin necesita verlas y editarlas.

import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import { analizarVideoUrl } from "@/lib/video-embed";
import { ESTADOS_POST, type DatosPost, type EstadoPost } from "@/lib/post-types";

// Los tipos y la lista de estados viven en post-types.ts (sin Prisma) porque
// componentes de CLIENTE (PostForm.tsx, TogglePublicadoButton.tsx) también
// los necesitan. Se reexportan aquí para no romper al resto del código de
// servidor que ya los importaba desde este archivo.
export { ESTADOS_POST };
export type { DatosPost, EstadoPost };

// Lista todas las publicaciones (publicadas y borradores) para el listado del panel.
export function listarPostsAdmin(query?: string) {
  const texto = query?.trim();
  return prisma.post.findMany({
    where: texto
      ? {
          OR: [{ titleEs: { contains: texto } }, { titleEn: { contains: texto } }],
        }
      : undefined,
    orderBy: { publishedAt: "desc" },
  });
}

export function getPostParaEditar(id: string) {
  return prisma.post.findUnique({ where: { id } });
}

export function crearPost(datos: DatosPost) {
  return prisma.post.create({ data: datos });
}

export function actualizarPost(id: string, datos: DatosPost) {
  return prisma.post.update({ where: { id }, data: datos });
}

export function borrarPost(id: string) {
  return prisma.post.delete({ where: { id } });
}

// Acción rápida desde el listado: publicar / volver a borrador sin abrir el
// formulario completo (mismo patrón que cambiarDisponibilidad en admin-products.ts).
export function cambiarEstadoPost(id: string, status: EstadoPost) {
  return prisma.post.update({ where: { id }, data: { status } });
}

// Valida y limpia lo que llega del formulario del panel antes de tocar la base
// de datos. Devuelve { error } si algo obligatorio falta o tiene un tipo raro.
export function validarDatosPost(body: unknown): DatosPost | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Datos inválidos." };
  }
  const b = body as Record<string, unknown>;

  const camposTexto = [
    "titleEs",
    "titleEn",
    "summaryEs",
    "summaryEn",
    "contentEs",
    "contentEn",
    "slug",
  ] as const;
  for (const campo of camposTexto) {
    if (typeof b[campo] !== "string" || (b[campo] as string).trim() === "") {
      return { error: `Falta el campo obligatorio: ${campo}` };
    }
  }

  const slug = slugify(b.slug as string);
  if (!slug) {
    return { error: "El slug quedó vacío después de limpiarlo. Usa letras y números." };
  }

  const status = ESTADOS_POST.includes(b.status as EstadoPost) ? (b.status as EstadoPost) : null;
  if (!status) {
    return { error: "El estado debe ser publicado o borrador." };
  }

  const fechaTexto = typeof b.publishedAt === "string" ? b.publishedAt : "";
  const publishedAt = fechaTexto ? new Date(fechaTexto) : new Date();
  if (Number.isNaN(publishedAt.getTime())) {
    return { error: "La fecha de publicación no es válida." };
  }

  // Video incrustado (opcional): si se pegó un enlace, tiene que ser de
  // YouTube o Instagram y reconocerse como tal (ver video-embed.ts). Nunca se
  // sube ningún archivo de video, solo se guarda el enlace.
  const videoUrlTexto = typeof b.videoUrl === "string" ? b.videoUrl.trim() : "";
  if (videoUrlTexto && !analizarVideoUrl(videoUrlTexto)) {
    return {
      error: "El enlace de video no es válido. Debe ser un enlace de YouTube o Instagram.",
    };
  }

  return {
    slug,
    titleEs: (b.titleEs as string).trim(),
    titleEn: (b.titleEn as string).trim(),
    summaryEs: (b.summaryEs as string).trim(),
    summaryEn: (b.summaryEn as string).trim(),
    contentEs: (b.contentEs as string).trim(),
    contentEn: (b.contentEn as string).trim(),
    coverImageUrl:
      typeof b.coverImageUrl === "string" && b.coverImageUrl.trim()
        ? b.coverImageUrl.trim()
        : `https://picsum.photos/seed/${slug}/800/450`,
    videoUrl: videoUrlTexto || null,
    publishedAt,
    status,
  };
}
