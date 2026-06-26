"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { calcularEnvioCarrito, getZona, type DetalleEnvio } from "@/lib/shipping";
import { ZONAS, TODAS_LAS_CIUDADES } from "@/lib/shipping-config";
import { formatCop } from "@/lib/format";
import type { CartItem } from "@/lib/cart";

type Props = {
  items: CartItem[];
  // Callback que avisa al padre cada vez que cambia el resultado del cálculo.
  onShippingChange: (
    totalCop: number,
    destCity: string,
    isInternacional: boolean,
    detalle: DetalleEnvio[],
  ) => void;
};

// Calcula el costo de envío en tiempo real usando la tabla origen-destino.
// El usuario escribe su ciudad; el sistema detecta la zona y busca la tarifa.
// Si el carrito tiene productos de varias zonas de origen, muestra el desglose.
export default function ShippingCalculator({ items, onShippingChange }: Props) {
  const t = useTranslations();
  const [destCity, setDestCity] = useState("");
  const [isInternacional, setIsInternacional] = useState(false);
  const [resultado, setResultado] = useState<{
    totalEnvioCop: number;
    detalle: DetalleEnvio[];
  } | null>(null);

  // Recalcular cada vez que el usuario cambia la ciudad o el checkbox.
  useEffect(() => {
    if (!destCity.trim() && !isInternacional) {
      setResultado(null);
      // Informar al padre que no hay resultado todavía.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      onShippingChange(0, "", false, []);
      return;
    }
    const r = calcularEnvioCarrito(items, destCity, isInternacional);
    setResultado(r);
    onShippingChange(r.totalEnvioCop, destCity, isInternacional, r.detalle);
    // onShippingChange se omite de las deps para evitar bucles cuando el padre
    // recrea la función en cada render; items, destCity e isInternacional sí se usan.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destCity, isInternacional, items]);

  return (
    <div className="rounded-xl border border-eco-forest/20 p-4">
      <p className="mb-3 font-semibold text-eco-forest">{t("shipping.title")}</p>

      {/* Entrada de ciudad con autocompletado */}
      <div className="mb-3 flex flex-col gap-2">
        <label htmlFor="shipping-city" className="text-sm text-foreground/70">
          {t("shipping.enterCity")}
        </label>
        <input
          id="shipping-city"
          type="text"
          value={destCity}
          onChange={(e) => setDestCity(e.target.value)}
          disabled={isInternacional}
          placeholder="Ej: Bogotá, Medellín, Bucaramanga..."
          list="ciudades-sugeridas"
          className="w-full rounded-lg border border-eco-forest/20 px-3 py-2 text-sm placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-eco-forest/30 disabled:bg-foreground/5 disabled:text-foreground/30"
        />
        {/* Sugerencias del datalist: ciudades de todas las zonas configuradas */}
        <datalist id="ciudades-sugeridas">
          {TODAS_LAS_CIUDADES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>

        {/* Checkbox para envío internacional */}
        <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground/70">
          <input
            type="checkbox"
            checked={isInternacional}
            onChange={(e) => {
              setIsInternacional(e.target.checked);
              if (e.target.checked) setDestCity("");
            }}
            className="accent-eco-forest"
          />
          {t("shipping.international")}
        </label>
      </div>

      {/* Resultado del cálculo */}
      {resultado && (
        <div className="mt-2 rounded-lg bg-eco-forest/5 p-3 text-sm">
          {/* Desglose por zona de origen (visible solo cuando hay más de una) */}
          {resultado.detalle.length > 1 && (
            <>
              <p className="mb-2 font-medium text-eco-forest">
                {t("shipping.breakdown")}:
              </p>
              {resultado.detalle.map((d) => (
                <div
                  key={d.zonaOrigen}
                  className="flex justify-between text-foreground/60"
                >
                  <span>
                    {t("shipping.from")}: {ZONAS[d.zonaOrigen].nombreEs}
                  </span>
                  <span>{formatCop(d.costo)}</span>
                </div>
              ))}
              <hr className="my-2 border-eco-forest/20" />
            </>
          )}

          {/* Total de envío */}
          <div className="flex justify-between font-semibold text-eco-forest">
            <span>{t("shipping.totalShipping")}</span>
            <span>{formatCop(resultado.totalEnvioCop)}</span>
          </div>

          {/* Zona detectada para la ciudad ingresada */}
          {!isInternacional && destCity.trim() && (
            <p className="mt-1 text-xs text-foreground/40">
              Zona de destino: {ZONAS[getZona(destCity)].nombreEs}
            </p>
          )}
        </div>
      )}

      {/* Nota sobre tarifas de ejemplo */}
      <p className="mt-3 text-xs text-foreground/35">{t("shipping.note")}</p>
    </div>
  );
}
