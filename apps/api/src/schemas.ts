import { z } from 'zod';

// Article type enum (strict validation)
export const ArticleTypeSchema = z.enum(['blog', 'news'], {
  errorMap: () => ({ message: "Type must be either 'blog' or 'news'" })
});

// Locale enum (strict validation)
export const LocaleSchema = z.enum(['en', 'ja'], {
  errorMap: () => ({ message: "Locale must be either 'en' or 'ja'" })
});

// Article schema (strict database validation)
export const ArticleSchema = z.object({
  id: z.number().int().positive("ID must be a positive integer"),
  title: z.string()
    .min(1, "Title cannot be empty")
    .max(500, "Title must be less than 500 characters")
    .trim(),
  published_at: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Published date must be in YYYY-MM-DD format")
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime()) && parsedDate <= new Date();
    }, "Published date must be a valid date not in the future"),
  url: z.string()
    .url("Must be a valid URL")
    .max(2000, "URL must be less than 2000 characters")
    .refine((url) => {
      return url.startsWith('https://') || url.startsWith('http://');
    }, "URL must include protocol (http:// or https://)"),
  type: ArticleTypeSchema,
  locale: LocaleSchema,
  created_at: z.string()
    .datetime({ offset: true, message: "Must be a valid ISO datetime with timezone" })
    .refine((datetime) => {
      const parsedDate = new Date(datetime);
      return !isNaN(parsedDate.getTime());
    }, "Created date must be a valid datetime"),
}).strict(); // Disallow additional properties

// API parameter schemas (strict validation)
export const ArticleParamsSchema = z.object({
  locale: LocaleSchema,
  type: ArticleTypeSchema,
}).strict();

export const LocaleParamsSchema = z.object({
  locale: LocaleSchema,
}).strict();

// RPC query schemas
export const ArticleQuerySchema = z.object({
  locale: LocaleSchema,
  type: ArticleTypeSchema,
}).strict();

export const LocaleQuerySchema = z.object({
  locale: LocaleSchema,
}).strict();

// API response schemas (strict validation)
export const ArticlesResponseSchema = z.object({
  articles: z.array(ArticleSchema)
    .min(0, "Articles array cannot be negative length")
    .max(1000, "Too many articles returned"),
}).strict();

export const ErrorResponseSchema = z.object({
  error: z.string()
    .min(1, "Error message cannot be empty")
    .max(1000, "Error message too long"),
}).strict();

// Database mutation schemas (for create/update operations)
export const CreateArticleSchema = ArticleSchema.omit({ 
  id: true, 
  created_at: true 
}).extend({
  title: z.string()
    .min(1, "Title is required")
    .max(500, "Title must be less than 500 characters")
    .trim()
    .transform(val => val.replace(/\s+/g, ' ')), // Normalize whitespace
  url: z.string()
    .url("Must be a valid URL")
    .max(2000, "URL must be less than 2000 characters")
    .transform(val => val.trim()),
}).strict();

export const UpdateArticleSchema = CreateArticleSchema.partial().extend({
  id: z.number().int().positive("ID must be a positive integer")
}).strict();

// Type exports
export type Article = z.infer<typeof ArticleSchema>;
export type ArticleType = z.infer<typeof ArticleTypeSchema>;
export type Locale = z.infer<typeof LocaleSchema>;
export type ArticleParams = z.infer<typeof ArticleParamsSchema>;
export type LocaleParams = z.infer<typeof LocaleParamsSchema>;
export type ArticlesResponse = z.infer<typeof ArticlesResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export type CreateArticle = z.infer<typeof CreateArticleSchema>;
export type UpdateArticle = z.infer<typeof UpdateArticleSchema>;