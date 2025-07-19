import { createClient } from '@supabase/supabase-js';
import { ArticleSchema, type Article, type Locale, type ArticleType } from './schemas.js';
import { z } from 'zod';

const getSupabaseConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  
  if (env === 'development') {
    // Local Supabase configuration
    return {
      url: process.env.SUPABASE_URL || 'http://127.0.0.1:54321',
      key: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
    };
  }
  
  // Production configuration (from environment variables)
  return {
    url: process.env.SUPABASE_URL!,
    key: process.env.SUPABASE_ANON_KEY!
  };
};

const config = getSupabaseConfig();
export const supabase = createClient(config.url, config.key);

export const getArticles = async (locale: Locale, type: ArticleType): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('locale', locale)
    .eq('type', type)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }

  // Validate data with Zod schema
  const articlesSchema = z.array(ArticleSchema);
  
  try {
    const validatedData = articlesSchema.parse(data || []);
    return validatedData;
  } catch (zodError) {
    console.error('Zod validation error:', zodError);
    console.error('Raw data from Supabase:', JSON.stringify(data, null, 2));
    throw zodError;
  }
};

export const getBlogPosts = async (locale: Locale): Promise<Article[]> => {
  return await getArticles(locale, 'blog');
};

export const getNewsItems = async (locale: Locale): Promise<Article[]> => {
  return await getArticles(locale, 'news');
};