// Convierte un enlace de YouTube o Instagram (pegado a mano por el admin) en
// una URL de "embed" lista para meter en un <iframe>. NUNCA se sube ningún
// archivo de video al servidor: solo se guarda el enlace y se incrusta el
// video que ya vive en YouTube/Instagram.

export type VideoEmbed = { plataforma: "youtube" | "instagram"; embedUrl: string };

// Extrae el ID de video de las formas más comunes de enlace de YouTube:
// watch?v=ID, youtu.be/ID, shorts/ID, embed/ID.
function idDeYoutube(url: URL): string | null {
  if (url.hostname === "youtu.be") {
    return url.pathname.slice(1) || null;
  }
  if (url.hostname.endsWith("youtube.com")) {
    if (url.pathname === "/watch") return url.searchParams.get("v");
    const match = url.pathname.match(/^\/(shorts|embed)\/([^/]+)/);
    if (match) return match[2];
  }
  return null;
}

// Extrae el código corto de una publicación de Instagram: /p/CODIGO/ o /reel/CODIGO/.
function codigoDeInstagram(url: URL): string | null {
  if (!url.hostname.endsWith("instagram.com")) return null;
  const match = url.pathname.match(/^\/(p|reel)\/([^/]+)/);
  return match ? match[2] : null;
}

// Analiza el enlace y arma la URL de embed. Devuelve null si no reconoce el
// formato (ni YouTube ni Instagram), para que el llamador pueda rechazarlo.
export function analizarVideoUrl(enlace: string): VideoEmbed | null {
  let url: URL;
  try {
    url = new URL(enlace.trim());
  } catch {
    return null;
  }

  const idYoutube = idDeYoutube(url);
  if (idYoutube) {
    return { plataforma: "youtube", embedUrl: `https://www.youtube.com/embed/${idYoutube}` };
  }

  const codigoInstagram = codigoDeInstagram(url);
  if (codigoInstagram) {
    return {
      plataforma: "instagram",
      embedUrl: `https://www.instagram.com/p/${codigoInstagram}/embed`,
    };
  }

  return null;
}
