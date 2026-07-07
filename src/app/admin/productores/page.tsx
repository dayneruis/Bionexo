import Link from "next/link";
import { listarProductores } from "@/lib/producer";

// Listado de productores para el panel. Uso interno: nunca visible en la tienda pública.
export default async function AdminProductoresPage() {
  const productores = await listarProductores();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-eco-forest">Productores</h1>
        <Link
          href="/admin/productores/nuevo"
          className="rounded-full bg-eco-green px-5 py-2 text-sm font-bold text-white hover:bg-eco-forest"
        >
          + Nuevo productor
        </Link>
      </div>
      <p className="mb-6 text-sm text-slate-400">
        Datos de uso interno: nunca se muestran en la tienda pública.
      </p>

      <div className="overflow-x-auto rounded-2xl border border-eco-green/15 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-eco-green/15 bg-eco-cream text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Contacto</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3">Productos</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productores.map((p) => (
              <tr key={p.id} className="border-b border-eco-green/10 last:border-0">
                <td className="px-4 py-3 font-semibold text-eco-forest">{p.name}</td>
                <td className="px-4 py-3 text-slate-500">{p.contactName}</td>
                <td className="px-4 py-3 text-slate-600">{p.phone}</td>
                <td className="px-4 py-3 text-slate-600">{p._count.products}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/productores/${p.id}/editar`}
                    className="rounded-full border-2 border-eco-forest/20 px-3 py-1 text-xs font-bold text-eco-forest hover:border-eco-forest"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}

            {productores.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                  No hay productores registrados todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
