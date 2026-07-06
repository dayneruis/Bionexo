import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
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
  title: "Bionexo · Conecta · Transforma · Impacta",
  description:
    "Tienda en línea de productos de economía circular y materiales reciclados.",
};

// Layout raíz: valida el idioma de la URL, envuelve la app con los proveedores
// de traducciones y del carrito, y renderiza el encabezado, pie y cajón lateral.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          {/* CartProvider da acceso al estado del carrito a todos los componentes cliente */}
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            {/* CartDrawer vive aquí para cubrir toda la pantalla como overlay */}
            <CartDrawer />
            {/* Botón flotante de WhatsApp para consultas generales, en todas las páginas */}
            <WhatsAppFloatingButton />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
