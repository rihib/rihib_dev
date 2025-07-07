import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import DarkModeToggle from "./DarkModeToggle";
import { getTranslation, type Locale } from "@/lib/i18n";

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const t = (key: keyof typeof import("@/lib/i18n").translations.en) =>
    getTranslation(locale, key);
  const basePath = locale === "ja" ? "/ja" : "";

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href={basePath || "/"}
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            rihib.dev
          </Link>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href={basePath || "/"}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {t("nav.home")}
              </Link>
              <Link
                href={`${basePath}/blog`}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {t("nav.blog")}
              </Link>
              <Link
                href={`${basePath}/news`}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {t("nav.news")}
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              <LanguageToggle />
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
