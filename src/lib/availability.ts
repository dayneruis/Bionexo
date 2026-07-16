// Calcula si un producto se muestra como "Disponible" al público.
//
// Además del interruptor manual `available` (que el admin prende/apaga desde
// el panel), ahora también se considera el stock: si las unidades llegan a 0,
// el producto se muestra como no disponible aunque `available` siga en true.
// El interruptor no se cambia solo; esto solo afecta lo que ve el cliente.
export function esDisponiblePublico(producto: { available: boolean; stock: number }): boolean {
  return producto.available && producto.stock > 0;
}
