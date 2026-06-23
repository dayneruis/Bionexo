import type { Product } from "@/generated/prisma/client";
import ProductCard from "./ProductCard";

// Grilla responsive de tarjetas de producto: 1 columna en celular,
// 2 en tablet y 3 en escritorio.
export default function ProductGrid({
  products,
  emptyMessage,
}: {
  products: Product[];
  emptyMessage?: string;
}) {
  if (products.length === 0) {
    return <p className="text-foreground/60">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
