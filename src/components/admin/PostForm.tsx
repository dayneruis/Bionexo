"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";
import { analizarVideoUrl } from "@/lib/video-embed";
import { ESTADOS_POST, type EstadoPost } from "@/lib/admin-posts";
import VideoEmbed from "@/components/VideoEmbed";

const ETIQUETAS_ESTADO: Record<EstadoPost, string> = {
  publicado: "Publicado (visible en el sitio)",
  borrador: "Borrador (solo visible en el panel)",
};

// Forma de una publicación ya existente (para precargar el formulario en modo edición).
type PostExistente = {
  id: string;
  slug: string;
  titleEs: string;
  titleEn: string;
  summaryEs: string;
  summaryEn: string;
  contentEs: string;
  contentEn: string;
  coverImageUrl: string;
  videoUrl: string | null;
  publishedAt: Date;
  status: EstadoPost;
};

// Convierte una fecha a "YYYY-MM-DD" para precargar un <input type="date">.
function aFechaInput(fecha: Date) {
  return fecha.toISOString().slice(0, 10);
}

// Formulario de creación y edición de publicación. Se usa igual en
// /admin/noticias/nueva y en /admin/noticias/[id]/editar; la diferencia es si
// recibe la prop `post` (edición) o no (creación). Mismo patrón que ProductForm.tsx.
export default function PostForm({ post }: { post?: PostExistente }) {
  const router = useRouter();
  const esEdicion = Boolean(post);

  const [titleEs, setTitleEs] = useState(post?.titleEs ?? "");
  const [titleEn, setTitleEn] = useState(post?.titleEn ?? "");
  const [summaryEs, setSummaryEs] = useState(post?.summaryEs ?? "");
  const [summaryEn, setSummaryEn] = useState(post?.summaryEn ?? "");
  const [contentEs, setContentEs] = useState(post?.contentEs ?? "");
  const [contentEn, setContentEn] = useState(post?.contentEn ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImageUrl ?? "");
  const [videoUrl, setVideoUrl] = useState(post?.videoUrl ?? "");
  const [publishedAt, setPublishedAt] = useState(
    aFechaInput(post?.publishedAt ?? new Date()),
  );
  const [status, setStatus] = useState<EstadoPost>(post?.status ?? "borrador");

  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugEditadoAMano, setSlugEditadoAMano] = useState(esEdicion);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [errorImagen, setErrorImagen] = useState<string | null>(null);

  const videoReconocido = videoUrl.trim() ? analizarVideoUrl(videoUrl.trim()) : null;
  const videoConError = videoUrl.trim().length > 0 && !videoReconocido;

  // Mientras se está creando (no en edición) y el admin no tocó el slug a
  // mano, lo sugiere automáticamente a partir del título en español.
  function onTitleEsChange(valor: string) {
    setTitleEs(valor);
    if (!slugEditadoAMano) {
      setSlug(slugify(valor));
    }
  }

  function onSlugChange(valor: string) {
    setSlugEditadoAMano(true);
    setSlug(valor);
  }

  // Sube el archivo elegido a /api/admin/upload (carpeta "noticias") y, si sale
  // bien, deja su URL guardada en coverImageUrl (el mismo campo que también
  // acepta una URL pegada a mano).
  async function onArchivoSeleccionado(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    e.target.value = ""; // permite volver a elegir el mismo archivo si hay un error
    if (!archivo) return;

    setSubiendoImagen(true);
    setErrorImagen(null);

    try {
      const formData = new FormData();
      formData.append("file", archivo);
      formData.append("folder", "noticias");
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok) {
        setErrorImagen(data.error ?? "No se pudo subir la imagen.");
        return;
      }

      setCoverImageUrl(data.url!);
    } catch {
      setErrorImagen("Error de conexión al subir la imagen.");
    } finally {
      setSubiendoImagen(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      slug,
      titleEs,
      titleEn,
      summaryEs,
      summaryEn,
      contentEs,
      contentEn,
      coverImageUrl,
      videoUrl: videoUrl.trim() || null,
      publishedAt,
      status,
    };

    try {
      const res = await fetch(
        esEdicion ? `/api/admin/posts/${post!.id}` : "/api/admin/posts",
        {
          method: esEdicion ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? "No se pudo guardar la publicación.");
        setLoading(false);
        return;
      }

      router.push("/admin/noticias");
      router.refresh();
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* ── Contenido ── */}
      <section className="rounded-2xl border border-eco-green/15 bg-white p-6">
        <h2 className="mb-4 font-bold text-eco-forest">Contenido</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo label="Título (español)">
            <input
              required
              value={titleEs}
              onChange={(e) => onTitleEsChange(e.target.value)}
              className={inputClass}
            />
          </Campo>
          <Campo label="Título (inglés)">
            <input
              required
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className={inputClass}
            />
          </Campo>
          <Campo label="Resumen (español)">
            <textarea
              required
              value={summaryEs}
              onChange={(e) => setSummaryEs(e.target.value)}
              rows={2}
              placeholder="Se muestra en el listado, debajo del título"
              className={inputClass}
            />
          </Campo>
          <Campo label="Resumen (inglés)">
            <textarea
              required
              value={summaryEn}
              onChange={(e) => setSummaryEn(e.target.value)}
              rows={2}
              placeholder="Shown in the listing, below the title"
              className={inputClass}
            />
          </Campo>
          <Campo label="Contenido completo (español)">
            <textarea
              required
              value={contentEs}
              onChange={(e) => setContentEs(e.target.value)}
              rows={8}
              placeholder="Texto completo de la publicación"
              className={inputClass}
            />
          </Campo>
          <Campo label="Contenido completo (inglés)">
            <textarea
              required
              value={contentEn}
              onChange={(e) => setContentEn(e.target.value)}
              rows={8}
              placeholder="Full text of the post"
              className={inputClass}
            />
          </Campo>
          <Campo label="Slug (URL pública)">
            <input
              required
              value={slug}
              onChange={(e) => onSlugChange(e.target.value)}
              className={inputClass}
            />
          </Campo>
          <Campo label="Fecha de publicación">
            <input
              type="date"
              required
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className={inputClass}
            />
          </Campo>
        </div>

        <div className="mt-4">
          <Campo label="Estado">
            <div className="flex flex-col gap-2">
              {ESTADOS_POST.map((estado) => (
                <label key={estado} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="status"
                    checked={status === estado}
                    onChange={() => setStatus(estado)}
                    className="h-4 w-4 accent-eco-green"
                  />
                  {ETIQUETAS_ESTADO[estado]}
                </label>
              ))}
            </div>
          </Campo>
        </div>
      </section>

      {/* ── Foto de portada ── */}
      <section className="rounded-2xl border border-eco-green/15 bg-white p-6">
        <h2 className="mb-4 font-bold text-eco-forest">Foto de portada</h2>
        <div className="flex flex-wrap items-center gap-4">
          {coverImageUrl && (
            // Vista previa: coverImageUrl puede ser un archivo subido o una URL
            // externa pegada a mano, así que se usa <img> normal en vez de next/image.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverImageUrl}
              alt="Vista previa"
              className="h-24 w-24 rounded-xl border border-eco-green/20 object-cover"
            />
          )}
          <div className="min-w-[220px] flex-1">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={onArchivoSeleccionado}
              disabled={subiendoImagen}
              className={inputClass}
            />
            {subiendoImagen && <p className="mt-1 text-xs text-eco-green">Subiendo imagen...</p>}
            {errorImagen && <p className="mt-1 text-xs text-red-500">{errorImagen}</p>}
          </div>
        </div>
        <p className="mb-1.5 mt-3 text-xs text-slate-400">
          O pega la URL de una imagen ya publicada en internet:
        </p>
        <input
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
          placeholder="Se genera una de ejemplo si lo dejas vacío"
          className={inputClass}
        />
      </section>

      {/* ── Video incrustado (opcional) ── */}
      <section className="rounded-2xl border border-eco-green/15 bg-white p-6">
        <h2 className="mb-1 font-bold text-eco-forest">Video incrustado (opcional)</h2>
        <p className="mb-4 text-xs text-slate-400">
          Pega el enlace de un video de YouTube o de una publicación de Instagram. Solo se guarda
          el enlace: nunca se sube ningún archivo de video al servidor.
        </p>
        <input
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=... o https://www.instagram.com/p/..."
          className={inputClass}
        />
        {videoConError && (
          <p className="mt-2 text-xs text-red-500">
            No se reconoce ese enlace como YouTube o Instagram. Revísalo antes de guardar.
          </p>
        )}
        {videoReconocido && (
          <div className="mt-4 max-w-sm">
            <p className="mb-1.5 text-xs font-semibold text-eco-forest">Vista previa:</p>
            <VideoEmbed url={videoUrl.trim()} />
          </div>
        )}
      </section>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-eco-green py-4 text-sm font-bold text-white shadow-lg hover:bg-eco-forest disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-10"
      >
        {loading ? "Guardando..." : esEdicion ? "Guardar cambios" : "Crear publicación"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-eco-forest/20 bg-white px-4 py-2.5 text-sm focus:border-eco-green focus:outline-none focus:ring-2 focus:ring-eco-green/20";

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-eco-forest">{label}</label>
      {children}
    </div>
  );
}
