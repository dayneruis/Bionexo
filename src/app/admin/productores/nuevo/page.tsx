import ProducerForm from "@/components/admin/ProducerForm";

export default function NuevoProductorPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-eco-forest">Nuevo productor</h1>
      <ProducerForm />
    </div>
  );
}
