import { NextResponse } from "next/server";
import { getTasaUsd } from "@/lib/exchange";

// Endpoint que devuelve la tasa de cambio COP→USD al cliente.
// Los componentes cliente (carrito, checkout) consultan aquí para mostrar USD.
export async function GET() {
  const usdPerCop = await getTasaUsd();
  return NextResponse.json({ usdPerCop });
}
