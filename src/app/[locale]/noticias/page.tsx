import { getTranslations } from "next-intl/server";
import { getPublishedPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

// Listado público de "Noticias e Historias": artículos y noticias cortas
// sobre economía circular y medio ambiente, e historias motivacionales de la
// marca y de los productores. Solo publicaciones con status "publicado"
// (ver posts.ts), ordenadas de la más reciente a la más antigua.
export default async function NoticiasPage() {
  const t = await getTranslations();
  const posts = await getPublishedPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-eco-forest">{t("news.title")}</h1>
      <p className="mt-2 text-foreground/80">{t("news.subtitle")}</p>

      <div className="mt-8">
        {posts.length === 0 ? (
          <p className="text-foreground/60">{t("news.empty")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
