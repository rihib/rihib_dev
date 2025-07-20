/**
 * API Constants
 *
 * This file contains API-related constants including endpoints, timeouts,
 * retry counts, and HTTP status codes.
 */

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
 * API endpoints
 */
export const API_ENDPOINTS = {
  base: '/api',
  articles: '/api/articles',
  blog: '/api/blog',
  news: '/api/news',
  health: '/',
} as const;

/**
 * Request timeout values (in milliseconds)
 */
export const TIMEOUTS = {
  short: 5000, // 5 seconds
  medium: 10000, // 10 seconds
  long: 30000, // 30 seconds
  veryLong: 60000, // 1 minute
} as const;

/**
 * Retry configuration
 */
export const RETRY_CONFIG = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 5000,
  backoffMultiplier: 2,
} as const;

/**
 * Environment-specific API URLs
 */
export const API_URLS = {
  development: {
    default: 'http://localhost:8787',
    alternative: 'http://localhost:3001',
  },
  production: {
    primary: 'https://rihib.dev',
    secondary: 'https://www.rihib.dev',
  },
} as const;

/**
 * Default ports for different environments
 */
export const PORTS = {
  frontend: {
    development: 3000,
    preview: 3001,
  },
  api: {
    development: 8787,
    production: 8787,
  },
  supabase: {
    development: 54321,
    studio: 54323,
  },
} as const;

/**
 * Request headers
 */
export const HEADERS = {
  contentType: {
    json: 'application/json',
    formData: 'multipart/form-data',
    urlEncoded: 'application/x-www-form-urlencoded',
  },
  accept: {
    json: 'application/json',
    html: 'text/html',
    all: '*/*',
  },
} as const;

/**
 * Cache settings
 */
export const CACHE = {
  maxAge: {
    short: 300, // 5 minutes
    medium: 1800, // 30 minutes
    long: 3600, // 1 hour
    veryLong: 86400, // 24 hours
  },
  staleWhileRevalidate: {
    short: 60, // 1 minute
    medium: 300, // 5 minutes
    long: 1800, // 30 minutes
  },
} as const;

/**
 * Rate limiting
 */
export const RATE_LIMITS = {
  requests: {
    perMinute: 60,
    perHour: 1000,
    perDay: 10000,
  },
  burst: {
    size: 10,
    refillRate: 1, // per second
  },
} as const;
