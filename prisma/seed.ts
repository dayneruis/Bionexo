import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

// Datos de ejemplo (placeholders) para poder ver el catálogo funcionando
// mientras el dueño del negocio carga su información real.
const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

function image(seed: string) {
  return `https://picsum.photos/seed/${seed}/600/450`;
}

// Las ciudades de origen son de ejemplo; el dueño del negocio debe
// reemplazarlas por la ciudad real de cada proveedor o vendedor.
const categories = [
  {
    slug: "materiales-recuperados",
    nameEs: "Materiales recuperados",
    nameEn: "Recovered materials",
    descriptionEs:
      "Cartón, vidrio, pellets y plástico recuperado y molido, listos para una segunda vida.",
    descriptionEn:
      "Cardboard, glass, pellets and recovered ground plastic, ready for a second life.",
    products: [
      {
        slug: "pellets-plastico-reciclado-25kg",
        nameEs: "Pellets de plástico reciclado (25 kg)",
        nameEn: "Recycled plastic pellets (25 kg)",
        descriptionEs:
          "Pellets de plástico recuperado y molido, ideales para procesos de inyección y extrusión.",
        descriptionEn:
          "Recovered and ground plastic pellets, ideal for injection and extrusion processes.",
        priceCop: 185000,
        featured: true,
        originCity: "Medellín",
        variants: [{ type: "material", value: "PET" }, { type: "material", value: "HDPE" }],
      },
      {
        slug: "vidrio-molido-bulto",
        nameEs: "Vidrio molido por bulto",
        nameEn: "Ground glass (bulk bag)",
        descriptionEs:
          "Vidrio recuperado y molido, útil para artesanías, construcción y proyectos decorativos.",
        descriptionEn:
          "Recovered ground glass, useful for crafts, construction and decorative projects.",
        priceCop: 45000,
        featured: false,
        originCity: "Bogotá",
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
        variants: [],
      },
    ],
  },
  {
    slug: "mobiliario-urbano",
    nameEs: "Mobiliario urbano y de construcción",
    nameEn: "Urban & construction furniture",
    descriptionEs:
      "Muebles de plástico y madera recuperada, mobiliario escolar y ladrillos ecológicos.",
    descriptionEn:
      "Furniture made from recovered plastic and wood, school furniture and eco-bricks.",
    products: [
      {
        slug: "banca-exterior-plastico-reciclado",
        nameEs: "Banca de exterior en plástico reciclado",
        nameEn: "Outdoor bench made from recycled plastic",
        descriptionEs:
          "Banca resistente a la intemperie, fabricada con plástico reciclado de un solo bloque.",
        descriptionEn:
          "Weather-resistant bench made from a single block of recycled plastic.",
        priceCop: 420000,
        featured: true,
        originCity: "Medellín",
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
        originCity: "Bogotá",
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
        variants: [],
      },
      {
        slug: "crema-natural-caléndula",
        nameEs: "Crema natural de caléndula",
        nameEn: "Natural calendula cream",
        descriptionEs: "Crema elaborada con extracto natural de caléndula para piel sensible.",
        descriptionEn: "Cream made with natural calendula extract for sensitive skin.",
        priceCop: 22000,
        featured: false,
        originCity: "Cali",
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
        originCity: "Bogotá",
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

  for (const category of categories) {
    const { products, ...categoryData } = category;

    const createdCategory = await prisma.category.create({ data: categoryData });

    for (const product of products) {
      const { variants, ...productData } = product;

      await prisma.product.create({
        data: {
          ...productData,
          imageUrl: image(product.slug),
          categoryId: createdCategory.id,
          variants: { create: variants },
        },
      });
    }
  }

  console.log("Catálogo de ejemplo creado correctamente.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
