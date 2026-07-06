import { notFound } from "next/navigation";
import { getCategories } from "@/lib/catalog";
import { getProductoParaEditar } from "@/lib/admin-products";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditarProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [categorias, producto] = await Promise.all([
    getCategories(),
    getProductoParaEditar(id),
  ]);

  if (!producto) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-eco-forest">Editar producto</h1>
      <ProductForm
        categorias={categorias}
        producto={{
          ...producto,
          variants: producto.variants.map((v) => ({ type: v.type, value: v.value })),
        }}
      />
    </div>
  );
}
