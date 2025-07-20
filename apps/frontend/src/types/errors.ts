// Error severity levels for consistent error handling
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

// Error categories for better organization
export type ErrorCategory =
  | 'network'
  | 'validation'
  | 'authentication'
  | 'authorization'
  | 'not_found'
  | 'server'
  | 'client'
  | 'parsing'
  | 'timeout'
  | 'rate_limit'
  | 'unknown';

// Base application error interface with enhanced metadata
export interface AppError {
  code: string;
  message: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  timestamp: string;
  requestId?: string;
  userId?: string;
  sessionId?: string;
  traceId?: string;
  context?: Record<string, unknown>;
  stack?: string;
  cause?: Error;
  retryable?: boolean;
  userMessage?: string; // User-friendly message for display
  technicalMessage?: string; // Technical details for debugging
  recoveryAction?: ErrorRecoveryAction;
  metadata?: ErrorMetadata;
}

// Enhanced error metadata
export interface ErrorMetadata {
  component?: string;
  function?: string;
  line?: number;
  column?: number;
  userAgent?: string;
  url?: string;
  referrer?: string;
  buildVersion?: string;
  environment?: 'dev' | 'staging' | 'prd';
  feature?: string;
  experimentId?: string;
}

// Error recovery actions
export interface ErrorRecoveryAction {
  type: 'retry' | 'reload' | 'redirect' | 'contact_support' | 'none';
  label: string;
  action?: () => void | Promise<void>;
  url?: string;
  params?: Record<string, unknown>;
}

// Specific error types
export interface NetworkError extends AppError {
  category: 'network';
  status?: number;
  url?: string;
  method?: string;
}

export interface ValidationError extends AppError {
  category: 'validation';
  field?: string;
  value?: unknown;
  constraints?: string[];
}

export interface AuthenticationError extends AppError {
  category: 'authentication';
  authMethod?: string;
}

export interface AuthorizationError extends AppError {
  category: 'authorization';
  requiredPermissions?: string[];
  userPermissions?: string[];
}

export interface NotFoundError extends AppError {
  category: 'not_found';
  resource?: string;
  resourceId?: string | number;
}

export interface ServerError extends AppError {
  category: 'server';
  status: number;
  serverMessage?: string;
}

export interface ClientError extends AppError {
  category: 'client';
  userAgent?: string;
  url?: string;
}

export interface ParsingError extends AppError {
  category: 'parsing';
  data?: string;
  format?: string;
}

export interface TimeoutError extends AppError {
  category: 'timeout';
  timeout?: number;
  operation?: string;
}

export interface RateLimitError extends AppError {
  category: 'rate_limit';
  limit?: number;
  resetTime?: string;
  retryAfter?: number;
}

// Union type for all specific errors
export type SpecificError =
  | NetworkError
  | ValidationError
  | AuthenticationError
  | AuthorizationError
  | NotFoundError
  | ServerError
  | ClientError
  | ParsingError
  | TimeoutError
  | RateLimitError;

// Error handler function types
export type ErrorHandler = (error: AppError) => void;

export type AsyncErrorHandler = (error: AppError) => Promise<void>;

// Error recovery strategies
export type ErrorRecoveryStrategy =
  | 'retry'
  | 'fallback'
  | 'ignore'
  | 'escalate'
  | 'redirect'
  | 'refresh';

export interface ErrorRecoveryOptions {
  strategy: ErrorRecoveryStrategy;
  maxRetries?: number;
  retryDelay?: number;
  fallbackValue?: unknown;
  redirectUrl?: string;
}

// Error boundary types
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorId: string;
}

export interface ErrorBoundaryFallbackProps {
  error: Error;
  errorInfo?: React.ErrorInfo;
  reset: () => void;
  errorId: string;
}

export type ErrorBoundaryFallbackComponent = React.ComponentType<ErrorBoundaryFallbackProps>;

// Error reporting and logging
export interface ErrorReportData {
  error: AppError;
  userAgent: string;
  url: string;
  userId?: string;
  sessionId?: string;
  buildVersion: string;
  environment: string;
  breadcrumbs?: ErrorBreadcrumb[];
}

export interface ErrorBreadcrumb {
  timestamp: string;
  category: string;
  message: string;
  level: 'debug' | 'info' | 'warning' | 'error';
  data?: Record<string, unknown>;
}

// Enhanced error notification types
export interface ErrorNotification {
  id: string;
  title: string;
  message: string;
  severity: ErrorSeverity;
  dismissible: boolean;
  autoClose?: boolean;
  autoCloseDelay?: number;
  actions?: ErrorNotificationAction[];
  timestamp: string;
  source?: 'user' | 'system' | 'api';
  category?: ErrorCategory;
  metadata?: Record<string, unknown>;
  seen?: boolean;
  resolved?: boolean;
}

export interface ErrorToast extends ErrorNotification {
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
  closeButton?: boolean;
  progress?: boolean;
  pauseOnHover?: boolean;
}

export interface ErrorModal extends ErrorNotification {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  backdrop?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  showDetails?: boolean;
  reportable?: boolean;
}

export interface ErrorNotificationAction {
  label: string;
  action: () => void | Promise<void>;
  style?: 'primary' | 'secondary' | 'danger';
}

// Enhanced form-specific error types
export interface FormFieldError {
  field: string;
  message: string;
  code?: string;
  value?: unknown;
  constraint?: string;
  suggestion?: string;
}

export interface FormError extends AppError {
  category: 'validation';
  fieldErrors: FormFieldError[];
  generalErrors: string[];
  formId?: string;
  submission?: Record<string, unknown>;
}

// Component-specific error types
export interface ComponentError extends AppError {
  componentName: string;
  componentProps?: Record<string, unknown>;
  componentStack?: string;
  boundaryName?: string;
}

export interface HookError extends AppError {
  hookName: string;
  hookParams?: unknown[];
  dependencies?: unknown[];
}

export interface APIClientError extends AppError {
  endpoint: string;
  method: string;
  requestData?: unknown;
  responseData?: unknown;
  requestHeaders?: Record<string, string>;
  responseHeaders?: Record<string, string>;
}

// State management error types
export interface StateError extends AppError {
  category: 'client';
  statePath?: string;
  currentState?: unknown;
  action?: {
    type: string;
    payload?: unknown;
  };
}

// Performance and monitoring error types
export interface PerformanceError extends AppError {
  category: 'client';
  metric: 'memory' | 'cpu' | 'network' | 'render' | 'bundle_size';
  threshold: number;
  actual: number;
  measurementType: 'duration' | 'size' | 'count' | 'percentage';
}

// Security error types
export interface SecurityError extends AppError {
  category: 'authentication' | 'authorization';
  securityContext?: {
    userRole?: string;
    permissions?: string[];
    resource?: string;
    action?: string;
  };
  threat?: 'xss' | 'csrf' | 'injection' | 'unauthorized_access' | 'data_breach';
}

// API-specific error types
export interface ApiErrorResponse {
  error: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
  timestamp?: string;
  requestId?: string;
}

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

// Error factory functions
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

export function createTimeoutError(
  message: string,
  timeout?: number,
  operation?: string
): TimeoutError {
  const baseError = createAppError('TIMEOUT_ERROR', message, 'timeout', 'medium');
  return {
    ...baseError,
    category: 'timeout' as const,
    timeout,
    operation,
    retryable: true,
    userMessage: 'The request is taking longer than expected. Please try again.',
    recoveryAction: {
      type: 'retry',
      label: 'Try again',
    },
    metadata: {
      component: 'TimeoutHandler',
      function: operation || 'unknown',
    },
  };
}

export function createPerformanceError(
  metric: PerformanceError['metric'],
  threshold: number,
  actual: number,
  measurementType: PerformanceError['measurementType']
): PerformanceError {
  const baseError = createAppError(
    'PERFORMANCE_ERROR',
    `Performance threshold exceeded for ${metric}: ${actual}${measurementType} > ${threshold}${measurementType}`,
    'client',
    'low'
  );
  return {
    ...baseError,
    category: 'client' as const,
    metric,
    threshold,
    actual,
    measurementType,
    retryable: false,
    technicalMessage: `Performance metric ${metric} exceeded threshold`,
    metadata: {
      component: 'PerformanceMonitor',
      function: 'measurePerformance',
    },
  };
}

// Error aggregation utilities
export interface ErrorSummary {
  total: number;
  byCategory: Record<ErrorCategory, number>;
  bySeverity: Record<ErrorSeverity, number>;
  topErrors: Array<{ code: string; count: number; lastSeen: string }>;
  trends: {
    increasing: string[];
    decreasing: string[];
  };
}

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
