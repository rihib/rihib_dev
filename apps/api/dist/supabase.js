import { createClient } from '@supabase/supabase-js';
import { ArticleSchema } from './schemas.js';
import { z } from 'zod';
const getSupabaseConfig = () => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;
    if (!url) {
        throw new Error('SUPABASE_URL environment variable is required');
    }
    if (!key) {
        throw new Error('SUPABASE_ANON_KEY environment variable is required');
    }
    return { url, key };
};
const config = getSupabaseConfig();
export const supabase = createClient(config.url, config.key);
export const getArticles = async (locale, type) => {
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
    }
    catch (zodError) {
        console.error('Zod validation error:', zodError);
        console.error('Raw data from Supabase:', JSON.stringify(data, null, 2));
        throw zodError;
    }
};
export const getBlogPosts = async (locale) => {
    return await getArticles(locale, 'blog');
};
export const getNewsItems = async (locale) => {
    return await getArticles(locale, 'news');
};
