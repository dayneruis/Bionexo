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

---

_Última actualización: bloque de retoques (recuadros blancos de logos, banner de portada sin recortes, botón "Hacer mi pedido por WhatsApp" en carrito/checkout, botón flotante de WhatsApp en todo el sitio). Verificado con `npm run dev` corriendo en esta sesión._
