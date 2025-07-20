import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import { zValidator } from '@hono/zod-validator';
import { getBlogPosts, getNewsItems } from './supabase.js';
import { LocaleSchema, ArticleTypeSchema } from './schemas.js';
import { z } from 'zod';
import { SERVER_PORTS, ENVIRONMENTS, ALLOWED_ORIGINS, ALLOWED_METHODS, ALLOWED_HEADERS, HTTP_STATUS, RESPONSE_MESSAGES, } from './constants/index.js';
const app = new Hono();
app.use('*', logger());
const getAllowedOrigins = () => {
    const env = process.env.NODE_ENV || ENVIRONMENTS.DEVELOPMENT;
    if (env === ENVIRONMENTS.PRODUCTION) {
        return ALLOWED_ORIGINS[ENVIRONMENTS.PRODUCTION];
    }
    return ALLOWED_ORIGINS[ENVIRONMENTS.DEVELOPMENT];
};
app.use('*', cors({
    origin: getAllowedOrigins(),
    allowMethods: ALLOWED_METHODS,
    allowHeaders: ALLOWED_HEADERS,
}));
// RPC-style routes
const api = app
    .basePath('/api')
    .get('/', (c) => {
    return c.json({ message: RESPONSE_MESSAGES.SERVER_RUNNING });
})
    .get('/articles', zValidator('query', z.object({
    locale: LocaleSchema,
    type: ArticleTypeSchema,
})), async (c) => {
    const { locale, type } = c.req.valid('query');
    try {
        let articles;
        if (type === 'blog') {
            articles = await getBlogPosts(locale);
        }
        else {
            articles = await getNewsItems(locale);
        }
        return c.json({ articles });
    }
    catch (error) {
        console.error('Error fetching articles:', {
            locale,
            type,
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });
        return c.json({ error: RESPONSE_MESSAGES.ARTICLES_FETCH_ERROR }, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
})
    .get('/blog', zValidator('query', z.object({
    locale: LocaleSchema,
})), async (c) => {
    const { locale } = c.req.valid('query');
    try {
        const articles = await getBlogPosts(locale);
        return c.json({ articles });
    }
    catch (error) {
        console.error('Error fetching blog posts:', {
            locale,
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });
        return c.json({ error: RESPONSE_MESSAGES.BLOG_FETCH_ERROR }, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
})
    .get('/news', zValidator('query', z.object({
    locale: LocaleSchema,
})), async (c) => {
    const { locale } = c.req.valid('query');
    try {
        const articles = await getNewsItems(locale);
        return c.json({ articles });
    }
    catch (error) {
        console.error('Error fetching news items:', {
            locale,
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });
        return c.json({ error: RESPONSE_MESSAGES.NEWS_FETCH_ERROR }, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
});
// Health check endpoint
app.get('/', (c) => {
    return c.json({ message: 'Rihib API Server' });
});
const port = Number(process.env.PORT) || SERVER_PORTS.DEFAULT;
console.log(`Server is running on port ${port}`);
serve({
    fetch: app.fetch,
    port
});
