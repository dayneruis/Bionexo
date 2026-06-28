// Cálculo del margen de intermediación de Bionexo por producto.
// SOLO para uso interno (reportes y panel admin de Fase 3).
// NUNCA exponer estos cálculos al cliente ni incluirlos en APIs públicas.

export type ResultadoMargen = {
  precioCop: number;          // Precio que paga el cliente (lo que está en BD)
  precioBaseProductor: number; // Lo que le queda al productor después del margen
  gananciaMargen: number;      // Lo que se queda Bionexo (margen de intermediación)
  porcentaje: number;          // Porcentaje aplicado
};

// Calcula cuánto le corresponde al productor y cuánto se queda Bionexo.
// El precio en COP ya incluye el margen; aquí se descompone hacia atrás.
// Ejemplo: precio = $100.000, margen = 5% → base productor = $95.238, ganancia = $4.762
export function calcularMargen(precioCop: number, margenPorcentaje: number): ResultadoMargen {
  const factor = 1 + margenPorcentaje / 100;
  const precioBaseProductor = Math.round(precioCop / factor);
  const gananciaMargen = precioCop - precioBaseProductor;

  return {
    precioCop,
    precioBaseProductor,
    gananciaMargen,
    porcentaje: margenPorcentaje,
  };
}

// Versión que trabaja directamente con un producto de Prisma.
// Acepta cualquier objeto que tenga priceCop y margin.
export function calcularMargenProducto(producto: { priceCop: number; margin: number }): ResultadoMargen {
  return calcularMargen(producto.priceCop, producto.margin);
}
