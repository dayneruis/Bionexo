import { getCategories } from "@/lib/catalog";
import ProductForm from "@/components/admin/ProductForm";

export default async function NuevoProductoPage() {
  const categorias = await getCategories();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-eco-forest">Nuevo producto</h1>
      <ProductForm categorias={categorias} />
    </div>
  );
}
