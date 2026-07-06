import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { obtenerSesionActual } from "@/lib/admin-auth";
import { crearProducto, validarDatosProducto } from "@/lib/admin-products";

// Crea un producto nuevo. Protegida a mano con obtenerSesionActual() porque
// el middleware NO cubre las rutas bajo /api (ver el comentario en admin-auth.ts).
export async function POST(request: Request) {
  const sesion = await obtenerSesionActual();
  if (!sesion) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = await request.json();
  const datos = validarDatosProducto(body);
  if ("error" in datos) {
    return NextResponse.json({ error: datos.error }, { status: 400 });
  }

  try {
    const producto = await crearProducto(datos);
    return NextResponse.json({ id: producto.id }, { status: 201 });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json(
        { error: "Ya existe un producto con ese slug. Elige otro." },
        { status: 409 },
      );
    }
    throw err;
  }
}
