'use client';

import { useCallback, useState, useRef } from 'react';
import type { AppError, ErrorRecoveryOptions, HookError } from '@/types/errors';
import {
  createHookError,
  createNetworkError,
  createAPIClientError,
  isRetryableError,
} from '@/types/errors';
import { errorLogger } from '@/lib/error-logger';

interface ErrorState {
  error: AppError | null;
  isError: boolean;
  isRetrying: boolean;
  retryCount: number;
}

interface UseErrorHandlerOptions {
  maxRetries?: number;
  retryDelay?: number;
  onError?: (error: AppError) => void;
  trackBreadcrumbs?: boolean;
}

export function useErrorHandler(options: UseErrorHandlerOptions = {}) {
  const { maxRetries = 3, retryDelay = 1000, onError, trackBreadcrumbs = true } = options;

  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isError: false,
    isRetrying: false,
    retryCount: 0,
  });

  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleError = useCallback(
    (error: AppError | Error, context?: Record<string, unknown>) => {
      // Convert Error to AppError if needed
      const appError =
        error instanceof Error && !('code' in error)
          ? createHookError('useErrorHandler', error.message)
          : (error as AppError);

      // Add context if provided
      if (context) {
        appError.context = { ...appError.context, ...context };
      }

      // Log error
      errorLogger.logError(appError, { hook: 'useErrorHandler' });

      // Track breadcrumb
      if (trackBreadcrumbs) {
        errorLogger.addBreadcrumb({
          category: 'error',
          message: `Hook error: ${appError.message}`,
          level: 'error',
          data: { code: appError.code, category: appError.category },
        });
      }

      // Call custom error handler
      onError?.(appError);

      setErrorState((prev) => ({
        ...prev,
        error: appError,
        isError: true,
        isRetrying: false,
      }));
    },
    [onError, trackBreadcrumbs]
  );

  const clearError = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    setErrorState({
      error: null,
      isError: false,
      isRetrying: false,
      retryCount: 0,
    });
  }, []);

  const retry = useCallback(
    <T>(
      asyncFn: () => Promise<T>,
      options?: {
        delay?: number;
        force?: boolean;
        onSuccess?: (result: T) => void;
        onError?: (error: AppError) => void;
      }
    ): void => {
      const { delay = retryDelay, force = false, onSuccess, onError: onRetryError } = options || {};

      if (!force && errorState.retryCount >= maxRetries) {
        onRetryError?.(createHookError('useErrorHandler', 'Maximum retry attempts exceeded'));
        return;
      }

      setErrorState((prev) => ({
        ...prev,
        isRetrying: true,
        retryCount: prev.retryCount + 1,
      }));

      // Execute with delay if needed
      const executeRetry = () => {
        asyncFn()
          .then((result) => {
            clearError();
            onSuccess?.(result);
          })
          .catch((error) => {
            const appError =
              error instanceof Error && !('code' in error)
                ? createHookError('retry', error.message)
                : (error as AppError);

            handleError(appError);
            onRetryError?.(appError);
          });
      };

      if (delay > 0) {
        retryTimeoutRef.current = setTimeout(executeRetry, delay);
      } else {
        executeRetry();
      }
    },
    [errorState.retryCount, maxRetries, retryDelay, handleError, clearError]
  );

  const executeAsync = useCallback(
    <T>(
      asyncFn: () => Promise<T>,
      options?: {
        category?: AppError['category'];
        severity?: AppError['severity'];
        retryable?: boolean;
        userMessage?: string;
        onSuccess?: (result: T) => void;
        onError?: (error: AppError) => void;
      }
    ): void => {
      const { onSuccess, onError: onAsyncError, ...errorOptions } = options || {};

      clearError();

      // Track API call if it looks like a fetch
      if (trackBreadcrumbs) {
        errorLogger.trackUserAction('async_operation', 'useErrorHandler');
      }

      asyncFn()
        .then((result) => {
          onSuccess?.(result);
        })
        .catch((error) => {
          let appError: AppError;

          if (error instanceof Error) {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
              // Network error
              appError = createNetworkError(
                'Network request failed',
                undefined,
                typeof window !== 'undefined' ? window.location.href : 'unknown'
              );
            } else {
              // Create hook error with optional customization
              appError = createHookError('useErrorHandler.executeAsync', error.message);

              if (errorOptions) {
                appError.category = errorOptions.category || appError.category;
                appError.severity = errorOptions.severity || appError.severity;
                appError.retryable = errorOptions.retryable ?? appError.retryable;
                appError.userMessage = errorOptions.userMessage || appError.userMessage;
              }
            }

            appError.cause = error;
          } else {
            appError = createHookError('useErrorHandler.executeAsync', String(error));
          }

          handleError(appError);
          onAsyncError?.(appError);
        });
    },
    [handleError, clearError, trackBreadcrumbs]
  );

  const executeWithRetry = useCallback(
    <T>(
      asyncFn: () => Promise<T>,
      options?: ErrorRecoveryOptions & {
        onSuccess?: (result: T) => void;
        onError?: (error: AppError) => void;
        onMaxRetriesReached?: (lastError: AppError) => void;
      }
    ): void => {
      const {
        maxRetries: customMaxRetries = maxRetries,
        retryDelay: customRetryDelay = retryDelay,
        strategy = 'retry',
        onSuccess,
        onError,
        onMaxRetriesReached,
      } = options || {};

      const attemptExecution = (attempt: number): void => {
        if (attempt > customMaxRetries) {
          if (errorState.error && onMaxRetriesReached) {
            onMaxRetriesReached(errorState.error);
          }
          return;
        }

        if (attempt > 0) {
          // Track retry attempt
          if (trackBreadcrumbs) {
            errorLogger.addBreadcrumb({
              category: 'retry',
              message: `Retry attempt ${attempt}/${customMaxRetries}`,
              level: 'info',
              data: { strategy },
            });
          }

          // Apply retry delay with exponential backoff
          const delay = customRetryDelay * Math.pow(2, attempt - 1);
          retryTimeoutRef.current = setTimeout(() => attemptExecution(attempt), delay);
          return;
        }

        executeAsync(asyncFn, {
          onSuccess: (result) => {
            clearError();
            onSuccess?.(result);
          },
          onError: (error) => {
            // Check if error is retryable
            if (isRetryableError(error) && attempt < customMaxRetries) {
              attemptExecution(attempt + 1);
            } else {
              onError?.(error);
              if (attempt >= customMaxRetries && onMaxRetriesReached) {
                onMaxRetriesReached(error);
              }
            }
          },
        });
      };

      attemptExecution(0);
    },
    [maxRetries, retryDelay, executeAsync, clearError, errorState.error, trackBreadcrumbs]
  );

  const canRetry = useCallback(() => {
    return (
      errorState.error && isRetryableError(errorState.error) && errorState.retryCount < maxRetries
    );
  }, [errorState.error, errorState.retryCount, maxRetries]);

  return {
    error: errorState.error,
    isError: errorState.isError,
    isRetrying: errorState.isRetrying,
    retryCount: errorState.retryCount,
    canRetry: canRetry(),
    handleError,
    clearError,
    retry,
    executeAsync,
    executeWithRetry,
  };
}
