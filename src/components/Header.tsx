import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import CartIcon from "./CartIcon";

// Encabezado principal: logo de Bionexo (imagen real), navegación y carrito.
export default function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-10 border-b border-eco-forest/10 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        {/* Logo principal Bionexo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/bionexo.png"
            alt="Bionexo"
            width={160}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-eco-forest sm:flex">
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

        {/* Carrito + selector de idioma */}
        <div className="flex items-center gap-2">
          <CartIcon />
          <LanguageSwitcher />
        </div>
      </div>

      {/* Navegación móvil */}
      <nav className="flex items-center gap-4 overflow-x-auto border-t border-eco-forest/10 px-4 py-2 text-sm font-medium text-eco-forest sm:hidden">
        <Link href="/">{t("nav.home")}</Link>
        <Link href="/tienda">{t("nav.shop")}</Link>
        <Link href="/sobre-nosotros">{t("nav.about")}</Link>
      </nav>
    </header>
  );
}
