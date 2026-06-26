import { getTranslations } from "next-intl/server";
import CheckoutForm from "@/components/CheckoutForm";

// Página de checkout: muestra el formulario de confirmación del pedido.
// El formulario es un componente cliente porque lee el carrito de localStorage.
export default async function CheckoutPage() {
  const t = await getTranslations();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold text-eco-forest">
        {t("checkout.title")}
      </h1>
      <CheckoutForm />
    </div>
  );
}
