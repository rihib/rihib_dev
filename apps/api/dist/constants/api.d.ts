/**
 * API Server Constants
 *
 * This file contains server-side constants for the API including
 * default ports, environment configurations, and server settings.
 */
/**
 * Default server ports
 */
export declare const SERVER_PORTS: {
    readonly DEFAULT: 8787;
    readonly DEVELOPMENT: 8787;
    readonly PRODUCTION: 8787;
};
/**
 * Environment types
 */
export declare const ENVIRONMENTS: {
    readonly DEVELOPMENT: "development";
    readonly PRODUCTION: "production";
    readonly TEST: "test";
};
/**
 * CORS allowed origins by environment
 */
export declare const ALLOWED_ORIGINS: {
    development: string[];
    production: string[];
};
/**
 * HTTP methods allowed for CORS
 */
export declare const ALLOWED_METHODS: string[];
/**
 * HTTP headers allowed for CORS
 */
export declare const ALLOWED_HEADERS: string[];
/**
 * HTTP status codes
 */
export declare const HTTP_STATUS: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly NO_CONTENT: 204;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly INTERNAL_SERVER_ERROR: 500;
    readonly BAD_GATEWAY: 502;
    readonly SERVICE_UNAVAILABLE: 503;
};
/**
 * API response messages
 */
export declare const RESPONSE_MESSAGES: {
    readonly SERVER_RUNNING: "Rihib API Server";
    readonly ARTICLES_FETCH_ERROR: "Failed to fetch articles";
    readonly BLOG_FETCH_ERROR: "Failed to fetch blog posts";
    readonly NEWS_FETCH_ERROR: "Failed to fetch news items";
    readonly UNKNOWN_ERROR: "Unknown error occurred";
};
/**
 * Database query limits
 */
export declare const QUERY_LIMITS: {
    readonly ARTICLES: 50;
    readonly BLOG_POSTS: 20;
    readonly NEWS_ITEMS: 10;
    readonly MAX_LIMIT: 100;
};
/**
 * Cache TTL values (in seconds)
 */
export declare const CACHE_TTL: {
    readonly ARTICLES: 300;
    readonly BLOG_POSTS: 600;
    readonly NEWS_ITEMS: 180;
    readonly STATIC: 3600;
};
/**
 * Request timeout values (in milliseconds)
 */
export declare const TIMEOUTS: {
    readonly DATABASE: 5000;
    readonly EXTERNAL_API: 10000;
    readonly FILE_UPLOAD: 30000;
};
/**
 * Environment variable names
 */
export declare const ENV_VARS: {
    readonly NODE_ENV: "NODE_ENV";
    readonly PORT: "PORT";
    readonly DATABASE_URL: "DATABASE_URL";
    readonly SUPABASE_URL: "SUPABASE_URL";
    readonly SUPABASE_ANON_KEY: "SUPABASE_ANON_KEY";
    readonly SUPABASE_SERVICE_ROLE_KEY: "SUPABASE_SERVICE_ROLE_KEY";
};
//# sourceMappingURL=api.d.ts.map