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

  if (usuario !== usuarioEsperado) return false;
  return bcrypt.compareSync(contrasena, hashEsperado);
}
