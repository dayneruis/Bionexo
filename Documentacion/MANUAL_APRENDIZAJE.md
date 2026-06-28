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

_Última actualización: Bloque pre-Fase 3 completado (marketplace, productor interno, margen, filtro geográfico, búsqueda, 10 categorías). Este documento crece con el proyecto._
