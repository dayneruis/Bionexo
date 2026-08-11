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
- **Stack oficial (aprobado):** Next.js (App Router) + TypeScript + Tailwind CSS + Prisma. Base de datos: **PostgreSQL en la nube (Neon)**, usada tanto en local como en producción (migrado desde SQLite local — ver sección 32).
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
- **"Noticias e Historias"** (`/noticias`): artículos/noticias cortas sobre economía circular y medio ambiente, e historias motivacionales de la marca y de los productores. Gestionada por completo desde el panel de administración. Detalle técnico en la sección 27.
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
- **Número de WhatsApp:** originalmente `573000000000` de ejemplo; reemplazado por el número real del negocio (`573001234567`) en `src/lib/contact-config.ts` — ver sección 20 (un solo lugar para todo el sitio, todos los botones lo leen de ahí).

## 14. Bitácora — Ajustes pre-Fase 3 (Bloque Marketplace)

- **Modelo de intermediación:** la ficha del cliente NO muestra nombre, teléfono ni redes del productor. Solo se muestra información comercial del producto. Regla reforzada en el código con comentarios explícitos para no olvidar en el futuro.
- **Modelo `Producer` (SOLO interno):** nuevo modelo en Prisma con campos: `name`, `contactName`, `phone`, `email`, `notes`. Vinculado a `Product` por FK opcional (`producerId`). El productor NUNCA se incluye en las consultas públicas de `catalog.ts`. Funciones de uso interno en `src/lib/producer.ts`.
- **Margen de intermediación (SOLO interno):** campo `margin: Float` en `Product` (3–30%, rango ajustado en la sección 29). Lógica de cálculo en `src/lib/margin.ts`. Preparado para el panel admin de Fase 3. NUNCA se expone al cliente.
- **Contacto centralizado:** todos los datos del ecommerce (WhatsApp, email, redes) viven en `src/lib/contact-config.ts`. Cambiar ahí aplica en todo el sitio: `ContactButtons`, `Footer`, `pedido-confirmado`.
- **Campos nuevos en `Product`:** `originDepartment` (departamento colombiano), `isInternational` (bool), `originCountry` (país si internacional), `size` (tamaño), `warranty` (bool), `warrantyDuration` (texto duración).
- **Origen geográfico:** componente `OriginBadge` en `src/components/OriginBadge.tsx`. Si `isInternational=false` → muestra "📍 Ciudad, Departamento". Si `isInternational=true` → muestra "🌍 País de origen".
- **Filtro geográfico:** componente cliente `GeoFilter` en `src/components/GeoFilter.tsx`. Usa los 32 departamentos + Bogotá D.C. de `src/lib/colombia-geo.ts`. Funciona con parámetros de URL (`?depto=&mpio=` o `?origen=internacional`). Aparece en `/tienda` y en cada página de `/categoria/[slug]`. La función `searchProducts` en `catalog.ts` hace el filtrado en el servidor.
- **Búsqueda de texto:** la tienda lee el param `?q=texto` y filtra productos por nombre y descripción (español e inglés).
- **SearchHero:** sección en la portada con mosaico de 6 imágenes de fondo + barra de búsqueda. Componente cliente en `src/components/SearchHero.tsx`. Al buscar navega a `/tienda?q=texto`.
- **Dos categorías nuevas:** `servicios` y `otros-productos`. Total: 10 categorías.
- **Migración Prisma:** `20260628164715_fase3_prep_marketplace`.
- **Archivo maestro de contacto:** `src/lib/contact-config.ts` — el dueño reemplaza los placeholders por los datos reales del negocio.

## 15. Bitácora — Bloque visual y de contenido (pre-Fase 3, segunda parte)

- **Logos reales:** `logos/bionexo.png` y `logos/tubasurainnova.png` copiados a `public/`. El Header y Footer usan `next/image` con el logo real de Bionexo. El favicon se sirve desde `src/app/icon.png` (Next.js lo detecta automáticamente). El logo de Tu Basura Innova aparece en la página "Sobre nosotros".
- **Paleta refinada:** `globals.css` actualizado con valores más precisos (`eco-lime #7ec820`, `eco-green #2d8a4e`, `eco-forest #1a4731`, `eco-cyan #0e9b9b`). Se añadió transición global en `a` y `button`.
- **Tarjetas mejoradas:** `ProductCard` y `CategoryCard` tienen hover con borde verde, sombra y flecha "→". El precio del producto ahora usa `text-eco-forest`.
- **Hero rediseñado:** `SearchHero.tsx` tiene gradiente 135° (eco-forest → eco-cyan), pastilla de marca, título extrabold más grande, barra con ícono de lupa y cuatro botones de búsqueda rápida (Cartón, Plástico reciclado, Moda sostenible, Abono orgánico).
- **"Sobre nosotros" con contenido real:** página completamente reescrita con hero verde + logo, estadísticas (14,4 M ton / ~12% / 60.000 recicladores), secciones de misión y meta, tarjeta de Tu Basura Innova con su logo, y cierre con CTA. Textos en español e inglés en `messages/es.json` y `messages/en.json`.
- **CartDrawer mejorado:** encabezado con banda `eco-forest`, tarjetas de ítem con sombra, botón de checkout más grande con flecha.
- **CheckoutForm mejorado:** inputs con borde redondeado y foco verde, cuadro de totales con fondo eco suave, campos generados con un arreglo para evitar repetición.
- **Preparación pasarela de pago (Fase 4):**
  - `src/lib/payment-config.ts`: archivo de configuración placeholder con comentarios de cómo conectar Wompi / PayU / ePayco.
  - `src/app/api/payment/webhook/route.ts`: ruta POST placeholder; responde 200 y registra en consola. En Fase 4 se reemplaza por la lógica real del proveedor.
  - Comentario `// ── PUNTO DE INTEGRACIÓN PASARELA (Fase 4) ──` en `CheckoutForm.tsx` marca exactamente dónde insertar el widget del proveedor.
- **Textos de mensajes actualizados:** heroTitle/heroSubtitle del buscador son más impactantes; se añadió `checkout.paymentNote` y se reestructuró completamente la sección `about.*`.

## 16. Bitácora — Bloque de 4 ajustes visuales (logo, tarjetas, ODS, botón "Vender en Bionexo")

- **Logo del Header más grande:** `src/components/Header.tsx` — el `<Image>` del logo pasó de `h-12`/`sm:h-16` a `h-14`/`sm:h-20`. Se añadió `flex-wrap` a la fila del encabezado como colchón de seguridad para que, si el logo grande + menú + botones no caben en algún ancho intermedio, la fila pase a dos líneas en vez de romperse o encimarse.
- **Sección "¿Qué es Bionexo?" en la portada:** 5 tarjetas (ícono + título + texto corto) en `src/app/[locale]/page.tsx`, insertadas entre `SearchHero` y "Productos destacados". Íconos de la librería `lucide-react` (instalada con `npm install lucide-react`): `Leaf`, `Tag`, `Recycle`, `Handshake`, `Globe`. Textos bilingües en `messages/es.json` / `messages/en.json` bajo `home.whatIs*`.
- **Fila de ODS en "Sobre nosotros":** nuevo archivo `src/lib/sdg-data.ts` con los 9 ODS relevantes (número, color oficial ONU, nombre corto es/en), siguiendo el mismo patrón que `colombia-geo.ts`. Sección nueva en `src/app/[locale]/sobre-nosotros/page.tsx`, después de "Nuestra meta" y antes de "Tu Basura Innova". Título bilingüe en `about.odsTitle`.
- **Botón "Vender en Bionexo":** componente nuevo y reutilizable `src/components/SellButton.tsx`. Reutiliza `whatsappUrl()` de `src/lib/contact-config.ts` (mismo patrón que el botón "Me interesa"). Mensaje fijo bilingüe en `common.sellButton` / `common.sellWhatsappMessage`. Se usa en `Header.tsx` (junto al carrito, en escritorio y móvil) y en `Footer.tsx` (columna de contacto).
- **Nota de entorno:** en esta sesión `npm run build` falló por memoria insuficiente del equipo (no por errores del código; `npx tsc --noEmit` pasó limpio). Pendiente que el dueño corra `npm run dev` o `npm run build` localmente para la verificación visual final de este bloque.

## 17. Bitácora — Conexión de fotos reales (categorías y hero) + ODS en verde

- **Fotos reales copiadas:** de `D:\Eccomerce\imagenes` a `public/categorias/` (10 fotos, una por categoría: `cat-materiales.jpg`, `cat-mobiliario.jpg`, `cat-moda.jpg`, `cat-aseo.jpg`, `cat-plantas.jpg`, `cat-comida.jpg`, `cat-artesanias.jpg`, `cat-empaques.jpg`, `cat-servicios.jpg`, `cat-otros.jpg`) y a `public/hero/` (8 fotos: `hero-1.png` a `hero-8.jpg`, mezcla de PNG y JPG).
- **Imagen de categoría:** nuevo archivo `src/lib/category-images.ts` con el mapa `slug de categoría → ruta de la foto`. `CategoryCard.tsx` ahora muestra la foto arriba de la tarjeta (recorte `aspect-[16/9]`, `object-cover`, igual en las 10 tarjetas) siguiendo el mismo patrón visual que `ProductCard.tsx`. Ya no usa `picsum.photos` para categorías (nunca lo usó realmente: antes no mostraba ninguna imagen).
- **Mosaico del buscador (`SearchHero.tsx`):** las 8 fotos de `public/hero/` reemplazan los 6 placeholders de `picsum.photos`. El mosaico pasó de 3×2 a 4×2 para mostrar las 8 fotos. La capa de color encima cambió de un degradado verde→cian a un degradado **solo en tonos verdes** (`eco-forest` → `eco-green`), así todas las fotos —aunque sean de temas distintos— se ven unificadas bajo la misma paleta y no como un collage disparejo.
- **Colores de los ODS:** `src/lib/sdg-data.ts` dejó de usar los colores oficiales multicolor de la ONU y ahora cicla entre tres tonos verdes de la marca (`eco-forest`, `eco-green`, `eco-lime`), para que la fila se vea sobria y integrada al resto del sitio en vez de un arcoíris de colores.
- **Íconos sin cambios:** los íconos de "¿Qué es Bionexo?" (`Leaf`, `Tag`, `Recycle`, `Handshake`, `Globe` de `lucide-react`) ya estaban en `text-eco-green`; se mantienen así a propósito.
- **Nota de entorno:** de nuevo, en esta sesión el equipo se quedó sin memoria varias veces al intentar levantar `npm run dev` para revisar visualmente este bloque (no relacionado con el código: `npx tsc --noEmit` pasó limpio). Verificación visual final pendiente por parte del dueño.

## 18. Bitácora — Bloque de 6 ajustes visuales (logo, portada de marca, tirilla de valores, footer, fix logo Sobre Nosotros, cartel ODS)

- **Imágenes nuevas copiadas:** de `D:\Eccomerce\imagenes` a la raíz de `public/` (mismo patrón que `bionexo.png`/`tubasurainnova.png`, imágenes de marca sueltas, no en subcarpeta): `portada-marca.png` (1718×916), `tirilla-valores.jpeg` (1536×125, tira horizontal), `ods-cartel.png` (1254×1254, cartel oficial de los 17 ODS).
- **Logo del Header un poco más grande:** `src/components/Header.tsx` — de `h-14`/`sm:h-20` a `h-16`/`sm:h-24` (segundo aumento moderado; ver también sección 16).
- **Portada de marca:** nueva sección en `src/app/[locale]/page.tsx`, **antes** del hero de texto ("Economía circular, hecha tienda"). Imagen `portada-marca.png` a ancho completo del contenedor `max-w-6xl`, alto acotado (`h-48`→`md:h-72`) y esquinas `rounded-3xl`, para que sea un banner de presentación sin ocupar toda la pantalla.
- **Tirilla de valores:** nueva sección en `src/app/[locale]/page.tsx`, justo debajo de "¿Qué es Bionexo?" y antes de "Productos destacados". Imagen `tirilla-valores.jpeg` dentro de una tarjeta blanca (`rounded-2xl border shadow-sm`, mismo estilo que el resto de tarjetas del sitio), centrada con `max-w-3xl` para no verse estirada.
- **Footer con los dos logos:** `src/components/Footer.tsx` ahora muestra `bionexo.png` y `tubasurainnova.png` lado a lado (`h-9` → `h-11`, un poco más grandes). Debajo se agregó un bloque de contacto de ejemplo de Tu Basura Innova (correo, Facebook, Instagram) usando el nuevo objeto `CONTACTO_TU_BASURA_INNOVA` en `src/lib/contact-config.ts` (mismos placeholders que `CONTACTO_BIONEXO`, a reemplazar por el dueño). Nueva clave de traducción `footer.umbrellaTitle` en `messages/es.json`/`en.json`.
- **Presencia con Bogotá explícita:** `CONTACTO_BIONEXO.presencia` en `contact-config.ts` ahora dice "Bucaramanga y área metropolitana · **Bogotá D.C.** · Envíos a toda Colombia" (Bogotá ya estaba, se dejó más explícita como ciudad capital).
- **Fix del recuadro blanco vacío en "Sobre nosotros":** el logo del hero verde (`src/app/[locale]/sobre-nosotros/page.tsx`) usaba el filtro CSS `brightness-0 invert` sobre `bionexo.png`. Como ese PNG tiene fondo claro **opaco** (no transparente), el filtro convertía todo el rectángulo —fondo y letras— en blanco sólido, y el logo "desaparecía". Se quitó el filtro y ahora el logo va dentro de una tarjeta blanca real (`bg-white rounded-2xl shadow-md`), donde se ve con sus propios colores.
- **Cartel oficial de ODS:** en la misma página, debajo de la fila de 9 cuadros de colores, se agregó la imagen `ods-cartel.png` en una tarjeta blanca pequeña y centrada (`max-w-xs`/`sm:max-w-sm`), sin reemplazar la fila de cuadros existente (conviven ambas).
- **Verificación:** `npx tsc --noEmit` sin errores. A diferencia de bloques anteriores, en esta sesión sí se pudo levantar `npm run dev` sin quedarse sin memoria; se confirmó por HTTP que `/es`, `/es/sobre-nosotros` y las 3 imágenes nuevas responden 200 y que el HTML generado incluye las etiquetas `<img>` de las imágenes nuevas.

## 19. Bitácora — Retoques de imágenes + botón de pedido por WhatsApp

- **Recuadro del logo del Header:** el `<Link>` que envuelve el logo (`src/components/Header.tsx`) ahora tiene `bg-white rounded-xl p-1.5 shadow-sm`, mismo patrón ya usado en el logo de "Sobre nosotros". Causa: `bionexo.png` tiene fondo claro **opaco** (no transparente), así que sin un fondo blanco propio se notaba un rectángulo raro sobre el header. El alto de la imagen bajó ligeramente (`h-16/sm:h-24` → `h-14/sm:h-20`) para compensar el padding nuevo y mantener el tamaño visual total similar al que el dueño ya había aprobado.
- **Banner de portada sin recortes:** en `src/app/[locale]/page.tsx`, la sección de `portada-marca.png` pasó de una altura fija (`h-48/h-64/h-72` + `object-cover`, que recortaba la imagen) a `aspect-[1718/916]` (la proporción real de la imagen) + `object-contain` + fondo de respaldo `eco-cream`. Así la frase de la imagen se ve siempre completa, en cualquier ancho de pantalla.
- **Logo de "Sobre nosotros" más grande:** tarjeta blanca de `px-6 py-3` a `px-8 py-5`, logo de `h-12 sm:h-14` a `h-16 sm:h-20` (`src/app/[locale]/sobre-nosotros/page.tsx`).
- **Logos del Footer más grandes:** ambos logos (`bionexo.png` y `tubasurainnova.png`) de `h-11` a `h-14` (`src/components/Footer.tsx`).
- **Botón "Hacer mi pedido por WhatsApp":** nuevo helper `src/lib/cart-whatsapp.ts` (función `buildCartWhatsAppMessage`) que arma el mensaje con la lista de productos del carrito (nombre según idioma, cantidad, subtotal) y el total, reutilizando `formatCop` y `whatsappUrl`. Botón agregado en el pie del `CartDrawer` (junto a "Ir al pedido") y en `CheckoutForm` (junto al botón de confirmar), como vía inmediata de compra mientras la pasarela de pago (Fase 4) no está activa. Traducción: `common.orderWhatsappButton`.
- **Botón flotante de WhatsApp:** nuevo componente `src/components/WhatsAppFloatingButton.tsx`, círculo verde fijo (`fixed bottom-5 right-5`) montado una sola vez en `src/app/[locale]/layout.tsx`, visible en todas las páginas, para consultas generales (mensaje distinto al de "hacer pedido"). Traducciones: `common.generalWhatsappMessage`, `common.chatWhatsapp`.
- **Ícono de WhatsApp compartido:** el SVG que antes estaba repetido en `pedido-confirmado/page.tsx` se extrajo a `src/components/WhatsAppIcon.tsx`, reutilizado ahí, en `CartDrawer`, `CheckoutForm` y el botón flotante.
- **Verificación:** `npx tsc --noEmit` sin errores. `npm run dev` sí pudo levantarse en esta sesión (a diferencia de bloques anteriores); se confirmó por HTTP que `/es`, `/es/sobre-nosotros` y `/es/checkout` responden 200, y que el HTML de la portada incluye las clases nuevas (`aspect-[1718/916]`, el recuadro blanco del logo y el botón flotante).

## 20. Bitácora — Número real de WhatsApp

- **Número reemplazado:** `CONTACTO_BIONEXO.whatsapp` en `src/lib/contact-config.ts` pasó del placeholder `573000000000` al número real `573001234567` (+57 300 123 4567). También se actualizó el campo `telefono` (solo texto para mostrar) al mismo número.
- **Un solo cambio, todo el sitio actualizado:** como todos los botones de WhatsApp (Comprar/"Me interesa" en `ContactButtons.tsx`, "Vender en Bionexo" en `SellButton.tsx`, "Hacer mi pedido por WhatsApp" en `CartDrawer`/`CheckoutForm`, el botón flotante `WhatsAppFloatingButton.tsx`, y el enlace de confirmación en `pedido-confirmado`) leen el número a través de la función `whatsappUrl()` de `contact-config.ts`, no hubo que tocar ningún otro archivo.
- **Verificación:** `npx tsc --noEmit` sin errores.

## 21. Bitácora — Fase 3, Parte 1: Login y seguridad del panel

- **Ruta del panel:** `src/app/admin/...`, deliberadamente **fuera** de `[locale]`. El panel es solo en español, sin Header/Footer/carrito de la tienda pública, y con su propio `layout.tsx` raíz (su propio `<html>/<body>`, ya que no hay un `app/layout.tsx` compartido).
- **Un solo usuario administrador:** en vez de una librería de autenticación completa (NextAuth/Auth.js), que está pensada para múltiples usuarios y proveedores externos, se implementó un login a la medida porque solo hay un usuario (el dueño del negocio).
  - Usuario y hash de la contraseña en variables de entorno: `ADMIN_USER`, `ADMIN_PASSWORD_HASH` (en `.env`, nunca en git).
  - Para cambiar la contraseña: `npx tsx scripts/generar-hash-admin.ts` y pegar el resultado en `.env`. El script pregunta la contraseña de forma oculta (se ve como `*`, nunca en texto plano) y pide confirmarla dos veces; ya no se pasa como argumento del comando (ver sección 30).
  - **Cuidado con los `$` en `.env`:** Next.js expande variables tipo `$NOMBRE` dentro de `.env` (como Docker Compose). El hash de bcrypt empieza con `$2b$10$...`, así que sin escapar cada `$` como `\$`, Next.js los interpretaba como variables vacías y corrompía el hash en silencio (el login fallaba con la contraseña correcta). El script `generar-hash-admin.ts` ya imprime el hash **pre-escapado**, listo para pegar.
- **Verificación de contraseña (`src/lib/admin-credentials.ts`):** usa `bcryptjs` (versión pura en JavaScript, sin compilar nada en Windows). Esta verificación **solo puede correr en Node.js**, nunca en el middleware (ver siguiente punto).
- **Sesión (`src/lib/admin-auth.ts`):** cookie `bionexo_admin_session`, firmada con `jose` (JWT, HS256) usando el secreto `ADMIN_SESSION_SECRET`, vence a los 7 días, `httpOnly` (JavaScript del navegador no puede leerla). `jose` se eligió porque, a diferencia de `bcrypt`, sí funciona en el **Edge Runtime** del middleware.
- **Protección centralizada en `src/middleware.ts`:** ahora es una sola función que decide: si la URL empieza con `/admin` (y no es `/admin/login`), exige la cookie de sesión válida o redirige a `/admin/login`; para el resto del sitio, sigue funcionando igual que antes (enrutamiento de idiomas con `next-intl`).
- **Rutas de sesión:** `POST /api/admin/login` (verifica credenciales, crea la cookie) y `POST /api/admin/logout` (la borra). Página `/admin/login` con formulario (`src/components/admin/LoginForm.tsx`); panel protegido con layout propio (`src/app/admin/(panel)/layout.tsx`, barra superior + botón "Salir") y una página de bienvenida provisional en `/admin` que en las siguientes partes se convierte en el panel real.
- **Verificación:** `npx tsc --noEmit` sin errores. Probado con `npm run dev` + `curl`: `/admin` sin sesión redirige a `/admin/login` (307); credenciales incorrectas → 401; credenciales correctas → cookie válida y acceso a `/admin` (200, muestra "Sesión iniciada como admin"); logout borra la cookie y vuelve a redirigir. La tienda pública (`/es`, `/`) sigue funcionando igual.

## 22. Bitácora — Fase 3, Parte 2: gestión de productos

- **Descubrimiento importante de seguridad:** el matcher de `src/middleware.ts` excluye a propósito las rutas `/api` (para no interferir con el enrutamiento de idiomas). Eso significa que el middleware **no protege** `/api/admin/*`. Se agregó `obtenerSesionActual()` en `src/lib/admin-auth.ts` (lee y verifica la cookie directamente) y **todas** las rutas de API que crean o modifican datos del panel la llaman al empezar, devolviendo 401 si no hay sesión válida. Probado con `curl`: crear un producto sin cookie de sesión responde 401.
- **Capa de datos (`src/lib/admin-products.ts`):** a diferencia de `catalog.ts` (tienda pública), estas funciones sí devuelven productos no disponibles, porque el admin necesita verlos y reactivarlos. Incluye `validarDatosProducto()`, que limpia y valida lo que llega del formulario antes de tocar la base de datos (no confía en el body del request tal cual).
- **Slugs (`src/lib/slugify.ts`):** función que convierte texto libre en una URL válida (sin tildes, en minúsculas, con guiones). Al crear un producto, el panel la sugiere automáticamente a partir del nombre en español, pero el campo queda editable. Si el slug ya existe, la API responde 409 con un mensaje claro (usa el código de error `P2002` de Prisma, que significa "violación de restricción única").
- **"Dar de baja":** se implementó como cambiar `available` a `false` (no como borrado). El proyecto no maneja cantidades de inventario (ver sección 5), así que no hay una razón de negocio para borrar productos de verdad; además, borrar rompería el enlace con pedidos ya hechos aunque `OrderItem` guarde su propia copia de los datos. Si más adelante se necesita un borrado definitivo, se puede agregar como acción aparte.
- **Productor y margen sin tocar:** el formulario de esta parte (`ProductForm.tsx`) NO incluye esos campos a propósito; al crear, `margin` toma el valor por defecto de Prisma (5.0) y `producerId` queda `null`. Se agregan en la Parte 4.
- **Fotos:** por ahora el formulario tiene un campo de texto para la URL de la imagen (con un aviso de que es temporal), sin subida real de archivos todavía — eso es exactamente el alcance de la Parte 3.
- **Rutas nuevas:** `/admin/productos` (listado con buscador y estado), `/admin/productos/nuevo`, `/admin/productos/[id]/editar`. APIs: `POST /api/admin/products`, `PUT /api/admin/products/[id]` (edición completa), `PATCH /api/admin/products/[id]` (solo cambia disponible/no disponible, usado por el botón rápido del listado).
- **Verificación:** `npx tsc --noEmit` sin errores. Probado de punta a punta con `npm run dev` + `curl` simulando la cookie de sesión: crear producto (201), verlo en el listado y en el formulario de edición precargado, editarlo (200), darlo de baja con el botón rápido (200) y confirmar que deja de aparecer en `/admin/productos` como disponible. Se confirmó que un producto no disponible sigue apareciendo en la tienda pública con la etiqueta "No disponible" (comportamiento correcto y ya existente: el sitio marca disponibilidad, no oculta productos — ver sección 5). El producto de prueba se borró de la base de datos al terminar, para no dejar datos ficticios en el catálogo de ejemplo.

## 23. Bitácora — Fase 3, Parte 3: subida de fotos desde el computador

- **Ruta nueva `POST /api/admin/upload`:** protegida igual que el resto de rutas del panel (`obtenerSesionActual()`, responde 401 sin sesión). Recibe el archivo como `multipart/form-data`, valida el tipo real (`image/jpeg`, `image/png`, `image/webp`, `image/gif` — no confía en la extensión del nombre original) y el tamaño (máximo 5 MB). Guarda el archivo en `public/uploads/productos/` con un nombre generado (`crypto.randomUUID()` + extensión según el tipo), para que Next.js lo sirva directo como archivo estático, y devuelve su URL (`/uploads/productos/xxxx.jpg`).
- **`public/uploads/` agregado a `.gitignore`:** son fotos que sube el dueño mientras usa el panel (contenido dinámico, igual que `dev.db`), no archivos fijos del proyecto para guardar en git.
- **`ProductForm.tsx` actualizado:** el campo de imagen ahora tiene un selector de archivo que sube la foto automáticamente al elegirla (con aviso "Subiendo imagen..." y mensaje de error si falla), vista previa de la imagen actual, y se conserva el campo de URL por si el dueño prefiere pegar el enlace de una imagen ya publicada en internet (por ejemplo, mientras no tenga la foto real a mano). Ambos caminos llenan el mismo campo `imageUrl` que ya existía desde la Parte 2.
- **Producer y margen (Parte 4) siguen sin tocar**, tal como estaba planeado.
- **Verificación:** `npx tsc --noEmit` sin errores. Probado de punta a punta con `npm run dev` + `curl` simulando la cookie de sesión: subir una imagen de prueba (201) y confirmar que se sirve públicamente (200); subir sin sesión (401) y con un tipo de archivo no permitido (400); crear un producto de prueba usando la URL de la imagen subida (201). El producto y la imagen de prueba se borraron al terminar para no dejar datos ficticios.

## 24. Bitácora — Fase 3, Parte 4: productor y margen (cierre de la Fase 3)

- **Nueva sección "Productores" en el panel:** `/admin/productores` (listado con conteo de productos por productor), `/admin/productores/nuevo` y `/admin/productores/[id]/editar`. Formulario `ProducerForm.tsx` (nombre del emprendimiento, nombre de contacto, teléfono, correo opcional, notas internas). APIs `POST /api/admin/producers` y `PUT /api/admin/producers/[id]`, protegidas igual que el resto de rutas del panel (`obtenerSesionActual()`, no dependen del middleware).
- **`src/lib/producer.ts` ampliado:** se agregaron `crearProductor`, `actualizarProductor`, `getProductorParaEditar` y `validarDatosProductor` (mismo patrón de validación que `validarDatosProducto` en `admin-products.ts`), sin tocar las funciones de reporte interno que ya existían.
- **`ProductForm.tsx` ahora incluye una sección "Datos internos"** (productor + margen), claramente separada y marcada en el código con el recordatorio de que esta sección nunca se muestra en la tienda pública. El selector de productor es opcional ("Sin productor asignado" si el producto no tiene uno todavía); el campo de margen es un número obligatorio entre 3 y 30 (%) (rango ampliado en la sección 29; originalmente era 3–10), validado tanto en el navegador (`min`/`max` del input) como en el servidor.
- **Validación del margen en `admin-products.ts`:** `validarDatosProducto` rechaza (400) cualquier margen fuera de 3–30 % (rango original 3–10 %, ampliado en la sección 29). Si se manda un `producerId` que no existe, Prisma lanza el error `P2003` (violación de clave foránea), que las rutas `POST`/`PUT` de `/api/admin/products` capturan y traducen a un mensaje claro ("El productor elegido no existe"), siguiendo el mismo patrón ya usado para el slug duplicado (`P2002`).
- **Regla de intermediación reforzada, no debilitada:** `catalog.ts` (tienda pública) sigue sin seleccionar nunca `producer` ni `margin`; se verificó de nuevo en esta sesión inspeccionando el HTML generado de una ficha de producto de prueba con productor y margen asignados, confirmando que ninguno de los dos datos llega al navegador del cliente.
- **Con esto se cierran las 4 partes planeadas de la Fase 3** (login y seguridad, gestión de productos, subida de fotos, productor y margen).
- **Verificación:** `npx tsc --noEmit` sin errores. Probado de punta a punta con `npm run dev` + `curl`: crear un productor (201); crear un producto con margen fuera de rango (400) y con un `producerId` inexistente (400); crear un producto válido con margen 7% y productor real (201); confirmar que el HTML público de ese producto no contiene ni el nombre/teléfono del productor ni el valor del margen. El producto y el productor de prueba se borraron al terminar para no dejar datos ficticios (el catálogo de ejemplo conserva sus 5 productores originales del seed).

## 25. Bitácora — Bloque de cierre de la Fase 3 (acceso discreto al panel + logo más grande)

- **Enlace discreto "Administración" en el footer:** `src/components/Footer.tsx` — en la barra inferior de copyright, junto al año y los derechos, se agregó un enlace de texto pequeño y de color gris tenue (`text-slate-400`, sin negrita ni ícono) que dice "Administración" y abre `/admin/login` en una **pestaña nueva** (`target="_blank" rel="noopener noreferrer"`). A propósito no se usó ningún estilo llamativo (ni color de marca, ni botón), para que un visitante normal no lo note pero el dueño sepa dónde encontrarlo.
- **Logo de Bionexo más grande en "Sobre nosotros":** `src/app/[locale]/sobre-nosotros/page.tsx` — dentro de la tarjeta blanca del hero verde, el logo pasó de `h-16 sm:h-20` a `h-20 sm:h-24`, y el padding de la tarjeta de `px-8 py-5` a `px-9 py-6` para mantener la proporción con el logo más grande.
- **Lista completa de municipios (DIVIPOLA):** `src/lib/colombia-geo.ts` tenía antes solo 3–8 municipios "principales" por departamento; ahora tiene la lista oficial completa del DANE: 33 entidades (32 departamentos + Bogotá D.C.) y **1.123 municipios/áreas en total**, con su código DANE de 5 dígitos. Los nombres venían en mayúsculas en la fuente y se convirtieron a formato título (ej. "SAN JOSÉ DE LA MONTAÑA" → "San José de la Montaña"), dejando en minúscula los conectores (de, del, la, los, y). Los tipos, `CLAVE_INTERNACIONAL`, `NOMBRES_DEPARTAMENTOS` y `getMunicipiosDe()` no cambiaron, así que `GeoFilter.tsx` (tienda) y `ProductForm.tsx` (panel) no necesitaron ningún ajuste. Datos generados con un script temporal a partir de una fuente pública con códigos DANE ([RafaelRamosR/dane-codigos-municipios](https://github.com/RafaelRamosR/dane-codigos-municipios)), verificados contra las cifras oficiales conocidas por departamento (Antioquia 125, Boyacá 123, Cundinamarca 116, Santander 87, etc.) antes de reemplazar el archivo.
- **Verificación:** `npx tsc --noEmit` sin errores. Probado con `npm run dev`: `/es/tienda` (200) y `/es/tienda?depto=Antioquia` (200) muestran los 125 municipios de Antioquia, incluyendo nombres con conectores como "San José de la Montaña" y "San Andrés de Cuerquía"; `/admin/login` sigue respondiendo 200.

## 26. Bitácora — Bloque de 4 cambios post-Fase 3 (WhatsApp real, destacados, zona de venta, filtro combinado)

Este bloque se había quedado a medias en una sesión anterior (3 de los 4 archivos ya tenían cambios sin guardar en git). Se retomó, se terminó lo que faltaba y se verificó todo de punta a punta antes de hacer commit.

- **1) Número real de WhatsApp:** ya estaba puesto en `src/lib/contact-config.ts` desde la sesión anterior (`+57 310 482 5153`). Solo faltaba el commit. Como todos los botones de WhatsApp del sitio leen de ahí, no hubo que tocar nada más.
- **2) Dos productos destacados más en la portada:** de los 20 productos del catálogo de ejemplo, 7 ya estaban marcados `featured: true` desde la Fase 2 (nunca habían sido solo 5, a pesar de que la sección 5 de este documento sugiere un rango de "5 a 8"). Se marcaron 2 más para llegar a 9: **"Recolección de residuos en empresa"** (categoría Servicios) y **"Lote de electrónica reciclada"** (categoría Otros productos) — elegidos porque eran las dos únicas categorías de las 10 que no tenían ningún producto destacado todavía. Cambio hecho en `prisma/seed.ts` (para que el seed de datos de ejemplo quede igual) y replicado directamente en `dev.db`. **Pendiente de decidir con el dueño:** el rango "5 a 8" de la sección 5 quedó desactualizado (ahora son 9); ajustar ese texto o volver a 8 cuando el dueño lo revise.
- **3) Campo "Zona de venta" en el formulario de producto:** ya venía muy avanzado de la sesión anterior (modelo `ProductSaleMunicipality` en el esquema, sección completa en `ProductForm.tsx`, validación en `admin-products.ts`). Solo faltaba: **regenerar el cliente de Prisma** (`npx prisma generate`) — el `prisma/schema.prisma` ya tenía los campos nuevos y la migración `20260709015408_fase3_zona_de_venta` ya estaba aplicada en `dev.db`, pero el cliente generado en `src/generated/prisma` todavía no los conocía, así que `npx tsc --noEmit` fallaba con "la propiedad `saleZone` no existe". Después de regenerar, compila limpio. El campo permite elegir Nacional / Internacional / Local; si es "Local", se agregan uno o varios municipios (de cualquier departamento) con un buscador tipo departamento→municipio, igual al patrón ya usado para el origen del producto.
- **4) Filtro del buscador combinado (nacional + origen + venta local):** este era el único de los 4 que no se había empezado. Se modificó `searchProducts()` en `src/lib/catalog.ts`: antes filtraba solo por el **origen** del producto (de dónde es); ahora, cuando el visitante elige un departamento/municipio, la búsqueda combina con "OR" los productos que cumplan cualquiera de estos 3 casos:
  1. Zona de venta **nacional** (se consigue en cualquier parte del país, sin importar el filtro).
  2. **Origen** del producto coincide con lo elegido (comportamiento que ya existía).
  3. Zona de venta **local** que incluye ese municipio específico en su lista.
  Internamente se reestructuró la función para armar los filtros como piezas separadas unidas con `AND` (usando `Prisma.ProductWhereInput`), porque el filtro de texto y el filtro geográfico necesitan cada uno su propio `OR` interno y no se pueden mezclar en el mismo objeto de JavaScript. El filtro de "Internacional" ahora también combina origen internacional **o** zona de venta internacional (antes solo miraba el origen). Se agregó una nota breve (`geo.filterHint`, en `GeoFilter.tsx`) explicando en la tienda por qué pueden aparecer productos de otros orígenes al filtrar por ubicación.
- **Verificación de punta a punta con `npm run dev` + `curl`:**
  - Portada: 9 tarjetas de producto destacado (antes 7).
  - Ficha de producto: el botón "Me interesa" usa `wa.me/573104825153`.
  - Filtro combinado: se insertaron 3 productos de prueba directo en `dev.db` (uno nacional con origen lejano, uno de venta local en Bucaramanga con origen lejano, uno de venta local en Medellín) y se confirmó que `/es/tienda?depto=Santander&mpio=Bucaramanga` muestra los dos primeros y no el tercero, y viceversa con Medellín. Se borraron al terminar.
  - Zona de venta en el panel: se inició sesión real contra `/api/admin/login` (con una contraseña de prueba temporal, restaurada al terminar) y se creó un producto real vía `POST /api/admin/products` con `saleZone: "local"` y dos municipios; se confirmó que aparece en la tienda al filtrar por cualquiera de los dos municipios elegidos, que NO aparece con un municipio ajeno, y que su ficha pública no expone `saleZone`, `margin` ni datos del productor. Producto de prueba borrado al terminar.
  - `npx tsc --noEmit` sin errores en todo el proyecto.

## 27. Bitácora — Nueva sección "Noticias e Historias"

- **Modelo `Post` en Prisma:** `titleEs/titleEn`, `summaryEs/summaryEn` (resumen para el listado), `contentEs/contentEn` (texto completo, párrafos simples sin editor enriquecido), `coverImageUrl`, `videoUrl` (opcional), `publishedAt` (editable a mano) y `status` (`"publicado"` / `"borrador"`). Migración `20260713174228_noticias_historias`. Se decidió **no** agregar un campo de categoría/tipo (noticia vs. historia): todo vive en un único listado cronológico, para mantener la sección simple como se pidió.
- **Video incrustado, nunca subido:** el admin solo pega un enlace de YouTube o Instagram; `src/lib/video-embed.ts` (función `analizarVideoUrl`) reconoce ambos formatos (`youtube.com/watch?v=`, `youtu.be/`, `/shorts/`, `/embed/` para YouTube; `/p/` y `/reel/` para Instagram) y arma la URL de `iframe` correspondiente. Si el enlace no se reconoce, se rechaza con un mensaje claro tanto en el formulario (vista previa en vivo) como en el servidor (`validarDatosPost`, 400). El componente `src/components/VideoEmbed.tsx` renderiza el iframe en las páginas públicas.
- **Lectura pública vs. panel (mismo patrón que catálogo/productos):** `src/lib/posts.ts` (público) solo trae publicaciones con `status: "publicado"` — ni el listado ni la ficha por slug exponen un borrador, aunque se adivine la URL exacta (se probó explícitamente: da 404). `src/lib/admin-posts.ts` (panel) sí ve borradores, para que el admin pueda revisarlos y editarlos antes de publicar.
- **Borrado permanente:** a diferencia de los productos (que solo se "dan de baja"), aquí sí se implementó borrado real (`DELETE /api/admin/posts/[id]`) porque el dueño lo pidió explícitamente y no hay pedidos ni otros datos que dependan de una publicación. El botón `DeletePostButton.tsx` pide confirmación en el navegador antes de borrar.
- **Subida de fotos reutilizada, no duplicada:** `POST /api/admin/upload` (ya existía para fotos de producto) se amplió para aceptar un campo `folder` en el `FormData`, con una lista blanca (`productos` | `noticias`) para no aceptar cualquier texto del cliente. Si no se manda `folder`, sigue guardando en `productos` (compatibilidad con `ProductForm.tsx`, que no cambió).
- **Panel de administración, mismo patrón que Productos:** `/admin/noticias` (listado con buscador, estado Publicado/Borrador, botones Editar/Publicar-o-Borrador/Borrar), `/admin/noticias/nueva`, `/admin/noticias/[id]/editar`, formulario compartido `PostForm.tsx`. Enlace nuevo en el dashboard `/admin`.
- **Sitio público:** `/noticias` (listado con foto, fecha, título y resumen) y `/noticias/[slug]` (ficha completa: foto grande, fecha, contenido con saltos de línea preservados vía `whitespace-pre-wrap`, y el video incrustado si tiene). Nuevo enlace "Noticias"/"News" en el menú principal (`Header.tsx`, escritorio y móvil). Nueva función `formatDate()` en `src/lib/format.ts` para mostrar la fecha según el idioma (es/en).
- **Verificación de punta a punta con `npm run dev` + `curl`:** se creó una publicación real vía `POST /api/admin/posts` (sesión real contra `/api/admin/login`, con una contraseña de prueba temporal restaurada al terminar) con una foto subida de verdad y un enlace de YouTube — apareció en `/es/noticias` y su ficha renderizó el iframe `youtube.com/embed/ID` correcto. Se probó un enlace de video inválido (Vimeo) → rechazado con 400. Se creó una publicación en borrador con un enlace de Instagram → no apareció en el listado público ni en su ficha (404), pero sí en el listado del panel; se publicó con el botón rápido (`PATCH`) y entonces sí apareció, con el iframe `instagram.com/p/.../embed` correcto. Se borraron ambas publicaciones y la foto de prueba al terminar. `npx tsc --noEmit` sin errores en todo el proyecto.

## 28. Bitácora — Corrección: código de servidor filtrado a componentes de cliente

- **Síntoma:** al abrir `/admin/productos/[id]/editar` (y otras páginas del panel) fallaba la compilación con `Module not found: Can't resolve 'fs'`, con esta cadena de importaciones: `better-sqlite3` → `@prisma/adapter-better-sqlite3` → `src/lib/db.ts` → `src/lib/admin-products.ts` → `src/components/admin/ProductForm.tsx`.
- **Causa raíz:** `ProductForm.tsx` empieza con `"use client"` (se ejecuta en el navegador), pero importaba `ZONAS_DE_VENTA` y varios tipos directamente desde `src/lib/admin-products.ts`. Ese archivo importa `prisma` desde `src/lib/db.ts`, y Prisma con el adaptador de `better-sqlite3` usa el módulo `fs` de Node para leer el archivo `dev.db` — algo que solo existe en el servidor, nunca en el navegador. Al mezclar ambos mundos en el mismo archivo, Next.js intentaba empaquetar código de base de datos para el navegador y la compilación fallaba. Se encontró el mismo problema, todavía sin manifestarse, en `PostForm.tsx` (importaba `ESTADOS_POST` desde `src/lib/admin-posts.ts`, que también usa `prisma`).
- **Corrección — separar tipos de lógica de servidor:** se crearon dos archivos nuevos que **no** importan `@/lib/db` ni Prisma, solo tipos y constantes puras:
  - `src/lib/product-types.ts`: `VarianteInput`, `MunicipioVentaInput`, `ZONAS_DE_VENTA`, `ZonaDeVenta`, `DatosProducto`.
  - `src/lib/post-types.ts`: `ESTADOS_POST`, `EstadoPost`, `DatosPost`.
  `src/lib/admin-products.ts` y `src/lib/admin-posts.ts` ahora importan estos tipos desde ahí y los **reexportan**, para que el resto del código de servidor (rutas `/api/admin/...`, páginas `page.tsx` del panel) siga funcionando sin cambios. `ProductForm.tsx`, `PostForm.tsx` y `TogglePublicadoButton.tsx` (los tres componentes de cliente que los necesitaban) ahora importan directamente de `product-types.ts` / `post-types.ts`, nunca de los archivos que tocan la base de datos.
- **Regla general para el futuro:** un archivo con `"use client"` en la primera línea se ejecuta en el navegador y **nunca** puede importar (ni siquiera de forma indirecta) nada que use `@/lib/db`, Prisma, `fs`, u otras librerías de solo-servidor. Si un componente de cliente necesita un tipo o una constante que también usa un archivo de servidor, ese tipo/constante debe vivir en su propio archivo sin dependencias de servidor (como `product-types.ts`/`post-types.ts`), y el archivo de servidor lo reexporta si hace falta mantener compatibilidad.
- **Verificación:** `npx tsc --noEmit` sin errores. Se inició sesión real contra `/api/admin/login` (contraseña de prueba temporal, restaurada al terminar) y se probaron con `curl`: `/admin/productos`, `/admin/productos/nuevo`, `/admin/productos/[id]/editar` (la página que fallaba — ahora 200), `/admin/noticias`, `/admin/noticias/nueva`, `/admin/productores` y `/admin/productores/nuevo` (todas 200). También se confirmó que la tienda pública sigue intacta: `/es`, `/es/tienda` y `/es/categoria/materiales-recuperados` responden 200.

## 29. Bitácora — Rango de margen ampliado (3–30 %) y nuevo campo de stock manual

- **Rango del margen de intermediación:** cambia de 3–10 % a **3–30 %**, a pedido del dueño. Cambios en tres lugares: el input del formulario (`ProductForm.tsx`, `min`/`max`), la validación del servidor (`validarDatosProducto` en `admin-products.ts`) y el comentario del campo `margin` en `prisma/schema.prisma`. Sigue siendo un dato SOLO interno, nunca visible en la tienda pública (regla de intermediación sin cambios, ver sección 14).
- **Nuevo campo `stock: Int` en `Product`** (por defecto 10, para no dejar en 0 a los productos de ejemplo ya existentes al aplicar la migración): unidades disponibles, ajustadas **a mano** desde el panel — sin descuento automático al comprar todavía (eso llega con la pasarela de pago en la Fase 4, ver sección 10). A diferencia del margen y el productor, este campo **sí es público**: se muestra en la ficha de producto (`/producto/[slug]`) como "X unidades disponibles" (clave `product.stockAvailable` en `messages/es.json`/`en.json`), solo cuando `stock > 0`.
- **Regla "0 unidades → no disponible":** nuevo helper `src/lib/availability.ts` (`esDisponiblePublico(producto)` = `producto.available && producto.stock > 0`). El interruptor manual "Disponible" del panel **no se cambia solo** cuando el stock llega a 0; simplemente, de ahí en adelante, todo lo que decide qué insignia mostrar al público (`ProductCard.tsx`, la ficha de producto) usa este cálculo combinado en lugar de mirar solo `available`. Si el admin vuelve a subir el stock por encima de 0, el producto vuelve a aparecer como disponible automáticamente (sin tener que tocar el interruptor).
- **Panel — formulario (`ProductForm.tsx`):** nuevo campo numérico "Unidades disponibles" (entero, mínimo 0) junto a los checkboxes de Disponible/Destacado. Si el admin lo deja en 0, aparece un aviso breve explicando que el producto se mostrará como no disponible en el sitio.
- **Panel — listado (`/admin/productos`):** nueva columna "Unidades" (de solo lectura, con una marca "(agotado)" cuando es 0); la edición del valor sigue siendo solo desde el formulario.
- **Migración:** `20260716160400_stock_y_rango_margen`.
- **Verificación:** `npx tsc --noEmit` sin errores. Con sesión real contra el panel (contraseña de prueba temporal, restaurada al terminar): se editó un producto con margen 20 % (antes rechazado, ahora aceptado) y se confirmó que 35 % sigue siendo rechazado (400); se puso un producto de prueba en `stock: 0` con `available: true` y se confirmó que tanto la tarjeta de la tienda como su ficha pública muestran "No disponible"; con `stock: 5` se confirmó que muestran "Disponible" y el texto "5 unidades disponibles" en la ficha. Se restauraron/borraron los datos de prueba al terminar.

---

## 30. Bitácora — Cambio de contraseña del panel sin mostrarla en pantalla

- **`scripts/generar-hash-admin.ts` ya no recibe la contraseña como argumento del comando** (`npx tsx scripts/generar-hash-admin.ts "contrasena"`, forma anterior). Ahora se ejecuta sin argumentos (`npx tsx scripts/generar-hash-admin.ts`) y el script la pregunta de forma interactiva y oculta: se ve un `*` por cada tecla, nunca el texto real, y pide escribirla dos veces para confirmar que coincide.
- **Por qué el cambio:** el dueño pidió no ver la contraseña en pantalla. Al recibirla como argumento del comando, quedaba visible mientras se escribía (y podía quedar en el historial de la terminal). Al leerla directo del teclado en modo "oculto" (`stdin` en *raw mode*, sin usar ninguna librería nueva), además se resuelve de paso el problema de pegado de símbolos que mencionó el dueño: como ya no la interpreta el shell (PowerShell/Git Bash) como parte del comando, no importa qué caracteres tenga (`$`, `!`, espacios, comillas, etc.).
- **Si el script se corre sin una terminal real** (por ejemplo, redirigiendo la entrada desde una tubería o un archivo), ahora muestra un mensaje claro pidiendo abrirlo directamente en PowerShell o Git Bash, en vez de un error críptico de Node.
- **Sin cambios en el resto del flujo:** el hash sigue imprimiéndose pre-escapado (los `$` como `\$`), listo para pegar tal cual en `ADMIN_PASSWORD_HASH` dentro de `.env` (ver sección 21 sobre por qué hace falta ese escape).

---

## 31. Bitácora — Código subido a GitHub

- **Repositorio remoto conectado:** `https://github.com/dayneruis/Bionexo.git` (repositorio privado), rama `master`. Todo el código del proyecto ya está subido ahí.
- **`.env` NO se subió:** protegido desde siempre por la línea `.env*` de `.gitignore`. Se verificó con `git ls-files | grep .env` (sin resultados) que nunca ha estado ni está en el repositorio. La contraseña/hash del panel de administración solo existe en el computador local.
- **Autenticación usada:** token de acceso personal de GitHub (no la contraseña de la cuenta), pegado en el momento del `push` a través de una terminal interactiva, para evitar depender de la ventana emergente del Git Credential Manager.

---

## 32. Bitácora — Migración de la base de datos: SQLite local → PostgreSQL en la nube (Neon)

- **Motivo:** paso previo indispensable para poder desplegar la tienda a internet (sección 3): SQLite es un archivo local (`dev.db`) que solo existe en este computador; para que el sitio funcione como página web real hace falta una base de datos accesible desde internet. El dueño ya creó una cuenta gratuita en **Neon** (proveedor de PostgreSQL en la nube) y compartió su cadena de conexión.
- **`prisma/schema.prisma`:** el `datasource` cambió de `provider = "sqlite"` a `provider = "postgresql"`. El resto del esquema (todos los modelos: `Product`, `Category`, `Order`, `Post`, etc.) no necesitó ningún cambio porque no usaba nada específico de SQLite.
- **Adaptador de conexión:** se reemplazó `@prisma/adapter-better-sqlite3` por `@prisma/adapter-pg` (el conector oficial de Prisma para Postgres) en tres lugares que antes construían el cliente de Prisma: `src/lib/db.ts` (la app), `prisma/seed.ts` (los datos de ejemplo) y, de forma indirecta, cualquier script futuro que use `prisma`. Se instalaron los paquetes `@prisma/adapter-pg`, `pg` y `@types/pg`; se desinstalaron `@prisma/adapter-better-sqlite3` y `better-sqlite3` (ya no hacen falta).
- **`.env` — dos conexiones, no una:** Neon entrega dos formas de conectarse con la misma base de datos:
  - `DATABASE_URL` (con `-pooler` en el nombre del servidor): conexión "agrupada", pensada para que la aplicación en funcionamiento normal abra y cierre conexiones rápido sin agotar el límite del plan gratuito. Es la que usan `src/lib/db.ts` y `prisma/seed.ts` todos los días.
  - `DIRECT_URL` (sin `-pooler`): conexión "directa", necesaria **solo** para crear o modificar tablas (`prisma migrate ...`), porque ese tipo de operación no funciona bien a través del agrupador de conexiones.
  Ambas viven en `.env`, que sigue fuera de git (confirmado de nuevo con `git check-ignore` y `git status` después de editarlo: no aparece como cambio a subir).
- **Migraciones viejas archivadas, no borradas:** las 6 migraciones que existían (pensadas para SQLite, con SQL que no sirve para Postgres) se movieron intactas a `prisma/migrations_sqlite_backup/` (fuera de la carpeta que Prisma revisa) como respaldo histórico. Se creó una migración nueva, `20260723011757_init_postgres`, que arma en Postgres las mismas tablas que ya tenía el esquema, aplicada directamente sobre la base de Neon (vacía, así que no hubo que migrar datos existentes).
- **Datos de ejemplo recargados:** se corrió `prisma/seed.ts` sobre la base nueva → mismos datos que ya existían en local (20 productos, 10 categorías, 5 productores).
- **`dev.db` no se borró:** el archivo local de SQLite se deja como respaldo por si hace falta consultarlo, pero la app ya no lo usa para nada. Sigue fuera de git (regla ya existente en `.gitignore`).
- **Aviso de un mensaje raro en la terminal:** al probar la conexión apareció un mensaje publicitario impreso por la propia librería `dotenv` (versión 17.4.2, la oficial, verificada contra el registro de npm — no es un paquete alterado) que menciona un sitio llamado "vestauth.com" dirigido a "agentes". Es publicidad incluida a propósito por esa librería en versiones recientes (ya lo había hecho antes apuntando a "dotenvx.com"), no algo relacionado con este proyecto ni con Neon. No se visitó ese enlace ni se instaló nada relacionado.
- **Verificación de punta a punta:** `npx tsc --noEmit` sin errores. Con `npm run dev` conectado a Neon: la portada muestra los 9 productos destacados, la categoría "Materiales recuperados" muestra sus 3 productos, `/es/tienda`, `/es/sobre-nosotros`, `/es/noticias` y `/admin/login` responden 200, y `/admin` sin sesión sigue redirigiendo a `/admin/login` (307, la protección del panel no depende de la base de datos). Se confirmó por consulta directa a Neon que las tablas `Product`, `Category` y `Producer` tienen 20, 10 y 5 filas respectivamente.
- **Pendiente:** estos cambios (código + migración nueva) están hechos en el computador pero **todavía no se han subido a GitHub** — eso queda pendiente de un `git commit`/`git push` cuando el dueño lo apruebe. Tampoco se ha configurado ningún hosting todavía para que el sitio sea visible en internet (sigue pendiente el resto de la sección 3: elegir hosting y publicar).

---

_Última actualización: la base de datos ya vive en la nube (PostgreSQL en Neon), tanto en local como lista para producción, con los datos de ejemplo recargados; verificado de punta a punta con el sitio corriendo en local contra Neon. Pendiente: elegir un hosting para publicar el sitio en internet, y definir con el dueño el alcance de la Fase 4 (reseñas/opiniones y pasarela de pago, según el plan original de la sección 10)._

---

## 33. Bitácora — Fotos de producto/noticias suben a Cloudinary (ya no al disco local)

- **Motivo:** mismo motivo que la migración de la base de datos (sección 32): un servidor en la nube no tiene acceso al disco duro de este computador, así que las fotos guardadas en `public/uploads/...` no se verían una vez desplegado el sitio. Cloudinary es el servicio elegido para guardar las fotos en la nube (cuenta gratuita del dueño, cloud name `ztp9xswv`).
- **`.env`:** tres variables nuevas, solo de uso del servidor (nunca llegan al navegador del visitante): `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
- **`package.json`:** se instaló `cloudinary` (SDK oficial de Node).
- **`next.config.ts`:** se agregó `res.cloudinary.com` a `images.remotePatterns`, para que Next.js permita mostrar imágenes que vengan de ese dominio (junto con `picsum.photos`, que sigue ahí para las fotos de ejemplo).
- **`src/app/api/admin/upload/route.ts`:** en vez de guardar el archivo con `fs.writeFile` en `public/uploads/`, ahora se sube a Cloudinary (carpetas `bionexo/productos` y `bionexo/noticias` allá, mismo criterio de antes) y se guarda la URL pública que Cloudinary devuelve (`secure_url`). Las validaciones de tipo de archivo y tamaño máximo (5 MB) no cambiaron. **No hizo falta tocar `ProductForm.tsx` ni `PostForm.tsx`**: ambos ya solo esperan `{ url: "..." }` de esta misma ruta, sin importar de dónde venga.
- **Percance con las credenciales (para tenerlo presente a futuro):** el primer API Secret que compartió el dueño no coincidía con su cuenta (Cloudinary respondía "Invalid Signature"); al regenerarlo, las dos primeras API Keys nuevas venían con permisos restringidos y Cloudinary las rechazaba con `"Request forbidden due to missing permissions (actions=[\"create\"])"` — el mismo código de error se repitió con dos llaves distintas, lo que confirmó que no era un problema de una llave en particular. La tercera llave, generada explícitamente con rol de **acceso completo (sin restricciones)**, sí funcionó. **Para el futuro: al crear una API Key nueva en Cloudinary, asegurarse de que tenga permiso de "create" (subida), no solo de lectura.**
- **Verificación:** se subió una foto de prueba real a través de la ruta del panel (sesión de administrador simulada con el mismo método de firma que usa la app, sin necesitar la contraseña real) y se confirmó con la API de Cloudinary (equivalente a mirar el Media Library) que la foto sí quedó guardada, antes de borrarla para no dejar datos de prueba. `npx tsc --noEmit` sin errores.
- **Fotos viejas en `public/uploads/`:** no se tocaron ni se migraron (eran de pruebas anteriores); ese código ya no se usa pero la carpeta se deja como está, sigue fuera de git por `.gitignore`.

---

_Última actualización: las fotos que se suben desde el panel (productos y noticias) ya se guardan en Cloudinary, verificado de punta a punta. Pendiente: elegir un hosting para publicar el sitio en internet, subir estos cambios a GitHub, y definir con el dueño el alcance de la Fase 4._

---

## 34. Bitácora — Corrección del despliegue en Vercel: faltaba generar el cliente de Prisma

- **Síntoma:** el primer intento de desplegar en Vercel falló en `npm run build` con "Módulo no encontrado: No se puede resolver `@/generated/prisma/client`", repetido en todos los archivos que usan la base de datos (`src/lib/db.ts`, rutas `/api/orders`, `/api/admin/posts`, `/api/admin/products`, etc.).
- **Causa raíz:** el esquema (`prisma/schema.prisma`) genera el cliente de Prisma en una carpeta propia (`src/generated/prisma`) en lugar del lugar por defecto. Esa carpeta se crea automáticamente al correr `npx prisma generate`, así que está en `.gitignore` (es código generado, no se sube a git — igual que `node_modules`). El script `"build"` de `package.json` era solo `"next build"`, sin ningún paso que generara antes esa carpeta. En el computador local nunca se notó porque la carpeta ya existía de sesiones anteriores; en Vercel, con el repositorio recién clonado, la carpeta no existe y la compilación falla.
- **Corrección:** `package.json` — el script `"build"` pasó de `"next build"` a `"prisma generate && next build"`, para que el cliente de Prisma se regenere automáticamente antes de compilar, tanto en Vercel como en cualquier computador nuevo que clone el proyecto.
- **Verificación:** `npm run build` en local corre `prisma generate` y luego `next build` sin el error de módulo; genera las 22 páginas correctamente. Se detectó una advertencia aparte y no relacionada de ESLint (`eslint-config-next/core-web-vitals` no se resuelve) que no detiene la compilación — pendiente de revisar en otra sesión si molesta.

---

## 35. Bitácora — Corrección: el hash de la contraseña del panel necesita dos formatos distintos según dónde se pegue

- **Síntoma:** después de cambiar la contraseña del panel (sección 30), el login funcionaba en la teoría pero fallaba con "Usuario o contraseña incorrectos" al probarlo en producción (Vercel).
- **Causa raíz:** el hash que imprime `scripts/generar-hash-admin.ts` viene **pre-escapado** (con cada `$` convertido en `\$`), pensado únicamente para pegarse dentro de un archivo `.env` — porque Next.js/`@next/env` sí interpreta ese archivo y convierte `\$` de vuelta en `$` al leerlo (ver sección 21). El panel de variables de entorno de Vercel **no funciona así**: guarda el valor tal cual se pegue, sin interpretar nada. Si se pega ahí la versión escapada (con `\$`), el hash guardado en producción queda con barras invertidas literales dentro — ya no es un hash de bcrypt válido — y ninguna contraseña logra iniciar sesión, aunque el usuario y la contraseña sean correctos.
- **Se verificó con una prueba de extremo a extremo** (generar un hash de prueba, escribirlo escapado en un `.env` temporal, cargarlo con `@next/env` igual que hace Next.js, y comparar con `bcrypt.compareSync`): la versión escapada cargada a través de un `.env` sí funciona; esa misma versión escapada usada directamente (como quedaría si se pega tal cual en Vercel) siempre falla.
- **Regla para el futuro, cada vez que se cambie la contraseña del panel:**
  - En el **`.env` local**: pegar el hash **con** los `\$` (tal como lo imprime el script).
  - En **Vercel** (Settings → Environment Variables → `ADMIN_PASSWORD_HASH`): pegar el hash **sin** los `\$`, es decir con `$` normales y sin comillas (ej. `$2b$10$...`), y luego hacer **Redeploy** para que el valor nuevo entre en efecto.
- **Verificación:** `.env` local confirmado correcto (bytes exactos revisados, sin saltos de línea ni espacios extra; `@next/env` lo descifra al valor de 60 caracteres esperado). Pendiente de que el dueño actualice el valor en Vercel sin los `\$` y confirme que el login en producción funciona.

---

## 36. Bitácora — Bloque de 3 correcciones: fotos de producto, adelanto de noticias en el home, párrafos de noticias

- **1) Fotos de producto sin recortar:** las fotos de producto se veían "en primer plano" porque `ProductCard.tsx` y la ficha `producto/[slug]/page.tsx` usaban `object-cover` dentro de una caja `aspect-[4/3]` fija, que recorta la imagen para llenar el recuadro. Se cambió a `object-contain` en esos dos archivos y también, por consistencia, en las miniaturas del carrito (`CartDrawer.tsx`) y del checkout (`CheckoutForm.tsx`). El fondo de respaldo que ya tenía cada contenedor (`bg-eco-cream` / `bg-eco-forest/5`) rellena el espacio sobrante si la foto no calza exacto con la proporción del recuadro. Cambio a nivel de componente, aplica a todos los productos automáticamente. Las fotos de categorías, noticias y del mosaico del buscador **no se tocaron** (siguen en `object-cover` a propósito, no fueron parte de esta corrección).
- **2) Adelanto de "Noticias e Historias" en el home:** nueva función `getRecentPublishedPosts(limit)` en `src/lib/posts.ts` (mismo criterio de solo-publicadas que el resto de funciones públicas de ese archivo, con `take: limit`). Nuevo componente de servidor `src/components/HomeNewsPreview.tsx`: muestra hasta 3 tarjetas (foto, fecha, título, resumen recortado con `line-clamp-2`) enlazando cada una a su ficha, más un link "Ver todas las noticias" hacia `/noticias`. Si no hay ninguna publicación publicada, el componente devuelve `null` y la sección no aparece (sin recuadro vacío). Insertado en `src/app/[locale]/page.tsx` entre "Productos destacados" y "Explorar por categoría". Textos nuevos: `home.newsTitle` / `home.newsSeeAll` en `messages/es.json` y `en.json`.
- **3) Párrafos de noticias respetados al mostrarse:** el contenido ya se guardaba completo y en orden (el `.trim()` de `validarDatosPost` solo recorta el sobrante al inicio/final, nunca reordena nada); el problema era solo visual: la ficha pública mostraba todo el texto en un único `<div>` con `whitespace-pre-wrap`, que solo genera espacio entre párrafos cuando hay una **línea en blanco** de por medio (Enter dos veces). Con un solo Enter (lo más común al escribir o pegar texto de Word/Gmail/WhatsApp), los párrafos quedaban pegados uno detrás de otro sin separación visual clara. Nueva función `paragraphsFromText(texto)` en `src/lib/format.ts`: divide el texto por cualquier salto de línea (`\r\n`, `\r` o `\n`) y descarta líneas vacías. `src/app/[locale]/noticias/[slug]/page.tsx` ahora recorre ese arreglo y muestra **cada línea como su propio `<p>`** con espacio debajo (`flex flex-col gap-4`), así que cada salto de línea que escribió el admin siempre se ve como un párrafo separado, sin depender de líneas en blanco. Se agregó una nota corta debajo de los campos "Contenido completo" en `PostForm.tsx` explicando esta regla. Sin cambios en la base de datos: el contenido ya guardado se beneficia automáticamente, sin migración.
- **Verificación de punta a punta con `npm run dev` + `curl`:** `npx tsc --noEmit` sin errores. Con el sitio corriendo contra Neon: la ficha de un producto real (`/es/producto/abono-organico-saco-50-lb`) mostró `object-contain` y cero `object-cover`; la portada mostró exactamente 3 tarjetas de noticias bajo el título "Noticias e Historias" con el link "Ver todas las noticias"; la ficha de una noticia real generó 9 párrafos (`<p class="whitespace-pre-wrap">`) en el mismo orden del texto original, cada uno con su propio espacio. Servidor de desarrollo detenido al terminar.

---

_Última actualización: fotos de producto ajustadas a "contain" (se ven completas, sin recortar), nueva sección de adelanto de Noticias e Historias en el home, y los párrafos de una noticia ahora se muestran siempre separados; verificado de punta a punta con el sitio corriendo en local contra Neon. Pendiente: elegir un hosting para publicar el sitio en internet, subir estos cambios a GitHub, y definir con el dueño el alcance de la Fase 4._

---

## 37. Bitácora — Botón "Volver" en las pantallas de crear/editar del panel

- **Problema:** las 6 pantallas de crear/editar del panel (`/admin/productos/nuevo`, `/admin/productos/[id]/editar`, `/admin/noticias/nueva`, `/admin/noticias/[id]/editar`, `/admin/productores/nuevo`, `/admin/productores/[id]/editar`) no tenían ninguna forma de volver al listado correspondiente sin usar el botón "atrás" del navegador.
- **Nuevo componente `src/components/admin/BackLink.tsx`:** enlace pequeño ("← Volver a [Sección]"), mismo patrón visual que el enlace "Volver" ya usado en el sitio público (`common.back`). Recibe `href` y `label` como props.
- **Insertado arriba del título (`<h1>`) en las 6 pantallas**, cada una apuntando a su listado: `/admin/productos/nuevo` y `/admin/productos/[id]/editar` → "Volver a Productos"; `/admin/noticias/nueva` y `/admin/noticias/[id]/editar` → "Volver a Noticias"; `/admin/productores/nuevo` y `/admin/productores/[id]/editar` → "Volver a Productores". No se tocaron los 3 listados (`/admin/productos`, `/admin/noticias`, `/admin/productores`): no fue parte de lo pedido, y ya se llega a ellos desde el dashboard `/admin`.
- **Cómo se probó sin la contraseña real:** igual que en la Parte 20 del manual (Cloudinary), se generó una "credencial de sesión" temporal firmando un token con `ADMIN_SESSION_SECRET` (la misma clave que ya usa la app), en vez de pedir la contraseña real del dueño.
- **Verificación:** `npx tsc --noEmit` sin errores. Con sesión real simulada contra `npm run dev`: las 6 pantallas responden 200 y cada una muestra el enlace "← Volver a [Sección]" correcto, apuntando al listado que le corresponde.
