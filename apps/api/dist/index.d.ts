import 'dotenv/config';
type ContextVariables = {
    requestId: string;
};
declare const api: import("hono/hono-base").HonoBase<{
    Variables: ContextVariables;
}, {
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
                    locale: "en" | "ja";
                    type: "blog" | "news";
                };
            };
            output: {
                articles: {
                    id: number;
                    title: string;
                    published_at: string;
                    url: string;
                    type: "blog" | "news";
                    locale: "en" | "ja";
                    created_at: string;
                }[];
            };
            outputFormat: "json";
            status: import("hono/utils/http-status.js").ContentfulStatusCode;
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
                    url: string;
                    type: "blog" | "news";
                    locale: "en" | "ja";
                    created_at: string;
                }[];
            };
            outputFormat: "json";
            status: import("hono/utils/http-status.js").ContentfulStatusCode;
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
                    url: string;
                    type: "blog" | "news";
                    locale: "en" | "ja";
                    created_at: string;
                }[];
            };
            outputFormat: "json";
            status: import("hono/utils/http-status.js").ContentfulStatusCode;
        };
    };
}, "/api">;
export type ApiType = typeof api;
export type { Article, ArticleType, Locale, ArticleParams, LocaleParams, ArticlesResponse, ErrorResponse, CreateArticle, UpdateArticle } from './schemas.js';
//# sourceMappingURL=index.d.ts.map