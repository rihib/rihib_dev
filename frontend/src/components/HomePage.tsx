import { ArrowRight, Code, Palette, Server } from "lucide-react";
import { getTranslation, type Locale } from "@/lib/i18n";
import Link from "next/link";
import Card from "@/components/Card";

interface HomePageProps {
  locale: Locale;
}

export default function HomePage({ locale }: HomePageProps) {
  const t = (key: keyof typeof import("@/lib/i18n").translations.en) =>
    getTranslation(locale, key);

  const basePath = locale === "ja" ? "/ja" : "/en";

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("home.title")}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t("home.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card
            icon={<Code className="w-12 h-12 text-blue-500" />}
            title={t("home.frontend")}
            description="React, Next.js, TypeScript"
          />
          <Card
            icon={<Server className="w-12 h-12 text-green-500" />}
            title={t("home.backend")}
            description="Node.js, Hono, Cloudflare Workers"
          />
          <Card
            icon={<Palette className="w-12 h-12 text-purple-500" />}
            title={t("home.design")}
            description="TailwindCSS, UI/UX"
          />
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`${basePath}/profile`}
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {t("home.learnMore")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href={`${basePath}/news`}
              className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              {t("home.latestNews")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href={`${basePath}/blog`}
              className="inline-flex items-center px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              {t("home.readBlog")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
