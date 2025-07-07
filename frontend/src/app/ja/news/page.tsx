import { Calendar, ExternalLink } from "lucide-react";
import { getTranslation } from "@/lib/i18n";

const newsItems = [
  {
    id: 1,
    title: "新しいウェブサイトを公開",
    excerpt:
      "Next.js 14で構築し、Cloudflare Pagesにデプロイした個人ウェブサイトを公開しました。",
    date: "2024-01-20",
    url: "https://www.notion.so/rihib/new-website-launch",
  },
  {
    id: 2,
    title: "技術カンファレンスでの講演",
    excerpt:
      "東京テックカンファレンスで「TypeScriptによるスケーラブルなWebアプリケーション構築」について発表しました。",
    date: "2024-01-18",
    url: "https://www.notion.so/rihib/tech-conference-2024",
  },
  {
    id: 3,
    title: "オープンソースへの貢献",
    excerpt: "Next.jsの国際化ガイドの改善に関してドキュメントに貢献しました。",
    date: "2024-01-12",
    url: "https://www.notion.so/rihib/nextjs-contribution",
  },
];

export default function JaNewsPage() {
  const t = (key: keyof typeof import("@/lib/i18n").translations.en) =>
    getTranslation("ja", key);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {t("news.title")}
        </h1>

        <div className="space-y-6">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h2>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <Calendar size={16} className="mr-1" />
                  {item.date}
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {item.excerpt}
              </p>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors"
              >
                {t("news.readMore")}
                <ExternalLink size={16} className="ml-1" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
