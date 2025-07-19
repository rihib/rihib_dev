import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import { zValidator } from '@hono/zod-validator';
import { getBlogPosts, getNewsItems } from './supabase.js';
import { LocaleSchema, ArticleTypeSchema } from './schemas.js';
import { z } from 'zod';

const app = new Hono();

app.use('*', logger());
const getAllowedOrigins = () => {
  const env = process.env.NODE_ENV || 'development';
  
  if (env === 'production') {
    return ['https://rihib.dev', 'https://www.rihib.dev'];
  }
  
  return ['http://localhost:3000', 'http://localhost:3001'];
};

app.use('*', cors({
  origin: getAllowedOrigins(),
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// RPC-style routes
const api = app
  .basePath('/api')
  .get('/', (c) => {
    return c.json({ message: 'Rihib API Server' });
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
      } else {
        articles = await getNewsItems(locale);
      }
      
      return c.json({ articles });
    } catch (error) {
      console.error('Error fetching articles:', error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .get('/blog', zValidator('query', z.object({
    locale: LocaleSchema,
  })), async (c) => {
    const { locale } = c.req.valid('query');

    try {
      const articles = await getBlogPosts(locale);
      return c.json({ articles });
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .get('/news', zValidator('query', z.object({
    locale: LocaleSchema,
  })), async (c) => {
    const { locale } = c.req.valid('query');

    try {
      const articles = await getNewsItems(locale);
      return c.json({ articles });
    } catch (error) {
      console.error('Error fetching news items:', error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  });

// Health check endpoint
app.get('/', (c) => {
  return c.json({ message: 'Rihib API Server' });
});

// Export API type for RPC client
export type ApiType = typeof api;

const port = Number(process.env.PORT) || 8787;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});