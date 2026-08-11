import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getRecentPublishedPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { type Locale } from "@/i18n/routing";

// Adelanto de "Noticias e Historias" en la portada: las 2-3 publicaciones más
// recientes, en tarjetas más pequeñas que las del listado completo (/noticias).
// Si no hay ninguna publicación publicada, la sección no se muestra.
export default async function HomeNewsPreview() {
  const posts = await getRecentPublishedPosts(3);
  if (posts.length === 0) {
    return null;
  }

  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;

  return (
    <section className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-eco-forest">{t("home.newsTitle")}</h2>
        <Link href="/noticias" className="text-sm font-semibold text-eco-cyan hover:underline">
          {t("home.newsSeeAll")}
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const titulo = locale === "en" ? post.titleEn : post.titleEs;
          const resumen = locale === "en" ? post.summaryEn : post.summaryEs;
          return (
            <Link
              key={post.id}
              href={`/noticias/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-eco-green/20 bg-white shadow-sm transition-all hover:border-eco-green/50 hover:shadow-lg"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-eco-cream">
                <Image
                  src={post.coverImageUrl}
                  alt={titulo}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1 p-4">
                <p className="text-xs font-semibold text-eco-cyan">
                  {formatDate(post.publishedAt, locale)}
                </p>
                <h3 className="line-clamp-2 font-bold leading-snug text-eco-forest group-hover:text-eco-green">
                  {titulo}
                </h3>
                <p className="line-clamp-2 text-sm text-slate-600">{resumen}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
