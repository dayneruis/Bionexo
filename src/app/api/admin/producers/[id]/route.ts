import { NextResponse } from "next/server";
import { obtenerSesionActual } from "@/lib/admin-auth";
import { actualizarProductor, validarDatosProductor } from "@/lib/producer";

// Edita los datos de un productor existente (uso interno del panel).
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const sesion = await obtenerSesionActual();
  if (!sesion) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const datos = validarDatosProductor(body);
  if ("error" in datos) {
    return NextResponse.json({ error: datos.error }, { status: 400 });
  }

  await actualizarProductor(id, datos);
  return NextResponse.json({ ok: true });
}
