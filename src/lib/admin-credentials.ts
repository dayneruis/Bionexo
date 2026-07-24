// Verificación de usuario y contraseña del panel de administración.
// Separado de admin-auth.ts porque usa bcryptjs, que necesita Node.js puro
// y NO puede correr dentro del middleware (Edge Runtime). Por eso esta función
// solo se llama desde la ruta de login (src/app/api/admin/login/route.ts),
// nunca desde middleware.ts.

import bcrypt from "bcryptjs";

export function verificarCredenciales(usuario: string, contrasena: string): boolean {
  const usuarioEsperado = process.env.ADMIN_USER;
  const hashEsperado = process.env.ADMIN_PASSWORD_HASH;

  if (!usuarioEsperado || !hashEsperado) {
    throw new Error(
      "Faltan ADMIN_USER o ADMIN_PASSWORD_HASH en .env. Genera el hash con: npx tsx scripts/generar-hash-admin.ts",
    );
  }

  // ── LOG TEMPORAL DE DEPURACIÓN (quitar después de resolver el login en producción) ──
  // No imprime la contraseña ni el hash completo, solo datos que ayudan a detectar
  // si la variable de entorno llegó corrompida (comillas, backslashes literales, etc.)
  // o si el usuario/contraseña que llega del formulario no es lo esperado.
  console.log("[debug-login]", {
    usuarioRecibido: usuario,
    usuarioEsperado,
    usuarioCoincide: usuario === usuarioEsperado,
    largoHashEnv: hashEsperado.length,
    hashEnvInicio: hashEsperado.slice(0, 7),
    hashEnvFin: hashEsperado.slice(-4),
    largoContrasenaRecibida: contrasena.length,
  });

  if (usuario !== usuarioEsperado) return false;
  const coincide = bcrypt.compareSync(contrasena, hashEsperado);
  console.log("[debug-login] resultado bcrypt.compareSync:", coincide);
  return coincide;
}
