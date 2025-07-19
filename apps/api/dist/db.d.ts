import type { Article } from './types.js';
export declare const getArticles: (locale: string, type: "blog" | "news") => Promise<Article[]>;
export declare const getBlogPosts: (locale: string) => Promise<Article[]>;
export declare const getNewsItems: (locale: string) => Promise<Article[]>;
//# sourceMappingURL=db.d.ts.map