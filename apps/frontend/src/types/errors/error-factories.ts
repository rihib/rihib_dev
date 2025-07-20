// Error factory functions for creating consistent error instances

import type {
  AppError,
  ErrorCategory,
  ErrorSeverity,
  NetworkError,
  ValidationError,
  ComponentError,
  APIClientError,
  HookError,
  TimeoutError,
  PerformanceError,
} from './error-types';

// Base error factory
export function createAppError(
  code: string,
  message: string,
  category: ErrorCategory,
  severity: ErrorSeverity = 'medium',
  context?: Record<string, unknown>
): AppError {
  return {
    code,
    message,
    category,
    severity,
    timestamp: new Date().toISOString(),
    context,
  };
}

// Network error factory
export function createNetworkError(
  message: string,
  status?: number,
  url?: string,
  method?: string
): NetworkError {
  const baseError = createAppError('NETWORK_ERROR', message, 'network', 'high');
  return {
    ...baseError,
    category: 'network' as const,
    status,
    url,
    method,
  };
}

// Validation error factory
export function createValidationError(
  message: string,
  field?: string,
  value?: unknown,
  constraints?: string[]
): ValidationError {
  const baseError = createAppError('VALIDATION_ERROR', message, 'validation', 'medium');
  return {
    ...baseError,
    category: 'validation' as const,
    field,
    value,
    constraints,
    retryable: false,
    userMessage: `Please check the ${field ? field + ' ' : ''}field and try again.`,
    recoveryAction: {
      type: 'none',
      label: 'Fix validation errors',
    },
  };
}

// Component error factory
export function createComponentError(
  componentName: string,
  message: string,
  error?: Error
): ComponentError {
  return {
    ...createAppError(
      'COMPONENT_ERROR',
      `Error in component ${componentName}: ${message}`,
      'client',
      'high'
    ),
    componentName,
    cause: error,
    retryable: true,
    userMessage: 'Something went wrong. Please try refreshing the page.',
    recoveryAction: {
      type: 'reload',
      label: 'Refresh page',
    },
  };
}

// API client error factory
export function createAPIClientError(
  endpoint: string,
  method: string,
  message: string,
  status?: number
): APIClientError {
  const severity: ErrorSeverity = status && status >= 500 ? 'high' : 'medium';
  const retryable = status ? status >= 500 || status === 429 : false;

  return {
    ...createAppError('API_CLIENT_ERROR', message, 'network', severity),
    endpoint,
    method,
    retryable,
    userMessage: retryable
      ? 'Server temporarily unavailable. Please try again in a moment.'
      : 'Unable to complete request. Please check your connection and try again.',
    recoveryAction: {
      type: retryable ? 'retry' : 'none',
      label: retryable ? 'Try again' : 'Check connection',
    },
    metadata: {
      component: 'APIClient',
      function: `${method} ${endpoint}`,
    },
  };
}

// Hook error factory
export function createHookError(
  hookName: string,
  message: string,
  dependencies?: unknown[]
): HookError {
  return {
    ...createAppError('HOOK_ERROR', `Error in hook ${hookName}: ${message}`, 'client', 'medium'),
    hookName,
    dependencies,
    retryable: false,
    technicalMessage: `Hook ${hookName} failed with dependencies: ${JSON.stringify(dependencies)}`,
    metadata: {
      component: 'Hook',
      function: hookName,
    },
  };
}
