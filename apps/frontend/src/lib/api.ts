import { hc } from 'hono/client';
import type { ApiType } from '@workspace/api';
import type { Article, Locale, ArticleType, ArticlesResponse, ErrorResponse } from '@workspace/api';
import { ENVIRONMENTS, ENVIRONMENT_URLS, DEFAULT_PORTS, HTTP_STATUS } from './constants';

// Re-export types from API for consistency
export type { Article, Locale, ArticleType } from '@workspace/api';

// Type guards for API responses
const isArticlesResponse = (data: unknown): data is ArticlesResponse => {
  return typeof data === 'object' && data !== null && 'articles' in data;
};

const isErrorResponse = (data: unknown): data is ErrorResponse => {
  return typeof data === 'object' && data !== null && 'error' in data;
};

const getApiBaseUrl = () => {
  const env = process.env.NEXT_PUBLIC_ENV || ENVIRONMENTS.DEVELOPMENT;

  // Production: use relative path (same domain)
  if (env === ENVIRONMENTS.PRODUCTION) {
    return ENVIRONMENT_URLS[ENVIRONMENTS.PRODUCTION].api;
  }

  // Development: use environment variable or default to localhost:8787
  return process.env.NEXT_PUBLIC_API_URL || ENVIRONMENT_URLS[ENVIRONMENTS.DEVELOPMENT].api;
};

// Create RPC client
const client = hc<ApiType>(getApiBaseUrl());

export const getArticles = async (locale: 'en' | 'ja', type: 'blog' | 'news') => {
  try {
    const response = await client.api.articles.$get({
      query: { locale, type },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as ArticlesResponse | ErrorResponse;

    if (isArticlesResponse(data)) {
      return data.articles;
    } else if (isErrorResponse(data)) {
      throw new Error(data.error);
    } else {
      throw new Error('Unknown error occurred');
    }
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
};

export const getBlogPosts = async (locale: 'en' | 'ja') => {
  try {
    const response = await client.api.articles.$get({
      query: { locale, type: 'blog' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as ArticlesResponse | ErrorResponse;

    if (isArticlesResponse(data)) {
      return data.articles;
    } else if (isErrorResponse(data)) {
      throw new Error(data.error);
    } else {
      throw new Error('Unknown error occurred');
    }
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }
};

export const getNewsItems = async (locale: 'en' | 'ja') => {
  try {
    const response = await client.api.articles.$get({
      query: { locale, type: 'news' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as ArticlesResponse | ErrorResponse;

    if (isArticlesResponse(data)) {
      return data.articles;
    } else if (isErrorResponse(data)) {
      throw new Error(data.error);
    } else {
      throw new Error('Unknown error occurred');
    }
  } catch (error) {
    console.error('Failed to fetch news items:', error);
    return [];
  }
};
