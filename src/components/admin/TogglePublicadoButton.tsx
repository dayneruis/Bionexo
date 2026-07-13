"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { EstadoPost } from "@/lib/admin-posts";

// Botón de acción rápida en el listado: cambia publicado/borrador sin tener
// que abrir el formulario completo de edición. Mismo patrón que
// ToggleDisponibleButton.tsx en el panel de productos.
export default function TogglePublicadoButton({
  postId,
  status,
}: {
  postId: string;
  status: EstadoPost;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const publicado = status === "publicado";

  async function handleClick() {
    setLoading(true);
    await fetch(`/api/admin/posts/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: publicado ? "borrador" : "publicado" }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={
        publicado
          ? "rounded-full border-2 border-amber-400 px-3 py-1 text-xs font-bold text-amber-600 hover:bg-amber-50 disabled:opacity-50"
          : "rounded-full border-2 border-eco-green px-3 py-1 text-xs font-bold text-eco-green hover:bg-eco-green/10 disabled:opacity-50"
      }
    >
      {publicado ? "Volver a borrador" : "Publicar"}
    </button>
  );
}
