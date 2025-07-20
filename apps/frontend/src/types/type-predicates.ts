// Comprehensive type predicates collection for runtime type checking

import {
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isArray,
  isObject,
  isDefined,
  isNonEmptyString,
  isEmail,
  isURL,
  isDate,
  isDateString,
  isApiResponse,
  isApiError,
  isArticle,
  isAppError,
  isReactElement,
  isReactNode,
  isHTMLElement,
  isEvent,
  isProduction,
  isDevelopment,
  isClient,
  isServer,
} from './guards';

// Commonly used type predicates as a comprehensive collection
export const TypePredicates = {
  // Primitives
  isString,
  isNumber,
  isBoolean,
  isFunction,

  // Collections
  isArray,
  isObject,
  isNonEmptyArray: <T>(value: unknown): value is [T, ...T[]] =>
    Array.isArray(value) && value.length > 0,

  // Values
  isDefined,
  isNull: (value: unknown): value is null => value === null,
  isUndefined: (value: unknown): value is undefined => value === undefined,
  isNullish: (value: unknown): value is null | undefined => value === null || value === undefined,

  // Strings
  isNonEmptyString,
  isEmail,
  isURL,

  // Dates
  isDate,
  isDateString,

  // API
  isApiResponse,
  isApiError,
  isArticle,

  // Errors
  isAppError,
  isError: (value: unknown): value is Error => value instanceof Error,

  // React
  isReactElement,
  isReactNode,

  // Browser APIs
  isHTMLElement,
  isEvent,

  // Environment
  isProduction,
  isDevelopment,
  isClient,
  isServer,
} as const;
