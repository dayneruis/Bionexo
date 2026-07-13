import PostForm from "@/components/admin/PostForm";

export default function NuevaPublicacionPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-eco-forest">Nueva publicación</h1>
      <PostForm />
    </div>
  );
}
