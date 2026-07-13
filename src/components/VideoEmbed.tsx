import { analizarVideoUrl } from "@/lib/video-embed";

// Incrusta un video de YouTube o Instagram a partir del enlace guardado en
// la publicación. Si el enlace no se reconoce (no debería pasar, porque ya
// se valida al guardar en el panel), simplemente no muestra nada.
export default function VideoEmbed({ url }: { url: string }) {
  const embed = analizarVideoUrl(url);
  if (!embed) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black/5">
      <iframe
        src={embed.embedUrl}
        title="Video incrustado"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
