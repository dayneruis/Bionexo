"use client";

// GeoFilter: filtro de búsqueda por departamento y municipio de Colombia,
// más una opción "Internacional" para ver productos de fuera del país.
// Funciona en la página de tienda y en las páginas de cada categoría.
// Al aplicar el filtro actualiza la URL con ?depto=... &mpio=... (o ?origen=internacional),
// lo que hace que el servidor muestre solo los productos que coinciden.

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { DEPARTAMENTOS, getMunicipiosDe, CLAVE_INTERNACIONAL } from "@/lib/colombia-geo";

export default function GeoFilter({
  deptoActual,
  mpioActual,
  origenInternacional,
  queryActual,
}: {
  deptoActual?: string;
  mpioActual?: string;
  origenInternacional?: boolean;
  queryActual?: string; // Texto de búsqueda activo (para no borrarlo al cambiar filtro geo)
}) {
  const t = useTranslations("geo");
  const router = useRouter();
  const pathname = usePathname();

  // Estado local del formulario (separado del URL hasta que el usuario presiona "Aplicar")
  const [depto, setDepto] = useState(deptoActual ?? "");
  const [mpio, setMpio] = useState(mpioActual ?? "");
  const [internacional, setInternacional] = useState(origenInternacional ?? false);

  // Municipios disponibles según el departamento seleccionado
  const municipios = depto ? getMunicipiosDe(depto) : [];

  // Cuando el usuario cambia el departamento, reinicia el municipio
  function onDeptoChange(nuevoDepto: string) {
    setDepto(nuevoDepto);
    setMpio("");
    setInternacional(false);
  }

  function onInternacionalChange(checked: boolean) {
    setInternacional(checked);
    if (checked) {
      setDepto("");
      setMpio("");
    }
  }

  // Aplica el filtro: construye los parámetros de URL y navega
  function aplicar() {
    const params = new URLSearchParams();
    if (queryActual?.trim()) params.set("q", queryActual.trim());

    if (internacional) {
      params.set("origen", CLAVE_INTERNACIONAL);
    } else {
      if (depto) params.set("depto", depto);
      if (mpio) params.set("mpio", mpio);
    }

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  // Limpia todos los filtros geográficos pero conserva el texto de búsqueda
  function limpiar() {
    setDepto("");
    setMpio("");
    setInternacional(false);

    const params = new URLSearchParams();
    if (queryActual?.trim()) params.set("q", queryActual.trim());
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  const hayFiltroActivo = !!(deptoActual || mpioActual || origenInternacional);

  return (
    <div className="rounded-xl border border-eco-forest/15 bg-eco-forest/5 p-4">
      <p className="mb-3 text-sm font-semibold text-eco-forest">{t("filterTitle")}</p>

      <div className="flex flex-wrap items-end gap-3">
        {/* Selector de departamento */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-foreground/60">{t("department")}</label>
          <select
            value={internacional ? "" : depto}
            onChange={(e) => onDeptoChange(e.target.value)}
            disabled={internacional}
            className="rounded-lg border border-eco-forest/20 bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-eco-cyan disabled:opacity-40"
          >
            <option value="">{t("allDepartments")}</option>
            {DEPARTAMENTOS.sort((a, b) => a.nombre.localeCompare(b.nombre, "es")).map((d) => (
              <option key={d.codigo} value={d.nombre}>
                {d.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de municipio (solo visible si hay departamento elegido) */}
        {depto && municipios.length > 0 && !internacional && (
          <div className="flex flex-col gap-1">
            <label className="text-xs text-foreground/60">{t("municipality")}</label>
            <select
              value={mpio}
              onChange={(e) => setMpio(e.target.value)}
              className="rounded-lg border border-eco-forest/20 bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-eco-cyan"
            >
              <option value="">{t("allMunicipalities")}</option>
              {municipios.map((m) => (
                <option key={m.codigo} value={m.nombre}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Opción Internacional */}
        <label className="flex cursor-pointer items-center gap-2 pb-2 text-sm">
          <input
            type="checkbox"
            checked={internacional}
            onChange={(e) => onInternacionalChange(e.target.checked)}
            className="h-4 w-4 accent-eco-forest"
          />
          <span className="text-foreground/80">🌍 {t("international")}</span>
        </label>

        {/* Botones de acción */}
        <div className="flex gap-2 pb-0.5">
          <button
            type="button"
            onClick={aplicar}
            className="rounded-full bg-eco-forest px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-eco-green"
          >
            {t("apply")}
          </button>
          {hayFiltroActivo && (
            <button
              type="button"
              onClick={limpiar}
              className="rounded-full border border-eco-forest/30 px-4 py-2 text-xs font-semibold text-eco-forest transition-colors hover:bg-eco-forest/10"
            >
              {t("clear")}
            </button>
          )}
        </div>
      </div>

      {/* Indicador del filtro activo */}
      {hayFiltroActivo && (
        <p className="mt-2 text-xs text-eco-cyan">
          ✓{" "}
          {origenInternacional
            ? t("activeInternational")
            : [deptoActual, mpioActual].filter(Boolean).join(" › ")}
        </p>
      )}
    </div>
  );
}
