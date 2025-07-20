import { createClient } from '@supabase/supabase-js';
import { ArticleSchema, type Article, type Locale, type ArticleType } from './schemas.js';
import { z } from 'zod';
import { logger, DatabaseError, ValidationError, isNonEmptyString } from './utils/index.js';
import { ENV_VARS } from './constants/index.js';

/**
 * Gets and validates Supabase configuration from environment variables
 */
const getSupabaseConfig = () => {
  const url = process.env[ENV_VARS.SUPABASE_URL];
  const key = process.env[ENV_VARS.SUPABASE_ANON_KEY];
  
  if (!isNonEmptyString(url)) {
    throw new Error(`${ENV_VARS.SUPABASE_URL} environment variable is required`);
  }
  
  if (!isNonEmptyString(key)) {
    throw new Error(`${ENV_VARS.SUPABASE_ANON_KEY} environment variable is required`);
  }
  
  return { url, key };
};

const config = getSupabaseConfig();
export const supabase = createClient(config.url, config.key);

export const getArticles = async (locale: Locale, type: ArticleType): Promise<Article[]> => {
  const startTime = Date.now();
  
  logger.info('Fetching articles from Supabase', {
    locale,
    type,
    endpoint: '/articles'
  });

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('locale', locale)
    .eq('type', type)
    .order('published_at', { ascending: false });

  const duration = Date.now() - startTime;

  if (error) {
    logger.error('Database error while fetching articles', {
      locale,
      type,
      duration,
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
      duration
    });
    
    return validatedData;
  } catch (zodError) {
    logger.error('Data validation error', {
      locale,
      type,
      duration,
      rawDataCount: data?.length || 0,
      zodError: zodError instanceof Error ? zodError.message : String(zodError)
    }, zodError instanceof Error ? zodError : undefined);
    
    throw new ValidationError('Invalid data format received from database', {
      locale,
      type,
      originalError: zodError instanceof Error ? zodError.message : String(zodError)
    });
  }
};

export const getBlogPosts = async (locale: Locale): Promise<Article[]> => {
  return await getArticles(locale, 'blog');
};

export const getNewsItems = async (locale: Locale): Promise<Article[]> => {
  return await getArticles(locale, 'news');
};