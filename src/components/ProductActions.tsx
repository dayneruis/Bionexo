"use client";

import { useState } from "react";
import type { Variant } from "@/generated/prisma/client";
import VariantSelector from "./VariantSelector";
import ContactButtons from "./ContactButtons";

export type ProductForCart = {
  id: string;
  slug: string;
  nameEs: string;
  nameEn: string;
  priceCop: number;
  imageUrl: string;
  originCity: string;
};

// Componente cliente que envuelve el selector de variantes y los botones
// de acción para compartir la variante seleccionada entre ambos sin
// necesidad de prop drilling hacia arriba en la página de producto.
export default function ProductActions({
  product,
  variants,
}: {
  product: ProductForCart;
  variants: Variant[];
}) {
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();

  return (
    <>
      <VariantSelector
        variants={variants}
        selected={selectedVariant}
        onSelect={setSelectedVariant}
      />
      <div className="mt-4">
        <ContactButtons product={product} selectedVariant={selectedVariant} />
      </div>
    </>
  );
}
