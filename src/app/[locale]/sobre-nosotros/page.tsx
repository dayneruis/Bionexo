import { getTranslations } from "next-intl/server";

// Página "Sobre nosotros": misión de Bionexo, su relación con Tu Basura Innova
// (marca sombrilla) y una explicación sencilla de la economía circular.
export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-eco-forest">{t("title")}</h1>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-eco-forest">{t("missionTitle")}</h2>
        <p className="mt-2 text-foreground/80">{t("missionBody")}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-eco-forest">{t("umbrellaTitle")}</h2>
        <p className="mt-2 text-foreground/80">{t("umbrellaBody")}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-eco-forest">{t("historyTitle")}</h2>
        <p className="mt-2 text-foreground/80">{t("historyBody")}</p>
      </section>
    </div>
  );
}
