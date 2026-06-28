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

- **10 categorías** (las 8 originales + Servicios + Otros productos), cada una con su **página dedicada**, más una tienda general que las agrupa:
  1. Materiales recuperados (cartón, vidrio, pellets, plástico recuperado y molido)
  2. Mobiliario urbano y de construcción (muebles de plástico/madera recuperada, mobiliario escolar, ladrillos ecológicos)
  3. Moda sostenible (ropa reciclada en buen estado, ropa ecológica)
  4. Productos de aseo y para el hogar ecológicos (jabones, cremas dentales)
  5. Plantas y abonos (abonos orgánicos y de jardín, semillas nativas, plantas y árboles)
  6. Medicinas y comida sana (comida orgánica, cremas y medicina natural/orgánica)
  7. Artesanías y accesorios (con material reciclado)
  8. Empaques y desechables ecológicos
  9. Servicios (recolección, transformación, consultoría, etc.)
  10. Otros productos (economía circular que no encaja en las categorías anteriores)
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
- **Botones "Comprar" / "Me interesa":** "Comprar" agrega al carrito; "Me interesa" sigue abriendo WhatsApp. Ambos aislados en `src/components/ContactButtons.tsx` para que en Fase 4 solo se cambie ese componente al enchufar la pasarela de pago.

## 13. Bitácora Fase 2

- **Carrito:** estado en React Context (`src/lib/cart.tsx`) + persistencia en `localStorage`. Clave de storage: `bionexo_carrito`. El cajón lateral (`CartDrawer`) se abre/cierra a través del mismo contexto.
- **Conversión COP → USD:** API gratuita Frankfurter (`api.frankfurter.app`), caché en tabla `ExchangeRate` (SQLite, patrón singleton), refresco cada 6 horas, tasa de respaldo ~1/4200 si la API falla. Lógica en `src/lib/exchange.ts`; endpoint para el cliente en `src/app/api/exchange-rate/route.ts`.
- **Envío origen-destino:** 5 zonas (`BUC`, `BOG`, `PPAL`, `COL`, `INTL`). Tabla de tarifas 5×5 en `src/lib/shipping-config.ts` (el único archivo que editar para cambiar tarifas o zonas). Lógica de cálculo en `src/lib/shipping.ts`. Estrategia multi-origen: agrupar ítems por zona de origen → un envío por zona → sumar. Preparado para integrar Servientrega/Coordinadora reemplazando `getTarifa()` en `shipping.ts`.
- **Ciudad de origen por producto:** campo `originCity String` en la tabla `Product`. El seed trae ciudades de ejemplo; el dueño las reemplaza por las reales en el panel admin (Fase 3).
- **Checkout:** página en `src/app/[locale]/checkout/page.tsx` (mínima, servidor) + componente cliente `CheckoutForm.tsx` que lee el carrito de localStorage, muestra el calculador de envío, recibe datos del comprador y llama a `POST /api/orders` para guardar el pedido. Sin contraseñas en esta fase (se agregan con la pasarela en Fase 4).
- **Confirmación:** página `src/app/[locale]/pedido-confirmado/page.tsx` que lee el pedido de la BD y genera un enlace de WhatsApp con el resumen completo del pedido para que el comprador lo envíe al negocio.
- **Modelos nuevos en Prisma:** `Order`, `OrderItem`, `ExchangeRate`. Migración: `20260625230632_fase2`.
- **Número de WhatsApp de ejemplo:** `573000000000` — el dueño lo reemplaza en `src/lib/contact-config.ts` (un solo lugar para todo el sitio).

## 14. Bitácora — Ajustes pre-Fase 3 (Bloque Marketplace)

- **Modelo de intermediación:** la ficha del cliente NO muestra nombre, teléfono ni redes del productor. Solo se muestra información comercial del producto. Regla reforzada en el código con comentarios explícitos para no olvidar en el futuro.
- **Modelo `Producer` (SOLO interno):** nuevo modelo en Prisma con campos: `name`, `contactName`, `phone`, `email`, `notes`. Vinculado a `Product` por FK opcional (`producerId`). El productor NUNCA se incluye en las consultas públicas de `catalog.ts`. Funciones de uso interno en `src/lib/producer.ts`.
- **Margen de intermediación (SOLO interno):** campo `margin: Float` en `Product` (3–10%). Lógica de cálculo en `src/lib/margin.ts`. Preparado para el panel admin de Fase 3. NUNCA se expone al cliente.
- **Contacto centralizado:** todos los datos del ecommerce (WhatsApp, email, redes) viven en `src/lib/contact-config.ts`. Cambiar ahí aplica en todo el sitio: `ContactButtons`, `Footer`, `pedido-confirmado`.
- **Campos nuevos en `Product`:** `originDepartment` (departamento colombiano), `isInternational` (bool), `originCountry` (país si internacional), `size` (tamaño), `warranty` (bool), `warrantyDuration` (texto duración).
- **Origen geográfico:** componente `OriginBadge` en `src/components/OriginBadge.tsx`. Si `isInternational=false` → muestra "📍 Ciudad, Departamento". Si `isInternational=true` → muestra "🌍 País de origen".
- **Filtro geográfico:** componente cliente `GeoFilter` en `src/components/GeoFilter.tsx`. Usa los 32 departamentos + Bogotá D.C. de `src/lib/colombia-geo.ts`. Funciona con parámetros de URL (`?depto=&mpio=` o `?origen=internacional`). Aparece en `/tienda` y en cada página de `/categoria/[slug]`. La función `searchProducts` en `catalog.ts` hace el filtrado en el servidor.
- **Búsqueda de texto:** la tienda lee el param `?q=texto` y filtra productos por nombre y descripción (español e inglés).
- **SearchHero:** sección en la portada con mosaico de 6 imágenes de fondo + barra de búsqueda. Componente cliente en `src/components/SearchHero.tsx`. Al buscar navega a `/tienda?q=texto`.
- **Dos categorías nuevas:** `servicios` y `otros-productos`. Total: 10 categorías.
- **Migración Prisma:** `20260628164715_fase3_prep_marketplace`.
- **Archivo maestro de contacto:** `src/lib/contact-config.ts` — el dueño reemplaza los placeholders por los datos reales del negocio.

---

_Última actualización: Bloque de ajustes pre-Fase 3 completado (marketplace, productor interno, margen, filtro geo, búsqueda, 10 categorías)._
