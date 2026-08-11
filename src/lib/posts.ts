// Lectura PÚBLICA de la sección "Noticias y Historias".
// Mismo principio que catalog.ts: estas funciones solo devuelven publicaciones
// con status "publicado". Un borrador nunca debe ser visible en el sitio
// público, ni siquiera adivinando la URL directa de su ficha.

import { prisma } from "@/lib/db";

export function getPublishedPosts() {
  return prisma.post.findMany({
    where: { status: "publicado" },
    orderBy: { publishedAt: "desc" },
  });
}

export function getPublishedPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: { slug, status: "publicado" },
  });
}

// Últimas publicaciones (para el adelanto de la portada). Mismo criterio de
// solo-publicadas que getPublishedPosts, limitado a `limit` resultados.
export function getRecentPublishedPosts(limit: number) {
  return prisma.post.findMany({
    where: { status: "publicado" },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}
