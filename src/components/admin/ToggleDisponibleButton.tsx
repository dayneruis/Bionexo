"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Botón de acción rápida en el listado: cambia disponible/no disponible
// sin tener que abrir el formulario completo de edición.
export default function ToggleDisponibleButton({
  productId,
  available,
}: {
  productId: string;
  available: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await fetch(`/api/admin/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available: !available }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={
        available
          ? "rounded-full border-2 border-amber-400 px-3 py-1 text-xs font-bold text-amber-600 hover:bg-amber-50 disabled:opacity-50"
          : "rounded-full border-2 border-eco-green px-3 py-1 text-xs font-bold text-eco-green hover:bg-eco-green/10 disabled:opacity-50"
      }
    >
      {available ? "Dar de baja" : "Reactivar"}
    </button>
  );
}
