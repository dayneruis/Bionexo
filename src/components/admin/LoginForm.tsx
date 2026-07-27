"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Formulario de inicio de sesión del panel. Es un componente aparte (no en la
// misma página) porque necesita estado de React (usuario, contraseña, error).
export default function LoginForm() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState<string | null>(null);
  // ── DEPURACIÓN TEMPORAL (quitar junto con el resto del bloque "debug") ──
  const [debug, setDebug] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDebug(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string; debug?: unknown };
        setError(data.error ?? "No se pudo iniciar sesión.");
        setDebug(data.debug ?? null);
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="usuario" className="mb-1.5 block text-sm font-semibold text-eco-forest">
          Usuario
        </label>
        <input
          id="usuario"
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
          autoFocus
          className="w-full rounded-xl border border-eco-forest/20 bg-white px-4 py-3 text-sm focus:border-eco-green focus:outline-none focus:ring-2 focus:ring-eco-green/20"
        />
      </div>

      <div>
        <label htmlFor="contrasena" className="mb-1.5 block text-sm font-semibold text-eco-forest">
          Contraseña
        </label>
        <input
          id="contrasena"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
          className="w-full rounded-xl border border-eco-forest/20 bg-white px-4 py-3 text-sm focus:border-eco-green focus:outline-none focus:ring-2 focus:ring-eco-green/20"
        />
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* ── DEPURACIÓN TEMPORAL: quitar este bloque junto con `debug` arriba ── */}
      {debug !== null && debug !== undefined && (
        <pre className="overflow-x-auto rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          {JSON.stringify(debug, null, 2)}
        </pre>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full rounded-full bg-eco-green py-3.5 text-sm font-bold text-white shadow-lg hover:bg-eco-forest disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
