import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Post } from "@/generated/prisma/client";
import { formatDate } from "@/lib/format";
import { type Locale } from "@/i18n/routing";

// Tarjeta resumida de una publicación para el listado de Noticias e Historias.
// Mismo patrón visual que ProductCard/CategoryCard: foto pareja + texto corto.
export default function PostCard({ post }: { post: Post }) {
  const locale = useLocale() as Locale;
  const titulo = locale === "en" ? post.titleEn : post.titleEs;
  const resumen = locale === "en" ? post.summaryEn : post.summaryEs;

  return (
    <Link
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
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-semibold text-eco-cyan">{formatDate(post.publishedAt, locale)}</p>
        <h3 className="font-bold leading-snug text-eco-forest group-hover:text-eco-green">
          {titulo}
        </h3>
        <p className="text-sm text-slate-600">{resumen}</p>
      </div>
    </Link>
  );
}
