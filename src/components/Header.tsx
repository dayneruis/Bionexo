import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import CartIcon from "./CartIcon";

// Encabezado principal: logo de Bionexo, navegación y carrito.
export default function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-10 border-b border-eco-green/30 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo principal Bionexo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/bionexo.png"
            alt="Bionexo"
            width={240}
            height={72}
            className="h-12 w-auto object-contain sm:h-16"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 sm:flex">
          <Link href="/" className="transition-colors hover:text-eco-green">
            {t("nav.home")}
          </Link>
          <Link href="/tienda" className="transition-colors hover:text-eco-green">
            {t("nav.shop")}
          </Link>
          <Link href="/sobre-nosotros" className="transition-colors hover:text-eco-green">
            {t("nav.about")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <CartIcon />
          <LanguageSwitcher />
        </div>
      </div>

      {/* Navegación móvil */}
      <nav className="flex items-center gap-4 overflow-x-auto border-t border-eco-green/20 px-4 py-2 text-sm font-semibold text-slate-700 sm:hidden">
        <Link href="/" className="hover:text-eco-green">{t("nav.home")}</Link>
        <Link href="/tienda" className="hover:text-eco-green">{t("nav.shop")}</Link>
        <Link href="/sobre-nosotros" className="hover:text-eco-green">{t("nav.about")}</Link>
      </nav>
    </header>
  );
}
