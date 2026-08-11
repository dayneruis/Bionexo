import PostForm from "@/components/admin/PostForm";
import BackLink from "@/components/admin/BackLink";

export default function NuevaPublicacionPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <BackLink href="/admin/noticias" label="Noticias" />
      <h1 className="mb-6 text-2xl font-bold text-eco-forest">Nueva publicación</h1>
      <PostForm />
    </div>
  );
}
