// Datos geográficos de Colombia para el filtro de búsqueda por departamento y municipio.
// Fuente: estructura basada en la división político-administrativa del DANE.
//
// NOTA: Se incluyen los municipios más importantes de cada departamento.
// Para cargar la lista oficial completa del DANE, reemplazar el array
// `municipios` de cada departamento con los registros oficiales.
// La estructura (Departamento / Municipio con codigo y nombre) es compatible
// con los archivos CSV del DANE.

export type Municipio = {
  codigo: string; // Código DANE del municipio
  nombre: string;
};

export type Departamento = {
  codigo: string; // Código DANE del departamento
  nombre: string;
  municipios: Municipio[];
};

// Clave especial para indicar que el producto viene de fuera de Colombia.
export const CLAVE_INTERNACIONAL = "internacional";

// Los 32 departamentos de Colombia + Bogotá D.C., con sus principales municipios.
export const DEPARTAMENTOS: Departamento[] = [
  {
    codigo: "11",
    nombre: "Bogotá D.C.",
    municipios: [{ codigo: "11001", nombre: "Bogotá" }],
  },
  {
    codigo: "05",
    nombre: "Antioquia",
    municipios: [
      { codigo: "05001", nombre: "Medellín" },
      { codigo: "05088", nombre: "Bello" },
      { codigo: "05266", nombre: "Envigado" },
      { codigo: "05360", nombre: "Itagüí" },
      { codigo: "05615", nombre: "Rionegro" },
      { codigo: "05045", nombre: "Apartadó" },
      { codigo: "05837", nombre: "Turbo" },
      { codigo: "05380", nombre: "La Estrella" },
    ],
  },
  {
    codigo: "81",
    nombre: "Arauca",
    municipios: [
      { codigo: "81001", nombre: "Arauca" },
      { codigo: "81065", nombre: "Arauquita" },
      { codigo: "81736", nombre: "Saravena" },
      { codigo: "81794", nombre: "Tame" },
    ],
  },
  {
    codigo: "08",
    nombre: "Atlántico",
    municipios: [
      { codigo: "08001", nombre: "Barranquilla" },
      { codigo: "08758", nombre: "Soledad" },
      { codigo: "08433", nombre: "Malambo" },
      { codigo: "08078", nombre: "Baranoa" },
      { codigo: "08573", nombre: "Sabanagrande" },
    ],
  },
  {
    codigo: "13",
    nombre: "Bolívar",
    municipios: [
      { codigo: "13001", nombre: "Cartagena" },
      { codigo: "13430", nombre: "Magangué" },
      { codigo: "13244", nombre: "El Carmen de Bolívar" },
      { codigo: "13836", nombre: "Turbaco" },
    ],
  },
  {
    codigo: "15",
    nombre: "Boyacá",
    municipios: [
      { codigo: "15001", nombre: "Tunja" },
      { codigo: "15176", nombre: "Chiquinquirá" },
      { codigo: "15248", nombre: "Duitama" },
      { codigo: "15759", nombre: "Sogamoso" },
      { codigo: "15572", nombre: "Puerto Boyacá" },
    ],
  },
  {
    codigo: "17",
    nombre: "Caldas",
    municipios: [
      { codigo: "17001", nombre: "Manizales" },
      { codigo: "17380", nombre: "La Dorada" },
      { codigo: "17174", nombre: "Chinchiná" },
      { codigo: "17541", nombre: "Riosucio" },
      { codigo: "17665", nombre: "Salamina" },
    ],
  },
  {
    codigo: "18",
    nombre: "Caquetá",
    municipios: [
      { codigo: "18001", nombre: "Florencia" },
      { codigo: "18150", nombre: "Cartagena del Chairá" },
      { codigo: "18592", nombre: "Puerto Rico" },
    ],
  },
  {
    codigo: "85",
    nombre: "Casanare",
    municipios: [
      { codigo: "85001", nombre: "Yopal" },
      { codigo: "85010", nombre: "Aguazul" },
      { codigo: "85400", nombre: "Paz de Ariporo" },
    ],
  },
  {
    codigo: "19",
    nombre: "Cauca",
    municipios: [
      { codigo: "19001", nombre: "Popayán" },
      { codigo: "19573", nombre: "Santander de Quilichao" },
      { codigo: "19532", nombre: "Puerto Tejada" },
      { codigo: "19698", nombre: "Silvia" },
    ],
  },
  {
    codigo: "20",
    nombre: "Cesar",
    municipios: [
      { codigo: "20001", nombre: "Valledupar" },
      { codigo: "20011", nombre: "Aguachica" },
      { codigo: "20570", nombre: "San Alberto" },
    ],
  },
  {
    codigo: "27",
    nombre: "Chocó",
    municipios: [
      { codigo: "27001", nombre: "Quibdó" },
      { codigo: "27073", nombre: "Bahía Solano" },
      { codigo: "27491", nombre: "Nuquí" },
    ],
  },
  {
    codigo: "23",
    nombre: "Córdoba",
    municipios: [
      { codigo: "23001", nombre: "Montería" },
      { codigo: "23162", nombre: "Cereté" },
      { codigo: "23570", nombre: "Sahagún" },
      { codigo: "23068", nombre: "Ayapel" },
    ],
  },
  {
    codigo: "25",
    nombre: "Cundinamarca",
    municipios: [
      { codigo: "25175", nombre: "Chía" },
      { codigo: "25269", nombre: "Facatativá" },
      { codigo: "25295", nombre: "Fusagasugá" },
      { codigo: "25307", nombre: "Funza" },
      { codigo: "25473", nombre: "Mosquera" },
      { codigo: "25758", nombre: "Soacha" },
      { codigo: "25899", nombre: "Zipaquirá" },
    ],
  },
  {
    codigo: "94",
    nombre: "Guainía",
    municipios: [{ codigo: "94001", nombre: "Inírida" }],
  },
  {
    codigo: "95",
    nombre: "Guaviare",
    municipios: [
      { codigo: "95001", nombre: "San José del Guaviare" },
      { codigo: "95015", nombre: "Calamar" },
    ],
  },
  {
    codigo: "41",
    nombre: "Huila",
    municipios: [
      { codigo: "41001", nombre: "Neiva" },
      { codigo: "41206", nombre: "Garzón" },
      { codigo: "41298", nombre: "La Plata" },
      { codigo: "41524", nombre: "Palermo" },
    ],
  },
  {
    codigo: "44",
    nombre: "La Guajira",
    municipios: [
      { codigo: "44001", nombre: "Riohacha" },
      { codigo: "44430", nombre: "Maicao" },
      { codigo: "44560", nombre: "Manaure" },
    ],
  },
  {
    codigo: "47",
    nombre: "Magdalena",
    municipios: [
      { codigo: "47001", nombre: "Santa Marta" },
      { codigo: "47170", nombre: "Ciénaga" },
      { codigo: "47053", nombre: "Aracataca" },
      { codigo: "47551", nombre: "Plato" },
    ],
  },
  {
    codigo: "50",
    nombre: "Meta",
    municipios: [
      { codigo: "50001", nombre: "Villavicencio" },
      { codigo: "50006", nombre: "Acacías" },
      { codigo: "50325", nombre: "Granada" },
    ],
  },
  {
    codigo: "52",
    nombre: "Nariño",
    municipios: [
      { codigo: "52001", nombre: "Pasto" },
      { codigo: "52835", nombre: "Tumaco" },
      { codigo: "52480", nombre: "La Unión" },
    ],
  },
  {
    codigo: "54",
    nombre: "Norte de Santander",
    municipios: [
      { codigo: "54001", nombre: "Cúcuta" },
      { codigo: "54405", nombre: "Los Patios" },
      { codigo: "54498", nombre: "Ocaña" },
    ],
  },
  {
    codigo: "86",
    nombre: "Putumayo",
    municipios: [
      { codigo: "86001", nombre: "Mocoa" },
      { codigo: "86568", nombre: "Puerto Asís" },
      { codigo: "86865", nombre: "Valle del Guamuez" },
    ],
  },
  {
    codigo: "63",
    nombre: "Quindío",
    municipios: [
      { codigo: "63001", nombre: "Armenia" },
      { codigo: "63130", nombre: "Calarcá" },
      { codigo: "63272", nombre: "Filandia" },
    ],
  },
  {
    codigo: "66",
    nombre: "Risaralda",
    municipios: [
      { codigo: "66001", nombre: "Pereira" },
      { codigo: "66170", nombre: "Dosquebradas" },
      { codigo: "66572", nombre: "Santa Rosa de Cabal" },
    ],
  },
  {
    codigo: "88",
    nombre: "San Andrés y Providencia",
    municipios: [
      { codigo: "88001", nombre: "San Andrés" },
      { codigo: "88564", nombre: "Providencia" },
    ],
  },
  {
    codigo: "68",
    nombre: "Santander",
    municipios: [
      { codigo: "68001", nombre: "Bucaramanga" },
      { codigo: "68276", nombre: "Floridablanca" },
      { codigo: "68307", nombre: "Girón" },
      { codigo: "68547", nombre: "Piedecuesta" },
      { codigo: "68655", nombre: "San Gil" },
      { codigo: "68079", nombre: "Barbosa" },
      { codigo: "68081", nombre: "Barichara" },
    ],
  },
  {
    codigo: "70",
    nombre: "Sucre",
    municipios: [
      { codigo: "70001", nombre: "Sincelejo" },
      { codigo: "70215", nombre: "Corozal" },
      { codigo: "70508", nombre: "Ovejas" },
    ],
  },
  {
    codigo: "73",
    nombre: "Tolima",
    municipios: [
      { codigo: "73001", nombre: "Ibagué" },
      { codigo: "73268", nombre: "Espinal" },
      { codigo: "73148", nombre: "Chaparral" },
      { codigo: "73449", nombre: "Mariquita" },
    ],
  },
  {
    codigo: "76",
    nombre: "Valle del Cauca",
    municipios: [
      { codigo: "76001", nombre: "Cali" },
      { codigo: "76111", nombre: "Buenaventura" },
      { codigo: "76109", nombre: "Buga" },
      { codigo: "76147", nombre: "Cartago" },
      { codigo: "76520", nombre: "Palmira" },
      { codigo: "76890", nombre: "Yumbo" },
    ],
  },
  {
    codigo: "91",
    nombre: "Amazonas",
    municipios: [{ codigo: "91001", nombre: "Leticia" }],
  },
  {
    codigo: "97",
    nombre: "Vaupés",
    municipios: [{ codigo: "97001", nombre: "Mitú" }],
  },
  {
    codigo: "99",
    nombre: "Vichada",
    municipios: [
      { codigo: "99001", nombre: "Puerto Carreño" },
      { codigo: "99773", nombre: "Cumaribo" },
    ],
  },
];

// Lista plana de todos los nombres de departamentos, lista para selects.
export const NOMBRES_DEPARTAMENTOS = DEPARTAMENTOS.map((d) => d.nombre).sort((a, b) =>
  a.localeCompare(b, "es"),
);

// Dado el nombre de un departamento, devuelve sus municipios.
export function getMunicipiosDe(nombreDepto: string): Municipio[] {
  return DEPARTAMENTOS.find((d) => d.nombre === nombreDepto)?.municipios ?? [];
}
