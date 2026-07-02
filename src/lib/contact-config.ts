// Datos de contacto del ECOMMERCE Bionexo.
// TODOS los componentes del sitio que muestran teléfono, WhatsApp o redes
// deben leer de aquí. El dueño reemplaza los valores entre comillas por los datos reales.

export const CONTACTO_BIONEXO = {
  // Número de WhatsApp en formato internacional sin signos (57 = Colombia)
  whatsapp: "573000000000",
  email: "contacto@bionexo.example.com",
  telefono: "+57 300 000 0000",
  facebook: "bionexo",       // Solo el nombre de usuario, sin la URL completa
  instagram: "@bionexo",
  presencia: "Bucaramanga y área metropolitana · Bogotá D.C. · Envíos a toda Colombia",
};

// Datos de contacto de TU BASURA INNOVA (marca sombrilla), solo para mostrar
// como referencia en el pie de página. El dueño reemplaza estos placeholders
// por los datos reales cuando los tenga.
export const CONTACTO_TU_BASURA_INNOVA = {
  email: "contacto@tubasurainnova.example.com",
  facebook: "tubasurainnova",
  instagram: "@tubasurainnova",
};

// Arma el enlace de WhatsApp con el número del ecommerce y un mensaje dado.
export function whatsappUrl(mensaje: string): string {
  return `https://wa.me/${CONTACTO_BIONEXO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
