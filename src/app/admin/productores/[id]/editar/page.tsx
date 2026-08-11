import { notFound } from "next/navigation";
import { getProductorParaEditar } from "@/lib/producer";
import ProducerForm from "@/components/admin/ProducerForm";
import BackLink from "@/components/admin/BackLink";

export default async function EditarProductorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productor = await getProductorParaEditar(id);

  if (!productor) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <BackLink href="/admin/productores" label="Productores" />
      <h1 className="mb-6 text-2xl font-bold text-eco-forest">Editar productor</h1>
      <ProducerForm productor={productor} />
    </div>
  );
}
