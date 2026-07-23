import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

// Datos de ejemplo (placeholders) para poder ver el catálogo funcionando
// mientras el dueño del negocio carga su información real.
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

function image(seed: string) {
  return `https://picsum.photos/seed/${seed}/600/450`;
}

// ─── PRODUCTORES DE EJEMPLO ──────────────────────────────────────────────────
// Estos datos son INTERNOS: solo para uso del equipo de Bionexo.
// NUNCA se muestran al cliente. El dueño debe reemplazar por los datos reales.
const productores = [
  {
    name: "EcoMedellín SAS",
    contactName: "Carlos Ramírez",
    phone: "3101234567",
    email: "carlos@ecomedellin.example.com",
    notes: "Proveedor principal de plásticos recuperados. Pago mensual.",
  },
  {
    name: "Artesanías del Pacífico",
    contactName: "Luz Marina Torres",
    phone: "3209876543",
    email: "luz@artesaniaspacifico.example.com",
    notes: "Emprendimiento familiar. Pago contra entrega.",
  },
  {
    name: "BioHuerta Bogotá",
    contactName: "Pedro Gómez",
    phone: "3154567890",
    email: null,
    notes: "Productor de abonos y plantas. Entrega los lunes.",
  },
  {
    name: "Moda Verde Cali",
    contactName: "Alejandra Ríos",
    phone: "3187654321",
    email: "ale@modaverde.example.com",
    notes: "Diseñadora independiente. Margen negociado al 7%.",
  },
  {
    name: "NaturalMente Bucaramanga",
    contactName: "Jimena Vásquez",
    phone: "3052345678",
    email: "jimena@naturalmente.example.com",
    notes: "Jabones y cremas naturales. Proveedor desde Fase 1.",
  },
];

// ─── CATEGORÍAS ──────────────────────────────────────────────────────────────
// Las 8 categorías originales + 2 nuevas = 10 en total.
// Las ciudades y departamentos de origen son de ejemplo; el dueño del negocio
// debe reemplazarlos por los datos reales de cada proveedor.
const categories = [
  {
    slug: "materiales-recuperados",
    nameEs: "Materiales recuperados",
    nameEn: "Recovered materials",
    descriptionEs: "Cartón, vidrio, pellets y plástico recuperado y molido, listos para una segunda vida.",
    descriptionEn: "Cardboard, glass, pellets and recovered ground plastic, ready for a second life.",
    products: [
      {
        slug: "pellets-plastico-reciclado-25kg",
        nameEs: "Pellets de plástico reciclado (25 kg)",
        nameEn: "Recycled plastic pellets (25 kg)",
        descriptionEs: "Pellets de plástico recuperado y molido, ideales para procesos de inyección y extrusión.",
        descriptionEn: "Recovered and ground plastic pellets, ideal for injection and extrusion processes.",
        priceCop: 185000,
        featured: true,
        originCity: "Medellín",
        originDepartment: "Antioquia",
        size: "25 kg por bulto",
        warranty: true,
        warrantyDuration: "6 meses",
        margin: 7.0,
        producerIndex: 0, // EcoMedellín SAS
        variants: [{ type: "material", value: "PET" }, { type: "material", value: "HDPE" }],
      },
      {
        slug: "vidrio-molido-bulto",
        nameEs: "Vidrio molido por bulto",
        nameEn: "Ground glass (bulk bag)",
        descriptionEs: "Vidrio recuperado y molido, útil para artesanías, construcción y proyectos decorativos.",
        descriptionEn: "Recovered ground glass, useful for crafts, construction and decorative projects.",
        priceCop: 45000,
        featured: false,
        originCity: "Bogotá",
        originDepartment: "Bogotá D.C.",
        size: "10 kg por bulto",
        warranty: false,
        warrantyDuration: null,
        margin: 5.0,
        producerIndex: null,
        variants: [{ type: "color", value: "Transparente" }, { type: "color", value: "Verde" }],
      },
      {
        slug: "carton-prensado-fardo",
        nameEs: "Cartón prensado en fardo",
        nameEn: "Pressed cardboard bale",
        descriptionEs: "Fardo de cartón recuperado, prensado y listo para reciclar o reutilizar.",
        descriptionEn: "Bale of recovered cardboard, pressed and ready to recycle or reuse.",
        priceCop: 30000,
        featured: false,
        originCity: "Bucaramanga",
        originDepartment: "Santander",
        size: "Aprox. 50 kg",
        warranty: false,
        warrantyDuration: null,
        margin: 5.0,
        producerIndex: null,
        variants: [],
      },
    ],
  },
  {
    slug: "mobiliario-urbano",
    nameEs: "Mobiliario urbano y de construcción",
    nameEn: "Urban & construction furniture",
    descriptionEs: "Muebles de plástico y madera recuperada, mobiliario escolar y ladrillos ecológicos.",
    descriptionEn: "Furniture made from recovered plastic and wood, school furniture and eco-bricks.",
    products: [
      {
        slug: "banca-exterior-plastico-reciclado",
        nameEs: "Banca de exterior en plástico reciclado",
        nameEn: "Outdoor bench made from recycled plastic",
        descriptionEs: "Banca resistente a la intemperie, fabricada con plástico reciclado de un solo bloque.",
        descriptionEn: "Weather-resistant bench made from a single block of recycled plastic.",
        priceCop: 420000,
        featured: true,
        originCity: "Medellín",
        originDepartment: "Antioquia",
        size: "180 × 40 × 45 cm",
        warranty: true,
        warrantyDuration: "1 año",
        margin: 8.0,
        producerIndex: 0, // EcoMedellín SAS
        variants: [{ type: "color", value: "Verde bosque" }, { type: "color", value: "Gris" }],
      },
      {
        slug: "ladrillo-ecologico-pet",
        nameEs: "Ladrillo ecológico (a base de PET)",
        nameEn: "Eco-brick (PET based)",
        descriptionEs: "Ladrillo elaborado con plástico PET recuperado, para muros no estructurales.",
        descriptionEn: "Brick made from recovered PET plastic, for non-structural walls.",
        priceCop: 3500,
        featured: false,
        originCity: "Bogotá",
        originDepartment: "Bogotá D.C.",
        size: "20 × 10 × 6 cm",
        warranty: false,
        warrantyDuration: null,
        margin: 5.0,
        producerIndex: null,
        variants: [],
      },
      {
        slug: "pupitre-escolar-madera-recuperada",
        nameEs: "Pupitre escolar en madera recuperada",
        nameEn: "School desk made from recovered wood",
        descriptionEs: "Pupitre individual fabricado con madera recuperada de estibas y embalajes.",
        descriptionEn: "Individual desk made from wood recovered from pallets and packaging.",
        priceCop: 165000,
        featured: false,
        originCity: "Cali",
        originDepartment: "Valle del Cauca",
        size: "60 × 45 × 75 cm",
        warranty: true,
        warrantyDuration: "6 meses",
        margin: 6.0,
        producerIndex: null,
        variants: [],
      },
    ],
  },
  {
    slug: "moda-sostenible",
    nameEs: "Moda sostenible",
    nameEn: "Sustainable fashion",
    descriptionEs: "Ropa reciclada en buen estado y ropa ecológica de nueva producción.",
    descriptionEn: "Recycled clothing in good condition and newly made eco-friendly clothing.",
    products: [
      {
        slug: "camiseta-algodon-organico",
        nameEs: "Camiseta de algodón orgánico",
        nameEn: "Organic cotton t-shirt",
        descriptionEs: "Camiseta básica de algodón 100% orgánico, cultivo libre de pesticidas.",
        descriptionEn: "Basic t-shirt made from 100% organic cotton, pesticide-free farming.",
        priceCop: 65000,
        featured: true,
        originCity: "Cali",
        originDepartment: "Valle del Cauca",
        size: "Tallas S, M, L",
        warranty: false,
        warrantyDuration: null,
        margin: 7.0,
        producerIndex: 3, // Moda Verde Cali
        variants: [
          { type: "talla", value: "S" },
          { type: "talla", value: "M" },
          { type: "talla", value: "L" },
        ],
      },
      {
        slug: "chaqueta-segunda-mano-restaurada",
        nameEs: "Chaqueta de segunda mano restaurada",
        nameEn: "Restored second-hand jacket",
        descriptionEs: "Chaqueta seleccionada y restaurada, en muy buen estado.",
        descriptionEn: "Selected and restored jacket, in very good condition.",
        priceCop: 95000,
        featured: false,
        originCity: "Medellín",
        originDepartment: "Antioquia",
        size: "Tallas M, L",
        warranty: false,
        warrantyDuration: null,
        margin: 6.0,
        producerIndex: 3, // Moda Verde Cali
        variants: [{ type: "talla", value: "M" }, { type: "talla", value: "L" }],
      },
    ],
  },
  {
    slug: "aseo-hogar-ecologico",
    nameEs: "Productos de aseo y para el hogar ecológicos",
    nameEn: "Eco home & personal care products",
    descriptionEs: "Jabones y cremas dentales elaborados con ingredientes naturales.",
    descriptionEn: "Soaps and toothpaste made with natural ingredients.",
    products: [
      {
        slug: "jabon-artesanal-avena-miel",
        nameEs: "Jabón artesanal de avena y miel",
        nameEn: "Handmade oat and honey soap",
        descriptionEs: "Jabón artesanal elaborado en frío, sin químicos agresivos.",
        descriptionEn: "Cold-process handmade soap, free of harsh chemicals.",
        priceCop: 14000,
        featured: true,
        originCity: "Bucaramanga",
        originDepartment: "Santander",
        size: "100 g",
        warranty: false,
        warrantyDuration: null,
        margin: 5.0,
        producerIndex: 4, // NaturalMente Bucaramanga
        variants: [],
      },
      {
        slug: "crema-dental-natural-menta",
        nameEs: "Crema dental natural de menta",
        nameEn: "Natural mint toothpaste",
        descriptionEs: "Crema dental natural sin flúor, con menta y bicarbonato.",
        descriptionEn: "Natural fluoride-free toothpaste with mint and baking soda.",
        priceCop: 18000,
        featured: false,
        originCity: "Floridablanca",
        originDepartment: "Santander",
        size: "75 ml",
        warranty: false,
        warrantyDuration: null,
        margin: 5.0,
        producerIndex: 4, // NaturalMente Bucaramanga
        variants: [],
      },
    ],
  },
  {
    slug: "plantas-abonos",
    nameEs: "Plantas y abonos",
    nameEn: "Plants & fertilizers",
    descriptionEs: "Abonos orgánicos y de jardín, semillas nativas, plantas y árboles.",
    descriptionEn: "Organic and garden fertilizers, native seeds, plants and trees.",
    products: [
      {
        slug: "abono-organico-compostado-10kg",
        nameEs: "Abono orgánico compostado (10 kg)",
        nameEn: "Composted organic fertilizer (10 kg)",
        descriptionEs: "Abono 100% orgánico, producido a partir de residuos vegetales compostados.",
        descriptionEn: "100% organic fertilizer made from composted plant waste.",
        priceCop: 28000,
        featured: true,
        originCity: "Pereira",
        originDepartment: "Risaralda",
        size: "10 kg",
        warranty: false,
        warrantyDuration: null,
        margin: 5.0,
        producerIndex: 2, // BioHuerta Bogotá
        variants: [],
      },
      {
        slug: "semillas-nativas-surtido",
        nameEs: "Semillas nativas (surtido)",
        nameEn: "Native seeds (assorted)",
        descriptionEs: "Surtido de semillas nativas para huerta casera.",
        descriptionEn: "Assorted native seeds for home gardening.",
        priceCop: 12000,
        featured: false,
        originCity: "Bogotá",
        originDepartment: "Bogotá D.C.",
        size: "50 semillas aprox.",
        warranty: false,
        warrantyDuration: null,
        margin: 5.0,
        producerIndex: 2, // BioHuerta Bogotá
        variants: [],
      },
    ],
  },
  {
    slug: "medicinas-comida-sana",
    nameEs: "Medicinas y comida sana",
    nameEn: "Natural medicine & healthy food",
    descriptionEs: "Comida orgánica, cremas y medicina natural u orgánica.",
    descriptionEn: "Organic food, creams and natural or organic medicine.",
    products: [
      {
        slug: "miel-organica-frasco-500g",
        nameEs: "Miel orgánica (frasco 500 g)",
        nameEn: "Organic honey (500 g jar)",
        descriptionEs: "Miel orgánica de productores locales, sin procesos industriales.",
        descriptionEn: "Organic honey from local producers, with no industrial processing.",
        priceCop: 32000,
        featured: true,
        originCity: "Neiva",
        originDepartment: "Huila",
        size: "500 g",
        warranty: false,
        warrantyDuration: null,
        margin: 5.0,
        producerIndex: null,
        variants: [],
      },
      {
        slug: "crema-natural-calendula",
        nameEs: "Crema natural de caléndula",
        nameEn: "Natural calendula cream",
        descriptionEs: "Crema elaborada con extracto natural de caléndula para piel sensible.",
        descriptionEn: "Cream made with natural calendula extract for sensitive skin.",
        priceCop: 22000,
        featured: false,
        originCity: "Cali",
        originDepartment: "Valle del Cauca",
        size: "60 ml",
        warranty: false,
        warrantyDuration: null,
        margin: 5.0,
        producerIndex: null,
        variants: [],
      },
    ],
  },
  {
    slug: "artesanias-accesorios",
    nameEs: "Artesanías y accesorios",
    nameEn: "Crafts & accessories",
    descriptionEs: "Artesanías y accesorios elaborados con material reciclado.",
    descriptionEn: "Crafts and accessories made from recycled material.",
    products: [
      {
        slug: "aretes-vidrio-reciclado",
        nameEs: "Aretes de vidrio reciclado",
        nameEn: "Recycled glass earrings",
        descriptionEs: "Aretes hechos a mano con fragmentos de vidrio reciclado.",
        descriptionEn: "Handmade earrings made from recycled glass fragments.",
        priceCop: 25000,
        featured: false,
        originCity: "Quibdó",
        originDepartment: "Chocó",
        size: "3 cm de largo",
        warranty: false,
        warrantyDuration: null,
        margin: 5.0,
        producerIndex: 1, // Artesanías del Pacífico
        variants: [{ type: "color", value: "Azul" }, { type: "color", value: "Ámbar" }],
      },
      {
        slug: "bolso-tejido-plastico-reciclado",
        nameEs: "Bolso tejido con plástico reciclado",
        nameEn: "Woven bag made from recycled plastic",
        descriptionEs: "Bolso tejido a mano con tiras de plástico reciclado.",
        descriptionEn: "Hand-woven bag made from strips of recycled plastic.",
        priceCop: 58000,
        featured: true,
        originCity: "Barranquilla",
        originDepartment: "Atlántico",
        size: "30 × 25 cm",
        warranty: false,
        warrantyDuration: null,
        margin: 6.0,
        producerIndex: 1, // Artesanías del Pacífico
        variants: [],
      },
    ],
  },
  {
    slug: "empaques-desechables",
    nameEs: "Empaques y desechables ecológicos",
    nameEn: "Eco packaging & disposables",
    descriptionEs: "Empaques y desechables biodegradables o compostables.",
    descriptionEn: "Biodegradable or compostable packaging and disposables.",
    products: [
      {
        slug: "vasos-biodegradables-paquete-50",
        nameEs: "Vasos biodegradables (paquete x50)",
        nameEn: "Biodegradable cups (pack of 50)",
        descriptionEs: "Vasos compostables hechos a base de fibra vegetal.",
        descriptionEn: "Compostable cups made from plant fiber.",
        priceCop: 21000,
        featured: false,
        originCity: "Bogotá",
        originDepartment: "Bogotá D.C.",
        size: "250 ml, paquete × 50",
        warranty: false,
        warrantyDuration: null,
        margin: 5.0,
        producerIndex: null,
        variants: [],
      },
      {
        slug: "bolsas-papel-kraft-paquete-100",
        nameEs: "Bolsas de papel kraft (paquete x100)",
        nameEn: "Kraft paper bags (pack of 100)",
        descriptionEs: "Bolsas de papel kraft reciclado, alternativa al plástico de un solo uso.",
        descriptionEn: "Recycled kraft paper bags, an alternative to single-use plastic.",
        priceCop: 26000,
        featured: false,
        originCity: "Medellín",
        originDepartment: "Antioquia",
        size: "20 × 30 cm, paquete × 100",
        warranty: false,
        warrantyDuration: null,
        margin: 5.0,
        producerIndex: 0, // EcoMedellín SAS
        variants: [],
      },
    ],
  },
  // ─── CATEGORÍAS NUEVAS (Fase 3 prep) ───────────────────────────────────────
  {
    slug: "servicios",
    nameEs: "Servicios",
    nameEn: "Services",
    descriptionEs: "Servicios de recolección, transformación, consultoría y más, ofrecidos por emprendedores de economía circular.",
    descriptionEn: "Collection, transformation, consulting and other services offered by circular economy entrepreneurs.",
    products: [
      {
        slug: "servicio-recoleccion-residuos",
        nameEs: "Recolección de residuos en empresa",
        nameEn: "Business waste collection service",
        descriptionEs: "Servicio de recolección y clasificación de residuos sólidos en empresas y oficinas.",
        descriptionEn: "Solid waste collection and classification service for companies and offices.",
        priceCop: 180000,
        featured: true,
        originCity: "Bucaramanga",
        originDepartment: "Santander",
        size: "Por visita mensual",
        warranty: false,
        warrantyDuration: null,
        margin: 10.0,
        producerIndex: null,
        variants: [],
      },
    ],
  },
  {
    slug: "otros-productos",
    nameEs: "Otros productos",
    nameEn: "Other products",
    descriptionEs: "Productos de economía circular que no encajan en las otras categorías pero que merecen una segunda vida.",
    descriptionEn: "Circular economy products that don't fit in other categories but deserve a second life.",
    products: [
      {
        slug: "lote-electronica-reciclada",
        nameEs: "Lote de electrónica reciclada",
        nameEn: "Recycled electronics lot",
        descriptionEs: "Lote de componentes y aparatos electrónicos recuperados, aptos para reparación o repuestos.",
        descriptionEn: "Lot of recovered electronic components and devices, suitable for repair or spare parts.",
        priceCop: 75000,
        featured: true,
        originCity: "Bogotá",
        originDepartment: "Bogotá D.C.",
        size: "Aprox. 5 kg de componentes",
        warranty: false,
        warrantyDuration: null,
        margin: 5.0,
        producerIndex: null,
        variants: [],
      },
    ],
  },
];

async function main() {
  // Limpiamos antes de sembrar para poder correr el seed varias veces sin duplicar.
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.producer.deleteMany();

  // Crear los productores de ejemplo primero
  const creadosProductores = await Promise.all(
    productores.map((p) => prisma.producer.create({ data: p })),
  );

  // Crear categorías y productos
  for (const category of categories) {
    const { products, ...categoryData } = category;

    const createdCategory = await prisma.category.create({ data: categoryData });

    for (const product of products) {
      const { variants, producerIndex, ...productData } = product;

      await prisma.product.create({
        data: {
          ...productData,
          imageUrl: image(product.slug),
          categoryId: createdCategory.id,
          // Vincular al productor si se especificó un índice
          ...(producerIndex !== null && producerIndex !== undefined
            ? { producerId: creadosProductores[producerIndex].id }
            : {}),
          variants: { create: variants },
        },
      });
    }
  }

  console.log(`✅ Catálogo de ejemplo creado: ${productores.length} productores, ${categories.length} categorías.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
