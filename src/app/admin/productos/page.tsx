import Link from "next/link";
import { listarProductosAdmin } from "@/lib/admin-products";
import { formatCop } from "@/lib/format";
import ToggleDisponibleButton from "@/components/admin/ToggleDisponibleButton";

// Listado de TODOS los productos (disponibles y no disponibles) para el panel.
export default async function AdminProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const productos = await listarProductosAdmin(q);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-eco-forest">Productos</h1>
        <Link
          href="/admin/productos/nuevo"
          className="rounded-full bg-eco-green px-5 py-2 text-sm font-bold text-white hover:bg-eco-forest"
        >
          + Nuevo producto
        </Link>
      </div>

      {/* Buscador simple por nombre (GET, sin JavaScript) */}
      <form className="mb-6 flex gap-2">
        <input
          type="text"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Buscar por nombre..."
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
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Unidades</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id} className="border-b border-eco-green/10 last:border-0">
                <td className="px-4 py-3 font-semibold text-eco-forest">{p.nameEs}</td>
                <td className="px-4 py-3 text-slate-500">{p.category.nameEs}</td>
                <td className="px-4 py-3 text-slate-600">{formatCop(p.priceCop)}</td>
                <td className="px-4 py-3 text-slate-600">
                  {p.stock}
                  {p.stock === 0 && (
                    <span className="ml-1.5 text-xs text-amber-600">(agotado)</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      p.available
                        ? "rounded-full bg-eco-green/10 px-2.5 py-1 text-xs font-semibold text-eco-green"
                        : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500"
                    }
                  >
                    {p.available ? "Disponible" : "No disponible"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/productos/${p.id}/editar`}
                      className="rounded-full border-2 border-eco-forest/20 px-3 py-1 text-xs font-bold text-eco-forest hover:border-eco-forest"
                    >
                      Editar
                    </Link>
                    <ToggleDisponibleButton productId={p.id} available={p.available} />
                  </div>
                </td>
              </tr>
            ))}

            {productos.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-400">
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
