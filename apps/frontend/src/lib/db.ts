// This file is deprecated and should not be used in the frontend
// Database operations should be handled by the API layer (Supabase)
// Use the API client in api.ts instead

export interface Article {
  id: number;
  title: string;
  published_at: string;
  url: string;
  type: 'blog' | 'news';
  locale: string;
  created_at: string;
}

// Deprecated functions - use API client instead
export const getArticles = async (locale: string, type: 'blog' | 'news'): Promise<Article[]> => {
  throw new Error('getArticles is deprecated. Use API client from api.ts instead');
};

export const getBlogPosts = async (locale: string): Promise<Article[]> => {
  throw new Error('getBlogPosts is deprecated. Use API client from api.ts instead');
};

export const getNewsItems = async (locale: string): Promise<Article[]> => {
  throw new Error('getNewsItems is deprecated. Use API client from api.ts instead');
};
