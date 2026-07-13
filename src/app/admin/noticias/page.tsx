import Link from "next/link";
import { listarPostsAdmin } from "@/lib/admin-posts";
import { formatDate } from "@/lib/format";
import TogglePublicadoButton from "@/components/admin/TogglePublicadoButton";
import DeletePostButton from "@/components/admin/DeletePostButton";

// Listado de TODAS las publicaciones (publicadas y borradores) para el panel.
export default async function AdminNoticiasPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const posts = await listarPostsAdmin(q);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-eco-forest">Noticias e Historias</h1>
        <Link
          href="/admin/noticias/nueva"
          className="rounded-full bg-eco-green px-5 py-2 text-sm font-bold text-white hover:bg-eco-forest"
        >
          + Nueva publicación
        </Link>
      </div>

      {/* Buscador simple por título (GET, sin JavaScript) */}
      <form className="mb-6 flex gap-2">
        <input
          type="text"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Buscar por título..."
          className="w-full max-w-sm rounded-xl border border-eco-forest/20 bg-white px-4 py-2 text-sm focus:border-eco-green focus:outline-none focus:ring-2 focus:ring-eco-green/20"
        />
        <button
          type="submit"
          className="rounded-xl border border-eco-forest/20 bg-white px-4 py-2 text-sm font-semibold text-eco-forest hover:border-eco-green"
        >
          Buscar
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-eco-green/15 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-eco-green/15 bg-eco-cream text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Publicación</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-b border-eco-green/10 last:border-0">
                <td className="px-4 py-3 font-semibold text-eco-forest">{p.titleEs}</td>
                <td className="px-4 py-3 text-slate-500">{formatDate(p.publishedAt, "es")}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      p.status === "publicado"
                        ? "rounded-full bg-eco-green/10 px-2.5 py-1 text-xs font-semibold text-eco-green"
                        : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500"
                    }
                  >
                    {p.status === "publicado" ? "Publicado" : "Borrador"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/noticias/${p.id}/editar`}
                      className="rounded-full border-2 border-eco-forest/20 px-3 py-1 text-xs font-bold text-eco-forest hover:border-eco-forest"
                    >
                      Editar
                    </Link>
                    <TogglePublicadoButton postId={p.id} status={p.status as "publicado" | "borrador"} />
                    <DeletePostButton postId={p.id} titulo={p.titleEs} />
                  </div>
                </td>
              </tr>
            ))}

            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-400">
                  No se encontraron publicaciones.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
