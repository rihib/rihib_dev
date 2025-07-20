'use client';

import type { AppError, ErrorReportData, ErrorBreadcrumb, ErrorSeverity } from '@/types/errors';

class ErrorLogger {
  private breadcrumbs: ErrorBreadcrumb[] = [];
  private maxBreadcrumbs = 50;
  private reportingEndpoint: string | null = null;

  constructor() {
    // Initialize reporting endpoint based on environment
    this.reportingEndpoint = process.env.NEXT_PUBLIC_ERROR_REPORTING_URL || null;

    // Set up global error handlers only on the client side
    if (typeof window !== 'undefined') {
      this.setupGlobalErrorHandlers();
    }
  }

  private setupGlobalErrorHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));

      this.logError({
        code: 'UNHANDLED_PROMISE_REJECTION',
        message: error.message,
        category: 'client',
        severity: 'high',
        timestamp: new Date().toISOString(),
        cause: error,
        context: {
          type: 'unhandledrejection',
          promise: event.promise,
        },
        metadata: {
          component: 'GlobalErrorHandler',
          function: 'unhandledrejection',
          url: window.location.href,
          userAgent: navigator.userAgent,
        },
      });
    });

    // Handle global JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError({
        code: 'GLOBAL_JAVASCRIPT_ERROR',
        message: event.message,
        category: 'client',
        severity: 'high',
        timestamp: new Date().toISOString(),
        context: {
          type: 'error',
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
        metadata: {
          component: 'GlobalErrorHandler',
          function: 'error',
          url: window.location.href,
          userAgent: navigator.userAgent,
          line: event.lineno,
          column: event.colno,
        },
      });
    });
  }

  addBreadcrumb(breadcrumb: Omit<ErrorBreadcrumb, 'timestamp'>) {
    const fullBreadcrumb: ErrorBreadcrumb = {
      ...breadcrumb,
      timestamp: new Date().toISOString(),
    };

    this.breadcrumbs.push(fullBreadcrumb);

    // Keep only the most recent breadcrumbs
    if (this.breadcrumbs.length > this.maxBreadcrumbs) {
      this.breadcrumbs = this.breadcrumbs.slice(-this.maxBreadcrumbs);
    }
  }

  logError(error: AppError, additionalContext?: Record<string, unknown>) {
    // Add breadcrumb for this error
    this.addBreadcrumb({
      category: 'error',
      message: error.message,
      level: this.severityToLogLevel(error.severity),
      data: {
        code: error.code,
        category: error.category,
        ...error.context,
      },
    });

    // Enhanced console logging
    this.logToConsole(error, additionalContext);

    // Report to monitoring service (lazy load to avoid circular dependency)
    if (process.env.NEXT_PUBLIC_ENV === 'prd') {
      import('@/lib/error-reporting')
        .then(({ errorReporting }) => {
          errorReporting.reportError(error, additionalContext);
        })
        .catch(() => {
          // Silently fail if error reporting is not available
        });
    }

    // Store in local storage for debugging (development only)
    if (process.env.NODE_ENV === 'development') {
      this.storeErrorLocally(error, additionalContext);
    }
  }

  private logToConsole(error: AppError, additionalContext?: Record<string, unknown>) {
    const logEntry = {
      level: this.severityToLogLevel(error.severity),
      timestamp: error.timestamp,
      error: {
        code: error.code,
        message: error.message,
        category: error.category,
        severity: error.severity,
        stack: error.stack,
      },
      context: {
        ...error.context,
        ...additionalContext,
      },
      metadata: error.metadata,
      breadcrumbs: this.breadcrumbs.slice(-5), // Last 5 breadcrumbs
      environment: process.env.NEXT_PUBLIC_ENV || 'dev',
      buildVersion: process.env.NEXT_PUBLIC_BUILD_VERSION || 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    };

    if (process.env.NEXT_PUBLIC_ENV === 'prd') {
      // Production: structured JSON for log aggregation
      console.error(JSON.stringify(logEntry));
    } else {
      // Development: human-readable format
      console.group(`🚨 [${error.severity.toUpperCase()}] ${error.code}: ${error.message}`);
      console.error('Error details:', error);
      console.log('Context:', logEntry.context);
      console.log('Metadata:', error.metadata);
      console.log('Recent breadcrumbs:', this.breadcrumbs.slice(-5));
      if (error.stack) {
        console.log('Stack trace:', error.stack);
      }
      console.groupEnd();
    }
  }

  // Get breadcrumbs for external services
  getBreadcrumbs(): ErrorBreadcrumb[] {
    return [...this.breadcrumbs];
  }

  private storeErrorLocally(error: AppError, additionalContext?: Record<string, unknown>) {
    if (
      typeof localStorage === 'undefined' ||
      typeof window === 'undefined' ||
      typeof navigator === 'undefined'
    ) {
      return;
    }

    try {
      const storedErrors = this.getStoredErrors();
      const errorEntry = {
        error,
        additionalContext,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      };

      storedErrors.push(errorEntry);

      // Keep only the last 100 errors
      const recentErrors = storedErrors.slice(-100);

      localStorage.setItem('dev_errors', JSON.stringify(recentErrors));
    } catch (storageError) {
      console.warn('Failed to store error locally:', storageError);
    }
  }

  private getStoredErrors(): Array<any> {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    try {
      const stored = localStorage.getItem('dev_errors');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  clearStoredErrors() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('dev_errors');
    }
  }

  getStoredErrorsForDebugging() {
    return this.getStoredErrors();
  }

  private getUserId(): string | undefined {
    // Get user ID from your auth system
    // This is a placeholder - implement based on your auth solution
    return undefined;
  }

  private getSessionId(): string {
    // Generate or retrieve session ID
    let sessionId = sessionStorage.getItem('error_session_id');
    if (!sessionId) {
      sessionId = this.generateId();
      sessionStorage.setItem('error_session_id', sessionId);
    }
    return sessionId;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private severityToLogLevel(severity: ErrorSeverity): 'debug' | 'info' | 'warning' | 'error' {
    switch (severity) {
      case 'low':
        return 'info';
      case 'medium':
        return 'warning';
      case 'high':
      case 'critical':
        return 'error';
      default:
        return 'error';
    }
  }

  // Navigation tracking for better error context
  trackNavigation(from: string, to: string) {
    this.addBreadcrumb({
      category: 'navigation',
      message: `Navigated from ${from} to ${to}`,
      level: 'info',
      data: { from, to },
    });
  }

  // User action tracking
  trackUserAction(action: string, target?: string, data?: Record<string, unknown>) {
    this.addBreadcrumb({
      category: 'user_action',
      message: `User ${action}${target ? ` on ${target}` : ''}`,
      level: 'info',
      data: { action, target, ...data },
    });
  }

  // API call tracking
  trackApiCall(method: string, endpoint: string, status?: number, duration?: number) {
    this.addBreadcrumb({
      category: 'api',
      message: `${method} ${endpoint}${status ? ` - ${status}` : ''}`,
      level: status && status >= 400 ? 'warning' : 'info',
      data: { method, endpoint, status, duration },
    });
  }
}

// Create singleton instance
export const errorLogger = new ErrorLogger();

// Export for development debugging
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  (window as any).errorLogger = errorLogger;
}
