/**
 * Article data access service
 * Handles all database interactions for articles
 */

import { type SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../supabase.js';
import { ArticleSchema, type Article, type Locale, type ArticleType } from '../schemas.js';
import { z } from 'zod';
import { logger, DatabaseError, ValidationError } from '../utils/index.js';

export class ArticleService {
  private supabaseClient: SupabaseClient;

  /**
   * Creates an instance of ArticleService
   * @param supabaseClient - The Supabase client instance for database operations
   */
  constructor(supabaseClient: SupabaseClient) {
    this.supabaseClient = supabaseClient;
  }
  /**
   * Fetches articles from database with type and locale filtering
   * @param locale - The language locale to filter articles by (en or ja)
   * @param type - Optional article type filter (blog or news)
   * @returns Promise that resolves to an array of validated Article objects
   * @throws {DatabaseError} When database query fails
   * @throws {ValidationError} When data validation fails
   */
  async getArticles(locale: Locale, type?: ArticleType): Promise<Article[]> {
    const startTime = Date.now();
    
    logger.info('Fetching articles from database', {
      locale,
      type,
      service: 'ArticleService'
    });

    let query = this.supabaseClient
      .from('articles')
      .select('*')
      .eq('locale', locale)
      .order('published_at', { ascending: false });

    // Add type filter if specified
    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;
    const duration = Date.now() - startTime;

    if (error) {
      logger.error('Database error while fetching articles', {
        locale,
        type,
        duration,
        service: 'ArticleService',
        supabaseError: error.message
      }, error);
      
      throw new DatabaseError('Failed to fetch articles from database', {
        locale,
        type,
        originalError: error.message
      });
    }

    // Validate data with Zod schema
    const articlesSchema = z.array(ArticleSchema);
    
    try {
      const validatedData = articlesSchema.parse(data || []);
      
      logger.info('Successfully fetched and validated articles', {
        locale,
        type,
        count: validatedData.length,
        duration,
        service: 'ArticleService'
      });
      
      return validatedData;
    } catch (zodError) {
      logger.error('Data validation error', {
        locale,
        type,
        duration,
        service: 'ArticleService',
        rawDataCount: data?.length || 0,
        zodError: zodError instanceof Error ? zodError.message : String(zodError)
      }, zodError instanceof Error ? zodError : undefined);
      
      throw new ValidationError('Invalid data format received from database', {
        locale,
        type,
        originalError: zodError instanceof Error ? zodError.message : String(zodError)
      });
    }
  }

  /**
   * Fetches blog posts for a specific locale
   * @param locale - The language locale to filter blog posts by (en or ja)
   * @returns Promise that resolves to an array of blog Article objects
   * @throws {DatabaseError} When database query fails
   * @throws {ValidationError} When data validation fails
   */
  async getBlogPosts(locale: Locale): Promise<Article[]> {
    return this.getArticles(locale, 'blog');
  }

  /**
   * Fetches news items for a specific locale
   * @param locale - The language locale to filter news items by (en or ja)
   * @returns Promise that resolves to an array of news Article objects
   * @throws {DatabaseError} When database query fails
   * @throws {ValidationError} When data validation fails
   */
  async getNewsItems(locale: Locale): Promise<Article[]> {
    return this.getArticles(locale, 'news');
  }
}

// Export singleton instance
export const articleService = new ArticleService(supabase);