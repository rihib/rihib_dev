import { ArrowRight, Code, Palette, Server } from "lucide-react";
import { getTranslation } from "@/lib/i18n";
import Link from "next/link";

export default function JaHomePage() {
  const t = (key: keyof typeof import("@/lib/i18n").translations.en) =>
    getTranslation("ja", key);

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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <Code className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">フロントエンド</h3>
            <p className="text-gray-700 dark:text-gray-300">
              React, Next.js, TypeScript
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <Server className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">バックエンド</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Node.js, Hono, Cloudflare Workers
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <Palette className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">デザイン</h3>
            <p className="text-gray-700 dark:text-gray-300">
              TailwindCSS, UI/UX
            </p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/ja/profile"
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              詳しくはこちら
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/ja/news"
              className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              最新情報
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/ja/blog"
              className="inline-flex items-center px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              ブログを読む
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
