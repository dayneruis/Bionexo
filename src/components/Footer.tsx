import Image from "next/image";
import { useTranslations } from "next-intl";
import { CONTACTO_BIONEXO } from "@/lib/contact-config";

// Pie de página con logo, datos de contacto y redes sociales.
// Todos los datos de contacto vienen de contact-config.ts.
export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-eco-forest/10 bg-eco-forest/5">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <Image
            src="/bionexo.png"
            alt="Bionexo"
            width={140}
            height={40}
            className="h-9 w-auto object-contain"
          />
          <p className="mt-2 text-xs text-foreground/60">
            {t("about.umbrellaTitle")}: {t("brand.umbrella")}
          </p>
        </div>

        <div>
          <p className="font-semibold text-eco-forest">{t("footer.contactTitle")}</p>
          <p className="mt-1 text-sm text-foreground/80">{CONTACTO_BIONEXO.telefono}</p>
          <p className="text-sm text-foreground/80">{CONTACTO_BIONEXO.email}</p>
        </div>

        <div>
          <p className="font-semibold text-eco-forest">{t("footer.addressTitle")}</p>
          <p className="mt-1 text-sm text-foreground/80">{CONTACTO_BIONEXO.presencia}</p>
          <p className="mt-2 font-semibold text-eco-forest">{t("footer.socialTitle")}</p>
          <p className="text-sm text-foreground/80">
            Facebook: {CONTACTO_BIONEXO.facebook} · Instagram: {CONTACTO_BIONEXO.instagram}
          </p>
        </div>
      </div>

      <p className="border-t border-eco-forest/10 px-4 py-3 text-center text-xs text-foreground/60">
        © {year} {t("brand.name")}. {t("footer.rights")}
      </p>
    </footer>
  );
}
