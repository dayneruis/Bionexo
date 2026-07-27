import { NextResponse } from "next/server";
import { verificarCredenciales } from "@/lib/admin-credentials";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_DURATION_SECONDS,
  crearTokenSesion,
} from "@/lib/admin-auth";

// Recibe usuario y contraseña desde el formulario de /admin/login.
// Si son correctos, guarda una cookie de sesión firmada (httpOnly: JavaScript
// del navegador no puede leerla, solo el servidor).
export async function POST(request: Request) {
  const { usuario, contrasena } = await request.json();

  if (typeof usuario !== "string" || typeof contrasena !== "string") {
    return NextResponse.json(
      { error: "Usuario o contraseña incorrectos." },
      { status: 401 },
    );
  }

  // ── DEPURACIÓN TEMPORAL (quitar junto con debug en admin-credentials.ts) ──
  // Se devuelve `debug` en la respuesta para verlo directo en el formulario,
  // sin depender de encontrar los logs de Vercel.
  const { coincide, debug } = verificarCredenciales(usuario, contrasena);
  if (!coincide) {
    return NextResponse.json(
      { error: "Usuario o contraseña incorrectos.", debug },
      { status: 401 },
    );
  }

  const token = await crearTokenSesion(usuario);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ADMIN_SESSION_DURATION_SECONDS,
    path: "/",
  });
  return response;
}
