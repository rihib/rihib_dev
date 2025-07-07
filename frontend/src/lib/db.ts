import Database from "better-sqlite3";
import { join } from "path";

const DB_PATH = join(process.cwd(), "data", "app.db");

export const db = new Database(DB_PATH);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    date TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('blog', 'news')),
    locale TEXT NOT NULL DEFAULT 'en',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Insert initial data if table is empty
const articleCount = db
  .prepare("SELECT COUNT(*) as count FROM articles")
  .get() as { count: number };

if (articleCount.count === 0) {
  const insertArticle = db.prepare(`
    INSERT INTO articles (title, excerpt, date, url, type, locale)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  // English blog posts
  insertArticle.run(
    "Getting Started with Next.js 14",
    "Learn how to build modern web applications with Next.js 14 and its latest features.",
    "2024-01-15",
    "https://qiita.com/rihib/items/nextjs14-getting-started",
    "blog",
    "en",
  );

  insertArticle.run(
    "TypeScript Best Practices",
    "Essential TypeScript patterns and practices for building robust applications.",
    "2024-01-10",
    "https://qiita.com/rihib/items/typescript-best-practices",
    "blog",
    "en",
  );

  insertArticle.run(
    "Cloudflare Workers with Hono",
    "Building serverless APIs with Hono framework on Cloudflare Workers.",
    "2024-01-05",
    "https://qiita.com/rihib/items/cloudflare-workers-hono",
    "blog",
    "en",
  );

  // Japanese blog posts
  insertArticle.run(
    "Next.js 14 入門",
    "Next.js 14と最新機能を使ったモダンなWebアプリケーションの構築方法を学ぼう。",
    "2024-01-15",
    "https://qiita.com/rihib/items/nextjs14-getting-started",
    "blog",
    "ja",
  );

  insertArticle.run(
    "TypeScriptベストプラクティス",
    "堅牢なアプリケーションを構築するためのTypeScriptの重要なパターンと実践方法。",
    "2024-01-10",
    "https://qiita.com/rihib/items/typescript-best-practices",
    "blog",
    "ja",
  );

  insertArticle.run(
    "Cloudflare Workers with Hono",
    "Cloudflare Workers上でHonoフレームワークを使ったサーバーレスAPIの構築。",
    "2024-01-05",
    "https://qiita.com/rihib/items/cloudflare-workers-hono",
    "blog",
    "ja",
  );

  // English news items
  insertArticle.run(
    "New Website Launch",
    "Launched my personal website built with Next.js 14 and deployed on Cloudflare Pages.",
    "2024-01-20",
    "https://www.notion.so/rihib/new-website-launch",
    "news",
    "en",
  );

  insertArticle.run(
    "Speaking at Tech Conference",
    'Presented on "Building Scalable Web Applications with TypeScript" at Tokyo Tech Conference.',
    "2024-01-18",
    "https://www.notion.so/rihib/tech-conference-2024",
    "news",
    "en",
  );

  insertArticle.run(
    "Open Source Contribution",
    "Contributed to the Next.js documentation with improvements to the internationalization guide.",
    "2024-01-12",
    "https://www.notion.so/rihib/nextjs-contribution",
    "news",
    "en",
  );

  // Japanese news items
  insertArticle.run(
    "新しいウェブサイトを公開",
    "Next.js 14で構築し、Cloudflare Pagesにデプロイした個人ウェブサイトを公開しました。",
    "2024-01-20",
    "https://www.notion.so/rihib/new-website-launch",
    "news",
    "ja",
  );

  insertArticle.run(
    "技術カンファレンスでの講演",
    "東京テックカンファレンスで「TypeScriptによるスケーラブルなWebアプリケーション構築」について発表しました。",
    "2024-01-18",
    "https://www.notion.so/rihib/tech-conference-2024",
    "news",
    "ja",
  );

  insertArticle.run(
    "オープンソースへの貢献",
    "Next.jsの国際化ガイドの改善に関してドキュメントに貢献しました。",
    "2024-01-12",
    "https://www.notion.so/rihib/nextjs-contribution",
    "news",
    "ja",
  );
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  type: 'blog' | 'news';
  locale: string;
  created_at: string;
}

export const getArticles = (locale: string, type: 'blog' | 'news'): Article[] => {
  return db
    .prepare("SELECT * FROM articles WHERE locale = ? AND type = ? ORDER BY date DESC")
    .all(locale, type) as Article[];
};

export const getBlogPosts = (locale: string): Article[] => {
  return getArticles(locale, 'blog');
};

export const getNewsItems = (locale: string): Article[] => {
  return getArticles(locale, 'news');
};
