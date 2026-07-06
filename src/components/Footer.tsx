import Image from "next/image";
import { useTranslations } from "next-intl";
import { CONTACTO_BIONEXO, CONTACTO_TU_BASURA_INNOVA } from "@/lib/contact-config";
import SellButton from "./SellButton";

// Pie de página con logo, datos de contacto y redes sociales.
export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-eco-green/20 bg-eco-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          {/* Los dos logos: Bionexo (tienda) y Tu Basura Innova (marca sombrilla) */}
          <div className="flex items-center gap-3">
            <Image
              src="/bionexo.png"
              alt="Bionexo"
              width={140}
              height={40}
              className="h-14 w-auto object-contain"
            />
            <Image
              src="/tubasurainnova.png"
              alt="Tu Basura Innova"
              width={140}
              height={40}
              className="h-14 w-auto object-contain"
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {t("about.umbrellaTitle")}: {t("brand.umbrella")}
          </p>
          {/* Contacto de ejemplo de Tu Basura Innova (placeholders a reemplazar) */}
          <p className="mt-3 text-xs font-bold text-eco-forest">{t("footer.umbrellaTitle")}</p>
          <p className="text-xs text-slate-500">{CONTACTO_TU_BASURA_INNOVA.email}</p>
          <p className="text-xs text-slate-500">
            Facebook: {CONTACTO_TU_BASURA_INNOVA.facebook} · Instagram: {CONTACTO_TU_BASURA_INNOVA.instagram}
          </p>
        </div>

        <div>
          <p className="font-bold text-eco-forest">{t("footer.contactTitle")}</p>
          <p className="mt-1 text-sm text-slate-600">{CONTACTO_BIONEXO.telefono}</p>
          <p className="text-sm text-slate-600">{CONTACTO_BIONEXO.email}</p>
          <SellButton className="mt-3 inline-flex rounded-full border-2 border-eco-green px-4 py-1.5 text-xs font-bold text-eco-green transition-colors hover:bg-eco-green hover:text-white" />
        </div>

        <div>
          <p className="font-bold text-eco-forest">{t("footer.addressTitle")}</p>
          <p className="mt-1 text-sm text-slate-600">{CONTACTO_BIONEXO.presencia}</p>
          <p className="mt-2 font-bold text-eco-forest">{t("footer.socialTitle")}</p>
          <p className="text-sm text-slate-600">
            Facebook: {CONTACTO_BIONEXO.facebook} · Instagram: {CONTACTO_BIONEXO.instagram}
          </p>
        </div>
      </div>

      <p className="border-t border-eco-green/20 px-4 py-3 text-center text-xs text-slate-400">
        © {year} {t("brand.name")}. {t("footer.rights")}
      </p>
    </footer>
  );
}
