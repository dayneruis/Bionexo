import { NextResponse } from "next/server";
import { obtenerSesionActual } from "@/lib/admin-auth";
import { crearProductor, validarDatosProductor } from "@/lib/producer";

// Crea un productor nuevo (uso interno del panel, Fase 3 Parte 4). Protegida a
// mano porque el middleware no cubre /api (ver el resto de rutas /api/admin).
export async function POST(request: Request) {
  const sesion = await obtenerSesionActual();
  if (!sesion) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = await request.json();
  const datos = validarDatosProductor(body);
  if ("error" in datos) {
    return NextResponse.json({ error: datos.error }, { status: 400 });
  }

  const productor = await crearProductor(datos);
  return NextResponse.json({ id: productor.id }, { status: 201 });
}
