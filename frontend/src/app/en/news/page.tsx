import { Calendar, ExternalLink } from "lucide-react";
import { getTranslation } from "@/lib/i18n";

const newsItems = [
  {
    id: 1,
    title: "New Website Launch",
    excerpt:
      "Launched my personal website built with Next.js 14 and deployed on Cloudflare Pages.",
    date: "2024-01-20",
    url: "https://www.notion.so/rihib/new-website-launch",
  },
  {
    id: 2,
    title: "Speaking at Tech Conference",
    excerpt:
      "Presented on 'Building Scalable Web Applications with TypeScript' at Tokyo Tech Conference.",
    date: "2024-01-18",
    url: "https://www.notion.so/rihib/tech-conference-2024",
  },
  {
    id: 3,
    title: "Open Source Contribution",
    excerpt:
      "Contributed to the Next.js documentation with improvements to the internationalization guide.",
    date: "2024-01-12",
    url: "https://www.notion.so/rihib/nextjs-contribution",
  },
];

export default function EnNewsPage() {
  const t = (key: keyof typeof import("@/lib/i18n").translations.en) =>
    getTranslation("en", key);

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