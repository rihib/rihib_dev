-- Seed data for articles table
INSERT INTO articles (title, published_at, url, type, locale) VALUES
-- English blog posts
('Getting Started with Next.js 14', '2024-01-15', 'https://qiita.com/rihib/items/nextjs14-getting-started', 'blog', 'en'),
('TypeScript Best Practices', '2024-01-10', 'https://qiita.com/rihib/items/typescript-best-practices', 'blog', 'en'),
('Cloudflare Workers with Hono', '2024-01-05', 'https://qiita.com/rihib/items/cloudflare-workers-hono', 'blog', 'en'),

-- Japanese blog posts
('Next.js 14 入門', '2024-01-15', 'https://qiita.com/rihib/items/nextjs14-getting-started', 'blog', 'ja'),
('TypeScriptベストプラクティス', '2024-01-10', 'https://qiita.com/rihib/items/typescript-best-practices', 'blog', 'ja'),
('Cloudflare Workers with Hono', '2024-01-05', 'https://qiita.com/rihib/items/cloudflare-workers-hono', 'blog', 'ja'),

-- English news items
('New Website Launch', '2024-01-20', 'https://www.notion.so/rihib/new-website-launch', 'news', 'en'),
('Speaking at Tech Conference', '2024-01-18', 'https://www.notion.so/rihib/tech-conference-2024', 'news', 'en'),
('Open Source Contribution', '2024-01-12', 'https://www.notion.so/rihib/nextjs-contribution', 'news', 'en'),

-- Japanese news items
('新しいウェブサイトを公開', '2024-01-20', 'https://www.notion.so/rihib/new-website-launch', 'news', 'ja'),
('技術カンファレンスでの講演', '2024-01-18', 'https://www.notion.so/rihib/tech-conference-2024', 'news', 'ja'),
('オープンソースへの貢献', '2024-01-12', 'https://www.notion.so/rihib/nextjs-contribution', 'news', 'ja');