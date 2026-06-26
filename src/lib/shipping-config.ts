// =================================================================
// CONFIGURACIÓN DE ZONAS Y TARIFAS DE ENVÍO — Bionexo
// =================================================================
// Este es EL archivo que se edita para ajustar zonas y tarifas.
// Para integrar Servientrega / Coordinadora en una fase futura,
// reemplaza la función getTarifa() en shipping.ts para que llame
// a la API de la transportadora en lugar de leer TARIFAS_COP.
// =================================================================

/** Códigos internos de las cinco zonas de envío. */
export type ZonaEnvio = "BUC" | "BOG" | "PPAL" | "COL" | "INTL";

/** Definición de cada zona: nombre visible y ciudades que cubre. */
export const ZONAS: Record<
  ZonaEnvio,
  { nombreEs: string; nombreEn: string; ciudades: string[] }
> = {
  BUC: {
    nombreEs: "Bucaramanga y área metropolitana",
    nombreEn: "Bucaramanga and metro area",
    // Agrega aquí más municipios del área metro de Bucaramanga si los necesitas.
    ciudades: [
      "Bucaramanga",
      "Floridablanca",
      "Girón",
      "Piedecuesta",
      "Lebrija",
      "Los Santos",
      "Rionegro",
      "El Playón",
    ],
  },
  BOG: {
    nombreEs: "Bogotá y Sabana",
    nombreEn: "Bogotá and Sabana",
    ciudades: [
      "Bogotá",
      "Soacha",
      "Chía",
      "Zipaquirá",
      "Facatativá",
      "Mosquera",
      "Madrid",
      "Cajicá",
      "Sopó",
      "Funza",
      "Cota",
    ],
  },
  PPAL: {
    nombreEs: "Ciudades principales",
    nombreEn: "Major cities",
    // Ciudades con mayor cobertura de transportadoras en Colombia.
    ciudades: [
      "Medellín",
      "Bello",
      "Itagüí",
      "Envigado",
      "Sabaneta",
      "Cali",
      "Palmira",
      "Barranquilla",
      "Soledad",
      "Cartagena",
      "Cúcuta",
      "Villa del Rosario",
      "Pereira",
      "Dosquebradas",
      "Manizales",
      "Ibagué",
      "Santa Marta",
      "Villavicencio",
      "Neiva",
      "Pasto",
      "Armenia",
      "Montería",
      "Sincelejo",
      "Valledupar",
      "Popayán",
      "Tunja",
      "Riohacha",
    ],
  },
  COL: {
    nombreEs: "Resto de Colombia",
    nombreEn: "Rest of Colombia",
    // Cualquier ciudad colombiana no listada arriba cae aquí automáticamente.
    ciudades: [],
  },
  INTL: {
    nombreEs: "Internacional",
    nombreEn: "International",
    // Destinos fuera de Colombia. Se activa con el checkbox internacional.
    ciudades: [],
  },
};

// -----------------------------------------------------------------
// TABLA DE TARIFAS (COP) — origen (filas) vs. destino (columnas).
//
// Para cambiar un precio, edita el número. Ejemplo:
//   BUC: { BOG: 18000 }  →  enviar desde Bucaramanga a Bogotá = $18.000
//
// Estas son tarifas de ejemplo; el dueño del negocio debe reemplazarlas
// con las tarifas reales de su transportadora.
// -----------------------------------------------------------------
export const TARIFAS_COP: Record<ZonaEnvio, Record<ZonaEnvio, number>> = {
  //              destino →   BUC      BOG      PPAL     COL      INTL
  BUC:  { BUC:  5_000, BOG: 18_000, PPAL: 22_000, COL: 28_000, INTL: 120_000 },
  BOG:  { BUC: 18_000, BOG:  8_000, PPAL: 15_000, COL: 25_000, INTL: 110_000 },
  PPAL: { BUC: 22_000, BOG: 15_000, PPAL: 10_000, COL: 28_000, INTL: 110_000 },
  COL:  { BUC: 28_000, BOG: 25_000, PPAL: 28_000, COL: 20_000, INTL: 130_000 },
  INTL: { BUC: 120_000, BOG: 110_000, PPAL: 110_000, COL: 130_000, INTL: 60_000 },
};

/** Lista plana de todas las ciudades nombradas, útil para el autocompletado. */
export const TODAS_LAS_CIUDADES: string[] = Object.values(ZONAS).flatMap(
  (z) => z.ciudades,
);
