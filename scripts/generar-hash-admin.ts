// Genera el hash de una contraseña nueva para el panel de administración.
// Uso: npx tsx scripts/generar-hash-admin.ts
// El script pregunta la contraseña de forma oculta (se ve como *, no en texto
// plano) y pide confirmarla escribiéndola dos veces. El resultado se pega en
// la variable ADMIN_PASSWORD_HASH del archivo .env (nunca se guarda la
// contraseña en texto plano, solo su hash).

import bcrypt from "bcryptjs";

// Se generan a partir de su código numérico (en vez de escribir el carácter
// de control directamente en el archivo) para que el archivo fuente no
// contenga bytes invisibles.
const TECLA_ENTER_LF = String.fromCharCode(10); // salto de línea (\n)
const TECLA_ENTER_CR = String.fromCharCode(13); // retorno de carro (\r)
const TECLA_CTRL_C = String.fromCharCode(3); // Ctrl+C
const TECLA_RETROCESO = String.fromCharCode(127); // tecla de borrar (DEL)

// Pide una contraseña por teclado sin mostrarla en pantalla (se ve un "*" por
// cada tecla). Funciona letra por letra, así que también sirve si la pegas
// de un tirón (evita los problemas de pegado de símbolos en la terminal,
// porque aquí no hay que preocuparse por cómo la interpreta el shell).
function preguntarContrasenaOculta(mensaje: string): Promise<string> {
  return new Promise((resolve) => {
    let contrasena = "";
    process.stdout.write(mensaje);

    const stdin = process.stdin;
    if (!stdin.isTTY) {
      console.error(
        "\n\nEste script necesita una terminal interactiva real (no funciona si la " +
          "entrada viene de una tubería o de un archivo). Ábrelo directamente en " +
          "PowerShell o Git Bash y vuelve a intentarlo.",
      );
      process.exit(1);
    }
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    function onData(chunk: string) {
      for (const char of chunk) {
        if (char === TECLA_ENTER_LF || char === TECLA_ENTER_CR) {
          stdin.setRawMode(false);
          stdin.pause();
          stdin.removeListener("data", onData);
          process.stdout.write("\n");
          resolve(contrasena);
          return;
        }
        if (char === TECLA_CTRL_C) {
          process.stdout.write("\n");
          process.exit(1);
        }
        if (char === TECLA_RETROCESO) {
          if (contrasena.length > 0) {
            contrasena = contrasena.slice(0, -1);
            process.stdout.write("\b \b");
          }
          continue;
        }
        contrasena += char;
        process.stdout.write("*");
      }
    }

    stdin.on("data", onData);
  });
}

async function main() {
  const contrasena = await preguntarContrasenaOculta("Escribe la contraseña nueva: ");
  if (!contrasena) {
    console.error("\nLa contraseña no puede quedar vacía.");
    process.exit(1);
  }

  const confirmacion = await preguntarContrasenaOculta("Escríbela otra vez para confirmar: ");
  if (contrasena !== confirmacion) {
    console.error("\nLas dos contraseñas no coinciden. Vuelve a intentarlo.");
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
}

main();
