import Link from "next/link";

// Enlace pequeño de "Volver" para las pantallas de crear/editar del panel,
// ya que esas pantallas no tienen otra forma de regresar al listado sin usar
// el botón "atrás" del navegador. Mismo patrón visual que "common.back" en el
// sitio público (texto pequeño con flecha, no un botón grande).
export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mb-4 inline-block text-sm text-eco-cyan hover:underline"
    >
      ← Volver a {label}
    </Link>
  );
}
