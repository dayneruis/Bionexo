import { notFound } from "next/navigation";
import { getPostParaEditar } from "@/lib/admin-posts";
import PostForm from "@/components/admin/PostForm";
import BackLink from "@/components/admin/BackLink";

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
      <BackLink href="/admin/noticias" label="Noticias" />
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
