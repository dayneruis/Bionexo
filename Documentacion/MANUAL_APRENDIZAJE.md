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

> Esta sección se completa cuando Claude Code proponga el "stack" (el conjunto
> de tecnologías). Por ahora dejamos el espacio listo. Cuando el agente elija,
> pídele que te explique **por qué** eligió cada una, y lo escribimos aquí.

| Capa | Tecnología elegida | ¿Para qué sirve? | ¿Por qué se eligió? |
|------|--------------------|------------------|---------------------|
| Frontend | _por definir_ | | |
| Backend | _por definir_ | | |
| Base de datos | _por definir_ | | |
| Idiomas (es/en) | _por definir_ | | |
| Conversión COP→USD | _por definir_ | | |

**Lo que ya sabemos de la base técnica:**
- Tienes **Node.js v22** instalado: es el "motor" que permite ejecutar
  herramientas modernas de desarrollo web en tu computador.
- El sitio será **a la medida** (no una plataforma cerrada tipo Shopify), así
  que tendremos control total del código.
- Probamos **siempre en local primero**, luego desplegamos.

---

## Parte 3 — La estructura de carpetas (el mapa del proyecto)

> Se completa cuando el agente cree la estructura. La idea es que entiendas qué
> guarda cada carpeta, como las habitaciones de una casa.

Ejemplo del tipo de estructura que verás (se ajustará al proyecto real):

```
D:\Eccomerce
│
├── CLAUDE.md              ← memoria del proyecto (la lee Claude Code)
├── Documentacion          ← este manual y otros documentos
│
├── (carpeta del frontend) ← lo que ve el usuario
├── (carpeta del backend)  ← la lógica del servidor
└── (configuración)        ← archivos que ajustan cómo corre todo
```

A medida que aparezcan carpetas reales, las explicamos aquí una por una.

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
| _(se irá llenando)_ | | |

---

## Parte 6 — Preguntas útiles para hacerle a Claude Code (y aprender)

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
- _(seguimos agregando términos a medida que aparezcan)_

---

_Última actualización: versión inicial. Este documento crece con el proyecto._
