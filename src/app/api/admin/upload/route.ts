import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { obtenerSesionActual } from "@/lib/admin-auth";

// Sube una foto desde el computador del admin (Fase 3, Parte 3; ampliado para
// las fotos de portada de Noticias e Historias). Protegida a mano con
// obtenerSesionActual() por la misma razón que el resto de rutas bajo
// /api/admin: el middleware no cubre /api (ver admin-auth.ts).

// Solo se aceptan estos formatos de imagen, y el nombre del archivo en el
// disco se arma con la extensión que corresponde al tipo real (no con el
// nombre original) para no confiar en lo que manda el navegador.
const TIPOS_PERMITIDOS: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const TAMANO_MAXIMO_BYTES = 5 * 1024 * 1024; // 5 MB

// Lista blanca de subcarpetas dentro de public/uploads/. No se acepta
// cualquier texto que mande el cliente, para no permitir rutas raras.
const CARPETAS_PERMITIDAS = ["productos", "noticias"] as const;

export async function POST(request: Request) {
  const sesion = await obtenerSesionActual();
  if (!sesion) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const formData = await request.formData();
  const archivo = formData.get("file");
  const carpetaSolicitada = formData.get("folder");
  const carpeta = CARPETAS_PERMITIDAS.includes(carpetaSolicitada as (typeof CARPETAS_PERMITIDAS)[number])
    ? (carpetaSolicitada as (typeof CARPETAS_PERMITIDAS)[number])
    : "productos";

  if (!(archivo instanceof File)) {
    return NextResponse.json({ error: "No se recibió ningún archivo." }, { status: 400 });
  }

  const extension = TIPOS_PERMITIDOS[archivo.type];
  if (!extension) {
    return NextResponse.json(
      { error: "Formato no válido. Usa JPG, PNG, WEBP o GIF." },
      { status: 400 },
    );
  }

  if (archivo.size > TAMANO_MAXIMO_BYTES) {
    return NextResponse.json(
      { error: "La imagen pesa demasiado. El máximo es 5 MB." },
      { status: 400 },
    );
  }

  // Carpeta destino dentro de /public para que Next.js la sirva tal cual.
  const carpetaDestino = path.join(process.cwd(), "public", "uploads", carpeta);
  await mkdir(carpetaDestino, { recursive: true });

  const nombreArchivo = `${randomUUID()}${extension}`;
  const bytes = Buffer.from(await archivo.arrayBuffer());
  await writeFile(path.join(carpetaDestino, nombreArchivo), bytes);

  return NextResponse.json({ url: `/uploads/${carpeta}/${nombreArchivo}` }, { status: 201 });
}
