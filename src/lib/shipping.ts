import { ZONAS, TARIFAS_COP, type ZonaEnvio } from "./shipping-config";

/** Resultado parcial del cálculo: qué zona de origen y cuánto cuesta. */
export type DetalleEnvio = { zonaOrigen: ZonaEnvio; costo: number };

/**
 * Determina en qué zona de envío queda una ciudad.
 * La comparación es en minúsculas para tolerar variaciones de escritura.
 * Si la ciudad no aparece en ninguna zona nombrada, se devuelve "COL"
 * (Resto de Colombia), que es la zona más genérica dentro del país.
 */
export function getZona(ciudad: string): ZonaEnvio {
  const norm = ciudad.trim().toLowerCase();
  for (const [codigo, zona] of Object.entries(ZONAS) as [
    ZonaEnvio,
    (typeof ZONAS)[ZonaEnvio],
  ][]) {
    if (codigo === "COL" || codigo === "INTL") continue;
    if (zona.ciudades.some((c) => c.toLowerCase() === norm)) return codigo;
  }
  return "COL";
}

/**
 * Devuelve el costo en COP de enviar desde una zona de origen a una de destino.
 *
 * Punto de extensión para Fase futura (Servientrega / Coordinadora):
 * reemplaza el cuerpo de esta función por una llamada a la API de la
 * transportadora. El resto del código no necesita cambiarse.
 */
export function getTarifa(origen: ZonaEnvio, destino: ZonaEnvio): number {
  return TARIFAS_COP[origen][destino];
}

/**
 * Calcula el costo total de envío para un carrito con productos de varios orígenes.
 *
 * Estrategia "un despacho por zona de origen":
 *   1. Se agrupan los ítems por zona de origen (no por ciudad exacta).
 *   2. Por cada zona de origen única se cobra UN envío al destino,
 *      independientemente de cuántos ítems vengan de esa zona
 *      (se asume que van en el mismo paquete desde esa ubicación).
 *   3. Se suman los envíos de todas las zonas de origen.
 *
 * Ejemplo: Bucaramanga→Bogotá $18.000 + Medellín→Bogotá $15.000 = $33.000 total.
 */
export function calcularEnvioCarrito(
  items: { originCity: string }[],
  destCity: string,
  isInternacional = false,
): { totalEnvioCop: number; detalle: DetalleEnvio[] } {
  const destZona: ZonaEnvio = isInternacional ? "INTL" : getZona(destCity);

  // Zonas de origen únicas que hay en el carrito.
  const zonasCubiertas = new Set<ZonaEnvio>(
    items.map((i) => getZona(i.originCity)),
  );

  // Un cargo de envío por cada zona de origen única.
  const detalle: DetalleEnvio[] = Array.from(zonasCubiertas).map(
    (zonaOrigen) => ({
      zonaOrigen,
      costo: getTarifa(zonaOrigen, destZona),
    }),
  );

  const totalEnvioCop = detalle.reduce((s, d) => s + d.costo, 0);
  return { totalEnvioCop, detalle };
}
