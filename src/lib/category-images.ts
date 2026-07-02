// Mapa slug de categoría → foto local (vive en public/categorias/).
// Fotos fijas por ahora; en la Fase 3 (panel admin) se podría permitir
// subir una imagen distinta por categoría desde la base de datos.
export const CATEGORY_IMAGES: Record<string, string> = {
  "materiales-recuperados": "/categorias/cat-materiales.jpg",
  "mobiliario-urbano": "/categorias/cat-mobiliario.jpg",
  "moda-sostenible": "/categorias/cat-moda.jpg",
  "aseo-hogar-ecologico": "/categorias/cat-aseo.jpg",
  "plantas-abonos": "/categorias/cat-plantas.jpg",
  "medicinas-comida-sana": "/categorias/cat-comida.jpg",
  "artesanias-accesorios": "/categorias/cat-artesanias.jpg",
  "empaques-desechables": "/categorias/cat-empaques.jpg",
  servicios: "/categorias/cat-servicios.jpg",
  "otros-productos": "/categorias/cat-otros.jpg",
};
