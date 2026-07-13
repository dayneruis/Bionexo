"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Borra una publicación de forma permanente, con una confirmación del
// navegador para evitar borrados accidentales (a diferencia de los productos,
// que solo se "dan de baja", aquí sí se pidió borrado real — ver CLAUDE.md).
export default function DeletePostButton({
  postId,
  titulo,
}: {
  postId: string;
  titulo: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!window.confirm(`¿Borrar la publicación "${titulo}"? Esta acción no se puede deshacer.`)) {
      return;
    }
    setLoading(true);
    await fetch(`/api/admin/posts/${postId}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="rounded-full border-2 border-red-300 px-3 py-1 text-xs font-bold text-red-500 hover:bg-red-50 disabled:opacity-50"
    >
      Borrar
    </button>
  );
}
