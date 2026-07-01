import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// Página "Sobre nosotros": historia, misión, estadísticas de impacto
// y relación con la marca sombrilla Tu Basura Innova.
export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">

      {/* ── Hero de la página ── */}
      <div className="mb-12 overflow-hidden rounded-3xl bg-eco-forest px-8 py-14 text-center text-white sm:px-16">
        <Image
          src="/bionexo.png"
          alt="Bionexo"
          width={200}
          height={60}
          className="mx-auto mb-6 h-14 w-auto object-contain brightness-0 invert"
        />
        <h1 className="text-3xl font-extrabold sm:text-4xl">{t("tagline")}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
          {t("intro")}
        </p>
      </div>

      {/* ── Origen ── */}
      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-eco-forest">{t("originTitle")}</h2>
        <p className="text-foreground/80 leading-relaxed">{t("originBody")}</p>
      </section>

      {/* ── Qué encuentras ── */}
      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-eco-forest">{t("productsTitle")}</h2>
        <p className="text-foreground/80 leading-relaxed">{t("productsBody")}</p>
      </section>

      {/* ── Por qué importa: estadísticas ── */}
      <section className="mb-10 rounded-2xl border border-eco-forest/10 bg-eco-forest/5 p-8">
        <h2 className="mb-6 text-xl font-bold text-eco-forest">{t("whyTitle")}</h2>
        <div className="mb-6 grid gap-6 sm:grid-cols-3">
          <div className="text-center">
            <p className="text-4xl font-extrabold text-eco-green">{t("whyStat1Value")}</p>
            <p className="mt-1 text-sm text-foreground/70">{t("whyStat1Label")}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-extrabold text-eco-green">{t("whyStat2Value")}</p>
            <p className="mt-1 text-sm text-foreground/70">{t("whyStat2Label")}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-extrabold text-eco-green">{t("whyStat3Value")}</p>
            <p className="mt-1 text-sm text-foreground/70">{t("whyStat3Label")}</p>
          </div>
        </div>
        <p className="text-foreground/80 leading-relaxed">{t("whyBody")}</p>
        <p className="mt-2 text-xs text-foreground/40 italic">{t("whySource")}</p>
      </section>

      {/* ── Misión ── */}
      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-eco-forest">{t("missionTitle")}</h2>
        <p className="text-foreground/80 leading-relaxed">{t("missionBody")}</p>
      </section>

      {/* ── Meta ── */}
      <section className="mb-12">
        <h2 className="mb-3 text-xl font-bold text-eco-forest">{t("goalTitle")}</h2>
        <p className="text-foreground/80 leading-relaxed">{t("goalBody")}</p>
      </section>

      {/* ── Tu Basura Innova (marca sombrilla) ── */}
      <section className="mb-12 flex flex-col gap-6 rounded-2xl border border-eco-cyan/20 bg-eco-cyan/5 p-8 sm:flex-row sm:items-center">
        <div className="flex shrink-0 justify-center">
          <Image
            src="/tubasurainnova.png"
            alt="Tu Basura Innova"
            width={160}
            height={80}
            className="h-20 w-auto object-contain"
          />
        </div>
        <div>
          <h2 className="mb-2 text-xl font-bold text-eco-forest">{t("umbrellaTitle")}</h2>
          <p className="text-foreground/80 leading-relaxed">{t("umbrellaBody")}</p>
        </div>
      </section>

      {/* ── Cierre / llamada a la acción ── */}
      <div className="rounded-2xl bg-eco-forest px-8 py-10 text-center text-white">
        <p className="text-xl font-semibold italic">"{t("cta")}"</p>
        <Link
          href="/tienda"
          className="mt-6 inline-block rounded-full bg-white px-8 py-3 text-sm font-bold text-eco-forest hover:bg-eco-lime/80"
        >
          Explorar la tienda →
        </Link>
      </div>

    </div>
  );
}
