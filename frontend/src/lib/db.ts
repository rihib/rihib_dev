import Database from "better-sqlite3";
import { join } from "path";

const DB_PATH = join(process.cwd(), "data", "app.db");

export const db = new Database(DB_PATH);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    date TEXT NOT NULL,
    url TEXT NOT NULL,
    locale TEXT NOT NULL DEFAULT 'en',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS news_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    date TEXT NOT NULL,
    url TEXT NOT NULL,
    locale TEXT NOT NULL DEFAULT 'en',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Insert initial data if tables are empty
const blogCount = db
  .prepare("SELECT COUNT(*) as count FROM blog_posts")
  .get() as { count: number };
const newsCount = db
  .prepare("SELECT COUNT(*) as count FROM news_items")
  .get() as { count: number };

if (blogCount.count === 0) {
  const insertBlogPost = db.prepare(`
    INSERT INTO blog_posts (title, excerpt, date, url, locale)
    VALUES (?, ?, ?, ?, ?)
  `);

  // English blog posts
  insertBlogPost.run(
    "Getting Started with Next.js 14",
    "Learn how to build modern web applications with Next.js 14 and its latest features.",
    "2024-01-15",
    "https://qiita.com/rihib/items/nextjs14-getting-started",
    "en",
  );

  insertBlogPost.run(
    "TypeScript Best Practices",
    "Essential TypeScript patterns and practices for building robust applications.",
    "2024-01-10",
    "https://qiita.com/rihib/items/typescript-best-practices",
    "en",
  );

  insertBlogPost.run(
    "Cloudflare Workers with Hono",
    "Building serverless APIs with Hono framework on Cloudflare Workers.",
    "2024-01-05",
    "https://qiita.com/rihib/items/cloudflare-workers-hono",
    "en",
  );

  // Japanese blog posts
  insertBlogPost.run(
    "Next.js 14 入門",
    "Next.js 14と最新機能を使ったモダンなWebアプリケーションの構築方法を学ぼう。",
    "2024-01-15",
    "https://qiita.com/rihib/items/nextjs14-getting-started",
    "ja",
  );

  insertBlogPost.run(
    "TypeScriptベストプラクティス",
    "堅牢なアプリケーションを構築するためのTypeScriptの重要なパターンと実践方法。",
    "2024-01-10",
    "https://qiita.com/rihib/items/typescript-best-practices",
    "ja",
  );

  insertBlogPost.run(
    "Cloudflare Workers with Hono",
    "Cloudflare Workers上でHonoフレームワークを使ったサーバーレスAPIの構築。",
    "2024-01-05",
    "https://qiita.com/rihib/items/cloudflare-workers-hono",
    "ja",
  );
}

if (newsCount.count === 0) {
  const insertNewsItem = db.prepare(`
    INSERT INTO news_items (title, excerpt, date, url, locale)
    VALUES (?, ?, ?, ?, ?)
  `);

  // English news items
  insertNewsItem.run(
    "New Website Launch",
    "Launched my personal website built with Next.js 14 and deployed on Cloudflare Pages.",
    "2024-01-20",
    "https://www.notion.so/rihib/new-website-launch",
    "en",
  );

  insertNewsItem.run(
    "Speaking at Tech Conference",
    'Presented on "Building Scalable Web Applications with TypeScript" at Tokyo Tech Conference.',
    "2024-01-18",
    "https://www.notion.so/rihib/tech-conference-2024",
    "en",
  );

  insertNewsItem.run(
    "Open Source Contribution",
    "Contributed to the Next.js documentation with improvements to the internationalization guide.",
    "2024-01-12",
    "https://www.notion.so/rihib/nextjs-contribution",
    "en",
  );

  // Japanese news items
  insertNewsItem.run(
    "新しいウェブサイトを公開",
    "Next.js 14で構築し、Cloudflare Pagesにデプロイした個人ウェブサイトを公開しました。",
    "2024-01-20",
    "https://www.notion.so/rihib/new-website-launch",
    "ja",
  );

  insertNewsItem.run(
    "技術カンファレンスでの講演",
    "東京テックカンファレンスで「TypeScriptによるスケーラブルなWebアプリケーション構築」について発表しました。",
    "2024-01-18",
    "https://www.notion.so/rihib/tech-conference-2024",
    "ja",
  );

  insertNewsItem.run(
    "オープンソースへの貢献",
    "Next.jsの国際化ガイドの改善に関してドキュメントに貢献しました。",
    "2024-01-12",
    "https://www.notion.so/rihib/nextjs-contribution",
    "ja",
  );
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  locale: string;
  created_at: string;
}

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  locale: string;
  created_at: string;
}

export const getBlogPosts = (locale: string): BlogPost[] => {
  return db
    .prepare("SELECT * FROM blog_posts WHERE locale = ? ORDER BY date DESC")
    .all(locale) as BlogPost[];
};

export const getNewsItems = (locale: string): NewsItem[] => {
  return db
    .prepare("SELECT * FROM news_items WHERE locale = ? ORDER BY date DESC")
    .all(locale) as NewsItem[];
};
