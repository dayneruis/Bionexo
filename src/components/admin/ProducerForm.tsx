"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProductorExistente = {
  id: string;
  name: string;
  contactName: string;
  phone: string;
  email: string | null;
  notes: string | null;
};

// Formulario de creación y edición de productor. Igual patrón que ProductForm:
// se usa en /admin/productores/nuevo y en /admin/productores/[id]/editar.
export default function ProducerForm({ productor }: { productor?: ProductorExistente }) {
  const router = useRouter();
  const esEdicion = Boolean(productor);

  const [name, setName] = useState(productor?.name ?? "");
  const [contactName, setContactName] = useState(productor?.contactName ?? "");
  const [phone, setPhone] = useState(productor?.phone ?? "");
  const [email, setEmail] = useState(productor?.email ?? "");
  const [notes, setNotes] = useState(productor?.notes ?? "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      name,
      contactName,
      phone,
      email: email.trim() ? email.trim() : null,
      notes: notes.trim() ? notes.trim() : null,
    };

    try {
      const res = await fetch(
        esEdicion ? `/api/admin/producers/${productor!.id}` : "/api/admin/producers",
        {
          method: esEdicion ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? "No se pudo guardar el productor.");
        setLoading(false);
        return;
      }

      router.push("/admin/productores");
      router.refresh();
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <section className="rounded-2xl border border-eco-green/15 bg-white p-6">
        <h2 className="mb-1 font-bold text-eco-forest">Datos del productor</h2>
        <p className="mb-4 text-xs text-slate-400">
          Uso interno: esta información nunca se muestra en la tienda pública, solo sirve
          para contacto directo con el proveedor y reportes internos.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo label="Nombre del emprendimiento o razón social">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </Campo>
          <Campo label="Nombre de contacto">
            <input
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className={inputClass}
            />
          </Campo>
          <Campo label="Teléfono">
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </Campo>
          <Campo label="Correo (opcional)">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </Campo>
        </div>
        <div className="mt-4">
          <Campo label="Notas internas (opcional)">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className={inputClass}
            />
          </Campo>
        </div>
      </section>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-eco-green py-4 text-sm font-bold text-white shadow-lg hover:bg-eco-forest disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-10"
      >
        {loading ? "Guardando..." : esEdicion ? "Guardar cambios" : "Crear productor"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-eco-forest/20 bg-white px-4 py-2.5 text-sm focus:border-eco-green focus:outline-none focus:ring-2 focus:ring-eco-green/20";

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-eco-forest">{label}</label>
      {children}
    </div>
  );
}
