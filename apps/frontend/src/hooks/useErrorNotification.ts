'use client';

import { useState, useCallback, useRef } from 'react';
import type {
  ErrorNotification,
  ErrorToast,
  ErrorModal,
  AppError,
  ErrorSeverity,
  ErrorCategory,
} from '@/types/errors';
import { generateErrorId } from '@/lib/utils';

interface NotificationState {
  notifications: ErrorNotification[];
  toasts: ErrorToast[];
  modals: ErrorModal[];
}

interface CreateNotificationOptions {
  title: string;
  message: string;
  severity?: ErrorSeverity;
  category?: ErrorCategory;
  dismissible?: boolean;
  autoClose?: boolean;
  autoCloseDelay?: number;
  actions?: Array<{
    label: string;
    action: () => void | Promise<void>;
    style?: 'primary' | 'secondary' | 'danger';
  }>;
  metadata?: Record<string, unknown>;
}

interface CreateToastOptions extends CreateNotificationOptions {
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

interface CreateModalOptions extends CreateNotificationOptions {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  backdrop?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  showDetails?: boolean;
  reportable?: boolean;
}

export function useErrorNotification() {
  const [state, setState] = useState<NotificationState>({
    notifications: [],
    toasts: [],
    modals: [],
  });

  const notificationTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const dismiss = useCallback(
    (id: string, type: 'notification' | 'toast' | 'modal' = 'notification') => {
      // Clear any pending timeout
      const timeout = notificationTimeouts.current.get(id);
      if (timeout) {
        clearTimeout(timeout);
        notificationTimeouts.current.delete(id);
      }

      setState((prev) => ({
        ...prev,
        [type === 'notification' ? 'notifications' : type === 'toast' ? 'toasts' : 'modals']: prev[
          type === 'notification' ? 'notifications' : type === 'toast' ? 'toasts' : 'modals'
        ].filter((item) => item.id !== id),
      }));
    },
    []
  );

  const executeAction = useCallback(
    async (
      id: string,
      actionIndex: number,
      type: 'notification' | 'toast' | 'modal' = 'notification'
    ) => {
      const items =
        state[type === 'notification' ? 'notifications' : type === 'toast' ? 'toasts' : 'modals'];
      const item = items.find((item) => item.id === id);

      if (item && item.actions && item.actions[actionIndex]) {
        try {
          await item.actions[actionIndex].action();
          dismiss(id, type);
        } catch (error) {
          console.error('Error executing notification action:', error);
        }
      }
    },
    [state, dismiss]
  );

  const createNotification = useCallback(
    (options: CreateNotificationOptions): string => {
      const id = generateErrorId();
      const notification: ErrorNotification = {
        id,
        title: options.title,
        message: options.message,
        severity: options.severity || 'medium',
        dismissible: options.dismissible ?? true,
        autoClose: options.autoClose ?? false,
        autoCloseDelay: options.autoCloseDelay ?? 5000,
        actions: options.actions?.map((action) => ({
          label: action.label,
          action: action.action,
          style: action.style,
        })),
        timestamp: new Date().toISOString(),
        source: 'system',
        category: options.category,
        metadata: options.metadata,
        seen: false,
        resolved: false,
      };

      setState((prev) => ({
        ...prev,
        notifications: [...prev.notifications, notification],
      }));

      // Set auto-close timeout if enabled
      if (notification.autoClose && notification.autoCloseDelay) {
        const timeout = setTimeout(() => {
          dismiss(id, 'notification');
        }, notification.autoCloseDelay);
        notificationTimeouts.current.set(id, timeout);
      }

      return id;
    },
    [dismiss]
  );

  const createToast = useCallback((options: CreateToastOptions): string => {
    const id = generateErrorId();
    const toast: ErrorToast = {
      id,
      title: options.title,
      message: options.message,
      severity: options.severity || 'medium',
      dismissible: options.dismissible ?? true,
      autoClose: options.autoClose ?? true,
      autoCloseDelay: options.autoCloseDelay ?? 4000,
      actions: options.actions?.map((action) => ({
        label: action.label,
        action: action.action,
        style: action.style,
      })),
      timestamp: new Date().toISOString(),
      source: 'system',
      category: options.category,
      metadata: options.metadata,
      seen: false,
      resolved: false,
      position: options.position || 'top-right',
      closeButton: options.closeButton ?? true,
      progress: options.progress ?? true,
      pauseOnHover: options.pauseOnHover ?? true,
    };

    setState((prev) => ({
      ...prev,
      toasts: [...prev.toasts, toast],
    }));

    return id;
  }, []);

  const createModal = useCallback((options: CreateModalOptions): string => {
    const id = generateErrorId();
    const modal: ErrorModal = {
      id,
      title: options.title,
      message: options.message,
      severity: options.severity || 'high',
      dismissible: options.dismissible ?? true,
      autoClose: options.autoClose ?? false,
      actions: options.actions?.map((action) => ({
        label: action.label,
        action: action.action,
        style: action.style,
      })),
      timestamp: new Date().toISOString(),
      source: 'system',
      category: options.category,
      metadata: options.metadata,
      seen: false,
      resolved: false,
      size: options.size || 'md',
      backdrop: options.backdrop ?? true,
      closeOnEscape: options.closeOnEscape ?? true,
      closeOnBackdrop: options.closeOnBackdrop ?? true,
      showDetails: options.showDetails ?? false,
      reportable: options.reportable ?? true,
    };

    setState((prev) => ({
      ...prev,
      modals: [...prev.modals, modal],
    }));

    return id;
  }, []);

  // Helper functions for common error scenarios
  const showErrorFromAppError = useCallback(
    (error: AppError, type: 'notification' | 'toast' | 'modal' = 'toast'): string => {
      const options = {
        title: getErrorTitle(error),
        message: error.userMessage || error.message,
        severity: error.severity,
        category: error.category,
        metadata: {
          errorId: error.requestId || generateErrorId(),
          code: error.code,
          timestamp: error.timestamp,
          ...error.metadata,
        },
        actions: error.recoveryAction
          ? [
              {
                label: error.recoveryAction.label,
                action: error.recoveryAction.action || (() => {}),
                style: 'primary' as const,
              },
            ]
          : undefined,
      };

      switch (type) {
        case 'modal':
          return createModal({
            ...options,
            showDetails: true,
            reportable: true,
          });
        case 'notification':
          return createNotification(options);
        case 'toast':
        default:
          return createToast(options);
      }
    },
    [createNotification, createToast, createModal]
  );

  const showNetworkError = useCallback(
    (message?: string): string => {
      return createToast({
        title: 'Connection Error',
        message:
          message || 'Unable to connect to the server. Please check your internet connection.',
        severity: 'high',
        category: 'network',
        actions: [
          {
            label: 'Retry',
            action: () => window.location.reload(),
            style: 'primary',
          },
        ],
      });
    },
    [createToast]
  );

  const showValidationError = useCallback(
    (fieldName?: string, message?: string): string => {
      return createNotification({
        title: 'Validation Error',
        message: message || `Please check the ${fieldName || 'form'} and try again.`,
        severity: 'medium',
        category: 'validation',
        autoClose: true,
        autoCloseDelay: 3000,
      });
    },
    [createNotification]
  );

  const showCriticalError = useCallback(
    (message?: string, errorId?: string): string => {
      return createModal({
        title: 'Critical Error',
        message:
          message || 'A critical error has occurred. Please contact support if this continues.',
        severity: 'critical',
        category: 'server',
        showDetails: true,
        reportable: true,
        closeOnBackdrop: false,
        closeOnEscape: false,
        metadata: errorId ? { errorId } : undefined,
        actions: [
          {
            label: 'Reload Page',
            action: () => window.location.reload(),
            style: 'primary',
          },
        ],
      });
    },
    [createModal]
  );

  const clearAll = useCallback((type?: 'notification' | 'toast' | 'modal') => {
    // Clear all timeouts
    notificationTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    notificationTimeouts.current.clear();

    setState((prev) => ({
      notifications: type === 'notification' || !type ? [] : prev.notifications,
      toasts: type === 'toast' || !type ? [] : prev.toasts,
      modals: type === 'modal' || !type ? [] : prev.modals,
    }));
  }, []);

  return {
    // State
    notifications: state.notifications,
    toasts: state.toasts,
    modals: state.modals,

    // Actions
    createNotification,
    createToast,
    createModal,
    dismiss,
    executeAction,
    clearAll,

    // Helper functions
    showErrorFromAppError,
    showNetworkError,
    showValidationError,
    showCriticalError,
  };
}

// Helper function to get user-friendly error titles
function getErrorTitle(error: AppError): string {
  switch (error.category) {
    case 'network':
      return 'Connection Error';
    case 'validation':
      return 'Invalid Input';
    case 'authentication':
      return 'Authentication Required';
    case 'authorization':
      return 'Access Denied';
    case 'not_found':
      return 'Not Found';
    case 'server':
      return error.severity === 'critical' ? 'Critical Server Error' : 'Server Error';
    case 'timeout':
      return 'Request Timeout';
    case 'rate_limit':
      return 'Rate Limit Exceeded';
    default:
      return 'Error';
  }
}
