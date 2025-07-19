import { hc } from 'hono/client';
import type { ApiType } from '@workspace/api';

// Re-export types from API for consistency
export type { Article, Locale, ArticleType } from '@workspace/api';

const getApiBaseUrl = () => {
  const env = process.env.NEXT_PUBLIC_ENV || 'dev';
  
  // Production: use relative path (same domain)
  if (env === 'prd') {
    return '';
  }
  
  // Development: use environment variable or default to localhost:8787
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
};

// Create RPC client
const client = hc<ApiType>(getApiBaseUrl());

export const getArticles = async (locale: 'en' | 'ja', type: 'blog' | 'news') => {
  try {
    const response = await client.api.articles.$get({
      query: { locale, type }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export const getBlogPosts = async (locale: 'en' | 'ja') => {
  try {
    const response = await client.api.blog.$get({
      query: { locale }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const getNewsItems = async (locale: 'en' | 'ja') => {
  try {
    const response = await client.api.news.$get({
      query: { locale }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching news items:', error);
    return [];
  }
};