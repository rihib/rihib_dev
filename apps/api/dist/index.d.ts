import 'dotenv/config';
declare const api: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
    "/api": {
        $get: {
            input: {};
            output: {
                message: "Rihib API Server";
            };
            outputFormat: "json";
            status: import("hono/utils/http-status.js").ContentfulStatusCode;
        };
    };
} & {
    "/api/articles": {
        $get: {
            input: {
                query: {
                    type: "blog" | "news";
                    locale: "en" | "ja";
                };
            };
            output: {
                articles: {
                    id: number;
                    title: string;
                    published_at: string;
                    type: "blog" | "news";
                    url: string;
                    locale: "en" | "ja";
                    created_at: string;
                }[];
            };
            outputFormat: "json";
            status: import("hono/utils/http-status.js").ContentfulStatusCode;
        } | {
            input: {
                query: {
                    type: "blog" | "news";
                    locale: "en" | "ja";
                };
            };
            output: {
                error: "Failed to fetch articles";
            };
            outputFormat: "json";
            status: 500;
        };
    };
} & {
    "/api/blog": {
        $get: {
            input: {
                query: {
                    locale: "en" | "ja";
                };
            };
            output: {
                articles: {
                    id: number;
                    title: string;
                    published_at: string;
                    type: "blog" | "news";
                    url: string;
                    locale: "en" | "ja";
                    created_at: string;
                }[];
            };
            outputFormat: "json";
            status: import("hono/utils/http-status.js").ContentfulStatusCode;
        } | {
            input: {
                query: {
                    locale: "en" | "ja";
                };
            };
            output: {
                error: "Failed to fetch blog posts";
            };
            outputFormat: "json";
            status: 500;
        };
    };
} & {
    "/api/news": {
        $get: {
            input: {
                query: {
                    locale: "en" | "ja";
                };
            };
            output: {
                articles: {
                    id: number;
                    title: string;
                    published_at: string;
                    type: "blog" | "news";
                    url: string;
                    locale: "en" | "ja";
                    created_at: string;
                }[];
            };
            outputFormat: "json";
            status: import("hono/utils/http-status.js").ContentfulStatusCode;
        } | {
            input: {
                query: {
                    locale: "en" | "ja";
                };
            };
            output: {
                error: "Failed to fetch news items";
            };
            outputFormat: "json";
            status: 500;
        };
    };
}, "/api">;
export type ApiType = typeof api;
export type { Article, ArticleType, Locale, ArticleParams, LocaleParams, ArticlesResponse, ErrorResponse, CreateArticle, UpdateArticle } from './schemas.js';
//# sourceMappingURL=index.d.ts.map