import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import CartIcon from "./CartIcon";
import SellButton from "./SellButton";

// Encabezado principal: logo de Bionexo, navegación y carrito.
export default function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-10 border-b border-eco-green/30 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2">
        {/* Logo principal Bionexo — grande para que la marca resalte.
            Va dentro de un recuadro blanco propio porque el PNG tiene fondo
            claro opaco (no transparente): sin este recuadro, ese fondo se
            notaba como un rectángulo raro sobre el header. */}
        <Link href="/" className="flex items-center rounded-xl bg-white p-1.5 shadow-sm">
          <Image
            src="/bionexo.png"
            alt="Bionexo"
            width={240}
            height={72}
            className="h-14 w-auto object-contain sm:h-20"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-slate-700 sm:flex">
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

        <div className="flex items-center gap-3">
          <SellButton className="hidden rounded-full border-2 border-eco-green px-4 py-1.5 text-xs font-bold text-eco-green transition-colors hover:bg-eco-green hover:text-white sm:inline-flex" />
          <CartIcon />
          <LanguageSwitcher />
        </div>
      </div>

      {/* Navegación móvil */}
      <nav className="flex items-center gap-4 overflow-x-auto border-t border-eco-green/20 px-4 py-2 text-sm font-semibold text-slate-700 sm:hidden">
        <Link href="/" className="hover:text-eco-green">{t("nav.home")}</Link>
        <Link href="/tienda" className="hover:text-eco-green">{t("nav.shop")}</Link>
        <Link href="/sobre-nosotros" className="hover:text-eco-green">{t("nav.about")}</Link>
        <SellButton className="whitespace-nowrap rounded-full border-2 border-eco-green px-3 py-1 text-xs font-bold text-eco-green hover:bg-eco-green hover:text-white sm:hidden" />
      </nav>
    </header>
  );
}
