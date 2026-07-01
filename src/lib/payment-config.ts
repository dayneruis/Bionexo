// ══════════════════════════════════════════════════════════════════════════════
// CONFIGURACIÓN DE PASARELA DE PAGO — PLACEHOLDER PARA FASE 4
// ══════════════════════════════════════════════════════════════════════════════
//
// Este archivo centraliza todos los parámetros de la pasarela colombiana.
// En Fase 4 el dueño elige un proveedor (Wompi, PayU o ePayco), obtiene sus
// credenciales y reemplaza los valores de ejemplo por los reales.
//
// CÓMO CONECTAR LA PASARELA:
//   1. Elegir proveedor en PAYMENT_PROVIDER (abajo).
//   2. Crear una cuenta en el portal del proveedor y obtener las claves.
//   3. Reemplazar PUBLIC_KEY y SECRET_KEY con las claves reales.
//   4. Cambiar MODE a "production" cuando el negocio esté listo para cobrar.
//   5. En src/components/CheckoutForm.tsx buscar el comentario
//      "PUNTO DE INTEGRACIÓN PASARELA" e insertar el widget del proveedor.
//   6. Configurar el webhook real en src/app/api/payment/webhook/route.ts.
//
// PROVEEDORES COLOMBIANOS RECOMENDADOS:
//   • Wompi  → https://docs.wompi.co  (comisión ~2.95% + IVA)
//   • PayU   → https://developers.payulatam.com  (comisión variable)
//   • ePayco → https://epayco.com  (comisión ~2.99% + IVA)
// ══════════════════════════════════════════════════════════════════════════════

export type ProveedorPago = "wompi" | "payu" | "epayco";

export const PAYMENT_CONFIG = {
  // Proveedor elegido. Cambiar cuando se integre en Fase 4.
  PAYMENT_PROVIDER: "wompi" as ProveedorPago,

  // Modo de operación: "test" usa el entorno de pruebas sin cobros reales.
  MODE: "test" as "test" | "production",

  // Clave pública (va en el frontend): la proporciona el proveedor.
  PUBLIC_KEY: "pub_test_REEMPLAZAR_CON_CLAVE_REAL",

  // Clave secreta (solo en servidor / variables de entorno): NUNCA exponer al cliente.
  // En producción, leer de process.env.PAYMENT_SECRET_KEY en lugar de hardcodear.
  SECRET_KEY: "prv_test_REEMPLAZAR_CON_CLAVE_REAL",

  // URL base del ecommerce (para callbacks y redirecciones del proveedor).
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",

  // Ruta del webhook que el proveedor llama al confirmar un pago.
  WEBHOOK_PATH: "/api/payment/webhook",

  // Moneda principal del ecommerce.
  CURRENCY: "COP",
} as const;
