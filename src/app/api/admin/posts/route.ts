import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { obtenerSesionActual } from "@/lib/admin-auth";
import { crearPost, validarDatosPost } from "@/lib/admin-posts";

// Crea una publicación nueva. Protegida a mano con obtenerSesionActual()
// porque el middleware NO cubre las rutas bajo /api (ver admin-auth.ts).
export async function POST(request: Request) {
  const sesion = await obtenerSesionActual();
  if (!sesion) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = await request.json();
  const datos = validarDatosPost(body);
  if ("error" in datos) {
    return NextResponse.json({ error: datos.error }, { status: 400 });
  }

  try {
    const post = await crearPost(datos);
    return NextResponse.json({ id: post.id }, { status: 201 });
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
