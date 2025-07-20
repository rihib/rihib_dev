// Central type exports for improved developer experience and discoverability

// Core utility types
export type * from './common';

// API and data types
export type * from './api';
export type * from './profile';

// UI and component types
export type * from './components';
export type * from './theme';

// Error handling types
export type * from './errors';

// Internationalization types
export type * from './translations';

// Type guards and validators
export * from './guards';

// Re-export commonly used utilities for convenience
export {
  // Type guards
  isString,
  isNumber,
  isArray,
  isObject,
  isDefined,
  isNonEmptyString,
  isDateString,
  isURL,
  isEmail,

  // API guards
  isApiResponse,
  isApiError,
  isArticle,
  isArticlesResponse,

  // Error guards
  isAppError,
  isNetworkError,
  isValidationError,

  // Form guards
  isFormData,

  // React guards
  isReactElement,
  isReactNode,

  // Environment guards
  isProduction,
  isDevelopment,
  isClient,
  isServer,

  // Validation utilities
  validateAndGuard,
  createArrayGuard,
  createObjectGuard,

  // Debug utilities
  getType,
  debugTypeInfo,
} from './guards';

// Export error factories for convenience
export {
  createAppError,
  createNetworkError,
  createValidationError,
  createComponentError,
  createAPIClientError,
  createHookError,
} from './errors';

// Type assertion utilities for better developer experience
export {
  assertIsString,
  assertIsNumber,
  assertIsArray,
  assertIsObject,
  assertUnreachable,
} from './guards';

// Utility exports for backward compatibility and convenience
export { TypePredicates } from './type-predicates';
