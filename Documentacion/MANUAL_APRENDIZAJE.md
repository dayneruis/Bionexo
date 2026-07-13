# Manual de Aprendizaje y Diseño — Proyecto Bionexo

> **Para qué sirve este documento:** es tu cuaderno de aprendizaje. Aquí no se
> trata de copiar código, sino de **entender** qué tecnologías usamos, cómo se
> organiza el proyecto y *por qué* las cosas están donde están. Lo vamos a ir
> completando a medida que el desarrollo avance. Cada vez que Claude Code cree o
> cambie algo importante, lo explicamos aquí en palabras sencillas.

---

## Cómo usar este manual

1. No tienes que entenderlo todo de una vez. Avanza por fases, igual que el proyecto.
2. Cuando veas un término en **negrita** la primera vez, búscalo en el **Glosario** (al final).
3. Cuando Claude Code haga algo que no entiendas, pídele: *"explícame en palabras simples qué hace este archivo y por qué"*. Luego anota aquí lo aprendido.
4. Este archivo vive dentro de tu proyecto (carpeta `Documentacion`), así nunca se pierde.

---

## Parte 1 — Cómo funciona una tienda en línea (la idea grande)

Toda página web tiene, a grandes rasgos, tres "mundos" que trabajan juntos:

**1. El frente (frontend).** Es todo lo que el visitante ve y toca: los botones,
las fotos de los productos, los colores, los menús. Vive en el navegador
(Chrome, Edge). Se construye con tres lenguajes base:
- **HTML** → la estructura (qué hay: un título, una imagen, un botón).
- **CSS** → la apariencia (colores, tamaños, posición, que se vea bien en celular).
- **JavaScript** → el comportamiento (qué pasa cuando haces clic, animaciones, etc.).

**2. El detrás (backend).** Es la parte que el visitante no ve: la "cocina".
Recibe pedidos ("muéstrame los productos de la categoría moda"), consulta dónde
está guardada esa información y responde. Aquí viven reglas importantes como el
registro de usuarios o el cálculo del envío.

**3. La memoria (base de datos).** Es donde se guarda la información de forma
permanente: los productos, sus precios, sus fotos, los usuarios registrados, las
reseñas. Piensa en ella como un archivador muy ordenado al que el backend le
pide o le guarda datos.

**Cómo se hablan entre sí:** cuando entras a la tienda, el frontend le pide al
backend "dame los productos", el backend los busca en la base de datos y se los
devuelve, y el frontend los pinta bonitos en pantalla. Esa conversación se hace
a través de algo llamado **API** (una especie de "ventanilla" con reglas claras
para pedir y entregar información).

---

## Parte 2 — Las tecnologías de ESTE proyecto

| Capa | Tecnología elegida | ¿Para qué sirve? | ¿Por qué se eligió? |
|------|--------------------|------------------|---------------------|
| Frontend + Backend | **Next.js 15** (App Router) + TypeScript | Next.js es un framework de React: con los mismos archivos resuelve tanto lo que ve el usuario (páginas) como la lógica que lee la base de datos. TypeScript es JavaScript con "tipos", que ayuda a detectar errores antes de ejecutar el código. | Es el framework más usado para tiendas a la medida, tiene buena documentación y crece bien hacia Fase 2/3 (carrito, panel admin). Se fijó la versión 15 (no la 16, recién salida) porque la 16 tenía un problema de compatibilidad con la librería de idiomas. |
| Estilos | **Tailwind CSS** | Define colores, espacios y tamaños escribiendo "clases" cortas directo en el HTML, en vez de archivos `.css` separados. | Acelera mucho el armado de interfaces responsive y es el estándar actual junto a Next.js. |
| Base de datos | **Prisma + SQLite** | Prisma es el "traductor" entre el código y la base de datos. SQLite es una base de datos liviana que vive en un solo archivo (`dev.db`), perfecta para desarrollar en local. | Cuando se despliegue el sitio, Prisma permite migrar a una base de datos más robusta (Postgres) cambiando muy poca configuración. |
| Idiomas (es/en) | **next-intl** | Maneja las rutas `/es/...` y `/en/...`, y carga el diccionario de textos correcto (`messages/es.json` / `messages/en.json`) según el idioma de la URL. | Es la librería estándar para hacer sitios bilingües con Next.js App Router. |
| Conversión COP→USD | **Frankfurter API + caché SQLite** | Consulta la tasa del día de una API gratuita, la guarda en la base de datos por 6 horas, y si la API falla usa un valor de respaldo (~4200 COP/USD). Ver `src/lib/exchange.ts`. |
| Carrito | **React Context + localStorage** | El carrito vive en la memoria del navegador (no en el servidor). `CartProvider` lo envuelve todo. El cajón lateral se llama `CartDrawer`. Ver `src/lib/cart.tsx`. |
| Cálculo de envío | **Tabla de tarifas origen→destino** | 5 zonas de envío. Archivo maestro: `src/lib/shipping-config.ts`. Lógica en `src/lib/shipping.ts`. Multi-origen: un cargo por zona de origen única, se suman. |

**Lo que ya sabemos de la base técnica:**
- Tienes **Node.js v22** instalado: es el "motor" que permite ejecutar
  herramientas modernas de desarrollo web en tu computador.
- El sitio será **a la medida** (no una plataforma cerrada tipo Shopify), así
  que tendremos control total del código.
- Probamos **siempre en local primero**, luego desplegamos.
- Para levantar el sitio en tu computador: abre una terminal en `D:\Eccomerce`
  y corre `npm run dev`. Luego abre `http://localhost:3000` en el navegador
  (te redirige automáticamente a `/es`).

---

## Parte 3 — La estructura de carpetas (el mapa del proyecto)

Así quedó organizado el proyecto después de construir la Fase 1:

```
D:\Eccomerce
│
├── CLAUDE.md                  ← memoria del proyecto (la lee Claude Code)
├── Documentacion/              ← este manual y otros documentos
│
├── prisma/
│   ├── schema.prisma           ← define las "tablas": Categoría, Producto, Variante
│   ├── seed.ts                 ← carga los datos de ejemplo (8 categorías, productos)
│   └── migrations/             ← historial de cambios a la base de datos
│
├── messages/
│   ├── es.json                  ← textos fijos de la interfaz en español
│   └── en.json                  ← textos fijos de la interfaz en inglés
│
├── src/
│   ├── app/[locale]/            ← todas las páginas (el "[locale]" es /es o /en)
│   │   ├── layout.tsx            ← plantilla común: encabezado + pie + CartProvider
│   │   ├── page.tsx              ← portada
│   │   ├── tienda/               ← tienda general (las 8 categorías)
│   │   ├── categoria/[slug]/     ← página de una categoría específica
│   │   ├── producto/[slug]/      ← ficha de un producto (con precio en COP y USD)
│   │   ├── checkout/             ← formulario de pedido (Fase 2)
│   │   ├── pedido-confirmado/    ← confirmación del pedido con enlace a WhatsApp (Fase 2)
│   │   ├── api/exchange-rate/    ← endpoint: devuelve tasa COP→USD (Fase 2)
│   │   ├── api/orders/           ← endpoint: guarda un pedido (Fase 2)
│   │   └── sobre-nosotros/       ← página "Sobre nosotros"
│   │
│   ├── components/              ← piezas reutilizables (tarjeta de producto, carrito, etc.)
│   ├── lib/                     ← funciones: base de datos, carrito, envío, divisas
│   ├── i18n/                    ← configuración de idiomas (next-intl)
│   ├── middleware.ts             ← decide qué idioma mostrar en cada visita
│   └── generated/prisma/         ← código que Prisma genera automáticamente (no se edita a mano)
│
├── dev.db                       ← la base de datos SQLite (un solo archivo)
└── package.json                 ← lista de herramientas que usa el proyecto
```

**Algo importante para entender Next.js:** la carpeta `src/app/[locale]/categoria/[slug]`
tiene corchetes `[ ]` porque es una carpeta "dinámica": una sola plantilla de
página sirve para *cualquier* categoría (o producto), y Next.js reemplaza
`[slug]` por el nombre real (por ejemplo `moda-sostenible`) según la URL que
visite el usuario.

---

## Parte 4 — Cómo leer el código sin perderte

Una estrategia que funciona muy bien para aprender:

1. **Empieza por lo que ves.** Abre la página en el navegador, identifica un
   elemento (por ejemplo, una tarjeta de producto) y pregúntale a Claude Code:
   *"¿en qué archivo está la tarjeta de producto y cómo funciona?"*.
2. **Lee de afuera hacia adentro.** Primero la estructura general (HTML), luego
   el estilo (CSS), por último el comportamiento (JavaScript).
3. **Un archivo a la vez.** No intentes entender todo el proyecto de golpe.
4. **Pide comentarios.** Dile al agente: *"agrega comentarios en español
   explicando cada parte de este archivo"*. Los comentarios son notas dentro del
   código que no afectan su funcionamiento, solo explican.

---

## Parte 5 — Bitácora de decisiones técnicas

> Aquí registramos cada decisión importante y su razón. Esto vale oro: dentro de
> unos meses entenderás *por qué* hiciste las cosas así.

| Fecha | Decisión | ¿Por qué? |
|-------|----------|-----------|
| 2026-06-23 | Se construyó la Fase 1 completa: Next.js 15 + TypeScript + Tailwind + Prisma/SQLite, catálogo bilingüe con las 8 categorías, fichas de producto, portada con destacados y "Sobre nosotros". | Cumplir el alcance de Fase 1 definido en el CLAUDE.md, con contenido de ejemplo para poder revisarlo en el navegador. |
| 2026-06-23 | Se fijó Next.js en la versión 15.5.19 en vez de la 16 (recién salida). | La versión 16 tenía un problema de compatibilidad con `next-intl` que rompía las páginas en español/inglés (error 404). La 15 es más estable y está bien documentada. |
| 2026-06-23 | Prisma se conecta a SQLite usando un "adaptador" (`@prisma/adapter-better-sqlite3`). | La versión nueva de Prisma (7) ya no se conecta a la base de datos de forma automática; hay que indicarle explícitamente cómo conectarse. |
| 2026-06-25 | Carrito implementado con React Context y localStorage, no con una tabla en la base de datos. | El carrito es temporal: cambia mientras el usuario navega y se vacía al confirmar el pedido. Guardarlo en la BD de forma permanente tiene más sentido solo cuando haya registro de usuarios (Fase 4). Con localStorage el carrito sobrevive a recargas del navegador sin tocar el servidor. |
| 2026-06-25 | Tabla de tarifas de envío en un archivo TypeScript (`shipping-config.ts`), no en la base de datos. | Así el dueño del negocio puede ver y editar las tarifas directamente en ese archivo sin necesidad de una interfaz de admin. En Fase futura, cuando se integre Servientrega/Coordinadora, solo se cambia la función `getTarifa()` y nada más. |
| 2026-06-25 | Estrategia multi-origen: un cargo de envío por zona de origen única, se suman. | Si en el carrito hay un producto de Medellín y otro de Bogotá, son dos despachos físicos distintos; cobrar uno solo sería injusto para el negocio. El comprador ve el desglose en el checkout. |
| 2026-06-25 | Checkout sin contraseña en Fase 2. Solo se recogen nombre, email, teléfono y dirección. | Cumple el requisito "registro sencillo y no tedioso". La contraseña y la cuenta del usuario se agregarán junto con la pasarela de pago en Fase 4. |
| 2026-06-25 | Al confirmar un pedido, el comprador hace clic en un botón que abre WhatsApp con el resumen pre-llenado. | No hay aún una pasarela de pago real. WhatsApp es el canal de confirmación manual mientras no haya integración bancaria. En Fase 4 ese botón se reemplaza por el flujo de pago. |
| 2026-06-28 | Se implementó el bloque de ajustes pre-Fase 3: modelo de intermediación (productor oculto), filtro geográfico, buscador en portada, 10 categorías. Ver sección 6 de este manual. | El negocio opera como marketplace; el cliente nunca ve quién fabrica el producto. El filtro geográfico es necesario porque los productos vienen de distintas regiones de Colombia e internacionalmente. |

---

## Parte 6 — Lo nuevo en el Bloque pre-Fase 3

### 6.1 Modelo de intermediación (marketplace)

Bionexo actúa como **intermediario**: conecta compradores con productores/emprendedores, cobra un margen por ese servicio, y el cliente nunca sabe quién es el proveedor exacto. Es como las grandes plataformas (Rappi, Mercado Libre), pero de economía circular.

**¿Qué significa esto en el código?**

- Existe un nuevo "molde" en la base de datos llamado `Producer` (productor). Tiene campos como nombre del emprendimiento, teléfono del contacto y notas internas.
- Cada producto puede estar vinculado a un productor, pero ese vínculo **nunca se muestra al cliente**.
- Las funciones que sí usa el cliente (en `catalog.ts`) nunca incluyen al productor en la respuesta.
- Las funciones internas (en `producer.ts`) solo las usará el panel de administración en la Fase 3.

**¿Y el margen?**

- Cada producto tiene un campo `margin` (porcentaje, entre 3 y 10%).
- El cálculo de cuánto le toca al productor y cuánto gana Bionexo vive en `src/lib/margin.ts`.
- Igual que el productor, **el margen nunca se muestra al cliente**.

**Regla de oro:** en Bionexo, el cliente ve el producto; el negocio ve el productor y el margen.

---

### 6.2 Ficha de producto renovada

La ficha de producto (`/producto/[slug]`) ahora muestra más información al cliente:

| Campo | ¿Qué muestra? |
|-------|---------------|
| Nombre | El nombre del producto |
| Precio | En COP y en USD (tasa del día) |
| Disponibilidad | Disponible / No disponible |
| **Origen** | Ciudad y departamento (Colombia) o País (si es internacional) |
| **Tamaño** | La medida del producto si aplica (ej: "25 kg", "2×1 m") |
| **Garantía** | "Con garantía — 6 meses" o "Sin garantía" |
| Descripción | Texto descriptivo |

Lo que **NO** aparece: nombre del productor, teléfono, email, redes sociales del productor, margen.

---

### 6.3 Datos de contacto centralizados

Antes, el número de WhatsApp estaba escrito en dos o tres archivos separados. Ahora vive en un solo lugar:

```
src/lib/contact-config.ts
```

Aquí el dueño cambia de una vez: teléfono, email, Facebook, Instagram y cualquier otro dato del negocio. El código lo toma automáticamente en el pie de página, en los botones de "Me interesa" y en la página de confirmación de pedido.

**¿Cómo se usa?** El archivo exporta un objeto `CONTACTO_BIONEXO` y una función `whatsappUrl(mensaje)`. Los componentes importan de ahí, nunca escriben el número directamente.

---

### 6.4 Filtro geográfico por departamento

En la tienda y en cada categoría aparece ahora un filtro que permite ver qué productos vienen de cada región de Colombia (o del exterior).

**¿Cómo funciona?**

1. El usuario elige un departamento en el menú desplegable.
2. Aparece un segundo menú con los principales municipios de ese departamento.
3. Al presionar "Aplicar", la página se recarga mostrando solo los productos con ese origen.
4. También hay una opción "Internacional" para ver productos de fuera de Colombia.

**¿Dónde está el código?**

- Los 32 departamentos + Bogotá D.C. y sus municipios principales están en `src/lib/colombia-geo.ts`. Cuando el dueño quiera cargar la lista oficial completa del DANE, solo tiene que reemplazar el contenido de ese archivo.
- El componente visual se llama `GeoFilter` y vive en `src/components/GeoFilter.tsx`. Es un componente "cliente" (usa estado de React) pero se llama desde páginas del servidor.
- El filtro funciona con **parámetros de URL**: al aplicar un filtro, la URL cambia a algo como `/tienda?depto=Santander&mpio=Bucaramanga`. Esto hace posible compartir el enlace filtrado.
- La búsqueda en la base de datos la hace la función `searchProducts` en `catalog.ts`.

---

### 6.5 Origen internacional

Los productos que vienen de fuera de Colombia tienen `isInternational = true` y un campo `originCountry` (nombre del país). En la ficha del producto, el componente `OriginBadge` decide automáticamente qué mostrar:

- Colombia → 📍 Bucaramanga, Santander
- Internacional → 🌍 Brasil (por ejemplo)

---

### 6.6 Barra de búsqueda en la portada

En la página principal hay ahora una sección llamada `SearchHero` (héroe de búsqueda). Tiene:

- Un fondo con un mosaico de 6 imágenes de ejemplo (mercados, economía circular).
- Un título y subtítulo motivadores.
- Una barra de búsqueda de texto.

Al escribir algo y presionar "Buscar", el sitio navega a `/tienda?q=lo-que-escribiste` y muestra los productos que coinciden con ese texto en el nombre o la descripción (en español o inglés).

**Archivo:** `src/components/SearchHero.tsx`

---

### 6.7 Dos nuevas categorías (total: 10)

Se agregaron:
- **Servicios:** recolección, transformación, consultoría y similares.
- **Otros productos:** economía circular que no encaja en las otras 8 categorías.

Cada una tiene su propia página en `/categoria/servicios` y `/categoria/otros-productos`, con soporte del filtro geográfico igual que las demás.

---

## Parte 7 — Preguntas útiles para hacerle a Claude Code (y aprender)

Copia y pega estas preguntas cuando quieras entender algo:

- "Explícame en palabras simples, sin tecnicismos, qué hace este archivo."
- "¿Por qué elegiste esta tecnología y qué alternativas había?"
- "Dibújame con un diagrama sencillo cómo se conectan estas partes."
- "Agrégale comentarios en español a este código para que yo lo entienda."
- "Si quisiera cambiar el color principal del sitio, ¿qué archivo tocaría y por qué?"
- "¿Qué pasaría si borro este archivo? ¿Para qué sirve?"

---

## Glosario (en construcción)

- **Frontend:** la parte visible de la web (lo que ve el usuario en el navegador).
- **Backend:** la parte invisible que procesa la lógica y los datos en el servidor.
- **Base de datos:** archivador digital donde se guarda la información de forma permanente.
- **API:** conjunto de reglas por las que el frontend y el backend se piden y entregan información.
- **HTML / CSS / JavaScript:** los tres lenguajes base de toda página web (estructura, estilo, comportamiento).
- **Framework:** un conjunto de herramientas que acelera el desarrollo (como una "plantilla con superpoderes").
- **Node.js:** el motor que permite ejecutar herramientas de desarrollo en tu computador.
- **Local:** tu propio computador (donde probamos antes de publicar).
- **Servidor / hosting:** computador en internet donde finalmente vive el sitio para que todos lo vean.
- **Git:** herramienta para guardar versiones del proyecto y poder volver atrás.
- **Responsive:** que el sitio se ve bien en celular, tablet y computador.
- **Migración (de base de datos):** un cambio guardado y versionado en la estructura de la base de datos (por ejemplo, "agregar la tabla Producto").
- **Seed ("sembrar"):** un script que carga datos de ejemplo en la base de datos para poder probar el sitio sin esperar a tener datos reales.
- **Componente:** una pieza de interfaz reutilizable (ej: la tarjeta de un producto), que se usa en varias páginas sin repetir el código.
- **Variable de entorno:** un valor de configuración (como la ubicación de la base de datos) que se guarda fuera del código, en un archivo `.env`.
- **React Context:** mecanismo de React para compartir información entre componentes sin tener que pasarla "de mano en mano". El carrito usa Context para que cualquier botón de cualquier página pueda agregar ítems.
- **localStorage:** espacio de almacenamiento del navegador (no del servidor) que guarda datos aunque se recargue la página. El carrito de Bionexo vive ahí.
- **Zona de envío:** agrupación de ciudades con una misma tarifa de envío. Bionexo tiene 5 zonas: BUC (Bucaramanga), BOG (Bogotá), PPAL (ciudades principales), COL (resto de Colombia), INTL (internacional).
- **Tasa de cambio en caché:** guardar temporalmente la tasa del día en la base de datos local para no consultar la API externa en cada clic de usuario. Se renueva cada 6 horas.
- **API endpoint / Route Handler:** una URL especial del sitio que responde con datos en formato JSON en vez de con una página visible. Ejemplo: `/api/exchange-rate` devuelve la tasa COP→USD.
- _(seguimos agregando términos a medida que aparezcan)_

---

## Parte 6 — Bloque visual y de contenido

### ¿Por qué un bloque "solo de diseño" antes de seguir con la Fase 3?

Antes de construir el panel de administración (Fase 3), se aprovechó para dejar el sitio con su identidad visual real: logos verdaderos, contenido de "Sobre nosotros" con texto e historia auténticos, y un hero de búsqueda más impactante. Esto permite que el dueño ya pueda mostrar el sitio a clientes o colaboradores con una imagen profesional.

---

### 6.1 Logos reales con `next/image`

Antes, el Header mostraba el nombre "Bionexo" en texto. Ahora muestra la imagen real `bionexo.png`. ¿Por qué usar `next/image` y no un `<img>` normal?

- **Optimización automática:** Next.js convierte la imagen al formato WebP (más liviano) y la sirve en el tamaño exacto que necesita la pantalla.
- **Carga perezosa:** las imágenes que están fuera de la pantalla no se cargan hasta que el usuario las ve. Esto hace el sitio más rápido.
- **El prop `priority`** en el logo del Header le dice a Next.js: "esta imagen es importante, cárgala de inmediato" (porque está arriba de la pantalla, siempre visible).

El favicon (el íconito que aparece en la pestaña del navegador) se crea simplemente poniendo un archivo llamado `icon.png` dentro de `src/app/`. Next.js lo detecta automáticamente.

---

### 6.2 Variables CSS y la paleta eco

Los colores del sitio no están escritos directamente en cada componente (ej: `#1a4731`). Están guardados como **variables CSS** en `globals.css`:

```css
:root {
  --color-eco-forest: #1a4731;
}
```

Y luego Tailwind CSS los expone con un nombre corto: `text-eco-forest`, `bg-eco-forest`, `border-eco-forest`. Así, si el dueño quiere cambiar el verde oscuro del sitio, solo cambia un valor en `globals.css` y el cambio aplica en todas partes.

---

### 6.3 El hero de búsqueda: gradiente y mosaico

El `SearchHero` es la gran sección de portada. Tiene:

1. **Mosaico de 6 imágenes** en la capa de fondo (3 columnas × 2 filas), con fotos de naturaleza y mercados.
2. **Gradiente encima** (de verde bosque a cian), creado con `linear-gradient`. El gradiente hace dos cosas: tapa parcialmente las fotos para que el texto sea legible, y refuerza la identidad de color de Bionexo.
3. **Pastilla de marca** (`Bionexo · Economía Circular`): una etiqueta pequeña con borde sutil que da contexto.
4. **Botones de búsqueda rápida**: atajos que llevan directamente a la tienda buscando un término común (Cartón, Plástico reciclado, etc.). Son solo botones que navegan a `/tienda?q=término`.

La búsqueda en sí no cambió: sigue mandando al usuario a `/tienda?q=texto` donde el servidor filtra los productos.

---

### 6.4 La página "Sobre nosotros" rediseñada

Esta página pasó de ser texto plano a tener varias secciones visuales:

- **Hero verde** con el logo blanco (filtro CSS `brightness-0 invert` convierte cualquier imagen a blanco puro).
- **Sección de estadísticas**: tres números grandes en `text-eco-green` sobre fondo suave. Los números impactan visualmente y comunican la escala del problema que Bionexo ayuda a resolver.
- **Tarjeta de Tu Basura Innova**: fondo cian muy suave, con el logo de la marca sombrilla a la izquierda y el texto a la derecha (usando `flexbox` en pantallas grandes).
- **Cierre con CTA** ("Cuando compras en Bionexo, cierras el ciclo"): fondo verde oscuro, texto de impacto y botón para ir a la tienda.

---

### 6.5 Preparación de la pasarela de pago

Una **pasarela de pago** es el sistema que procesa el cobro con tarjeta o PSE. En Colombia las más comunes son Wompi, PayU y ePayco.

Por ahora el sitio *no cobra* directamente (el comprador confirma por WhatsApp). Pero dejamos la estructura técnica lista para Fase 4:

**`src/lib/payment-config.ts`** — archivo de configuración que tiene todos los parámetros en un solo lugar: qué proveedor usar, si está en modo prueba o producción, las claves de acceso. Cuando llegue Fase 4, el dueño (con ayuda técnica) solo rellena este archivo con las claves reales.

**`src/app/api/payment/webhook/route.ts`** — un **webhook** es una URL de tu sitio que el proveedor de pagos llama automáticamente para decirte "el pago fue aprobado" o "fue rechazado". Esta ruta ya existe pero por ahora solo responde "OK". En Fase 4 se programará para actualizar el estado del pedido en la base de datos y notificar al comprador.

**Comentario en `CheckoutForm.tsx`** — hay un comentario marcado con `// ── PUNTO DE INTEGRACIÓN PASARELA (Fase 4) ──` justo antes del botón de confirmar pedido. Ese es el lugar exacto donde en Fase 4 se insertará el widget de pago del proveedor.

---

### 6.6 Cuatro ajustes visuales (logo, tarjetas de portada, ODS, botón "Vender en Bionexo")

- **Logo más grande en el Header** (`src/components/Header.tsx`): el logo pasó de `h-12`/`h-16` a `h-14`/`h-20` (celular/computador). Se le puso `flex-wrap` a la fila del encabezado como "colchón de seguridad": si en alguna pantalla intermedia no cabe todo (logo + menú + botones), en vez de romperse o encimarse, el contenido pasa a una segunda línea.
- **Sección "¿Qué es Bionexo?" en la portada** (`src/app/[locale]/page.tsx`): 5 tarjetas con ícono, título y texto corto, usando la librería **`lucide-react`** (íconos SVG listos para usar en React: hoja, etiqueta, reciclaje, apretón de manos y globo). Se instaló con `npm install lucide-react`.
- **Fila de ODS en "Sobre nosotros"** (`src/app/[locale]/sobre-nosotros/page.tsx`): los **Objetivos de Desarrollo Sostenible (ODS)** son 17 metas globales de la ONU para el 2030 (fin de la pobreza, acción climática, etc.). Se muestran 9 relevantes para Bionexo como cuadros de color con su número y nombre corto. Los colores oficiales de cada ODS viven en un archivo nuevo, `src/lib/sdg-data.ts` (mismo patrón que `colombia-geo.ts`: un array de datos reutilizable). Como esos colores no existen en la paleta Tailwind del proyecto, se aplican con `style={{ backgroundColor: ... }}` directamente en el componente.
- **Botón "Vender en Bionexo"** (`src/components/SellButton.tsx`): un componente pequeño y reutilizable que abre WhatsApp (usando `whatsappUrl()` de `contact-config.ts`, la misma función que ya usaba "Me interesa") con el mensaje fijo "Hola, quiero vender mis productos en Bionexo". Se usa en el Header (junto al carrito) y en el Footer (columna de contacto), así que si algún día cambia el texto o el número, se edita en un solo lugar.

---

### Nuevos términos para el glosario

- **`next/image`:** componente de Next.js para mostrar imágenes de forma optimizada (WebP, carga perezosa, tamaño adaptado a la pantalla).
- **Favicon:** el ícono pequeño que aparece en la pestaña del navegador. En Next.js basta con poner `icon.png` en `src/app/`.
- **Variable CSS (custom property):** un valor reutilizable definido con `--nombre` en CSS. Permite cambiar un color en un solo lugar y que aplique en todo el sitio.
- **Gradiente (`linear-gradient`):** transición suave entre dos o más colores. Se usa en el hero para combinar verde bosque con cian.
- **Pasarela de pago:** servicio externo que procesa cobros con tarjeta o PSE. Ejemplos colombianos: Wompi, PayU, ePayco.
- **Webhook:** URL de tu sitio que servicios externos (como una pasarela de pago) llaman automáticamente para enviarte notificaciones (ej: "el pago fue aprobado").
- **Filtro CSS `brightness-0 invert`:** convierte cualquier imagen a color blanco puro. Útil para mostrar un logo oscuro sobre fondo oscuro.
- **`lucide-react`:** librería de íconos SVG para React. Cada ícono es un componente (ej: `<Leaf />`, `<Globe />`) al que se le puede cambiar tamaño y color como a cualquier otro elemento.
- **ODS (Objetivos de Desarrollo Sostenible):** 17 metas globales que la ONU propuso para 2030 (fin de la pobreza, salud, acción climática, alianzas, etc.). Cada una tiene un número, un color y un ícono oficiales.
- **`flex-wrap`:** propiedad de CSS que permite que los elementos de una fila pasen a una segunda línea automáticamente cuando ya no caben, en vez de encimarse o desbordar la pantalla.

---

### 6.7 Fotos reales conectadas (categorías y mosaico del buscador)

Hasta este bloque, las fotos de categoría no existían (las tarjetas solo tenían texto) y el mosaico del buscador usaba fotos genéricas de `picsum.photos`. Ahora:

- **Carpeta `public/`:** en Next.js, todo lo que pones en la carpeta `public/` queda accesible directamente por su nombre de archivo (ej: `public/categorias/cat-moda.jpg` se ve en el navegador como `/categorias/cat-moda.jpg`). Por eso las fotos que estaban en `D:\Eccomerce\imagenes` (fuera del proyecto web) se copiaron a `public/categorias/` y `public/hero/`.
- **Mapa de imágenes por categoría** (`src/lib/category-images.ts`): un objeto simple que dice "esta categoría (por su `slug`) usa esta foto". `CategoryCard.tsx` lo consulta para saber qué foto mostrar. Es un archivo aparte (no una tabla en la base de datos) porque, por ahora, estas fotos son fijas; si en la Fase 3 el dueño quiere subir su propia foto por categoría desde el panel admin, ese campo se agregaría a la base de datos más adelante.
- **Recorte parejo (`aspect-[16/9]` + `object-cover`):** todas las fotos de categoría tienen exactamente la misma proporción (ancho:alto = 16:9), sin importar la foto original. `object-cover` hace que la foto "rellene" ese espacio recortando lo que sobra, en vez de deformarse o dejar espacios en blanco. Así las 10 tarjetas se ven parejas entre sí.
- **Mosaico del buscador con capa verde:** el mosaico de fondo (`SearchHero.tsx`) ahora usa las 8 fotos reales del negocio. Como son fotos de temas distintos (no fueron tomadas para verse juntas), se les pone encima una capa de color semitransparente (un `linear-gradient` solo con tonos verdes de la marca). Esa capa "unifica" visualmente las fotos: en vez de ver un collage de colores sueltos, todo se ve teñido del mismo verde, y el texto blanco de encima se lee con claridad.
- **ODS en tonos verdes:** los cuadros de ODS en "Sobre nosotros" dejaron de usar los colores oficiales de la ONU (que son un arcoíris: rojo, naranja, azul, etc.) y ahora usan tres tonos de verde de la marca en rotación. Es una decisión de diseño para que esa fila se vea sobria y no rompa la paleta del sitio.

---

### Nuevos términos para el glosario (bloque 6.7)

- **Carpeta `public/`:** carpeta especial de Next.js cuyo contenido se sirve tal cual, con la misma ruta que tiene adentro (ej: `public/hero/hero-1.png` → `/hero/hero-1.png` en el navegador).
- **`aspect-[16/9]`:** clase de Tailwind que fija la proporción ancho:alto de un elemento (en este caso, 16 de ancho por cada 9 de alto), sin importar el tamaño real de la imagen que se ponga adentro.
- **`object-cover`:** propiedad CSS que hace que una imagen "rellene" su contenedor recortando los bordes que sobran, manteniendo la proporción original de la foto (lo opuesto sería `object-contain`, que encoge la foto entera para que quepa sin recortar).
- **Capa de color (overlay) semitransparente:** un rectángulo de color con opacidad menor a 100% puesto encima de una imagen, para oscurecerla o teñirla y así lograr que el texto de encima se lea bien.

---

### 6.8 Retoques de imágenes y botón de WhatsApp para pedir sin pasarela

Este bloque no agrega funciones nuevas de negocio: son ajustes finos a cosas que ya existían, más una forma rápida de comprar mientras no hay pasarela de pago (Fase 4).

- **El "recuadro raro" del logo:** varias imágenes PNG de este proyecto (como `bionexo.png`) tienen fondo de color claro pero **opaco** (no transparente). Si el fondo de la página alrededor del logo no es exactamente ese mismo color, se nota un rectángulo. La solución, ya usada antes en "Sobre nosotros", es meter el logo dentro de su propia tarjeta blanca (`bg-white`) — así el "recuadro" es intencional y limpio, en vez de un accidente. Se aplicó también al logo del encabezado (`Header.tsx`) y se agrandó un poco el de "Sobre nosotros" y los del pie de página.
- **`aspect-[ancho/alto]` en vez de una altura fija:** el banner de portada (`portada-marca.png`) se recortaba porque tenía una altura fija en píxeles (`h-64`, etc.) que no coincidía con la forma real de la imagen. La clase de Tailwind `aspect-[1718/916]` le dice al navegador "este cuadro siempre debe mantener esta proporción exacta (la misma que la imagen original)", sin importar el ancho de pantalla. Combinada con `object-contain` (que encoge la imagen entera para que quepa, sin recortar nada), la frase de la imagen ahora se ve siempre completa.
- **Botón "Hacer mi pedido por WhatsApp":** como el pago en línea todavía no está activo, se agregó un botón que arma automáticamente un mensaje de WhatsApp con la lista de productos del carrito (nombre, cantidad y precio de cada uno) y el total, y abre el chat de WhatsApp del negocio con ese mensaje ya escrito. Aparece en el cajón del carrito y en la página de checkout, como alternativa más rápida a llenar todo el formulario. La lógica de armar el mensaje se puso en un solo archivo (`src/lib/cart-whatsapp.ts`) para no repetir código entre los dos lugares donde se usa.
- **Botón flotante de WhatsApp:** un círculo verde fijo en la esquina inferior derecha, visible en cualquier página del sitio, para que un visitante pueda escribir una consulta general en cualquier momento (no es lo mismo que el botón de pedido: este es para preguntas, no para comprar). Se agregó una sola vez en el archivo del "layout" (la plantilla que envuelve todas las páginas), así no hay que repetirlo en cada página.
- **Ícono de WhatsApp compartido:** el dibujo del ícono de WhatsApp se usaba repetido en varios archivos. Se movió a un componente propio (`src/components/WhatsAppIcon.tsx`) para que, si algún día hay que cambiarlo, se edite en un solo lugar.

---

### Nuevos términos para el glosario (bloque 6.8)

- **`aspect-[ancho/alto]`:** clase de Tailwind que fija una proporción exacta y personalizada (no solo 16:9), útil cuando se quiere respetar la forma real de una imagen concreta.
- **`object-contain`:** propiedad CSS que encoge una imagen entera para que quepa dentro de su contenedor sin recortar nada (puede dejar espacio vacío a los lados); es lo opuesto de `object-cover`.
- **Mensaje prellenado de WhatsApp:** un enlace especial (`https://wa.me/numero?text=...`) que, al abrirse, entra directo al chat de WhatsApp con un mensaje ya escrito en el cuadro de texto, listo para que la persona solo presione enviar.

---

## Parte 8 — Fase 3, Parte 1: el panel de administración empieza por el login

La Fase 3 (panel de administración) es la más grande hasta ahora, así que se divide en varias partes que se construyen y prueban una por una. Esta primera parte no gestiona todavía ni productos ni fotos: solo construye la "puerta con llave" que protegerá todo lo demás.

### 8.1 ¿Por qué el panel vive fuera de `/es` y `/en`?

Hasta ahora, todas las páginas del sitio vivían dentro de una carpeta `[locale]`, que es la que hace que existan versiones en español e inglés de todo. El panel de administración es distinto: es privado, solo lo usa el dueño del negocio, y no tiene sentido traducirlo. Por eso vive en su propia carpeta `src/app/admin/`, separada de `[locale]`, con su propia "envoltura" (`layout.tsx`) que no incluye el menú, el pie de página ni el carrito de la tienda.

### 8.2 ¿Por qué no se usó una librería de login "gigante"?

Existen librerías muy completas para manejar usuarios (por ejemplo, NextAuth/Auth.js), pero están pensadas para sitios con **muchos** usuarios, inicio de sesión con Google/Facebook, roles distintos, etc. Bionexo solo necesita que **una persona** (el dueño) pueda entrar con usuario y contraseña. Usar una librería tan grande para un solo usuario sería una talla de zapato equivocada: más complicado de mantener sin ninguna ventaja real. Por eso se construyó un login sencillo y a la medida.

### 8.3 Cómo funciona el login, paso a paso

1. El dueño escribe usuario y contraseña en `/admin/login`.
2. El navegador envía esos datos a `POST /api/admin/login`.
3. Esa ruta compara la contraseña escrita contra un **hash** guardado (nunca la contraseña real) usando la librería `bcryptjs`. Un hash es como una "huella digital" de la contraseña: se puede comprobar que una contraseña coincide con su hash, pero no se puede ir del hash hacia atrás para descubrir la contraseña original. Así, aunque alguien viera el archivo `.env`, no vería la contraseña en texto plano.
4. Si coincide, el servidor crea una **cookie de sesión firmada**: un "carnet" que el navegador guarda y envía automáticamente en cada visita al panel. Va firmada con la librería `jose` (un JWT, que es un formato estándar de "carnet firmado") para que nadie pueda inventarse una cookie válida sin conocer la clave secreta del servidor.
5. Cada vez que se visita cualquier página de `/admin`, el `middleware.ts` revisa esa cookie **antes** de mostrar la página. Si no existe o es inválida, redirige de una vez a `/admin/login`.

### 8.4 Un tropiezo real (y por qué importa entenderlo)

Al probar el login la primera vez, fallaba incluso con la contraseña correcta. La causa: los hashes de `bcryptjs` empiezan con algo como `$2b$10$...`, y Next.js lee el archivo `.env` de una forma que trata cualquier `$algo` como si fuera "el valor de la variable llamada algo" (igual que hace Docker Compose). Como no existían variables llamadas `2b` o `10`, Next.js las reemplazaba por texto vacío y el hash quedaba roto sin ningún mensaje de error visible. La solución es escapar cada signo `$` como `\$` dentro de `.env`. El script que genera el hash (`scripts/generar-hash-admin.ts`) ya lo hace automáticamente, así que no hay que acordarse de este detalle a mano.

### 8.5 Cómo cambiar la contraseña del panel

Corre este comando en la terminal, dentro de la carpeta del proyecto:

```
npx tsx scripts/generar-hash-admin.ts "tu-contrasena-nueva"
```

Va a imprimir una línea `ADMIN_PASSWORD_HASH="..."` lista para pegar en el archivo `.env`, reemplazando la que ya está.

---

### Nuevos términos para el glosario (Parte 8.1)

- **Middleware:** un pedazo de código que se ejecuta **antes** de que cualquier página responda, para revisar o modificar la petición (en este proyecto: decidir el idioma, o exigir sesión en `/admin`).
- **Hash (de contraseña):** una transformación de un texto (la contraseña) en otro texto de longitud fija que no se puede revertir. Sirve para comprobar contraseñas sin guardarlas nunca en texto plano.
- **Cookie `httpOnly`:** una cookie que el navegador guarda pero que el JavaScript de la página **no puede leer**, solo el servidor. Protege la sesión aunque hubiera un error de seguridad en el código del frontend.
- **JWT (JSON Web Token):** un formato estándar de "carnet digital" firmado, que cualquier servidor puede verificar sin tener que guardar la sesión en una base de datos.
- **Edge Runtime:** el entorno más liviano y rápido donde corre el middleware de Next.js; no soporta todo lo que soporta Node.js normal (por eso `bcryptjs` se usa solo en la ruta de login, y `jose` —que sí funciona ahí— se usa en el middleware).

---

## Parte 9 — Fase 3, Parte 2: crear, editar y dar de baja productos

### 9.1 Un descubrimiento importante: el middleware no cubre todo

Cuando se construyó el login (Parte 1), la protección se puso en `src/middleware.ts`, que revisa la cookie de sesión antes de mostrar cualquier página de `/admin`. Pero al construir esta parte apareció un detalle importante: ese middleware tiene una regla que dice "no te apliques a las rutas que empiezan con `/api`" (se hizo así para no interferir con el sistema de idiomas). Eso significa que las rutas de la API que crean o editan productos (`/api/admin/products`) **no pasaban por esa revisión**. Sin arreglarlo, cualquiera que conociera esa dirección podría haber creado productos sin haber iniciado sesión.

La solución: cada ruta de API que modifica datos revisa la sesión **ella misma**, al principio, con una función (`obtenerSesionActual()`). Si no hay sesión válida, responde "401 No autorizado" de inmediato, sin llegar a tocar la base de datos. Es una buena lección: cuando una aplicación tiene varias "puertas de entrada" (páginas Y rutas de API), hay que asegurarse de que la protección cubra todas, no solo la que se ve en el navegador.

### 9.2 ¿Por qué "dar de baja" no borra el producto?

El proyecto ya había decidido (ver CLAUDE.md, sección 5) que no se maneja inventario por cantidades: cada producto solo tiene un interruptor "Disponible / No disponible". Por eso, "dar de baja" en el panel simplemente apaga ese interruptor, no borra el producto de la base de datos. Ventajas de hacerlo así:

- Si alguien ya compró ese producto antes, su pedido sigue teniendo sentido (no aparece "un producto fantasma" en el historial).
- Es reversible: si el dueño se equivoca o el producto vuelve a estar disponible, solo hay que "reactivarlo", sin tener que volver a cargar todos sus datos.

### 9.3 Un formulario, dos usos (crear y editar)

En vez de programar dos formularios parecidos, se construyó uno solo (`ProductForm.tsx`) que recibe un producto existente como dato opcional: si lo recibe, se precargan todos los campos y el botón dice "Guardar cambios" (edición); si no lo recibe, todo empieza vacío y el botón dice "Crear producto". Es el mismo patrón que ya se usaba en otras partes del proyecto (por ejemplo, `ContactButtons.tsx` reutiliza lógica en vez de duplicarla).

### 9.4 El "slug" y por qué importa

Cada producto tiene una URL propia en la tienda (ej: `/es/producto/miel-organica-frasco-500g`). Esa parte final de la URL es el "slug". El panel lo sugiere automáticamente a partir del nombre en español (quitando tildes, espacios y símbolos raros), pero el dueño puede cambiarlo a mano si quiere una URL distinta. Si dos productos terminaran con el mismo slug, la base de datos lo rechaza (tiene una regla de "valor único"), y el panel muestra un mensaje claro pidiendo elegir otro.

---

### Nuevos términos para el glosario (Parte 9)

- **Slug:** la parte de una URL que identifica un elemento específico de forma legible (ej: en `/producto/miel-organica`, el slug es `miel-organica`).
- **Restricción única (unique constraint):** una regla de la base de datos que impide que dos filas tengan el mismo valor en una columna (aquí, que dos productos compartan el mismo slug).
- **Dar de baja (soft delete):** marcar algo como "inactivo" en vez de borrarlo de verdad. Se prefiere sobre el borrado cuando otros datos (como los pedidos) dependen de que ese registro siga existiendo.
- **Validar datos de entrada:** revisar, antes de guardar algo en la base de datos, que lo que llegó desde un formulario tiene el tipo y la forma esperada (por ejemplo, que el precio sea realmente un número). Protege contra errores y contra datos manipulados a propósito.

---

## Parte 10 — Fase 3, Parte 3: subir fotos desde el computador

### 10.1 ¿Por qué antes solo se podía pegar una URL?

La Parte 2 dejó el campo de imagen como un simple texto para pegar una URL (por ejemplo, un enlace a `picsum.photos`). Era una solución temporal a propósito: primero se necesitaba que crear/editar productos funcionara, y la subida de archivos se dejó para esta parte, que es más delicada (hay que recibir un archivo real, revisarlo y guardarlo en el disco del servidor).

### 10.2 Cómo funciona la subida, paso a paso

1. En el formulario del panel, el dueño elige un archivo de foto de su computador.
2. El navegador lo envía de inmediato (sin esperar a que se guarde el resto del producto) a una nueva ruta, `POST /api/admin/upload`, como `multipart/form-data` (el formato estándar para mandar archivos por HTTP).
3. Esa ruta revisa dos cosas antes de aceptar el archivo:
   - **El tipo real de archivo** (mirando su contenido, no el nombre): solo se aceptan JPG, PNG, WEBP o GIF. Nunca se confía en la extensión que traía el archivo original (alguien podría renombrar un archivo peligroso como `foto.jpg`), así que el nombre final en el servidor se arma con la extensión correcta según el tipo real detectado.
   - **El tamaño**: máximo 5 MB, para que una foto enorme no llene el disco ni haga lenta la subida.
4. Si todo está bien, el archivo se guarda dentro de `public/uploads/productos/` con un nombre único generado por el servidor (nunca el nombre original), y la ruta responde con la URL pública de la foto (ej: `/uploads/productos/xxxx.jpg`).
5. Esa URL se guarda automáticamente en el mismo campo `imageUrl` que ya existía: para el resto del sitio (tienda pública, carrito, etc.) no hay ninguna diferencia entre una foto subida y una URL pegada a mano, ambas son "la URL de la imagen del producto".

### 10.3 ¿Por qué la carpeta `public/uploads/` no se sube a git?

El proyecto ya tenía la costumbre de no subir a git lo que se genera o cambia mientras se usa el sitio (la base de datos `dev.db`, por ejemplo). Las fotos que el dueño va subiendo con el panel son exactamente ese tipo de contenido: cambian todo el tiempo y no son parte del código del proyecto, así que se agregó `/public/uploads/` al archivo `.gitignore`.

### 10.4 ¿Por qué se dejó también la opción de pegar una URL?

Aunque ya se puede subir un archivo, se conservó el campo de URL como alternativa. Sirve para casos donde el dueño no tiene todavía la foto real a mano y quiere usar una imagen de ejemplo con un enlace, sin que eso bloquee la creación del producto.

---

### Nuevos términos para el glosario (Parte 10)

- **`multipart/form-data`:** el formato que usa un formulario web para enviar archivos (fotos, PDFs, etc.) al servidor, distinto del formato de texto plano (JSON) que se usa para el resto de los datos.
- **Validar el tipo real de un archivo:** revisar el contenido de un archivo para confirmar qué tipo de archivo es en realidad, en vez de confiar en su nombre o extensión, que cualquiera puede cambiar.

---

## Parte 11 — Fase 3, Parte 4: productor y margen (cierre de la Fase 3)

### 11.1 ¿Qué es el "productor" y por qué es tan reservado?

Bionexo funciona como intermediario: conecta a compradores con emprendedores y recicladores que fabrican u ofrecen los productos (el "productor"). El negocio se queda con un pequeño margen de cada venta por hacer esa conexión (cobrar, mostrar el catálogo, dar soporte, etc.). Si el cliente final viera el nombre y teléfono del productor real, podría contactarlo directamente y saltarse a Bionexo, perdiendo esa comisión — por eso esos datos se tratan como información **estrictamente interna**, nunca se envían al navegador del comprador.

### 11.2 ¿Por qué el margen tiene un rango fijo (3–10 %)?

Es una regla de negocio, no una limitación técnica: el dueño decidió que el margen de intermediación siempre debe estar entre 3 % y 10 %. El código la hace cumplir en dos lugares a la vez:

- En el formulario del panel, el campo numérico no deja escribir un valor fuera de ese rango (`min`/`max` del input HTML).
- En el servidor (`validarDatosProducto`), se vuelve a comprobar el mismo rango antes de guardar. Esto es importante: la validación del navegador se puede saltar fácilmente (por ejemplo, llamando a la API directamente), así que la validación que de verdad protege los datos es siempre la del servidor. La del formulario solo mejora la experiencia, avisando al instante.

### 11.3 Un producto puede no tener productor todavía

No todos los productos tienen ya un productor asignado en el sistema (por ejemplo, si el dueño está probando el catálogo antes de formalizar el trato con un proveedor). Por eso el campo es opcional: el selector del formulario incluye la opción "Sin productor asignado", que guarda `null` en la base de datos.

### 11.4 El mismo error de "clave foránea" que ya se había visto con el slug

Cuando un producto queda vinculado a un productor (`producerId`), la base de datos exige que ese productor exista de verdad — es una "clave foránea": una regla que dice "este valor tiene que apuntar a una fila real de la otra tabla". Si alguien intentara guardar un producto con un `producerId` inventado, Prisma lo rechaza con el código de error `P2003`, muy parecido al `P2002` que ya se había visto con los slugs duplicados (Parte 9.4). Las rutas de la API capturan ese código y lo convierten en un mensaje claro para el panel, en vez de un error técnico confuso.

---

### Nuevos términos para el glosario (Parte 11)

- **Clave foránea (foreign key):** una regla de la base de datos que obliga a que un campo (aquí, `producerId` en `Product`) apunte siempre a una fila que realmente existe en otra tabla (aquí, `Producer`). Evita "referencias fantasma" a datos que no existen.
- **Validación en el servidor vs. validación en el navegador:** la del navegador (atributos como `min`/`max` de un input) es solo para comodidad y feedback inmediato; la del servidor es la que de verdad protege los datos, porque el navegador se puede saltar o manipular.

---

## Parte 12 — Bloque de cierre de la Fase 3: acceso discreto al panel y logo más grande

### 12.1 Un enlace "invisible a propósito"

En el pie de página se agregó un enlace de texto que dice "Administración" y lleva a `/admin/login`. Se hizo deliberadamente pequeño y de color gris apagado (el mismo tono del texto de derechos de autor), sin ícono ni color de marca, para que un visitante normal de la tienda no lo note ni sienta curiosidad de darle clic. Esto no es seguridad real (cualquiera que sepa la URL `/admin/login` puede llegar directo escribiéndola), es solo un atajo cómodo para que el dueño encuentre la entrada al panel sin tener que recordar la dirección.

### 12.2 ¿Por qué abrir en una pestaña nueva?

El atributo `target="_blank"` hace que el enlace abra una pestaña nueva del navegador en vez de reemplazar la página actual. Así, si el dueño está viendo la tienda pública y le da clic a "Administración", no pierde esa pestaña — sigue teniendo la tienda abierta en una y el panel en otra. El atributo `rel="noopener noreferrer"` que lo acompaña es una buena práctica de seguridad estándar: evita que la pestaña nueva pueda manipular la pestaña original a través de JavaScript.

### 12.3 Ajuste visual simple: agrandar un logo

El aumento del logo de Bionexo en "Sobre nosotros" (de `h-16 sm:h-20` a `h-20 sm:h-24`) es un cambio puramente visual, de los que ya se habían hecho varias veces antes en el proyecto (ver bitácora del CLAUDE.md, secciones 16 a 19): se cambia el valor de una clase de Tailwind que controla la altura de la imagen, y se ajusta un poco el espacio alrededor (`padding`) para que la tarjeta blanca siga viéndose proporcionada con el logo más grande adentro.

### 12.4 Por qué no se escribió la lista de municipios a mano

El archivo `src/lib/colombia-geo.ts` solo tenía antes los municipios "principales" de cada departamento (la capital y unos pocos más), como una lista de ejemplo. Colombia tiene más de 1.100 municipios en total, y escribir esa lista de memoria habría sido poco confiable: es muy fácil que a un humano (o a una IA escribiendo a mano) se le escape algún municipio, o escriba mal un nombre o un código.

En vez de eso, se usó una fuente pública en internet que ya tiene la lista oficial del DANE (el organismo del gobierno colombiano dueño de esos datos) en formato de datos (JSON), con el nombre y el código de cada municipio. Un script corto (escrito una sola vez, para esta tarea, y luego descartado) leyó ese archivo y generó automáticamente el archivo `colombia-geo.ts` completo, respetando el mismo formato que ya tenía el archivo original.

### 12.5 El control de calidad: comparar contra números conocidos

Antes de dar por buena la lista generada, se contó cuántos municipios quedaron por departamento y se comparó contra cifras oficiales conocidas (por ejemplo, se sabe que Antioquia tiene 125 municipios, Boyacá 123, Cundinamarca 116). Como los números coincidieron exactamente, eso dio confianza de que la fuente y la conversión fueron correctas. Esta es una técnica útil en general: cuando se genera una lista larga de datos automáticamente, buscar una cifra de control (un total conocido) para verificarla es más rápido y más confiable que revisar cada dato uno por uno.

### 12.6 De MAYÚSCULAS a formato título

Los nombres venían todos en mayúsculas en la fuente original (ej. "SAN JOSÉ DE LA MONTAÑA"), porque así los guarda el DANE en sus bases de datos oficiales. Para que se vean naturales en el sitio, se escribió una pequeña función que pone en mayúscula solo la primera letra de cada palabra, excepto un grupo de palabras "conectoras" (de, del, la, los, y) que quedan en minúscula cuando no son la primera palabra del nombre — igual que se escriben normalmente en español ("San José de la Montaña", no "San José De La Montaña").

---

## Parte 13 — Zona de venta y filtro de búsqueda combinado

### 13.1 "Origen" y "Zona de venta" son dos cosas distintas

Hasta ahora el producto solo tenía un dato geográfico: el **origen** (`originCity`/`originDepartment`), que responde a "¿de dónde ES este producto?" (dónde se fabrica o se produce). Este bloque agregó un segundo dato, independiente del primero: la **zona de venta** (`saleZone`), que responde a "¿A DÓNDE se puede vender/enviar?". Un producto puede ser de Bucaramanga (origen) y venderse en todo el país (zona de venta nacional), o puede ser de Bogotá y venderse solo en un par de municipios puntuales (zona de venta local). Son preguntas distintas y por eso son campos distintos en la base de datos.

La zona de venta tiene 3 valores posibles:
- **Nacional:** se consigue en cualquier parte de Colombia.
- **Internacional:** se consigue en Colombia y también fuera del país.
- **Local:** solo se vende en un municipio o un puñado de municipios concretos, que el dueño elige uno por uno en el panel (pueden ser de departamentos distintos entre sí, por ejemplo Bucaramanga y Bogotá al mismo tiempo).

### 13.2 Una tabla nueva para guardar "varios municipios por producto"

Un producto puede tener cero, uno o varios municipios de venta local. En una base de datos, cuando algo puede repetirse un número variable de veces, no se guarda como una sola columna: se crea una **tabla aparte** con una fila por cada municipio, y cada fila apunta al producto al que pertenece (`productId`). Esa tabla nueva se llama `ProductSaleMunicipality`. Así, un producto con 3 municipios de venta local simplemente tiene 3 filas en esa tabla, y un producto con 0 (porque su zona es "nacional") no tiene ninguna.

También se configuró para que, si se borra un producto, sus filas de municipios se borren automáticamente con él (`onDelete: Cascade`) — así nunca quedan filas "huérfanas" apuntando a un producto que ya no existe.

### 13.3 Regenerar el cliente de Prisma después de cambiar el esquema

Cuando se le agregan campos nuevos a `prisma/schema.prisma`, hay dos pasos separados (y los dos son necesarios):
1. **Aplicar la migración** (`npx prisma migrate dev`): cambia la base de datos de verdad (`dev.db`), agregando las columnas y tablas nuevas.
2. **Regenerar el cliente** (`npx prisma generate`): actualiza el código TypeScript autogenerado en `src/generated/prisma`, que es el que le "avisa" al editor y al compilador qué campos existen. Sin este segundo paso, la base de datos ya tiene los campos nuevos, pero el código todavía no los "conoce" y el proyecto no compila (aparece un error como "la propiedad `saleZone` no existe").

En este bloque el primer paso ya se había hecho en la sesión anterior, pero faltaba el segundo — por eso `npx tsc --noEmit` fallaba hasta que se corrió `npx prisma generate`.

### 13.4 El filtro de búsqueda ahora combina tres preguntas con "o"

Antes, cuando alguien elegía un departamento/municipio en el filtro de la tienda, el sitio solo mostraba productos cuyo **origen** coincidía con eso. Ahora el filtro combina tres preguntas distintas con un "o" (en programación esto se llama un operador **OR**): se muestra un producto si cumple **cualquiera** de estas tres condiciones:
1. Es de venta **nacional** (da igual el municipio elegido, porque de todas formas se consigue ahí).
2. Su **origen** coincide con el lugar elegido (la regla que ya existía).
3. Es de venta **local** y el lugar elegido está en su lista de municipios de venta.

Para armar esto en el código (`searchProducts` en `src/lib/catalog.ts`) hubo que reorganizar la función: el filtro de texto (buscar una palabra en el nombre/descripción) también usa un "o" interno (buscar en nombre en español, o en inglés, o en la descripción...), y en JavaScript no se pueden tener dos bloques "OR" distintos dentro del mismo objeto sin que uno pise al otro. La solución fue armar cada filtro (texto, geografía, categoría) como una pieza separada, y unir todas las piezas con un "y" (**AND**): "que cumpla el filtro de texto **Y** el filtro geográfico **Y** el filtro de categoría", donde el filtro geográfico por dentro tiene su propio "o" con los 3 casos de arriba.

### 13.5 Cómo se probó sin usar el navegador

Para confirmar que el filtro combinado funcionaba de verdad (y no solo que el código compilaba), se crearon 3 productos de prueba directo en la base de datos: uno de venta nacional con origen en una ciudad lejana, uno de venta local en Bucaramanga con origen en otra ciudad lejana, y uno de venta local en Medellín. Después se pidió la página de la tienda filtrada por Bucaramanga y se confirmó que aparecían los dos primeros pero no el tercero (y al revés, filtrando por Medellín). Esta es una forma rápida de probar la lógica del servidor sin depender de hacer clic manualmente en el navegador; los 3 productos de prueba se borraron apenas terminó la verificación, para no dejar datos falsos en el catálogo.

---

### Nuevos términos para el glosario (Parte 13)

- **OR / AND (operadores lógicos):** formas de combinar varias condiciones en una sola consulta. "OR" (o) significa que basta con que se cumpla una de las condiciones; "AND" (y) significa que se tienen que cumplir todas al mismo tiempo.
- **Migración vs. generar el cliente:** aplicar una migración cambia la base de datos real; generar el cliente actualiza el código que "sabe" qué forma tiene esa base de datos. Son dos pasos distintos y hay que hacer los dos después de cambiar el esquema de Prisma.
- **onDelete: Cascade:** una regla de la base de datos que dice "si se borra la fila principal (el producto), borra automáticamente también sus filas relacionadas (sus municipios de venta)", para que no queden datos sueltos sin dueño.

---

_Última actualización: Fase 3 completa — Parte 1 (login), Parte 2 (productos), Parte 3 (fotos) y Parte 4 (productor y margen), todas construidas y probadas. Pendiente definir con el dueño el alcance de la Fase 4 (reseñas y pasarela de pago)._
