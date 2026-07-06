"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border-2 border-white/40 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-white/10"
    >
      Salir
    </button>
  );
}
