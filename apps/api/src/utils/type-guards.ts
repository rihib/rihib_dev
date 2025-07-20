/**
 * Type guards for runtime type safety
 */

import type { Locale, ArticleType } from '../schemas.js';

/**
 * Type guard for Locale
 */
export function isValidLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (value === 'en' || value === 'ja');
}

/**
 * Type guard for ArticleType
 */
export function isValidArticleType(value: unknown): value is ArticleType {
  return typeof value === 'string' && (value === 'blog' || value === 'news');
}

/**
 * Type guard for string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Type guard for number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Type guard for non-empty string
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Type guard for positive integer
 */
export function isPositiveInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

/**
 * Type guard for object with properties
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Type guard for environment variables
 */
export function isValidEnvironment(env: string | undefined): env is 'development' | 'production' | 'test' {
  return env === 'development' || env === 'production' || env === 'test';
}