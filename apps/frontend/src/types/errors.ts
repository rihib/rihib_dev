// Re-export error types from focused modules for backward compatibility
// This approach maintains existing imports while organizing error handling into logical modules

// Error type definitions
export type {
  ErrorSeverity,
  ErrorCategory,
  ErrorRecoveryAction,
  ErrorMetadata,
  AppError,
  NetworkError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ServerError,
  ClientError,
  ParsingError,
  TimeoutError,
  RateLimitError,
  SpecificError,
  ErrorHandler,
  AsyncErrorHandler,
  ErrorRecoveryStrategy,
  ErrorRecoveryOptions,
  ErrorBoundaryState,
  ErrorBoundaryFallbackProps,
  ErrorBoundaryFallbackComponent,
  ErrorReportData,
  ErrorBreadcrumb,
  ErrorNotification,
  ErrorToast,
  ErrorModal,
  ErrorNotificationAction,
  FormFieldError,
  FormError,
  ComponentError,
  HookError,
  APIClientError,
  StateError,
  PerformanceError,
  SecurityError,
  ApiErrorResponse,
  ErrorSummary,
} from './errors/error-types';

// Error factory functions
export {
  createAppError,
  createNetworkError,
  createValidationError,
  createComponentError,
  createAPIClientError,
  createHookError,
} from './errors/error-factories';

// Error utility functions
export {
  isAppError,
  isRetryableError,
  isUserFacingError,
  isNetworkError,
  isValidationError,
  isAuthenticationError,
  isServerError,
} from './errors/error-utilities';
