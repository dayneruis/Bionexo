// Manejo de la sesión del panel de administración (Fase 3, Parte 1).
// Usa `jose` (en vez de una librería más pesada tipo NextAuth) porque el panel
// tiene un solo usuario administrador: no hace falta manejar múltiples cuentas,
// proveedores externos ni roles. `jose` además funciona en el "Edge Runtime"
// del middleware, a diferencia de bcrypt (que sí necesita Node.js puro).

import { SignJWT, jwtVerify } from "jose";

export const ADMIN_SESSION_COOKIE = "bionexo_admin_session";
export const ADMIN_SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 días

function obtenerClaveSecreta() {
  const secreto = process.env.ADMIN_SESSION_SECRET;
  if (!secreto) {
    throw new Error(
      "Falta la variable de entorno ADMIN_SESSION_SECRET (ver .env).",
    );
  }
  return new TextEncoder().encode(secreto);
}

// Datos que se guardan dentro del token de sesión (nada sensible: solo el usuario).
export type SesionAdmin = { usuario: string };

// Crea el token firmado que se guarda en la cookie al iniciar sesión.
export async function crearTokenSesion(usuario: string): Promise<string> {
  return new SignJWT({ usuario })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_DURATION_SECONDS}s`)
    .sign(obtenerClaveSecreta());
}

// Verifica el token de la cookie. Devuelve null si no existe, expiró o fue alterado.
export async function verificarTokenSesion(
  token: string | undefined,
): Promise<SesionAdmin | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, obtenerClaveSecreta());
    if (typeof payload.usuario !== "string") return null;
    return { usuario: payload.usuario };
  } catch {
    // Token inválido, alterado o vencido.
    return null;
  }
}
