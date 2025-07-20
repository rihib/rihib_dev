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

// Error aggregation utilities
export function aggregateErrors(errors: AppError[]): ErrorSummary {
  const summary: ErrorSummary = {
    total: errors.length,
    byCategory: {} as Record<ErrorCategory, number>,
    bySeverity: {} as Record<ErrorSeverity, number>,
    topErrors: [],
    trends: { increasing: [], decreasing: [] },
  };

  // Count by category and severity
  errors.forEach((error) => {
    summary.byCategory[error.category] = (summary.byCategory[error.category] || 0) + 1;
    summary.bySeverity[error.severity] = (summary.bySeverity[error.severity] || 0) + 1;
  });

  // Find top errors by frequency
  const errorCounts = errors.reduce(
    (acc, error) => {
      acc[error.code] = (acc[error.code] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  summary.topErrors = Object.entries(errorCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([code, count]) => ({
      code,
      count,
      lastSeen: errors.find((e) => e.code === code)?.timestamp || '',
    }));

  return summary;
}
