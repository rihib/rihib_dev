/**
 * Type guards for runtime type safety
 */
import type { Locale, ArticleType } from '../schemas.js';
/**
 * Type guard for Locale
 */
export declare function isValidLocale(value: unknown): value is Locale;
/**
 * Type guard for ArticleType
 */
export declare function isValidArticleType(value: unknown): value is ArticleType;
/**
 * Type guard for string
 */
export declare function isString(value: unknown): value is string;
/**
 * Type guard for number
 */
export declare function isNumber(value: unknown): value is number;
/**
 * Type guard for non-empty string
 */
export declare function isNonEmptyString(value: unknown): value is string;
/**
 * Type guard for positive integer
 */
export declare function isPositiveInteger(value: unknown): value is number;
/**
 * Type guard for object with properties
 */
export declare function isObject(value: unknown): value is Record<string, unknown>;
/**
 * Type guard for environment variables
 */
export declare function isValidEnvironment(env: string | undefined): env is 'development' | 'production' | 'test';
//# sourceMappingURL=type-guards.d.ts.map