"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// Botones simples para cambiar entre español e inglés sin perder
// la página en la que el visitante está navegando.
export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={loc === locale}
          className={`rounded-full px-2 py-1 uppercase transition-colors ${
            loc === locale
              ? "bg-eco-forest text-white"
              : "text-eco-forest hover:bg-eco-lime/30"
          }`}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
