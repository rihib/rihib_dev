import type { Article, Locale, ArticleType, ErrorResponse } from '@workspace/api';

// Re-export types from API workspace for consistency
export type { Article, Locale, ArticleType, ErrorResponse } from '@workspace/api';

// Extended API response types with more specific metadata
export interface ApiResponse<T = unknown> {
  data: T;
  meta?: ApiMetadata;
  status: number;
}

export interface ApiError extends Error {
  status?: number;
  code?: string;
  details?: Record<string, unknown>;
  timestamp?: string;
  requestId?: string;
}

export interface ApiMetadata {
  timestamp: string;
  requestId?: string;
  pagination?: PaginationMetadata;
  version?: string;
}

export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// API function return types with better state management
export interface ApiResult<T> {
  data: T | null;
  error: ApiError | null;
  loading: boolean;
  lastFetched?: string;
  stale?: boolean;
}

// Generic API response wrapper for consistent responses
export interface ApiResponseWrapper<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMetadata;
}

// Pagination with cursor support
export interface CursorPaginationMetadata {
  before?: string;
  after?: string;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Enhanced pagination metadata
export interface EnhancedPaginationMetadata extends PaginationMetadata {
  totalPages: number;
  startIndex: number;
  endIndex: number;
  cursor?: CursorPaginationMetadata;
}

// Article-specific API types
export interface ArticlesApiResponse {
  articles: Article[];
  meta?: ApiMetadata;
}

export interface ArticleApiResponse {
  article: Article;
  meta?: ApiMetadata;
}

// Query parameters with strict validation
export interface ArticleQueryParams {
  locale: Locale;
  type: ArticleType;
  page?: number;
  limit?: number;
  sortBy?: 'published_at' | 'created_at' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface BlogQueryParams {
  locale: Locale;
  page?: number;
  limit?: number;
  sortBy?: 'published_at' | 'created_at' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface NewsQueryParams {
  locale: Locale;
  page?: number;
  limit?: number;
  sortBy?: 'published_at' | 'created_at' | 'title';
  sortOrder?: 'asc' | 'desc';
}

// HTTP method types
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Request configuration
export interface ApiRequestConfig {
  method: HttpMethod;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  signal?: AbortSignal;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  body?: BodyInit;
  params?: Record<string, string | number | boolean>;
  validateStatus?: (status: number) => boolean;
}

// Enhanced type guards for API responses
export function isApiError(error: unknown): error is ApiError {
  return (
    error instanceof Error && 'status' in error && typeof (error as ApiError).status === 'number'
  );
}

export function isApiResponse<T>(response: unknown): response is ApiResponse<T> {
  return (
    typeof response === 'object' &&
    response !== null &&
    'data' in response &&
    'status' in response &&
    typeof (response as ApiResponse<T>).status === 'number'
  );
}

export function isApiResponseWrapper<T>(response: unknown): response is ApiResponseWrapper<T> {
  return (
    typeof response === 'object' &&
    response !== null &&
    'success' in response &&
    typeof (response as ApiResponseWrapper<T>).success === 'boolean'
  );
}

export function isArticlesResponse(response: unknown): response is ArticlesApiResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'articles' in response &&
    Array.isArray((response as ArticlesApiResponse).articles)
  );
}

export function isApiErrorResponse(response: unknown): response is ErrorResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'error' in response &&
    typeof (response as ErrorResponse).error === 'string'
  );
}

// Type guard for pagination metadata
export function isApiPaginationMetadata(meta: unknown): meta is PaginationMetadata {
  return (
    typeof meta === 'object' &&
    meta !== null &&
    'page' in meta &&
    'limit' in meta &&
    'total' in meta &&
    'hasNext' in meta &&
    'hasPrevious' in meta &&
    typeof (meta as PaginationMetadata).page === 'number' &&
    typeof (meta as PaginationMetadata).limit === 'number' &&
    typeof (meta as PaginationMetadata).total === 'number' &&
    typeof (meta as PaginationMetadata).hasNext === 'boolean' &&
    typeof (meta as PaginationMetadata).hasPrevious === 'boolean'
  );
}

// Status code categories
export type SuccessStatusCode = 200 | 201 | 202 | 204;
export type ClientErrorStatusCode = 400 | 401 | 403 | 404 | 409 | 422 | 429;
export type ServerErrorStatusCode = 500 | 501 | 502 | 503 | 504;
export type StatusCode = SuccessStatusCode | ClientErrorStatusCode | ServerErrorStatusCode;

// API environment configuration
export interface ApiEnvironmentConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  enableLogging: boolean;
  version?: string;
  enableMetrics?: boolean;
  enableCache?: boolean;
  cacheTtl?: number;
}

// API request retry configuration
export interface RetryConfig {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  backoffFactor: number;
  retryCondition?: (error: ApiError) => boolean;
}

// API cache configuration
export interface CacheConfig {
  enabled: boolean;
  ttl: number;
  maxSize: number;
  keyGenerator?: (url: string, params?: Record<string, unknown>) => string;
}

// API metrics and monitoring
export interface ApiMetrics {
  requestCount: number;
  errorCount: number;
  averageResponseTime: number;
  cacheHitRate: number;
  lastRequestTime?: string;
}

// Request interceptor types
export type RequestInterceptor = (
  config: ApiRequestConfig
) => ApiRequestConfig | Promise<ApiRequestConfig>;

export type ResponseInterceptor<T = unknown> = (
  response: ApiResponse<T>
) => ApiResponse<T> | Promise<ApiResponse<T>>;

export type ErrorInterceptor = (error: ApiError) => ApiError | Promise<ApiError> | never;

// API client configuration
export interface ApiClientConfig {
  environment: ApiEnvironmentConfig;
  retry: RetryConfig;
  cache: CacheConfig;
  requestInterceptors: RequestInterceptor[];
  responseInterceptors: ResponseInterceptor[];
  errorInterceptors: ErrorInterceptor[];
}
