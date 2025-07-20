/**
 * API Server Constants
 * 
 * This file contains server-side constants for the API including
 * default ports, environment configurations, and server settings.
 */

/**
 * Default server ports
 */
export const SERVER_PORTS = {
  DEFAULT: 8787,
  DEVELOPMENT: 8787,
  PRODUCTION: 8787,
} as const;

/**
 * Environment types
 */
export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

/**
 * CORS allowed origins by environment
 */
export const ALLOWED_ORIGINS = {
  [ENVIRONMENTS.DEVELOPMENT]: [
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  [ENVIRONMENTS.PRODUCTION]: [
    'https://rihib.dev',
    'https://www.rihib.dev',
  ],
};

/**
 * HTTP methods allowed for CORS
 */
export const ALLOWED_METHODS = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
];

/**
 * HTTP headers allowed for CORS
 */
export const ALLOWED_HEADERS = [
  'Content-Type',
  'Authorization',
];

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * API response messages
 */
export const RESPONSE_MESSAGES = {
  SERVER_RUNNING: 'Rihib API Server',
  ARTICLES_FETCH_ERROR: 'Failed to fetch articles',
  BLOG_FETCH_ERROR: 'Failed to fetch blog posts',
  NEWS_FETCH_ERROR: 'Failed to fetch news items',
  UNKNOWN_ERROR: 'Unknown error occurred',
} as const;

/**
 * Database query limits
 */
export const QUERY_LIMITS = {
  ARTICLES: 50,
  BLOG_POSTS: 20,
  NEWS_ITEMS: 10,
  MAX_LIMIT: 100,
} as const;

/**
 * Cache TTL values (in seconds)
 */
export const CACHE_TTL = {
  ARTICLES: 300,    // 5 minutes
  BLOG_POSTS: 600,  // 10 minutes
  NEWS_ITEMS: 180,  // 3 minutes
  STATIC: 3600,     // 1 hour
} as const;

/**
 * Request timeout values (in milliseconds)
 */
export const TIMEOUTS = {
  DATABASE: 5000,   // 5 seconds
  EXTERNAL_API: 10000, // 10 seconds
  FILE_UPLOAD: 30000,  // 30 seconds
} as const;

/**
 * Environment variable names
 */
export const ENV_VARS = {
  NODE_ENV: 'NODE_ENV',
  PORT: 'PORT',
  DATABASE_URL: 'DATABASE_URL',
  SUPABASE_URL: 'SUPABASE_URL',
  SUPABASE_ANON_KEY: 'SUPABASE_ANON_KEY',
  SUPABASE_SERVICE_ROLE_KEY: 'SUPABASE_SERVICE_ROLE_KEY',
} as const;