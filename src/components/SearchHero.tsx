"use client";

// SearchHero: sección de búsqueda en la portada.
// Muestra un mosaico de imágenes de fondo (mercados y productos de economía circular)
// con un campo de búsqueda de texto encima. Al buscar navega a /tienda?q=texto.
// Las imágenes son de ejemplo (picsum.photos); el dueño puede reemplazarlas por
// fotos reales del negocio.

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// Seeds de picsum.photos que suelen dar imágenes de naturaleza, mercados y texturas
// relacionadas con economía circular. El dueño puede cambiar estos números
// o reemplazar las URLs por imágenes propias.
const IMAGENES_FONDO = [
  "https://picsum.photos/seed/market1/400/300",
  "https://picsum.photos/seed/eco2/400/300",
  "https://picsum.photos/seed/recycle3/400/300",
  "https://picsum.photos/seed/green4/400/300",
  "https://picsum.photos/seed/circular5/400/300",
  "https://picsum.photos/seed/local6/400/300",
];

export default function SearchHero() {
  const t = useTranslations("search");
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      // Navega a la tienda con el parámetro de búsqueda; next-intl mantiene el locale
      router.push(`/tienda?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl">
      {/* Mosaico de imágenes de fondo: 6 fotos en 3 columnas */}
      <div
        className="absolute inset-0 grid grid-cols-3 gap-0.5"
        aria-hidden="true"
      >
        {IMAGENES_FONDO.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
        ))}
      </div>

      {/* Capa de color eco sobre las imágenes para mejorar legibilidad */}
      <div className="absolute inset-0 bg-eco-forest/70" />

      {/* Contenido de la sección: título + buscador */}
      <div className="relative px-6 py-14 text-center sm:py-20">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          {t("heroTitle")}
        </h2>
        <p className="mt-2 text-white/80">{t("heroSubtitle")}</p>

        <form
          onSubmit={handleSearch}
          className="mx-auto mt-6 flex max-w-lg overflow-hidden rounded-full bg-white shadow-lg"
        >
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("placeholder")}
            className="flex-1 bg-transparent px-5 py-3 text-foreground placeholder:text-foreground/50 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-eco-forest px-6 py-3 font-semibold text-white transition-colors hover:bg-eco-green"
          >
            {t("button")}
          </button>
        </form>
      </div>
    </section>
  );
}
