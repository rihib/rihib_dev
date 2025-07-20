// Core error type definitions and interfaces

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

// Error recovery actions
export interface ErrorRecoveryAction {
  type: 'retry' | 'reload' | 'redirect' | 'contact_support' | 'none';
  label: string;
  action?: () => void | Promise<void>;
  url?: string;
  params?: Record<string, unknown>;
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

// Error aggregation types
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
