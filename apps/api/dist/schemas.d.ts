import { z } from 'zod';
export declare const ArticleTypeSchema: z.ZodEnum<["blog", "news"]>;
export declare const LocaleSchema: z.ZodEnum<["en", "ja"]>;
export declare const ArticleSchema: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    published_at: z.ZodEffects<z.ZodString, string, string>;
    url: z.ZodEffects<z.ZodString, string, string>;
    type: z.ZodEnum<["blog", "news"]>;
    locale: z.ZodEnum<["en", "ja"]>;
    created_at: z.ZodEffects<z.ZodString, string, string>;
}, "strict", z.ZodTypeAny, {
    id: number;
    title: string;
    published_at: string;
    type: "blog" | "news";
    url: string;
    locale: "en" | "ja";
    created_at: string;
}, {
    id: number;
    title: string;
    published_at: string;
    type: "blog" | "news";
    url: string;
    locale: "en" | "ja";
    created_at: string;
}>;
export declare const ArticleParamsSchema: z.ZodObject<{
    locale: z.ZodEnum<["en", "ja"]>;
    type: z.ZodEnum<["blog", "news"]>;
}, "strict", z.ZodTypeAny, {
    type: "blog" | "news";
    locale: "en" | "ja";
}, {
    type: "blog" | "news";
    locale: "en" | "ja";
}>;
export declare const LocaleParamsSchema: z.ZodObject<{
    locale: z.ZodEnum<["en", "ja"]>;
}, "strict", z.ZodTypeAny, {
    locale: "en" | "ja";
}, {
    locale: "en" | "ja";
}>;
export declare const ArticleQuerySchema: z.ZodObject<{
    locale: z.ZodEnum<["en", "ja"]>;
    type: z.ZodEnum<["blog", "news"]>;
}, "strict", z.ZodTypeAny, {
    type: "blog" | "news";
    locale: "en" | "ja";
}, {
    type: "blog" | "news";
    locale: "en" | "ja";
}>;
export declare const LocaleQuerySchema: z.ZodObject<{
    locale: z.ZodEnum<["en", "ja"]>;
}, "strict", z.ZodTypeAny, {
    locale: "en" | "ja";
}, {
    locale: "en" | "ja";
}>;
export declare const ArticlesResponseSchema: z.ZodObject<{
    articles: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        title: z.ZodString;
        published_at: z.ZodEffects<z.ZodString, string, string>;
        url: z.ZodEffects<z.ZodString, string, string>;
        type: z.ZodEnum<["blog", "news"]>;
        locale: z.ZodEnum<["en", "ja"]>;
        created_at: z.ZodEffects<z.ZodString, string, string>;
    }, "strict", z.ZodTypeAny, {
        id: number;
        title: string;
        published_at: string;
        type: "blog" | "news";
        url: string;
        locale: "en" | "ja";
        created_at: string;
    }, {
        id: number;
        title: string;
        published_at: string;
        type: "blog" | "news";
        url: string;
        locale: "en" | "ja";
        created_at: string;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    articles: {
        id: number;
        title: string;
        published_at: string;
        type: "blog" | "news";
        url: string;
        locale: "en" | "ja";
        created_at: string;
    }[];
}, {
    articles: {
        id: number;
        title: string;
        published_at: string;
        type: "blog" | "news";
        url: string;
        locale: "en" | "ja";
        created_at: string;
    }[];
}>;
export declare const ErrorResponseSchema: z.ZodObject<{
    error: z.ZodString;
}, "strict", z.ZodTypeAny, {
    error: string;
}, {
    error: string;
}>;
export declare const CreateArticleSchema: z.ZodObject<{
    published_at: z.ZodEffects<z.ZodString, string, string>;
    type: z.ZodEnum<["blog", "news"]>;
    locale: z.ZodEnum<["en", "ja"]>;
} & {
    title: z.ZodEffects<z.ZodString, string, string>;
    url: z.ZodEffects<z.ZodString, string, string>;
}, "strict", z.ZodTypeAny, {
    title: string;
    published_at: string;
    type: "blog" | "news";
    url: string;
    locale: "en" | "ja";
}, {
    title: string;
    published_at: string;
    type: "blog" | "news";
    url: string;
    locale: "en" | "ja";
}>;
export declare const UpdateArticleSchema: z.ZodObject<{
    published_at: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    type: z.ZodOptional<z.ZodEnum<["blog", "news"]>>;
    locale: z.ZodOptional<z.ZodEnum<["en", "ja"]>>;
    title: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    url: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
} & {
    id: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    id: number;
    title?: string | undefined;
    published_at?: string | undefined;
    type?: "blog" | "news" | undefined;
    url?: string | undefined;
    locale?: "en" | "ja" | undefined;
}, {
    id: number;
    title?: string | undefined;
    published_at?: string | undefined;
    type?: "blog" | "news" | undefined;
    url?: string | undefined;
    locale?: "en" | "ja" | undefined;
}>;
export type Article = z.infer<typeof ArticleSchema>;
export type ArticleType = z.infer<typeof ArticleTypeSchema>;
export type Locale = z.infer<typeof LocaleSchema>;
export type ArticleParams = z.infer<typeof ArticleParamsSchema>;
export type LocaleParams = z.infer<typeof LocaleParamsSchema>;
export type ArticlesResponse = z.infer<typeof ArticlesResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export type CreateArticle = z.infer<typeof CreateArticleSchema>;
export type UpdateArticle = z.infer<typeof UpdateArticleSchema>;
//# sourceMappingURL=schemas.d.ts.map