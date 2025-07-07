import { Calendar, ExternalLink } from "lucide-react";
import { getTranslation } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getBlogPosts } from "@/lib/db";

export default function BlogPage({ params }: { params: { locale: string } }) {
  const { locale } = params;

  if (!["en", "ja"].includes(locale)) {
    notFound();
  }

  const t = (key: keyof typeof import("@/lib/i18n").translations.en) =>
    getTranslation(locale as "en" | "ja", key);

  const blogPosts = getBlogPosts(locale);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {t("blog.title")}
        </h1>

        {blogPosts.length > 0 ? (
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
                    {post.published_at}
                  </div>
                </div>

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
        ) : (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {locale === "ja"
                  ? "まだブログ記事がありません。"
                  : "No blog posts available yet."}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
