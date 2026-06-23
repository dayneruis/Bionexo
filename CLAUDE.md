# CLAUDE.md — Memoria del Proyecto Bionexo

> Este archivo es la **fuente de verdad** del proyecto. Claude Code lo lee
> automáticamente al iniciar cada sesión. Manténlo actualizado al final de cada
> bloque de trabajo.

---

## 1. Resumen

- **Marca principal:** Bionexo (eslogan: "Conecta · Transforma · Impacta").
- **Marca sombrilla:** Tu Basura Innova (marca global de economía circular que respalda a Bionexo).
- **Qué es:** tienda en línea (ecommerce) a la medida para ofertar y vender productos de economía circular y materiales reciclados.
- **Protagonismo:** el sitio es principalmente de Bionexo; Tu Basura Innova se presenta dentro de "Sobre nosotros" / una sección propia.

## 2. Carpeta de trabajo

- Todo el desarrollo vive en: `D:\Eccomerce`
- Claude Code se ejecuta desde dentro de esa carpeta.
- Documentación y manuales en: `D:\Eccomerce\Documentacion`

## 3. Entorno técnico confirmado

- Node.js v22.16.0 instalado.
- Git 2.54 instalado.
- Desarrollo **a la medida** (no plataforma cerrada).
- **Stack oficial (aprobado):** Next.js (App Router) + TypeScript + Tailwind CSS + Prisma (SQLite en local, preparado para migrar a Postgres al desplegar).
- Flujo: desarrollar y probar **en local** primero; desplegar después (hosting gratis o de bajo costo, por definir).

## 4. Idiomas y moneda

- Sitio **bilingüe español / inglés** (nombres, descripciones y precios en ambos idiomas).
- Precio base en **COP**, con **equivalencia automática en USD** usando **tasa del día** (API de divisas).
  - Cachear la tasa unas horas, dejar un valor de respaldo si la fuente falla.

## 5. Catálogo

- **8 categorías**, cada una con su **página dedicada**, más una tienda general que las agrupa:
  1. Materiales recuperados (cartón, vidrio, pellets, plástico recuperado y molido)
  2. Mobiliario urbano y de construcción (muebles de plástico/madera recuperada, mobiliario escolar, ladrillos ecológicos)
  3. Moda sostenible (ropa reciclada en buen estado, ropa ecológica)
  4. Productos de aseo y para el hogar ecológicos (jabones, cremas dentales)
  5. Plantas y abonos (abonos orgánicos y de jardín, semillas nativas, plantas y árboles)
  6. Medicinas y comida sana (comida orgánica, cremas y medicina natural/orgánica)
  7. Artesanías y accesorios (con material reciclado)
  8. Empaques y desechables ecológicos
- **5 a 8 productos destacados** en la portada; el resto en el catálogo por categoría.
- Cada producto: imágenes, descripción, información, precio, **variantes** (talla/color/material).
- Disponibilidad: marca **"Disponible / No disponible"** (NO se maneja stock por cantidades; se actualiza a diario).

## 6. Botones de cada producto

- **"Comprar"** y **"Me interesa / Contáctame"** (dos botones).
- Versión inicial: redirige a **WhatsApp / formulario de contacto / cotización**.
- Dejar el código **preparado** para anclar después una pasarela de pago (cuenta única; el negocio paga al proveedor).

## 7. Usuarios

- Navegación **libre, sin registro**.
- Registro **solo al momento de comprar** y **sencillo / no tedioso** (mínimos datos necesarios).
- **Reseñas y opiniones** habilitadas.

## 8. Otras secciones

- Página **"Sobre nosotros"** (historia de economía circular + relación Bionexo / Tu Basura Innova).
- **Datos de contacto y redes sociales de ejemplo** (placeholders que el cliente reemplaza luego).
- **Cálculo de costos de envío** (envíos a todo Colombia; presencia física en Bucaramanga, área metropolitana y Bogotá).
- Público: **B2C y B2B**.

## 9. Identidad visual

- Línea natural / eco con un toque minimalista y corporativo.
- Paleta: verdes (lima a verde bosque), azules y cian, sobre fondo claro.
- Diseño **responsive** (celular, tablet, computador).
- Contenido inicial: de **ejemplo** (placeholders).

## 10. Plan por fases

- **Fase 1 (completada en local):** catálogo bilingüe con 8 categorías (página por categoría), fichas de producto con variantes y disponibilidad, los dos botones, portada con destacados, y "Sobre nosotros". Todo con contenido de ejemplo. Ver detalle técnico en la bitácora (sección 12).
- **Fase 2 (siguiente):** carrito, registro sencillo al comprar, cálculo de envío, conversión COP→USD automática.
- **Fase 3:** panel de administración (cargar/editar/dar de baja productos, fotos, precios, disponibilidad). Prioritario.
- **Fase 4:** reseñas/opiniones y pasarela de pago.

> Probar cada fase en local antes de avanzar a la siguiente.

## 11. Reglas de trabajo para Claude Code

- Antes de programar una fase, **proponer un plan** y esperar aprobación.
- **Comentar el código en español** para que el dueño pueda aprender.
- Al final de cada bloque de trabajo: **actualizar este CLAUDE.md** (decisiones) y el **manual** en `Documentacion/MANUAL_APRENDIZAJE.md` (explicaciones de lo nuevo).
- Trabajar siempre dentro de `D:\Eccomerce`.

## 12. Bitácora de decisiones

- Stack tecnológico: **Next.js (App Router) + TypeScript + Tailwind CSS + Prisma** (SQLite en local, migración a Postgres al desplegar). Propuesto por Claude Code y aprobado por el dueño del proyecto.
- **Next.js fijado en la versión 15.5.19** (no la 16, recién salida): al construir la Fase 1 se detectó que Next.js 16 rompía el ruteo de idiomas de `next-intl` (las páginas `/es` y `/en` devolvían error 404). Se bajó a la última versión estable de la serie 15 para evitar inestabilidad de una versión demasiado nueva.
- **Idiomas (es/en):** se implementó con la librería `next-intl`, usando rutas con prefijo de idioma (`/es/...`, `/en/...`). Español es el idioma por defecto. Los textos fijos de la interfaz viven en `messages/es.json` y `messages/en.json`; los nombres/descripciones de categorías y productos viven en la base de datos (columnas `...Es` / `...En`).
- **Base de datos:** Prisma 7 con SQLite local (archivo `dev.db` en la raíz). Esta versión de Prisma requiere un "adaptador de conexión" explícito (`@prisma/adapter-better-sqlite3`) en lugar de leer la base de datos de forma automática, así que el cliente se construye en `src/lib/db.ts` pasándole ese adaptador.
- **Precios:** solo en COP en esta fase. La conversión automática a USD queda para la Fase 2, tal como ya estaba planeado en la sección 10.
- **Imágenes de los productos de ejemplo:** se usan imágenes de relleno de `picsum.photos` mientras no haya fotos reales del negocio.
- **Botones "Comprar" / "Me interesa":** ambos abren un enlace de WhatsApp (`wa.me`) con un mensaje distinto pre-llenado, usando un número de teléfono de ejemplo que el dueño debe reemplazar (ver `src/components/ContactButtons.tsx`). Quedan aislados en su propio componente para poder reemplazar "Comprar" por una pasarela de pago real en la Fase 4 sin tocar el resto de la ficha de producto.

---

_Última actualización: Fase 1 completada y probada en local._
