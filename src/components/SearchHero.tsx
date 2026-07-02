"use client";

// SearchHero: sección principal de la portada.
// Mosaico de 8 fotos reales del negocio (public/hero/) con una capa verde
// translúcida encima para que combinen entre sí y con la paleta del sitio,
// título impactante y barra de búsqueda. Al buscar navega a /tienda?q=texto.

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const IMAGENES_FONDO = [
  "/hero/hero-1.png",
  "/hero/hero-2.png",
  "/hero/hero-3.png",
  "/hero/hero-4.jpg",
  "/hero/hero-5.jpg",
  "/hero/hero-6.jpg",
  "/hero/hero-7.jpg",
  "/hero/hero-8.jpg",
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
      {/* Mosaico de 8 fotos de fondo */}
      <div
        className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-0"
        aria-hidden="true"
      >
        {IMAGENES_FONDO.map((src, i) => (
          <div key={src} className="relative h-full w-full">
            <Image src={src} alt="" fill priority={i === 0} className="object-cover" sizes="25vw" />
          </div>
        ))}
      </div>

      {/* Capa verde translúcida uniforme: unifica las fotos con la paleta eco */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(20,83,45,0.88) 0%, rgba(22,163,74,0.82) 100%)",
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
