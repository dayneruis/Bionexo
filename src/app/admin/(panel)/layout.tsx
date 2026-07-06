import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

// Envoltorio de todas las páginas YA protegidas del panel (todo excepto
// /admin/login). El middleware garantiza que si se llega hasta aquí, hay
// una sesión válida — este layout no vuelve a comprobarla.
export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="flex items-center justify-between bg-eco-forest px-6 py-3 text-white">
        <Link href="/admin" className="font-bold">
          Panel Bionexo
        </Link>
        <LogoutButton />
      </header>
      <main className="flex-1 px-6 py-8">{children}</main>
    </div>
  );
}
