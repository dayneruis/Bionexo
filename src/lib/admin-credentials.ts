// Verificación de usuario y contraseña del panel de administración.
// Separado de admin-auth.ts porque usa bcryptjs, que necesita Node.js puro
// y NO puede correr dentro del middleware (Edge Runtime). Por eso esta función
// solo se llama desde la ruta de login (src/app/api/admin/login/route.ts),
// nunca desde middleware.ts.

import bcrypt from "bcryptjs";

// ── DEPURACIÓN TEMPORAL (quitar junto con el bloque de abajo cuando el login
// en producción quede resuelto) ── datos que ayudan a detectar si la variable
// de entorno llegó corrompida (comillas, backslashes literales, longitud
// distinta a 60) o si el usuario/contraseña que llega del formulario no es
// el esperado. Nunca incluye la contraseña ni el hash completos.
export type DebugLogin = {
  usuarioRecibido: string;
  usuarioEsperado: string | undefined;
  usuarioCoincide: boolean;
  largoHashEnv: number;
  hashEnvInicio: string;
  hashEnvFin: string;
  largoContrasenaRecibida: number;
  resultadoBcrypt: boolean | null;
};

export function verificarCredenciales(
  usuario: string,
  contrasena: string,
): { coincide: boolean; debug: DebugLogin } {
  const usuarioEsperado = process.env.ADMIN_USER;
  const hashEsperado = process.env.ADMIN_PASSWORD_HASH;

  if (!usuarioEsperado || !hashEsperado) {
    throw new Error(
      "Faltan ADMIN_USER o ADMIN_PASSWORD_HASH en .env. Genera el hash con: npx tsx scripts/generar-hash-admin.ts",
    );
  }

  const usuarioCoincide = usuario === usuarioEsperado;
  const debug: DebugLogin = {
    usuarioRecibido: usuario,
    usuarioEsperado,
    usuarioCoincide,
    largoHashEnv: hashEsperado.length,
    hashEnvInicio: hashEsperado.slice(0, 7),
    hashEnvFin: hashEsperado.slice(-4),
    largoContrasenaRecibida: contrasena.length,
    resultadoBcrypt: null,
  };
  console.log("[debug-login]", debug);

  if (!usuarioCoincide) return { coincide: false, debug };
  const coincide = bcrypt.compareSync(contrasena, hashEsperado);
  debug.resultadoBcrypt = coincide;
  console.log("[debug-login] resultado bcrypt.compareSync:", coincide);
  return { coincide, debug };
}
