import { Calendar, ExternalLink } from "lucide-react";
import { getTranslation } from "@/lib/i18n";

const blogPosts = [
  {
    id: 1,
    title: "Next.js 14 入門",
    excerpt:
      "Next.js 14と最新機能を使ったモダンなWebアプリケーションの構築方法を学ぼう。",
    date: "2024-01-15",
    url: "https://qiita.com/rihib/items/nextjs14-getting-started",
  },
  {
    id: 2,
    title: "TypeScriptベストプラクティス",
    excerpt:
      "堅牢なアプリケーションを構築するためのTypeScriptの重要なパターンと実践方法。",
    date: "2024-01-10",
    url: "https://qiita.com/rihib/items/typescript-best-practices",
  },
  {
    id: 3,
    title: "Cloudflare Workers with Hono",
    excerpt:
      "Cloudflare Workers上でHonoフレームワークを使ったサーバーレスAPIの構築。",
    date: "2024-01-05",
    url: "https://qiita.com/rihib/items/cloudflare-workers-hono",
  },
];

export default function JaBlogPage() {
  const t = (key: keyof typeof import("@/lib/i18n").translations.en) =>
    getTranslation("ja", key);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {t("blog.title")}
        </h1>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {post.title}
                </h2>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <Calendar size={16} className="mr-1" />
                  {post.date}
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {post.excerpt}
              </p>

              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors"
              >
                {t("blog.readMore")}
                <ExternalLink size={16} className="ml-1" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
