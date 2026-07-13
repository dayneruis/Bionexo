import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPublishedPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { type Locale } from "@/i18n/routing";
import VideoEmbed from "@/components/VideoEmbed";

// Ficha de lectura completa de una publicación. Solo se muestra si está
// "publicado" (ver posts.ts): un borrador da 404 aunque se adivine la URL.
export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const titulo = locale === "en" ? post.titleEn : post.titleEs;
  const contenido = locale === "en" ? post.contentEn : post.contentEs;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/noticias" className="text-sm text-eco-cyan hover:underline">
        ← {t("common.back")}
      </Link>

      <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-eco-forest/5">
        <Image src={post.coverImageUrl} alt={titulo} fill className="object-cover" sizes="768px" />
      </div>

      <p className="mt-6 text-sm font-semibold text-eco-cyan">{formatDate(post.publishedAt, locale)}</p>
      <h1 className="mt-1 text-3xl font-bold text-eco-forest">{titulo}</h1>

      {/* El contenido se guarda como texto simple (sin editor enriquecido);
          whitespace-pre-wrap conserva los saltos de línea que escribió el admin. */}
      <div className="mt-6 whitespace-pre-wrap text-foreground/80">{contenido}</div>

      {post.videoUrl && (
        <div className="mt-8">
          <VideoEmbed url={post.videoUrl} />
        </div>
      )}
    </div>
  );
}
