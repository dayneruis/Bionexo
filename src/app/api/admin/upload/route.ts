import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { obtenerSesionActual } from "@/lib/admin-auth";

// Sube una foto desde el computador del admin a Cloudinary (Fase 3, Parte 3;
// ampliado para las fotos de portada de Noticias e Historias). Protegida a
// mano con obtenerSesionActual() por la misma razón que el resto de rutas
// bajo /api/admin: el middleware no cubre /api (ver admin-auth.ts).
//
// Antes las fotos se guardaban como archivo en public/uploads/ (solo existían
// en este computador); ahora se suben a la cuenta de Cloudinary del negocio
// para que también estén disponibles cuando el sitio se despliegue a internet.

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

// Lista blanca de subcarpetas dentro de Cloudinary. No se acepta cualquier
// texto que mande el cliente, para no permitir rutas raras.
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

  // Cloudinary acepta el archivo como una cadena "data URI" (tipo + datos en
  // base64). Se manda al método `upload`, que devuelve entre otras cosas la
  // URL pública ya lista para usar (`secure_url`).
  const bytes = Buffer.from(await archivo.arrayBuffer());
  const dataUri = `data:${archivo.type};base64,${bytes.toString("base64")}`;

  try {
    const resultado = await cloudinary.uploader.upload(dataUri, {
      folder: `bionexo/${carpeta}`,
    });
    return NextResponse.json({ url: resultado.secure_url }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "No se pudo subir la imagen a Cloudinary. Intenta de nuevo." },
      { status: 502 },
    );
  }
}
