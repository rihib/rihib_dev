import { z } from 'zod';
export declare const ArticleTypeSchema: z.ZodEnum<{
    blog: "blog";
    news: "news";
}>;
export declare const LocaleSchema: z.ZodEnum<{
    en: "en";
    ja: "ja";
}>;
export declare const ArticleSchema: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    published_at: z.ZodString;
    url: z.ZodString;
    type: z.ZodEnum<{
        blog: "blog";
        news: "news";
    }>;
    locale: z.ZodEnum<{
        en: "en";
        ja: "ja";
    }>;
    created_at: z.ZodString;
}, z.core.$strict>;
export declare const ArticleParamsSchema: z.ZodObject<{
    locale: z.ZodEnum<{
        en: "en";
        ja: "ja";
    }>;
    type: z.ZodEnum<{
        blog: "blog";
        news: "news";
    }>;
}, z.core.$strict>;
export declare const LocaleParamsSchema: z.ZodObject<{
    locale: z.ZodEnum<{
        en: "en";
        ja: "ja";
    }>;
}, z.core.$strict>;
export declare const ArticleQuerySchema: z.ZodObject<{
    locale: z.ZodEnum<{
        en: "en";
        ja: "ja";
    }>;
    type: z.ZodEnum<{
        blog: "blog";
        news: "news";
    }>;
}, z.core.$strict>;
export declare const LocaleQuerySchema: z.ZodObject<{
    locale: z.ZodEnum<{
        en: "en";
        ja: "ja";
    }>;
}, z.core.$strict>;
export declare const ArticlesResponseSchema: z.ZodObject<{
    articles: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        title: z.ZodString;
        published_at: z.ZodString;
        url: z.ZodString;
        type: z.ZodEnum<{
            blog: "blog";
            news: "news";
        }>;
        locale: z.ZodEnum<{
            en: "en";
            ja: "ja";
        }>;
        created_at: z.ZodString;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const ErrorResponseSchema: z.ZodObject<{
    error: z.ZodString;
}, z.core.$strict>;
export declare const CreateArticleSchema: z.ZodObject<{
    type: z.ZodEnum<{
        blog: "blog";
        news: "news";
    }>;
    locale: z.ZodEnum<{
        en: "en";
        ja: "ja";
    }>;
    published_at: z.ZodString;
    title: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    url: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
}, z.core.$strict>;
export declare const UpdateArticleSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<{
        blog: "blog";
        news: "news";
    }>>;
    locale: z.ZodOptional<z.ZodEnum<{
        en: "en";
        ja: "ja";
    }>>;
    published_at: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
    url: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
    id: z.ZodNumber;
}, z.core.$strict>;
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