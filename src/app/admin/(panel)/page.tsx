import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, verificarTokenSesion } from "@/lib/admin-auth";

// Panel principal (placeholder de la Parte 1). En las siguientes partes de la
// Fase 3 aquí se agregan los accesos a productos, fotos y productores.
export default async function AdminHomePage() {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  const sesion = await verificarTokenSesion(token);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-2xl font-bold text-eco-forest">
        Bienvenido al panel de administración
      </h1>
      <p className="text-slate-600">
        Sesión iniciada como <strong>{sesion?.usuario}</strong>.
      </p>
      <p className="mt-4 text-sm text-slate-400">
        Aquí se irán agregando la gestión de productos, fotos y productores en
        las siguientes partes de la Fase 3.
      </p>
    </div>
  );
}
