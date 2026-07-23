import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Mientras no haya fotos reales de producto, usamos imágenes de relleno
      // (placeholders) servidas desde picsum.photos.
      { hostname: "picsum.photos" },
      // Fotos reales subidas desde el panel de administración (Cloudinary).
      { hostname: "res.cloudinary.com" },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
