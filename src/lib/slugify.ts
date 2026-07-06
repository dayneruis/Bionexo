// Convierte un texto libre en un "slug" válido para URL: minúsculas, sin
// tildes ni caracteres especiales, palabras separadas por guiones.
// Ej: "Miel Orgánica 500g" -> "miel-organica-500g".
// Se usa tanto en el formulario del panel (sugerencia en vivo) como en el
// servidor (para garantizar que lo que se guarda en la base de datos sea
// siempre una URL válida, aunque el admin escriba el slug a mano).
export function slugify(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "") // quita tildes (acentos combinados tras normalize)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
