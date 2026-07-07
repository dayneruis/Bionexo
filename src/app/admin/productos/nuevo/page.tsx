import { getCategories } from "@/lib/catalog";
import { listarProductores } from "@/lib/producer";
import ProductForm from "@/components/admin/ProductForm";

export default async function NuevoProductoPage() {
  const [categorias, productores] = await Promise.all([getCategories(), listarProductores()]);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-eco-forest">Nuevo producto</h1>
      <ProductForm categorias={categorias} productores={productores} />
    </div>
  );
}
