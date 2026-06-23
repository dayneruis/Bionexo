import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

// Encabezado del sitio: logo, navegación principal y selector de idioma.
export default function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-10 border-b border-eco-forest/10 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-eco-forest">
            {t("brand.name")}
          </span>
          <span className="text-xs text-eco-green">{t("brand.tagline")}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-eco-forest sm:flex">
          <Link href="/" className="hover:text-eco-green">
            {t("nav.home")}
          </Link>
          <Link href="/tienda" className="hover:text-eco-green">
            {t("nav.shop")}
          </Link>
          <Link href="/sobre-nosotros" className="hover:text-eco-green">
            {t("nav.about")}
          </Link>
        </nav>

        <LanguageSwitcher />
      </div>

      <nav className="flex items-center gap-4 overflow-x-auto border-t border-eco-forest/10 px-4 py-2 text-sm font-medium text-eco-forest sm:hidden">
        <Link href="/">{t("nav.home")}</Link>
        <Link href="/tienda">{t("nav.shop")}</Link>
        <Link href="/sobre-nosotros">{t("nav.about")}</Link>
      </nav>
    </header>
  );
}
