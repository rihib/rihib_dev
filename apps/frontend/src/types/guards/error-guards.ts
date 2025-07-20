// Error-related type guards for error handling and validation

import type {
  AppError,
  ErrorCategory,
  ErrorSeverity,
  ComponentError,
  NetworkError,
  ValidationError,
} from '../errors';
import {
  isObject,
  hasProperty,
  hasProperties,
  isNonEmptyString,
  isDateTimeString,
  isOneOf,
} from './primitive-guards';

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
