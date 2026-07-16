"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";
import { NOMBRES_DEPARTAMENTOS, getMunicipiosDe } from "@/lib/colombia-geo";
import { ZONAS_DE_VENTA, type VarianteInput, type MunicipioVentaInput, type ZonaDeVenta } from "@/lib/product-types";

const ETIQUETAS_ZONA: Record<ZonaDeVenta, string> = {
  nacional: "Nacional (todo el territorio colombiano)",
  internacional: "Internacional (todo el país + exterior)",
  local: "Local (solo en municipios específicos)",
};

type Categoria = { id: string; nameEs: string };
type Productor = { id: string; name: string };

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
  // Intermediación (Fase 3, Parte 4): SOLO uso interno, nunca se expone al cliente.
  producerId: string | null;
  margin: number;
  // Zona de venta: A DÓNDE se vende el producto (distinto de Origen).
  saleZone: ZonaDeVenta;
  saleMunicipalities: MunicipioVentaInput[];
};

// Formulario de creación y edición de producto. Se usa igual en
// /admin/productos/nuevo y en /admin/productos/[id]/editar; la diferencia es
// si recibe la prop `producto` (edición) o no (creación).
export default function ProductForm({
  categorias,
  productores,
  producto,
}: {
  categorias: Categoria[];
  productores: Productor[];
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

  // Zona de venta: A DÓNDE se vende el producto (distinto de Origen, que es DE
  // DÓNDE es). Si es "local", saleMunicipalities guarda uno o varios municipios,
  // que pueden ser de departamentos distintos entre sí.
  const [saleZone, setSaleZone] = useState<ZonaDeVenta>(producto?.saleZone ?? "nacional");
  const [saleMunicipalities, setSaleMunicipalities] = useState<MunicipioVentaInput[]>(
    producto?.saleMunicipalities ?? [],
  );
  const [nuevaZonaDepto, setNuevaZonaDepto] = useState(NOMBRES_DEPARTAMENTOS[0] ?? "");
  const [nuevaZonaMpio, setNuevaZonaMpio] = useState("");
  const municipiosZonaNueva = getMunicipiosDe(nuevaZonaDepto);

  function agregarMunicipioVenta() {
    if (!nuevaZonaMpio) return;
    const yaExiste = saleMunicipalities.some(
      (m) => m.department === nuevaZonaDepto && m.municipality === nuevaZonaMpio,
    );
    if (!yaExiste) {
      setSaleMunicipalities([
        ...saleMunicipalities,
        { department: nuevaZonaDepto, municipality: nuevaZonaMpio },
      ]);
    }
    setNuevaZonaMpio("");
  }

  function quitarMunicipioVenta(index: number) {
    setSaleMunicipalities(saleMunicipalities.filter((_, i) => i !== index));
  }

  const [variants, setVariants] = useState<VarianteInput[]>(producto?.variants ?? []);

  // Intermediación: SOLO uso interno, nunca se muestra en la tienda pública.
  const [producerId, setProducerId] = useState(producto?.producerId ?? "");
  const [margin, setMargin] = useState(producto?.margin ?? 5);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [errorImagen, setErrorImagen] = useState<string | null>(null);

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

  // Sube el archivo elegido a /api/admin/upload y, si sale bien, deja su URL
  // guardada en imageUrl (el mismo campo que también acepta una URL pegada a mano).
  async function onArchivoSeleccionado(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    e.target.value = ""; // permite volver a elegir el mismo archivo si hay un error
    if (!archivo) return;

    setSubiendoImagen(true);
    setErrorImagen(null);

    try {
      const formData = new FormData();
      formData.append("file", archivo);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok) {
        setErrorImagen(data.error ?? "No se pudo subir la imagen.");
        return;
      }

      setImageUrl(data.url!);
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
      producerId: producerId || null,
      margin,
      saleZone,
      saleMunicipalities: saleZone === "local" ? saleMunicipalities : [],
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
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-semibold text-eco-forest">
            Foto del producto
          </label>
          <div className="flex flex-wrap items-center gap-4">
            {imageUrl && (
              // Vista previa: imageUrl puede ser un archivo subido o una URL externa
              // pegada a mano, así que se usa <img> normal en vez de next/image.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
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
              {subiendoImagen && (
                <p className="mt-1 text-xs text-eco-green">Subiendo imagen...</p>
              )}
              {errorImagen && <p className="mt-1 text-xs text-red-500">{errorImagen}</p>}
            </div>
          </div>
          <p className="mb-1.5 mt-3 text-xs text-slate-400">
            O pega la URL de una imagen ya publicada en internet:
          </p>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Se genera una de ejemplo si lo dejas vacío"
            className={inputClass}
          />
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

      {/* ── Datos internos: productor y margen ── */}
      {/* Regla del modelo de intermediación: esta sección NUNCA se muestra al
          cliente, solo la ve el admin en este panel (ver CLAUDE.md, sección 14). */}
      <section className="rounded-2xl border border-eco-green/15 bg-white p-6">
        <h2 className="mb-1 font-bold text-eco-forest">Datos internos</h2>
        <p className="mb-4 text-xs text-slate-400">
          Uso interno: el productor y el margen nunca se muestran en la tienda pública.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo label="Productor (opcional)">
            <select
              value={producerId}
              onChange={(e) => setProducerId(e.target.value)}
              className={inputClass}
            >
              <option value="">Sin productor asignado</option>
              {productores.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </Campo>
          <Campo label="Margen de intermediación (%)">
            <input
              type="number"
              min={3}
              max={10}
              step={0.5}
              required
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className={inputClass}
            />
          </Campo>
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

      {/* ── Zona de venta ── */}
      <section className="rounded-2xl border border-eco-green/15 bg-white p-6">
        <h2 className="mb-1 font-bold text-eco-forest">Zona de venta</h2>
        <p className="mb-4 text-xs text-slate-400">
          A dónde se vende/envía el producto. Es distinto del Origen (de arriba), que es de dónde
          es el producto.
        </p>

        <div className="flex flex-col gap-2">
          {ZONAS_DE_VENTA.map((zona) => (
            <label key={zona} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="saleZone"
                checked={saleZone === zona}
                onChange={() => setSaleZone(zona)}
                className="h-4 w-4 accent-eco-green"
              />
              {ETIQUETAS_ZONA[zona]}
            </label>
          ))}
        </div>

        {saleZone === "local" && (
          <div className="mt-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <select
                value={nuevaZonaDepto}
                onChange={(e) => {
                  setNuevaZonaDepto(e.target.value);
                  setNuevaZonaMpio("");
                }}
                className={inputClass}
              >
                {NOMBRES_DEPARTAMENTOS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                value={nuevaZonaMpio}
                onChange={(e) => setNuevaZonaMpio(e.target.value)}
                className={inputClass}
              >
                <option value="">Elige un municipio</option>
                {municipiosZonaNueva.map((m) => (
                  <option key={m.codigo} value={m.nombre}>
                    {m.nombre}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={agregarMunicipioVenta}
                disabled={!nuevaZonaMpio}
                className="rounded-full border-2 border-eco-green px-4 py-1.5 text-xs font-bold text-eco-green hover:bg-eco-green hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                + Agregar
              </button>
            </div>

            {saleMunicipalities.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {saleMunicipalities.map((m, i) => (
                  <span
                    key={`${m.department}-${m.municipality}`}
                    className="flex items-center gap-1.5 rounded-full bg-eco-forest/10 px-3 py-1 text-xs text-eco-forest"
                  >
                    {m.municipality} ({m.department})
                    <button
                      type="button"
                      onClick={() => quitarMunicipioVenta(i)}
                      aria-label={`Quitar ${m.municipality}`}
                      className="text-eco-forest/60 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
            {saleMunicipalities.length === 0 && (
              <p className="mt-2 text-xs text-red-500">
                Elige al menos un municipio para la zona de venta local.
              </p>
            )}
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
