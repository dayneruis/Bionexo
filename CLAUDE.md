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
- **Número de WhatsApp:** originalmente `573000000000` de ejemplo; reemplazado por el número real del negocio (`573001234567`) en `src/lib/contact-config.ts` — ver sección 20 (un solo lugar para todo el sitio, todos los botones lo leen de ahí).

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
  - Para cambiar la contraseña: `npx tsx scripts/generar-hash-admin.ts "contrasena-nueva"` y pegar el resultado en `.env`.
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
- **`ProductForm.tsx` ahora incluye una sección "Datos internos"** (productor + margen), claramente separada y marcada en el código con el recordatorio de que esta sección nunca se muestra en la tienda pública. El selector de productor es opcional ("Sin productor asignado" si el producto no tiene uno todavía); el campo de margen es un número obligatorio entre 3 y 10 (%), validado tanto en el navegador (`min`/`max` del input) como en el servidor.
- **Validación del margen en `admin-products.ts`:** `validarDatosProducto` rechaza (400) cualquier margen fuera de 3–10 %. Si se manda un `producerId` que no existe, Prisma lanza el error `P2003` (violación de clave foránea), que las rutas `POST`/`PUT` de `/api/admin/products` capturan y traducen a un mensaje claro ("El productor elegido no existe"), siguiendo el mismo patrón ya usado para el slug duplicado (`P2002`).
- **Regla de intermediación reforzada, no debilitada:** `catalog.ts` (tienda pública) sigue sin seleccionar nunca `producer` ni `margin`; se verificó de nuevo en esta sesión inspeccionando el HTML generado de una ficha de producto de prueba con productor y margen asignados, confirmando que ninguno de los dos datos llega al navegador del cliente.
- **Con esto se cierran las 4 partes planeadas de la Fase 3** (login y seguridad, gestión de productos, subida de fotos, productor y margen).
- **Verificación:** `npx tsc --noEmit` sin errores. Probado de punta a punta con `npm run dev` + `curl`: crear un productor (201); crear un producto con margen fuera de rango (400) y con un `producerId` inexistente (400); crear un producto válido con margen 7% y productor real (201); confirmar que el HTML público de ese producto no contiene ni el nombre/teléfono del productor ni el valor del margen. El producto y el productor de prueba se borraron al terminar para no dejar datos ficticios (el catálogo de ejemplo conserva sus 5 productores originales del seed).

## 25. Bitácora — Bloque de cierre de la Fase 3 (acceso discreto al panel + logo más grande)

- **Enlace discreto "Administración" en el footer:** `src/components/Footer.tsx` — en la barra inferior de copyright, junto al año y los derechos, se agregó un enlace de texto pequeño y de color gris tenue (`text-slate-400`, sin negrita ni ícono) que dice "Administración" y abre `/admin/login` en una **pestaña nueva** (`target="_blank" rel="noopener noreferrer"`). A propósito no se usó ningún estilo llamativo (ni color de marca, ni botón), para que un visitante normal no lo note pero el dueño sepa dónde encontrarlo.
- **Logo de Bionexo más grande en "Sobre nosotros":** `src/app/[locale]/sobre-nosotros/page.tsx` — dentro de la tarjeta blanca del hero verde, el logo pasó de `h-16 sm:h-20` a `h-20 sm:h-24`, y el padding de la tarjeta de `px-8 py-5` a `px-9 py-6` para mantener la proporción con el logo más grande.
- **Lista completa de municipios (DIVIPOLA):** `src/lib/colombia-geo.ts` tenía antes solo 3–8 municipios "principales" por departamento; ahora tiene la lista oficial completa del DANE: 33 entidades (32 departamentos + Bogotá D.C.) y **1.123 municipios/áreas en total**, con su código DANE de 5 dígitos. Los nombres venían en mayúsculas en la fuente y se convirtieron a formato título (ej. "SAN JOSÉ DE LA MONTAÑA" → "San José de la Montaña"), dejando en minúscula los conectores (de, del, la, los, y). Los tipos, `CLAVE_INTERNACIONAL`, `NOMBRES_DEPARTAMENTOS` y `getMunicipiosDe()` no cambiaron, así que `GeoFilter.tsx` (tienda) y `ProductForm.tsx` (panel) no necesitaron ningún ajuste. Datos generados con un script temporal a partir de una fuente pública con códigos DANE ([RafaelRamosR/dane-codigos-municipios](https://github.com/RafaelRamosR/dane-codigos-municipios)), verificados contra las cifras oficiales conocidas por departamento (Antioquia 125, Boyacá 123, Cundinamarca 116, Santander 87, etc.) antes de reemplazar el archivo.
- **Verificación:** `npx tsc --noEmit` sin errores. Probado con `npm run dev`: `/es/tienda` (200) y `/es/tienda?depto=Antioquia` (200) muestran los 125 municipios de Antioquia, incluyendo nombres con conectores como "San José de la Montaña" y "San Andrés de Cuerquía"; `/admin/login` sigue respondiendo 200.

---

_Última actualización: Fase 3 completa (Parte 1 login, Parte 2 productos, Parte 3 fotos, Parte 4 productor y margen, bloque de cierre con acceso discreto al panel y ajuste de logo). Siguiente fase pendiente de definir con el dueño: Fase 4 (reseñas/opiniones y pasarela de pago, según el plan original de la sección 10)._
