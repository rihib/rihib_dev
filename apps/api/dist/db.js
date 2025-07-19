import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { mkdir } from 'fs/promises';
const DB_PATH = join(process.cwd(), '..', 'frontend', 'data', 'app.db');
const CREATE_ARTICLES_TABLE = `
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    published_at DATE NOT NULL,
    url TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('blog', 'news')),
    locale TEXT NOT NULL DEFAULT 'en',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;
const CREATE_INDEXES = `
  CREATE INDEX IF NOT EXISTS idx_articles_locale_type ON articles(locale, type);
  CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
`;
const PRAGMA_WAL_MODE = `PRAGMA journal_mode = WAL;`;
let db = null;
let initPromise = null;
async function initializeDatabase() {
    if (db)
        return;
    await mkdir(dirname(DB_PATH), { recursive: true });
    db = new Database(DB_PATH);
    db.exec(PRAGMA_WAL_MODE);
    db.exec(CREATE_ARTICLES_TABLE);
    db.exec(CREATE_INDEXES);
    const articleCount = db.prepare('SELECT COUNT(*) as count FROM articles').get();
    if (articleCount.count === 0) {
        const insertArticle = db.prepare(`
      INSERT INTO articles (title, published_at, url, type, locale)
      VALUES (?, ?, ?, ?, ?)
    `);
        const insertMany = db.transaction(() => {
            insertArticle.run('Getting Started with Next.js 14', '2024-01-15', 'https://qiita.com/rihib/items/nextjs14-getting-started', 'blog', 'en');
            insertArticle.run('TypeScript Best Practices', '2024-01-10', 'https://qiita.com/rihib/items/typescript-best-practices', 'blog', 'en');
            insertArticle.run('Cloudflare Workers with Hono', '2024-01-05', 'https://qiita.com/rihib/items/cloudflare-workers-hono', 'blog', 'en');
            insertArticle.run('Next.js 14 入門', '2024-01-15', 'https://qiita.com/rihib/items/nextjs14-getting-started', 'blog', 'ja');
            insertArticle.run('TypeScriptベストプラクティス', '2024-01-10', 'https://qiita.com/rihib/items/typescript-best-practices', 'blog', 'ja');
            insertArticle.run('Cloudflare Workers with Hono', '2024-01-05', 'https://qiita.com/rihib/items/cloudflare-workers-hono', 'blog', 'ja');
            insertArticle.run('New Website Launch', '2024-01-20', 'https://www.notion.so/rihib/new-website-launch', 'news', 'en');
            insertArticle.run('Speaking at Tech Conference', '2024-01-18', 'https://www.notion.so/rihib/tech-conference-2024', 'news', 'en');
            insertArticle.run('Open Source Contribution', '2024-01-12', 'https://www.notion.so/rihib/nextjs-contribution', 'news', 'en');
            insertArticle.run('新しいウェブサイトを公開', '2024-01-20', 'https://www.notion.so/rihib/new-website-launch', 'news', 'ja');
            insertArticle.run('技術カンファレンスでの講演', '2024-01-18', 'https://www.notion.so/rihib/tech-conference-2024', 'news', 'ja');
            insertArticle.run('オープンソースへの貢献', '2024-01-12', 'https://www.notion.so/rihib/nextjs-contribution', 'news', 'ja');
        });
        insertMany();
    }
}
async function getDatabase() {
    if (!initPromise) {
        initPromise = initializeDatabase();
    }
    await initPromise;
    return db;
}
export const getArticles = async (locale, type) => {
    const database = await getDatabase();
    return database
        .prepare(`
      SELECT 
        id, 
        title, 
        published_at, 
        url, 
        type, 
        locale, 
        datetime(created_at) as created_at
      FROM articles 
      WHERE locale = ? AND type = ? 
      ORDER BY date(published_at) DESC
    `)
        .all(locale, type);
};
export const getBlogPosts = async (locale) => {
    return await getArticles(locale, 'blog');
};
export const getNewsItems = async (locale) => {
    return await getArticles(locale, 'news');
};
