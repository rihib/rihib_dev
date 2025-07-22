/**
 * Article controller
 * Handles article-related business logic and request/response processing
 */

import type { Context } from 'hono';
import { articleService } from '../services/articles.js';
import { logger } from '../utils/index.js';
import type { Locale, ArticleType, ArticlesResponse } from '../schemas.js';

type ContextVariables = {
  requestId: string;
};

export class ArticleController {
  /**
   * Get articles with required type filtering (consolidated endpoint)
   */
  async getArticles(c: Context): Promise<Response> {
    const locale = c.req.query('locale') as Locale;
    const type = c.req.query('type') as ArticleType;
    const requestId = c.get('requestId');

    logger.info('Articles request received', {
      requestId,
      locale,
      type,
      endpoint: '/api/articles',
      controller: 'ArticleController'
    });

    const articles = await articleService.getArticles(locale, type);
    
    logger.info('Articles request completed', {
      requestId,
      locale,
      type,
      count: articles.length,
      controller: 'ArticleController'
    });
    
    const response: ArticlesResponse = { articles };
    return c.json(response);
  }
}

// Export singleton instance
export const articleController = new ArticleController();