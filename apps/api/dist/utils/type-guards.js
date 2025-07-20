/**
 * Type guards for runtime type safety
 */
/**
 * Type guard for Locale
 */
export function isValidLocale(value) {
    return typeof value === 'string' && (value === 'en' || value === 'ja');
}
/**
 * Type guard for ArticleType
 */
export function isValidArticleType(value) {
    return typeof value === 'string' && (value === 'blog' || value === 'news');
}
/**
 * Type guard for string
 */
export function isString(value) {
    return typeof value === 'string';
}
/**
 * Type guard for number
 */
export function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}
/**
 * Type guard for non-empty string
 */
export function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}
/**
 * Type guard for positive integer
 */
export function isPositiveInteger(value) {
    return typeof value === 'number' && Number.isInteger(value) && value > 0;
}
/**
 * Type guard for object with properties
 */
export function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
/**
 * Type guard for environment variables
 */
export function isValidEnvironment(env) {
    return env === 'development' || env === 'production' || env === 'test';
}
