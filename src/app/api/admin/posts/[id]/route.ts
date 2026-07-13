import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { obtenerSesionActual } from "@/lib/admin-auth";
import {
  actualizarPost,
  borrarPost,
  cambiarEstadoPost,
  ESTADOS_POST,
  validarDatosPost,
  type EstadoPost,
} from "@/lib/admin-posts";

// Actualiza todos los datos de una publicación (formulario completo de edición).
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
  const datos = validarDatosPost(body);
  if ("error" in datos) {
    return NextResponse.json({ error: datos.error }, { status: 400 });
  }

  try {
    await actualizarPost(id, datos);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json(
        { error: "Ya existe una publicación con ese slug. Elige otro." },
        { status: 409 },
      );
    }
    throw err;
  }
}

// Acción rápida desde el listado: publicar / volver a borrador sin abrir el
// formulario completo.
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const sesion = await obtenerSesionActual();
  if (!sesion) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();
  if (!ESTADOS_POST.includes(status as EstadoPost)) {
    return NextResponse.json({ error: "Falta un estado válido (publicado/borrador)." }, { status: 400 });
  }

  await cambiarEstadoPost(id, status as EstadoPost);
  return NextResponse.json({ ok: true });
}

// Borra la publicación de forma permanente (a diferencia de los productos, aquí
// sí tiene sentido borrar de verdad: no hay pedidos ni otros datos que dependan
// de una publicación).
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const sesion = await obtenerSesionActual();
  if (!sesion) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id } = await params;
  await borrarPost(id);
  return NextResponse.json({ ok: true });
}
