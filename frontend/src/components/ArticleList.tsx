import { Calendar, ExternalLink } from "lucide-react";
import type { Article } from "@/lib/db";

interface ArticleListProps {
  articles: Article[];
  readMoreText: string;
  emptyMessage: string;
}

export default function ArticleList({
  articles,
  readMoreText,
  emptyMessage,
}: ArticleListProps) {
  return (
    <>
      {articles.length > 0 ? (
        <div className="space-y-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {article.title}
                </h2>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <Calendar size={16} className="mr-1" />
                  {article.published_at}
                </div>
              </div>

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors"
              >
                {readMoreText}
                <ExternalLink size={16} className="ml-1" />
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {emptyMessage}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
