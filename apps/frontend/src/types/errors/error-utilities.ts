// Error utility functions for type guards and error analysis

import type {
  AppError,
  NetworkError,
  ValidationError,
  AuthenticationError,
  ServerError,
  ErrorSummary,
  ErrorCategory,
  ErrorSeverity,
} from './error-types';

// Enhanced type guards for error identification
export function isAppError(error: unknown): error is AppError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    'category' in error &&
    'severity' in error &&
    'timestamp' in error &&
    typeof (error as AppError).code === 'string' &&
    typeof (error as AppError).message === 'string' &&
    typeof (error as AppError).timestamp === 'string'
  );
}

export function isRetryableError(error: AppError): boolean {
  return (
    error.retryable === true ||
    error.category === 'network' ||
    error.category === 'timeout' ||
    (error.category === 'server' && error.severity !== 'critical')
  );
}

export function isUserFacingError(error: AppError): boolean {
  return (
    error.severity === 'high' ||
    error.severity === 'critical' ||
    ['authentication', 'authorization', 'validation'].includes(error.category)
  );
}

export function isNetworkError(error: AppError): error is NetworkError {
  return error.category === 'network';
}

export function isValidationError(error: AppError): error is ValidationError {
  return error.category === 'validation';
}

export function isAuthenticationError(error: AppError): error is AuthenticationError {
  return error.category === 'authentication';
}

export function isServerError(error: AppError): error is ServerError {
  return error.category === 'server';
}
