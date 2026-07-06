import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Panel de administración · Bionexo",
  robots: { index: false, follow: false },
};

// Layout raíz del panel de administración: vive FUERA de [locale] a propósito.
// Es una zona privada, solo en español, sin el Header/Footer/carrito de la
// tienda pública. La protección por sesión ocurre en src/middleware.ts.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-eco-cream">{children}</body>
    </html>
  );
}
