// API-related type guards for data validation

import type {
  Article,
  ArticlesApiResponse,
  ErrorResponse,
  ApiResponse,
  ApiError,
  PaginationMetadata,
} from '../api';
import type { SupportedLocale, TranslationKeys } from '../translations';
import type { BaseTimelineItem, ExternalLinkItem, ProfileData } from '../profile';
import {
  isObject,
  hasProperty,
  hasProperties,
  isPositiveInteger,
  isNonEmptyString,
  isDateString,
  isHttpURL,
  isOneOf,
  isDateTimeString,
  isArrayOf,
  isNumber,
  isNonNegativeNumber,
  isBoolean,
  isString,
} from './primitive-guards';

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
