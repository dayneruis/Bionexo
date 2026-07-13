# Checklist de pruebas de punta a punta — Bionexo

Antes de empezar: `npm run dev` y abre `http://localhost:3000` en el navegador.
Marca cada casilla a medida que pruebes. Si algo falla, anótalo para revisarlo antes de la Fase 4.

---

## 1. Tienda pública — portada y navegación

- [ ] `http://localhost:3000` redirige a `/es` (español por defecto).
- [ ] Se ve el logo de Bionexo, el menú (Inicio, Tienda, Sobre nosotros) y el botón "Vender en Bionexo".
- [ ] Aparece el banner "portada de marca" completo, sin recortes raros.
- [ ] El buscador grande (mosaico de fotos) funciona: escribe algo y presiona buscar → te lleva a `/es/tienda?q=...`.
- [ ] Los 4 botones de búsqueda rápida (Cartón, Plástico reciclado, Moda sostenible, Abono orgánico) funcionan.
- [ ] Se ve la sección "¿Qué es Bionexo?" con los 5 íconos.
- [ ] Se ve la tirilla de valores (imagen horizontal).
- [ ] Se ven los productos destacados (actualmente 9: revisar con el dueño si se debe ajustar el rango de 5–8 de la sección 5 de CLAUDE.md).
- [ ] El botón flotante verde de WhatsApp (abajo a la derecha) aparece en todas las páginas y abre WhatsApp con un mensaje de consulta general.

## 2. Catálogo por categorías (las 10)

Entra a cada una desde `/es/categoria/<slug>` y confirma que carga, muestra la foto de portada de la categoría y lista productos:

- [ ] `materiales-recuperados` — Materiales recuperados
- [ ] `mobiliario-urbano` — Mobiliario urbano y de construcción
- [ ] `moda-sostenible` — Moda sostenible
- [ ] `aseo-hogar-ecologico` — Aseo y hogar ecológico
- [ ] `plantas-abonos` — Plantas y abonos
- [ ] `medicinas-comida-sana` — Medicinas y comida sana
- [ ] `artesanias-accesorios` — Artesanías y accesorios
- [ ] `empaques-desechables` — Empaques y desechables ecológicos
- [ ] `servicios` — Servicios
- [ ] `otros-productos` — Otros productos

También:
- [ ] `/es/tienda` muestra el catálogo general con las 10 categorías juntas.

## 3. Filtro geográfico (`GeoFilter`)

En `/es/tienda` o en cualquier categoría:
- [ ] El filtro por departamento aparece y lista los 32 departamentos + Bogotá D.C.
- [ ] Elegir un departamento filtra los productos y actualiza la URL (`?depto=...`).
- [ ] Elegir un municipio dentro del departamento sigue filtrando bien (`?depto=&mpio=`).
- [ ] La opción de origen internacional (`?origen=internacional`) muestra productos de origen internacional Y productos con zona de venta "internacional".
- [ ] Quitar el filtro vuelve a mostrar todos los productos.
- [ ] Al elegir un departamento/municipio, el filtro combina 3 cosas (deben aparecer todas): productos de venta **nacional** (se venden en todo el país), productos cuyo **origen** coincide con lo elegido, y productos de venta **local** que incluyen ese municipio en su lista.

## 4. Ficha de producto

- [ ] Al entrar a un producto (`/es/producto/<slug>`) se ven: foto, nombre, precio en COP, precio aproximado en USD, disponibilidad, origen (ciudad/departamento o país), garantía si aplica, variantes si tiene.
- [ ] El botón **"Agregar al carrito"** funciona (abre o actualiza el carrito).
- [ ] El botón **"Me interesa / Contáctame"** abre WhatsApp con el nombre del producto en el mensaje.
- [ ] Un producto marcado "No disponible" se ve igual pero con la etiqueta de no disponible (no desaparece del catálogo).

## 5. Carrito (`CartDrawer`)

- [ ] Al agregar productos, el ícono del carrito en el header muestra la cantidad.
- [ ] Abrir el carrito muestra los productos agregados, cantidades y subtotal.
- [ ] Se puede aumentar/quitar cantidad o eliminar un producto del carrito.
- [ ] El carrito persiste si recargas la página (usa `localStorage`).
- [ ] Botón **"Hacer mi pedido por WhatsApp"**: abre WhatsApp con la lista completa de productos, cantidades y total.
- [ ] Botón **"Ir al pedido"** lleva a `/es/checkout`.

## 6. Checkout y envío

En `/es/checkout`:
- [ ] Se ve el resumen del carrito y el formulario de datos del comprador (nombre, correo, teléfono, ciudad, dirección).
- [ ] El calculador de envío da un costo según la ciudad/zona de destino elegida.
- [ ] Si hay productos de distintas ciudades de origen, el envío se calcula sumando zona por zona (no de un solo origen).
- [ ] Botón **"Hacer mi pedido por WhatsApp"** también está disponible aquí.
- [ ] Al confirmar el pedido, te lleva a `/es/pedido-confirmado` con el resumen y un enlace de WhatsApp con todos los datos del pedido.
- [ ] No pide contraseña ni registro complicado (solo datos mínimos, como está planeado para esta fase).

## 7. Conversión de moneda (COP → USD)

- [ ] En la ficha de producto y en el checkout se ve el precio aproximado en USD junto al de COP.
- [ ] Si apagas internet un momento y recargas, el sitio no se rompe (debe usar la tasa de respaldo si la API externa falla).

## 8. Idiomas (es/en)

- [ ] El botón de idioma en el header cambia de `/es/...` a `/en/...` y viceversa, manteniendo la misma página (ej: si estabas en una categoría, sigues en esa categoría pero en inglés).
- [ ] En inglés, los textos fijos del sitio (menú, botones, "Sobre nosotros", etc.) están traducidos.
- [ ] En inglés, los nombres y descripciones de categorías y productos también cambian (vienen de la base de datos).
- [ ] Los precios y el cálculo de envío funcionan igual en ambos idiomas.

## 9. Página "Sobre nosotros"

- [ ] Carga con el hero verde y el logo de Bionexo dentro de su tarjeta blanca (sin recuadro raro).
- [ ] Se ven las estadísticas, misión y meta.
- [ ] Se ve la fila de 9 cuadros de ODS en tonos verdes y, debajo, el cartel oficial de los 17 ODS.
- [ ] Se ve la sección de Tu Basura Innova con su logo.

## 10. Footer

- [ ] Se ven los dos logos (Bionexo y Tu Basura Innova).
- [ ] Datos de contacto de Bionexo y de Tu Basura Innova visibles.
- [ ] Botón "Vender en Bionexo" funciona también desde aquí.

---

## 11. Panel de administración — acceso

- [ ] `http://localhost:3000/admin` sin haber iniciado sesión te redirige a `/admin/login`.
- [ ] En `/admin/login`, usuario `admin` y contraseña `bionexo-temporal-2026` entran correctamente.
- [ ] Una contraseña incorrecta muestra un mensaje de error y no deja pasar.
- [ ] Ya adentro, ves "Bienvenido al panel..." con tu usuario, y dos accesos: "Productos" y "Productores".
- [ ] El botón "Salir" cierra la sesión y te devuelve a `/admin/login`.

## 12. Panel — gestión de productos

- [ ] `/admin/productos` lista todos los productos (disponibles y no disponibles), con buscador por nombre.
- [ ] "+ Nuevo producto" abre el formulario vacío; se puede llenar y crear un producto de prueba.
- [ ] El slug se sugiere solo a partir del nombre en español, y se puede editar a mano.
- [ ] Si repites un slug que ya existe, el sitio avisa con un mensaje claro (no deja crear el duplicado).
- [ ] "Editar" en un producto existente precarga todos sus datos correctamente.
- [ ] El botón rápido "Dar de baja" / "Reactivar" en el listado cambia el estado sin abrir el formulario completo.
- [ ] Un producto dado de baja sigue viéndose en la tienda pública, pero marcado "No disponible" (no se oculta ni se borra).
- [ ] En el formulario, la sección "Zona de venta" deja elegir Nacional / Internacional / Local. Al elegir "Local" aparece el selector de departamento + municipio y el botón "+ Agregar"; se pueden agregar varios municipios (incluso de departamentos distintos) y quitarlos con la "✕".
- [ ] Si eliges "Local" y no agregas ningún municipio, el formulario avisa y no deja guardar.
- [ ] Al editar un producto que ya tiene zona de venta "Local" con municipios, el formulario los precarga correctamente.

## 13. Panel — subida de fotos

- [ ] En el formulario de producto, al elegir un archivo de foto (JPG/PNG/WEBP/GIF) desde el computador, se sube solo y aparece la vista previa.
- [ ] Subir un archivo que no sea imagen (por ejemplo un `.txt` o `.pdf`) da un mensaje de error claro y no se sube.
- [ ] Subir una imagen muy pesada (más de 5 MB) también da un mensaje de error claro.
- [ ] Después de guardar el producto, la foto subida se ve en el listado del panel y en la ficha pública del producto.
- [ ] El campo de "pegar URL" sigue funcionando como alternativa si no subes archivo.

## 14. Panel — productores y margen

- [ ] `/admin/productores` lista los productores existentes (deberían verse los 5 de ejemplo del catálogo: EcoMedellín SAS, Artesanías del Pacífico, BioHuerta Bogotá, Moda Verde Cali, NaturalMente Bucaramanga).
- [ ] "+ Nuevo productor" crea uno con nombre, contacto, teléfono, correo y notas.
- [ ] "Editar" precarga los datos de un productor y guarda bien los cambios.
- [ ] En el formulario de producto, la sección "Datos internos" deja elegir un productor de la lista (o "Sin productor asignado") y escribir un margen.
- [ ] El campo de margen NO deja escribir un número menor a 3 o mayor a 10 (el navegador lo bloquea de una vez).

## 15. Confirmación de privacidad (lo más importante de revisar con calma)

- [ ] Abre en el navegador la ficha pública de un producto que sí tiene productor y margen asignados en el panel.
- [ ] Usa "Ver código fuente de la página" (Ctrl+U) o el buscador del navegador (Ctrl+F) y busca el nombre del productor, su teléfono, o la palabra "margin"/"margen" en los datos — no debe aparecer en ninguna parte del HTML visible al cliente.
- [ ] Confirma que esos datos (productor y margen) solo se ven dentro de `/admin`, con sesión iniciada.

---

### Al terminar

Si encuentras algo que falla o se ve distinto a lo esperado, anótalo (página, qué pasó, qué esperabas) y lo revisamos antes de seguir con la Fase 4.
