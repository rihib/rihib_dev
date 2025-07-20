/**
 * Environment Constants
 *
 * This file contains environment-specific constants and configuration values.
 */

/**
 * Environment types
 */
export const ENVIRONMENTS = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prd',
  TEST: 'test',
  STAGING: 'staging',
} as const;

export type Environment = (typeof ENVIRONMENTS)[keyof typeof ENVIRONMENTS];

/**
 * Environment-specific URLs
 */
export const ENVIRONMENT_URLS = {
  [ENVIRONMENTS.DEVELOPMENT]: {
    frontend: 'http://localhost:3000',
    api: 'http://localhost:8787',
    supabase: 'http://localhost:54321',
    supabaseStudio: 'http://localhost:54323',
  },
  [ENVIRONMENTS.PRODUCTION]: {
    frontend: 'https://rihib.dev',
    api: '', // Same domain
    supabase: '', // Set via environment variables
    supabaseStudio: '', // Not available in production
  },
} as const;

/**
 * Environment variable names
 */
export const ENV_VARS = {
  NODE_ENV: 'NODE_ENV',
  NEXT_PUBLIC_ENV: 'NEXT_PUBLIC_ENV',
  NEXT_PUBLIC_API_URL: 'NEXT_PUBLIC_API_URL',
  NEXT_PUBLIC_SUPABASE_URL: 'NEXT_PUBLIC_SUPABASE_URL',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  DATABASE_URL: 'DATABASE_URL',
  PORT: 'PORT',
} as const;

/**
 * Default port configurations
 */
export const DEFAULT_PORTS = {
  frontend: 3000,
  api: 8787,
  supabase: 54321,
  supabaseStudio: 54323,
} as const;

/**
 * Feature flags for different environments
 */
export const FEATURE_FLAGS = {
  [ENVIRONMENTS.DEVELOPMENT]: {
    enableDebugMode: true,
    enableHotReload: true,
    enableSourceMaps: true,
    enableConsoleLogging: true,
    enableErrorReporting: false,
    enableAnalytics: false,
  },
  [ENVIRONMENTS.PRODUCTION]: {
    enableDebugMode: false,
    enableHotReload: false,
    enableSourceMaps: false,
    enableConsoleLogging: false,
    enableErrorReporting: true,
    enableAnalytics: true,
  },
} as const;

/**
 * CORS configuration by environment
 */
export const CORS_CONFIG = {
  [ENVIRONMENTS.DEVELOPMENT]: {
    origins: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    headers: ['Content-Type', 'Authorization'],
  },
  [ENVIRONMENTS.PRODUCTION]: {
    origins: ['https://rihib.dev', 'https://www.rihib.dev'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    headers: ['Content-Type', 'Authorization'],
  },
} as const;

/**
 * Database configuration
 */
export const DATABASE_CONFIG = {
  [ENVIRONMENTS.DEVELOPMENT]: {
    url: 'postgresql://postgres:postgres@localhost:54322/postgres',
    schema: 'public',
    maxConnections: 10,
  },
  [ENVIRONMENTS.PRODUCTION]: {
    url: '', // Set via environment variables
    schema: 'public',
    maxConnections: 20,
  },
} as const;

/**
 * Logging levels by environment
 */
export const LOG_LEVELS = {
  [ENVIRONMENTS.DEVELOPMENT]: 'debug',
  [ENVIRONMENTS.PRODUCTION]: 'info',
  [ENVIRONMENTS.TEST]: 'warn',
  [ENVIRONMENTS.STAGING]: 'info',
} as const;

/**
 * Cache TTL values by environment (in seconds)
 */
export const CACHE_TTL = {
  [ENVIRONMENTS.DEVELOPMENT]: {
    static: 0, // No caching in dev
    api: 60, // 1 minute
    images: 0, // No caching in dev
  },
  [ENVIRONMENTS.PRODUCTION]: {
    static: 31536000, // 1 year
    api: 300, // 5 minutes
    images: 2592000, // 30 days
  },
} as const;
