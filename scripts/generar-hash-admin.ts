// Genera el hash de una contraseña nueva para el panel de administración.
// Uso: npx tsx scripts/generar-hash-admin.ts "la-contrasena-que-quieras"
// El resultado se pega en la variable ADMIN_PASSWORD_HASH del archivo .env
// (nunca se guarda la contraseña en texto plano, solo su hash).

import bcrypt from "bcryptjs";

const contrasena = process.argv[2];

if (!contrasena) {
  console.error("Falta la contraseña. Uso: npx tsx scripts/generar-hash-admin.ts \"tu-contrasena\"");
  process.exit(1);
}

const hash = bcrypt.hashSync(contrasena, 10);

// Next.js expande variables tipo $NOMBRE dentro de .env (igual que Docker
// Compose). El hash de bcrypt empieza con "$2b$10$...", así que sin escapar
// los signos $ como \$, Next.js los interpreta como variables vacías y
// corrompe el hash silenciosamente. Por eso se escapan aquí antes de imprimir.
const hashEscapado = hash.replace(/\$/g, "\\$");

console.log("\nCopia esta línea completa en tu archivo .env:\n");
console.log(`ADMIN_PASSWORD_HASH="${hashEscapado}"\n`);
