"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";
import { NOMBRES_DEPARTAMENTOS, getMunicipiosDe } from "@/lib/colombia-geo";
import type { VarianteInput } from "@/lib/admin-products";

type Categoria = { id: string; nameEs: string };

// Forma de un producto ya existente (para precargar el formulario en modo edición).
type ProductoExistente = {
  id: string;
  slug: string;
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  priceCop: number;
  available: boolean;
  featured: boolean;
  imageUrl: string;
  originCity: string;
  originDepartment: string;
  isInternational: boolean;
  originCountry: string | null;
  size: string | null;
  warranty: boolean;
  warrantyDuration: string | null;
  categoryId: string;
  variants: VarianteInput[];
};

// Formulario de creación y edición de producto. Se usa igual en
// /admin/productos/nuevo y en /admin/productos/[id]/editar; la diferencia es
// si recibe la prop `producto` (edición) o no (creación).
export default function ProductForm({
  categorias,
  producto,
}: {
  categorias: Categoria[];
  producto?: ProductoExistente;
}) {
  const router = useRouter();
  const esEdicion = Boolean(producto);

  const [nameEs, setNameEs] = useState(producto?.nameEs ?? "");
  const [nameEn, setNameEn] = useState(producto?.nameEn ?? "");
  const [descriptionEs, setDescriptionEs] = useState(producto?.descriptionEs ?? "");
  const [descriptionEn, setDescriptionEn] = useState(producto?.descriptionEn ?? "");
  const [priceCop, setPriceCop] = useState(producto?.priceCop ?? 0);
  const [categoryId, setCategoryId] = useState(producto?.categoryId ?? categorias[0]?.id ?? "");
  const [available, setAvailable] = useState(producto?.available ?? true);
  const [featured, setFeatured] = useState(producto?.featured ?? false);
  const [imageUrl, setImageUrl] = useState(producto?.imageUrl ?? "");

  const [slug, setSlug] = useState(producto?.slug ?? "");
  const [slugEditadoAMano, setSlugEditadoAMano] = useState(esEdicion);

  const [isInternational, setIsInternational] = useState(producto?.isInternational ?? false);
  const [originDepartment, setOriginDepartment] = useState(
    producto?.originDepartment ?? "Santander",
  );
  const [originCity, setOriginCity] = useState(producto?.originCity ?? "Bucaramanga");
  const [originCountry, setOriginCountry] = useState(producto?.originCountry ?? "");

  const [size, setSize] = useState(producto?.size ?? "");
  const [warranty, setWarranty] = useState(producto?.warranty ?? false);
  const [warrantyDuration, setWarrantyDuration] = useState(producto?.warrantyDuration ?? "");

  const [variants, setVariants] = useState<VarianteInput[]>(producto?.variants ?? []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mientras se está creando (no en edición) y el admin no tocó el slug a
  // mano, lo sugiere automáticamente a partir del nombre en español.
  function onNameEsChange(valor: string) {
    setNameEs(valor);
    if (!slugEditadoAMano) {
      setSlug(slugify(valor));
    }
  }

  function onSlugChange(valor: string) {
    setSlugEditadoAMano(true);
    setSlug(valor);
  }

  function onDepartmentChange(valor: string) {
    setOriginDepartment(valor);
    setOriginCity(""); // el municipio depende del departamento elegido
  }

  function agregarVariante() {
    setVariants([...variants, { type: "", value: "" }]);
  }

  function actualizarVariante(index: number, campo: "type" | "value", valor: string) {
    setVariants(variants.map((v, i) => (i === index ? { ...v, [campo]: valor } : v)));
  }

  function quitarVariante(index: number) {
    setVariants(variants.filter((_, i) => i !== index));
  }

  const municipios = !isInternational ? getMunicipiosDe(originDepartment) : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      slug,
      nameEs,
      nameEn,
      descriptionEs,
      descriptionEn,
      priceCop,
      available,
      featured,
      imageUrl,
      originCity,
      originDepartment,
      isInternational,
      originCountry: isInternational ? originCountry : null,
      size,
      warranty,
      warrantyDuration: warranty ? warrantyDuration : null,
      categoryId,
      variants: variants.filter((v) => v.type.trim() && v.value.trim()),
    };

    try {
      const res = await fetch(
        esEdicion ? `/api/admin/products/${producto!.id}` : "/api/admin/products",
        {
          method: esEdicion ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? "No se pudo guardar el producto.");
        setLoading(false);
        return;
      }

      router.push("/admin/productos");
      router.refresh();
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* ── Datos básicos ── */}
      <section className="rounded-2xl border border-eco-green/15 bg-white p-6">
        <h2 className="mb-4 font-bold text-eco-forest">Datos básicos</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo label="Nombre (español)">
            <input
              required
              value={nameEs}
              onChange={(e) => onNameEsChange(e.target.value)}
              className={inputClass}
            />
          </Campo>
          <Campo label="Nombre (inglés)">
            <input
              required
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              className={inputClass}
            />
          </Campo>
          <Campo label="Descripción (español)">
            <textarea
              required
              value={descriptionEs}
              onChange={(e) => setDescriptionEs(e.target.value)}
              rows={3}
              className={inputClass}
            />
          </Campo>
          <Campo label="Descripción (inglés)">
            <textarea
              required
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              rows={3}
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
          <Campo label="Categoría">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className={inputClass}
            >
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameEs}
                </option>
              ))}
            </select>
          </Campo>
          <Campo label="Precio (COP)">
            <input
              type="number"
              min={0}
              required
              value={priceCop}
              onChange={(e) => setPriceCop(Number(e.target.value))}
              className={inputClass}
            />
          </Campo>
          <Campo label="URL de la imagen (temporal — la Parte 3 agrega subida de fotos)">
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Se genera una de ejemplo si lo dejas vacío"
              className={inputClass}
            />
          </Campo>
        </div>

        <div className="mt-4 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className="h-4 w-4 accent-eco-green"
            />
            Disponible
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 accent-eco-green"
            />
            Destacado en portada
          </label>
        </div>
      </section>

      {/* ── Origen ── */}
      <section className="rounded-2xl border border-eco-green/15 bg-white p-6">
        <h2 className="mb-4 font-bold text-eco-forest">Origen</h2>
        <label className="mb-4 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isInternational}
            onChange={(e) => setIsInternational(e.target.checked)}
            className="h-4 w-4 accent-eco-green"
          />
          Es un producto internacional (fuera de Colombia)
        </label>

        {isInternational ? (
          <Campo label="País de origen">
            <input
              required
              value={originCountry}
              onChange={(e) => setOriginCountry(e.target.value)}
              className={inputClass}
            />
          </Campo>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <Campo label="Departamento">
              <select
                value={originDepartment}
                onChange={(e) => onDepartmentChange(e.target.value)}
                className={inputClass}
              >
                {NOMBRES_DEPARTAMENTOS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Campo>
            <Campo label="Ciudad / municipio">
              <select
                value={originCity}
                onChange={(e) => setOriginCity(e.target.value)}
                className={inputClass}
              >
                <option value="">Elige una ciudad</option>
                {municipios.map((m) => (
                  <option key={m.codigo} value={m.nombre}>
                    {m.nombre}
                  </option>
                ))}
              </select>
            </Campo>
          </div>
        )}
      </section>

      {/* ── Tamaño y garantía ── */}
      <section className="rounded-2xl border border-eco-green/15 bg-white p-6">
        <h2 className="mb-4 font-bold text-eco-forest">Tamaño y garantía</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo label="Tamaño o medida (opcional)">
            <input
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder='Ej: "25 kg", "2×1 m"'
              className={inputClass}
            />
          </Campo>
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-eco-forest">
              <input
                type="checkbox"
                checked={warranty}
                onChange={(e) => setWarranty(e.target.checked)}
                className="h-4 w-4 accent-eco-green"
              />
              Tiene garantía
            </label>
            {warranty && (
              <input
                value={warrantyDuration}
                onChange={(e) => setWarrantyDuration(e.target.value)}
                placeholder='Ej: "6 meses", "1 año"'
                className={inputClass}
              />
            )}
          </div>
        </div>
      </section>

      {/* ── Variantes ── */}
      <section className="rounded-2xl border border-eco-green/15 bg-white p-6">
        <h2 className="mb-1 font-bold text-eco-forest">Variantes</h2>
        <p className="mb-4 text-sm text-slate-400">
          Talla, color, material, etc. Deja esta sección vacía si el producto no tiene variantes.
        </p>

        <div className="flex flex-col gap-3">
          {variants.map((v, i) => (
            <div key={i} className="flex gap-3">
              <input
                value={v.type}
                onChange={(e) => actualizarVariante(i, "type", e.target.value)}
                placeholder="Tipo (ej: Talla)"
                className={inputClass}
              />
              <input
                value={v.value}
                onChange={(e) => actualizarVariante(i, "value", e.target.value)}
                placeholder="Valor (ej: M)"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => quitarVariante(i)}
                aria-label="Quitar variante"
                className="shrink-0 rounded-full px-3 text-red-400 hover:bg-red-50 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={agregarVariante}
          className="mt-4 rounded-full border-2 border-eco-green px-4 py-1.5 text-xs font-bold text-eco-green hover:bg-eco-green hover:text-white"
        >
          + Agregar variante
        </button>
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
        {loading ? "Guardando..." : esEdicion ? "Guardar cambios" : "Crear producto"}
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
