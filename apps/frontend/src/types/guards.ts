// Re-export type guards from focused modules for backward compatibility
// This approach maintains existing imports while organizing guards into logical domains

// Primitive type guards
export type {
  LoadingState,
  AsyncState,
  Result,
  Option,
  NonEmptyArray,
  Email,
  DateString,
  DateTimeString,
} from './common';

export {
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isObject,
  isArray,
  isNull,
  isUndefined,
  isNullish,
  isDefined,
  isNonEmptyString,
  isPositiveNumber,
  isNonNegativeNumber,
  isInteger,
  isPositiveInteger,
  isFiniteNumber,
  isNonEmptyArray,
  isArrayOf,
  isStringArray,
  isNumberArray,
  isDate,
  isDateString,
  isDateTimeString,
  isTimestamp,
  isEmail,
  isURL,
  isHttpURL,
  hasProperty,
  hasProperties,
  isOneOf,
  isLoadingState,
  isAsyncState,
  isResult,
  isSuccessResult,
  isErrorResult,
  isSome,
  isNone,
  isProduction,
  isDevelopment,
  isTest,
  isClient,
  isServer,
} from './guards/primitive-guards';

// API-related guards
export {
  isArticle,
  isArticlesResponse,
  isApiResponse,
  isApiError,
  isErrorResponse,
  isPaginationMetadata,
  isSupportedLocale,
  isTranslationKey,
  isBaseTimelineItem,
  isExternalLinkItem,
  isProfileData,
} from './guards/api-guards';

// Error-related guards
export {
  isAppError,
  isErrorCategory,
  isErrorSeverity,
  isComponentError,
  isNetworkError,
  isValidationError,
} from './guards/error-guards';

// DOM and React guards
export {
  isReactElement,
  isReactNode,
  isHTMLElement,
  isElement,
  isEvent,
  isMouseEvent,
  isKeyboardEvent,
  isFormData,
  isFile,
  isBlob,
  isReactErrorInfo,
} from './guards/dom-guards';

// Utility guards
export {
  validateAndGuard,
  createArrayGuard,
  createObjectGuard,
  getType,
  debugTypeInfo,
  assertIsString,
  assertIsNumber,
  assertIsArray,
  assertIsObject,
  assertUnreachable,
} from './guards/utility-guards';
