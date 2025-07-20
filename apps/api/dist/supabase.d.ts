import { type Article, type Locale, type ArticleType } from './schemas.js';
export declare const supabase: import("@supabase/supabase-js").SupabaseClient<any, "public", any>;
export declare const getArticles: (locale: Locale, type: ArticleType) => Promise<Article[]>;
export declare const getBlogPosts: (locale: Locale) => Promise<Article[]>;
export declare const getNewsItems: (locale: Locale) => Promise<Article[]>;
//# sourceMappingURL=supabase.d.ts.map