import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    // Mientras no haya fotos reales de producto, usamos imágenes de relleno
    // (placeholders) servidas desde picsum.photos.
    remotePatterns: [{ hostname: "picsum.photos" }],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
