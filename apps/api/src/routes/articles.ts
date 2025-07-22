/**
 * Article routes
 * Defines API endpoints for article-related operations
 */

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { LocaleSchema, ArticleTypeSchema } from '../schemas.js';
import { articleController } from '../controllers/articles.js';

type ContextVariables = {
  requestId: string;
};

export const articleRoutes = new Hono<{ Variables: ContextVariables }>()
  // Get articles with required type filtering (consolidated endpoint)
  .get('/', zValidator('query', z.object({
    locale: LocaleSchema,
    type: ArticleTypeSchema,
  })), async (c) => {
    return articleController.getArticles(c);
  });