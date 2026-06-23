import { useTranslations } from "next-intl";

// Pie de página con datos de contacto y redes sociales de ejemplo
// (el cliente debe reemplazarlos por los datos reales del negocio).
export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-eco-forest/10 bg-eco-forest/5">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-eco-forest">{t("brand.name")}</p>
          <p className="text-sm text-eco-green">{t("brand.tagline")}</p>
          <p className="mt-2 text-xs text-foreground/60">
            {t("about.umbrellaTitle")}: {t("brand.umbrella")}
          </p>
        </div>

        <div>
          <p className="font-semibold text-eco-forest">{t("footer.contactTitle")}</p>
          <p className="text-sm text-foreground/80">{t("footer.phonePlaceholder")}</p>
          <p className="text-sm text-foreground/80">{t("footer.emailPlaceholder")}</p>
        </div>

        <div>
          <p className="font-semibold text-eco-forest">{t("footer.addressTitle")}</p>
          <p className="text-sm text-foreground/80">{t("footer.addressBody")}</p>
          <p className="mt-2 font-semibold text-eco-forest">{t("footer.socialTitle")}</p>
          <p className="text-sm text-foreground/80">Facebook · Instagram · WhatsApp (placeholders)</p>
        </div>
      </div>

      <p className="border-t border-eco-forest/10 px-4 py-3 text-center text-xs text-foreground/60">
        © {year} {t("brand.name")}. {t("footer.rights")}
      </p>
    </footer>
  );
}
