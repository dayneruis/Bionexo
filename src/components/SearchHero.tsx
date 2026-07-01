"use client";

// SearchHero: sección principal de la portada.
// Mosaico de 6 imágenes de fondo (economía circular) con gradiente eco encima,
// título impactante y barra de búsqueda. Al buscar navega a /tienda?q=texto.
// Las imágenes son placeholders de picsum.photos; el dueño puede reemplazarlas
// por fotos reales del negocio cambiando las URLs del arreglo IMAGENES_FONDO.

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// Seeds de picsum.photos con imágenes de naturaleza, texturas vegetales y mercados.
const IMAGENES_FONDO = [
  "https://picsum.photos/seed/plants10/600/400",
  "https://picsum.photos/seed/forest22/600/400",
  "https://picsum.photos/seed/recycle3/600/400",
  "https://picsum.photos/seed/market41/600/400",
  "https://picsum.photos/seed/eco55/600/400",
  "https://picsum.photos/seed/green67/600/400",
];

export default function SearchHero() {
  const t = useTranslations("search");
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/tienda?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl min-h-[360px] sm:min-h-[420px] flex items-center">
      {/* Mosaico de 6 imágenes de fondo */}
      <div
        className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0"
        aria-hidden="true"
      >
        {IMAGENES_FONDO.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt=""
            className="h-full w-full object-cover"
          />
        ))}
      </div>

      {/* Gradiente eco de izquierda a derecha sobre las imágenes */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(26,71,49,0.92) 0%, rgba(26,71,49,0.80) 50%, rgba(14,155,155,0.75) 100%)",
        }}
      />

      {/* Contenido central */}
      <div className="relative w-full px-6 py-16 text-center sm:py-20">
        {/* Pastilla de marca */}
        <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm">
          Bionexo · Economía Circular
        </span>

        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white drop-shadow sm:text-4xl lg:text-5xl">
          {t("heroTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-white/85 sm:text-lg">
          {t("heroSubtitle")}
        </p>

        {/* Barra de búsqueda */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-8 flex max-w-xl overflow-hidden rounded-full bg-white shadow-2xl ring-2 ring-white/20"
        >
          {/* Ícono de lupa */}
          <span className="flex items-center pl-5 text-eco-forest/50" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("placeholder")}
            className="flex-1 bg-transparent px-4 py-4 text-foreground placeholder:text-foreground/40 focus:outline-none"
          />
          <button
            type="submit"
            className="m-1.5 rounded-full bg-eco-forest px-6 py-2.5 text-sm font-semibold text-white hover:bg-eco-green"
          >
            {t("button")}
          </button>
        </form>

        {/* Sugerencias de búsqueda rápida */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {["Cartón", "Plástico reciclado", "Moda sostenible", "Abono orgánico"].map(
            (term) => (
              <button
                key={term}
                type="button"
                onClick={() => router.push(`/tienda?q=${encodeURIComponent(term)}`)}
                className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur-sm hover:bg-white/20"
              >
                {term}
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
