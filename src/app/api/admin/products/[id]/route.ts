import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { obtenerSesionActual } from "@/lib/admin-auth";
import {
  actualizarProducto,
  cambiarDisponibilidad,
  validarDatosProducto,
} from "@/lib/admin-products";

// Actualiza todos los datos de un producto (formulario completo de edición).
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
  const datos = validarDatosProducto(body);
  if ("error" in datos) {
    return NextResponse.json({ error: datos.error }, { status: 400 });
  }

  try {
    await actualizarProducto(id, datos);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json(
        { error: "Ya existe un producto con ese slug. Elige otro." },
        { status: 409 },
      );
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2003") {
      return NextResponse.json({ error: "El productor elegido no existe." }, { status: 400 });
    }
    throw err;
  }
}

// Acción rápida desde el listado: marcar disponible / no disponible sin abrir
// el formulario completo.
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const sesion = await obtenerSesionActual();
  if (!sesion) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const { available } = await request.json();
  if (typeof available !== "boolean") {
    return NextResponse.json({ error: "Falta el campo available." }, { status: 400 });
  }

  await cambiarDisponibilidad(id, available);
  return NextResponse.json({ ok: true });
}
