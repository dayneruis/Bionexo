import Link from "next/link";
import { obtenerSesionActual } from "@/lib/admin-auth";

// Panel principal: accesos directos a las secciones del panel.
export default async function AdminHomePage() {
  const sesion = await obtenerSesionActual();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-2xl font-bold text-eco-forest">
        Bienvenido al panel de administración
      </h1>
      <p className="text-slate-600">
        Sesión iniciada como <strong>{sesion?.usuario}</strong>.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/productos"
          className="rounded-xl border border-eco-green/20 bg-white p-5 shadow-sm transition-colors hover:border-eco-green"
        >
          <p className="font-bold text-eco-forest">Productos</p>
          <p className="mt-1 text-sm text-slate-500">
            Crear, editar y dar de baja productos, precios, fotos, variantes y origen.
          </p>
        </Link>
        <Link
          href="/admin/productores"
          className="rounded-xl border border-eco-green/20 bg-white p-5 shadow-sm transition-colors hover:border-eco-green"
        >
          <p className="font-bold text-eco-forest">Productores</p>
          <p className="mt-1 text-sm text-slate-500">
            Datos internos de contacto de los proveedores (nunca visibles al cliente).
          </p>
        </Link>
      </div>
    </div>
  );
}
