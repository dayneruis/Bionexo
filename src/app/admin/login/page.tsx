import Image from "next/image";
import LoginForm from "@/components/admin/LoginForm";

// Página pública dentro de /admin: es la única ruta que el middleware deja
// pasar sin sesión (ver src/middleware.ts), porque es la que crea la sesión.
export default function AdminLoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-eco-green/10 bg-white p-8 shadow-md">
        <div className="mb-6 flex justify-center">
          <Image src="/bionexo.png" alt="Bionexo" width={160} height={48} className="h-12 w-auto object-contain" />
        </div>
        <h1 className="mb-6 text-center text-lg font-bold text-eco-forest">
          Panel de administración
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
