import { prisma } from "./db";

// Tasa de respaldo cuando la API externa no responde.
// Aproximado: 1 USD = 4.200 COP. Ajustar si la tasa cambia significativamente.
const TASA_RESPALDO = 1 / 4_200;

// La caché es válida 6 horas para no saturar la API gratuita.
const CACHE_MS = 6 * 60 * 60 * 1_000;

// API gratuita sin clave. Punto de extensión: cambiar la URL por una API
// comercial si se requiere mayor precisión o más consultas diarias.
const API_URL = "https://api.frankfurter.app/latest?from=COP&to=USD";

/**
 * Devuelve cuántos USD equivale 1 COP.
 * Consulta la API solo si la caché de la BD tiene más de 6 horas.
 * Si la API falla, usa la tasa de respaldo y no interrumpe el sitio.
 */
export async function getTasaUsd(): Promise<number> {
  // 1. Leer la caché.
  const cached = await prisma.exchangeRate.findUnique({
    where: { id: "singleton" },
  });
  if (cached) {
    const edad = Date.now() - cached.updatedAt.getTime();
    if (edad < CACHE_MS) return cached.usdPerCop;
  }

  // 2. Caché vencida o vacía → consultar la API.
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as { rates: { USD: number } };
    const tasa = json.rates.USD;

    // Guardar o actualizar la única fila de caché.
    await prisma.exchangeRate.upsert({
      where: { id: "singleton" },
      update: { usdPerCop: tasa },
      create: { id: "singleton", usdPerCop: tasa },
    });

    return tasa;
  } catch {
    console.warn("[exchange] API de divisas falló, usando tasa de respaldo.");
    return cached?.usdPerCop ?? TASA_RESPALDO;
  }
}

/** Convierte un monto en COP a USD usando la tasa en caché. */
export async function copToUsd(priceCop: number): Promise<number> {
  const tasa = await getTasaUsd();
  return priceCop * tasa;
}
