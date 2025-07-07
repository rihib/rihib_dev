import Database from "better-sqlite3";
import { join, dirname } from "path";
import { mkdirSync } from "fs";

const DB_PATH = join(process.cwd(), "data", "app.db");

// Ensure the data directory exists before initializing the database
mkdirSync(dirname(DB_PATH), { recursive: true });

export const db = new Database(DB_PATH);

// Set PRAGMA journal_mode to WAL for better write concurrency
db.exec(`PRAGMA journal_mode = WAL;`);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    published_at TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('blog', 'news')),
    locale TEXT NOT NULL DEFAULT 'en',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Create indexes for better query performance
  CREATE INDEX IF NOT EXISTS idx_articles_locale_type ON articles(locale, type);
  CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
`);

// Insert initial data if table is empty
const articleCount = db
  .prepare("SELECT COUNT(*) as count FROM articles")
  .get() as { count: number };

if (articleCount.count === 0) {
  const insertArticle = db.prepare(`
    INSERT INTO articles (title, published_at, url, type, locale)
    VALUES (?, ?, ?, ?, ?)
  `);

  // English blog posts
  insertArticle.run(
    "Getting Started with Next.js 14",
    "2024-01-15",
    "https://qiita.com/rihib/items/nextjs14-getting-started",
    "blog",
    "en",
  );

  insertArticle.run(
    "TypeScript Best Practices",
    "2024-01-10",
    "https://qiita.com/rihib/items/typescript-best-practices",
    "blog",
    "en",
  );

  insertArticle.run(
    "Cloudflare Workers with Hono",
    "2024-01-05",
    "https://qiita.com/rihib/items/cloudflare-workers-hono",
    "blog",
    "en",
  );

  // Japanese blog posts
  insertArticle.run(
    "Next.js 14 入門",
    "2024-01-15",
    "https://qiita.com/rihib/items/nextjs14-getting-started",
    "blog",
    "ja",
  );

  insertArticle.run(
    "TypeScriptベストプラクティス",
    "2024-01-10",
    "https://qiita.com/rihib/items/typescript-best-practices",
    "blog",
    "ja",
  );

  insertArticle.run(
    "Cloudflare Workers with Hono",
    "2024-01-05",
    "https://qiita.com/rihib/items/cloudflare-workers-hono",
    "blog",
    "ja",
  );

  // English news items
  insertArticle.run(
    "New Website Launch",
    "2024-01-20",
    "https://www.notion.so/rihib/new-website-launch",
    "news",
    "en",
  );

  insertArticle.run(
    "Speaking at Tech Conference",
    "2024-01-18",
    "https://www.notion.so/rihib/tech-conference-2024",
    "news",
    "en",
  );

  insertArticle.run(
    "Open Source Contribution",
    "2024-01-12",
    "https://www.notion.so/rihib/nextjs-contribution",
    "news",
    "en",
  );

  // Japanese news items
  insertArticle.run(
    "新しいウェブサイトを公開",
    "2024-01-20",
    "https://www.notion.so/rihib/new-website-launch",
    "news",
    "ja",
  );

  insertArticle.run(
    "技術カンファレンスでの講演",
    "2024-01-18",
    "https://www.notion.so/rihib/tech-conference-2024",
    "news",
    "ja",
  );

  insertArticle.run(
    "オープンソースへの貢献",
    "2024-01-12",
    "https://www.notion.so/rihib/nextjs-contribution",
    "news",
    "ja",
  );
}

export interface Article {
  id: number;
  title: string;
  published_at: string;
  url: string;
  type: "blog" | "news";
  locale: string;
  created_at: string;
}

export const getArticles = (
  locale: string,
  type: "blog" | "news",
): Article[] => {
  return db
    .prepare(
      "SELECT * FROM articles WHERE locale = ? AND type = ? ORDER BY published_at DESC",
    )
    .all(locale, type) as Article[];
};

export const getBlogPosts = (locale: string): Article[] => {
  return getArticles(locale, "blog");
};

export const getNewsItems = (locale: string): Article[] => {
  return getArticles(locale, "news");
};
