import ProducerForm from "@/components/admin/ProducerForm";
import BackLink from "@/components/admin/BackLink";

export default function NuevoProductorPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <BackLink href="/admin/productores" label="Productores" />
      <h1 className="mb-6 text-2xl font-bold text-eco-forest">Nuevo productor</h1>
      <ProducerForm />
    </div>
  );
}
