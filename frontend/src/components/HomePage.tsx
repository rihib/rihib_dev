import { ArrowRight, Code, Palette, Server } from "lucide-react";
import { getTranslation, type Locale } from "@/lib/i18n";
import Link from "next/link";
import CustomCard from "@/components/Card";
import { Button } from "@/components/ui/button";

interface HomePageProps {
  locale: Locale;
}

export default function HomePage({ locale }: HomePageProps) {
  const t = (key: keyof typeof import("@/lib/i18n").translations.en) =>
    getTranslation(locale, key);

  const basePath = locale === "ja" ? "/ja" : "/en";

  return (
    <main className="container mx-auto px-4 py-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            {t("home.title")}
          </h1>
          <p className="text-xl text-muted-foreground">{t("home.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <CustomCard
            icon={<Code className="w-12 h-12 text-blue-500" />}
            title={t("home.frontend")}
            description="React, Next.js, TypeScript"
          />
          <CustomCard
            icon={<Server className="w-12 h-12 text-green-500" />}
            title={t("home.backend")}
            description="Node.js, Hono, Cloudflare Workers"
          />
          <CustomCard
            icon={<Palette className="w-12 h-12 text-purple-500" />}
            title={t("home.design")}
            description="TailwindCSS, UI/UX"
          />
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-blue-500 hover:bg-blue-600">
              <Link href={`${basePath}/profile`}>
                {t("home.learnMore")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild className="bg-green-500 hover:bg-green-600">
              <Link href={`${basePath}/news`}>
                {t("home.latestNews")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild className="bg-purple-500 hover:bg-purple-600">
              <Link href={`${basePath}/blog`}>
                {t("home.readBlog")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
