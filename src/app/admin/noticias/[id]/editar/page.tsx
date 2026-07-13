import { notFound } from "next/navigation";
import { getPostParaEditar } from "@/lib/admin-posts";
import PostForm from "@/components/admin/PostForm";

export default async function EditarPublicacionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostParaEditar(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-eco-forest">Editar publicación</h1>
      <PostForm
        post={{
          ...post,
          status: post.status as "publicado" | "borrador",
        }}
      />
    </div>
  );
}
