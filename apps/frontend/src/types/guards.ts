// Comprehensive type guards for runtime safety and validation

import type {
  Article,
  ArticlesApiResponse,
  ErrorResponse,
  ApiResponse,
  ApiError,
  PaginationMetadata,
} from './api';
import type {
  AppError,
  ErrorCategory,
  ErrorSeverity,
  ComponentError,
  NetworkError,
  ValidationError,
} from './errors';
import type { SupportedLocale, TranslationKeys } from './translations';
import type { BaseTimelineItem, ExternalLinkItem, ProfileData } from './profile';
import type {
  LoadingState,
  AsyncState,
  Result,
  Option,
  NonEmptyArray,
  Email,
  DateString,
  DateTimeString,
} from './common';

// Primitive type guards
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value);
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

// Enhanced primitive guards
export function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value.length > 0;
}

export function isPositiveNumber(value: unknown): value is number {
  return isNumber(value) && value > 0;
}

export function isNonNegativeNumber(value: unknown): value is number {
  return isNumber(value) && value >= 0;
}

export function isInteger(value: unknown): value is number {
  return isNumber(value) && Number.isInteger(value);
}

export function isPositiveInteger(value: unknown): value is number {
  return isInteger(value) && value > 0;
}

export function isFiniteNumber(value: unknown): value is number {
  return isNumber(value) && Number.isFinite(value);
}

// Array type guards
export function isNonEmptyArray<T>(value: unknown): value is NonEmptyArray<T> {
  return Array.isArray(value) && value.length > 0;
}

export function isArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && value.every(guard);
}

export function isStringArray(value: unknown): value is string[] {
  return isArrayOf(value, isString);
}

export function isNumberArray(value: unknown): value is number[] {
  return isArrayOf(value, isNumber);
}

// Date and time guards
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

export function isDateString(value: unknown): value is DateString {
  if (!isString(value)) return false;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
}

export function isDateTimeString(value: unknown): value is DateTimeString {
  if (!isString(value)) return false;
  try {
    const date = new Date(value);
    return !isNaN(date.getTime()) && value === date.toISOString();
  } catch {
    return false;
  }
}

export function isTimestamp(value: unknown): value is number {
  return isPositiveNumber(value) && value > 0 && value < Date.now() * 2;
}

// Email validation
export function isEmail(value: unknown): value is Email {
  if (!isString(value)) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

// URL validation
export function isURL(value: unknown): value is string {
  if (!isString(value)) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function isHttpURL(value: unknown): value is string {
  return isURL(value) && (value.startsWith('http://') || value.startsWith('https://'));
}

// Generic utility guards
export function hasProperty<K extends string>(obj: unknown, key: K): obj is Record<K, unknown> {
  return isObject(obj) && key in obj;
}

export function hasProperties<K extends string>(
  obj: unknown,
  keys: K[]
): obj is Record<K, unknown> {
  return isObject(obj) && keys.every((key) => key in obj);
}

export function isOneOf<T extends readonly unknown[]>(
  value: unknown,
  options: T
): value is T[number] {
  return (options as readonly unknown[]).includes(value);
}

// Loading state guards
export function isLoadingState(value: unknown): value is LoadingState {
  return isOneOf(value, ['idle', 'loading', 'success', 'error']);
}

export function isAsyncState<T>(
  value: unknown,
  dataGuard?: (data: unknown) => data is T
): value is AsyncState<T> {
  if (!isObject(value)) return false;

  const hasRequiredProps = hasProperties(value, ['loading', 'error']);
  if (!hasRequiredProps) return false;

  const { loading, error, data } = value as Record<string, unknown>;

  if (!isBoolean(loading)) return false;
  if (error !== null && !(error instanceof Error)) return false;

  if (dataGuard && data !== null) {
    return dataGuard(data);
  }

  return true;
}

// Result type guards
export function isResult<T, E = Error>(
  value: unknown,
  dataGuard?: (data: unknown) => data is T,
  errorGuard?: (error: unknown) => error is E
): value is Result<T, E> {
  if (!isObject(value)) return false;

  if (!hasProperty(value, 'success') || !isBoolean(value.success)) {
    return false;
  }

  if (value.success) {
    return hasProperty(value, 'data') && (dataGuard ? dataGuard(value.data) : true);
  } else {
    return hasProperty(value, 'error') && (errorGuard ? errorGuard(value.error) : true);
  }
}

export function isSuccessResult<T>(
  result: Result<T, unknown>
): result is { success: true; data: T } {
  return result.success;
}

export function isErrorResult<E>(
  result: Result<unknown, E>
): result is { success: false; error: E } {
  return !result.success;
}

// Option type guards
export function isSome<T>(value: Option<T>): value is T {
  return value !== null && value !== undefined;
}

export function isNone<T>(value: Option<T>): value is null | undefined {
  return value === null || value === undefined;
}

// API-related guards
export function isArticle(value: unknown): value is Article {
  if (!isObject(value)) return false;

  const requiredProps = ['id', 'title', 'published_at', 'url', 'type', 'locale', 'created_at'];
  if (!hasProperties(value, requiredProps)) return false;

  const { id, title, published_at, url, type, locale, created_at } = value as Record<
    string,
    unknown
  >;

  return (
    isPositiveInteger(id) &&
    isNonEmptyString(title) &&
    isDateString(published_at) &&
    isHttpURL(url) &&
    isOneOf(type, ['blog', 'news']) &&
    isOneOf(locale, ['en', 'ja']) &&
    isDateTimeString(created_at)
  );
}

export function isArticlesResponse(value: unknown): value is ArticlesApiResponse {
  return isObject(value) && hasProperty(value, 'articles') && isArrayOf(value.articles, isArticle);
}

export function isApiResponse<T>(
  value: unknown,
  dataGuard?: (data: unknown) => data is T
): value is ApiResponse<T> {
  if (!isObject(value)) return false;
  if (!hasProperties(value, ['data', 'status'])) return false;

  const { data, status } = value as Record<string, unknown>;

  if (!isPositiveInteger(status)) return false;
  if (dataGuard && !dataGuard(data)) return false;

  return true;
}

export function isApiError(value: unknown): value is ApiError {
  return value instanceof Error && hasProperty(value, 'status') && isNumber((value as any).status);
}

export function isErrorResponse(value: unknown): value is ErrorResponse {
  return isObject(value) && hasProperty(value, 'error') && isNonEmptyString(value.error);
}

export function isPaginationMetadata(value: unknown): value is PaginationMetadata {
  if (!isObject(value)) return false;

  const requiredProps = ['page', 'limit', 'total', 'hasNext', 'hasPrevious'];
  if (!hasProperties(value, requiredProps)) return false;

  const { page, limit, total, hasNext, hasPrevious } = value as Record<string, unknown>;

  return (
    isPositiveInteger(page) &&
    isPositiveInteger(limit) &&
    isNonNegativeNumber(total) &&
    isBoolean(hasNext) &&
    isBoolean(hasPrevious)
  );
}

// Error type guards
export function isAppError(value: unknown): value is AppError {
  if (!isObject(value)) return false;

  const requiredProps = ['code', 'message', 'category', 'severity', 'timestamp'];
  if (!hasProperties(value, requiredProps)) return false;

  const { code, message, category, severity, timestamp } = value as Record<string, unknown>;

  return (
    isNonEmptyString(code) &&
    isNonEmptyString(message) &&
    isErrorCategory(category) &&
    isErrorSeverity(severity) &&
    isDateTimeString(timestamp)
  );
}

export function isErrorCategory(value: unknown): value is ErrorCategory {
  return isOneOf(value, [
    'network',
    'validation',
    'authentication',
    'authorization',
    'not_found',
    'server',
    'client',
    'parsing',
    'timeout',
    'rate_limit',
    'unknown',
  ]);
}

export function isErrorSeverity(value: unknown): value is ErrorSeverity {
  return isOneOf(value, ['low', 'medium', 'high', 'critical']);
}

export function isComponentError(value: unknown): value is ComponentError {
  return (
    isAppError(value) &&
    hasProperty(value, 'componentName') &&
    isNonEmptyString(value.componentName)
  );
}

export function isNetworkError(value: unknown): value is NetworkError {
  return isAppError(value) && value.category === 'network';
}

export function isValidationError(value: unknown): value is ValidationError {
  return isAppError(value) && value.category === 'validation';
}

// Translation guards
export function isSupportedLocale(value: unknown): value is SupportedLocale {
  return isOneOf(value, ['en', 'ja']);
}

export function isTranslationKey(value: unknown): value is TranslationKeys {
  // This would need to be generated or maintained based on actual translation keys
  return isString(value) && value.includes('.');
}

// Profile data guards
export function isBaseTimelineItem(value: unknown): value is BaseTimelineItem {
  if (!isObject(value)) return false;

  const requiredProps = ['titleKey', 'periodKey', 'url', 'borderColor'];
  if (!hasProperties(value, requiredProps)) return false;

  const { titleKey, periodKey, url, borderColor } = value as Record<string, unknown>;

  return (
    isNonEmptyString(titleKey) &&
    isNonEmptyString(periodKey) &&
    isHttpURL(url) &&
    isNonEmptyString(borderColor)
  );
}

export function isExternalLinkItem(value: unknown): value is ExternalLinkItem {
  if (!isObject(value)) return false;

  const requiredProps = ['titleKey', 'url', 'borderColor'];
  if (!hasProperties(value, requiredProps)) return false;

  const { titleKey, url, borderColor } = value as Record<string, unknown>;

  return isNonEmptyString(titleKey) && isHttpURL(url) && isNonEmptyString(borderColor);
}

export function isProfileData(value: unknown): value is ProfileData {
  if (!isObject(value)) return false;

  const requiredProps = [
    'socialLinks',
    'internships',
    'education',
    'research',
    'oss',
    'personalProjects',
    'freelance',
    'activities',
    'badges',
    'papers',
    'speaking',
  ];
  if (!hasProperties(value, requiredProps)) return false;

  // Additional validation could be added for each property
  return true;
}

// React-specific guards
export function isReactElement(value: unknown): value is React.ReactElement {
  return (
    isObject(value) &&
    hasProperty(value, '$$typeof') &&
    hasProperty(value, 'type') &&
    hasProperty(value, 'props')
  );
}

export function isReactNode(value: unknown): value is React.ReactNode {
  return (
    isString(value) ||
    isNumber(value) ||
    isBoolean(value) ||
    isNull(value) ||
    isUndefined(value) ||
    isReactElement(value) ||
    (isArray(value) && value.every(isReactNode))
  );
}

// DOM-related guards
export function isHTMLElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement;
}

export function isElement(value: unknown): value is Element {
  return value instanceof Element;
}

export function isEvent(value: unknown): value is Event {
  return value instanceof Event;
}

export function isMouseEvent(value: unknown): value is MouseEvent {
  return value instanceof MouseEvent;
}

export function isKeyboardEvent(value: unknown): value is KeyboardEvent {
  return value instanceof KeyboardEvent;
}

// Browser API guards
export function isFormData(value: unknown): value is FormData {
  return value instanceof FormData;
}

export function isFile(value: unknown): value is File {
  return value instanceof File;
}

export function isBlob(value: unknown): value is Blob {
  return value instanceof Blob;
}

// Error boundary guards
export function isReactErrorInfo(value: unknown): value is React.ErrorInfo {
  return isObject(value) && hasProperty(value, 'componentStack') && isString(value.componentStack);
}

// Environment guards
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function isTest(): boolean {
  return process.env.NODE_ENV === 'test';
}

export function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function isServer(): boolean {
  return typeof window === 'undefined';
}

// Composite guards for complex validation
export function validateAndGuard<T>(
  value: unknown,
  guard: (value: unknown) => value is T,
  errorMessage?: string
): T {
  if (guard(value)) {
    return value;
  }
  throw new Error(errorMessage || `Value failed type guard validation`);
}

export function createArrayGuard<T>(itemGuard: (item: unknown) => item is T) {
  return (value: unknown): value is T[] => {
    return isArrayOf(value, itemGuard);
  };
}

export function createObjectGuard<T extends Record<string, unknown>>(schema: {
  [K in keyof T]: (value: unknown) => value is T[K];
}) {
  return (value: unknown): value is T => {
    if (!isObject(value)) return false;

    return Object.entries(schema).every(([key, guard]) => {
      return hasProperty(value, key) && guard(value[key]);
    });
  };
}

// Debug utilities for type checking
export function getType(value: unknown): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return 'array';
  if (value instanceof Date) return 'date';
  if (value instanceof RegExp) return 'regexp';
  if (value instanceof Error) return 'error';
  return typeof value;
}

export function debugTypeInfo(value: unknown): Record<string, unknown> {
  return {
    type: getType(value),
    constructor: value?.constructor?.name,
    isArray: Array.isArray(value),
    isObject: isObject(value),
    keys: isObject(value) ? Object.keys(value) : undefined,
    length: isArray(value) || isString(value) ? (value as any).length : undefined,
    prototype: value?.constructor?.prototype?.constructor?.name,
  };
}

// Type assertion utilities
export function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error(`Expected string, got ${typeof value}`);
  }
}

export function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number') {
    throw new Error(`Expected number, got ${typeof value}`);
  }
}

export function assertIsArray<T>(value: unknown): asserts value is T[] {
  if (!Array.isArray(value)) {
    throw new Error(`Expected array, got ${typeof value}`);
  }
}

export function assertIsObject(value: unknown): asserts value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`Expected object, got ${typeof value}`);
  }
}

// Type-safe exhaustive checking
export function assertUnreachable(x: never): never {
  throw new Error(`Unreachable code reached with value: ${x}`);
}
