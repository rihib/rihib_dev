'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, CheckCircle, Info, X, RefreshCw, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ErrorNotification, ErrorToast, ErrorModal, ErrorSeverity } from '@/types/errors';
import {
  BACKGROUND_COLORS,
  TEXT_COLORS,
  TEXT_SIZES,
  ICON_CLASSES,
  DIMENSIONS,
  ANIMATION_DURATION,
  TRANSITION_DURATION,
  AUTO_CLOSE_DELAYS,
  PROGRESS_INTERVALS,
  DEFAULT_ICON_SIZES,
  Z_INDEX,
} from '@/lib/constants';

interface ErrorNotificationProps {
  notification: ErrorNotification;
  onDismiss: (id: string) => void;
  onAction?: (id: string, actionIndex: number) => void;
}

// Severity-based styling
const getSeverityStyles = (severity: ErrorSeverity) => {
  switch (severity) {
    case 'critical':
      return {
        icon: AlertTriangle,
        iconColor: BACKGROUND_COLORS.red[500],
        borderColor: BACKGROUND_COLORS.red[200],
        bgColor: BACKGROUND_COLORS.red[50],
        textColor: BACKGROUND_COLORS.red[900],
      };
    case 'high':
      return {
        icon: AlertTriangle,
        iconColor: BACKGROUND_COLORS.orange[500],
        borderColor: BACKGROUND_COLORS.orange[200],
        bgColor: BACKGROUND_COLORS.orange[50],
        textColor: BACKGROUND_COLORS.orange[900],
      };
    case 'medium':
      return {
        icon: Info,
        iconColor: BACKGROUND_COLORS.yellow[500],
        borderColor: BACKGROUND_COLORS.yellow[200],
        bgColor: BACKGROUND_COLORS.yellow[50],
        textColor: BACKGROUND_COLORS.yellow[900],
      };
    case 'low':
      return {
        icon: Info,
        iconColor: BACKGROUND_COLORS.blue[500],
        borderColor: BACKGROUND_COLORS.blue[200],
        bgColor: BACKGROUND_COLORS.blue[50],
        textColor: BACKGROUND_COLORS.blue[900],
      };
    default:
      return {
        icon: Info,
        iconColor: BACKGROUND_COLORS.gray[500],
        borderColor: BACKGROUND_COLORS.gray[200],
        bgColor: BACKGROUND_COLORS.gray[50],
        textColor: BACKGROUND_COLORS.gray[900],
      };
  }
};

export function ErrorNotificationComponent({
  notification,
  onDismiss,
  onAction,
}: ErrorNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const styles = getSeverityStyles(notification.severity);
  const Icon = styles.icon;

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onDismiss(notification.id), ANIMATION_DURATION.medium); // Allow fade out animation
  }, [onDismiss, notification.id]);

  useEffect(() => {
    if (notification.autoClose && notification.autoCloseDelay) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, notification.autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [notification.autoClose, notification.autoCloseDelay, handleDismiss]);

  const handleAction = (actionIndex: number) => {
    if (onAction) {
      onAction(notification.id, actionIndex);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Card
      className={cn(
        `transition-all ${TRANSITION_DURATION.medium} ease-in-out`,
        styles.borderColor,
        styles.bgColor,
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Icon className={cn(ICON_CLASSES.sm, styles.iconColor)} />
            <CardTitle className={cn(TEXT_SIZES.sm, 'font-medium', styles.textColor)}>
              {notification.title}
            </CardTitle>
          </div>
          {notification.dismissible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className={`${ICON_CLASSES.sm} p-0 hover:bg-transparent`}
            >
              <X className={ICON_CLASSES.xs} />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className={cn(TEXT_SIZES.xs, styles.textColor)}>
          {notification.message}
        </CardDescription>

        {notification.actions && notification.actions.length > 0 && (
          <div className="flex gap-2 mt-3">
            {notification.actions.map((action, index) => (
              <Button
                key={index}
                variant={
                  action.style === 'danger'
                    ? 'destructive'
                    : action.style === 'primary'
                      ? 'default'
                      : 'outline'
                }
                size="sm"
                onClick={() => handleAction(index)}
                className="h-7 text-xs"
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}

        {notification.metadata &&
        'errorId' in notification.metadata &&
        notification.metadata.errorId ? (
          <div className="mt-2 text-xs text-muted-foreground">
            Error ID: {String(notification.metadata.errorId)}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

// Toast notification component
interface ErrorToastProps {
  toast: ErrorToast;
  onDismiss: (id: string) => void;
  onAction?: (id: string, actionIndex: number) => void;
}

export function ErrorToast({ toast, onDismiss, onAction }: ErrorToastProps) {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!toast.autoClose || !toast.autoCloseDelay || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 100 / (toast.autoCloseDelay! / 100);
        if (newProgress <= 0) {
          onDismiss(toast.id);
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [toast.autoClose, toast.autoCloseDelay, isPaused, onDismiss, toast.id]);

  const styles = getSeverityStyles(toast.severity);
  const Icon = styles.icon;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg shadow-lg max-w-sm w-full',
        styles.bgColor,
        styles.borderColor,
        'border'
      )}
      onMouseEnter={() => toast.pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => toast.pauseOnHover && setIsPaused(false)}
    >
      {toast.progress && toast.autoClose && (
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-100">
          <div className="h-full bg-current" style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start">
          <Icon className={cn('h-4 w-4 mt-0.5 flex-shrink-0', styles.iconColor)} />
          <div className="ml-3 flex-1">
            <p className={cn('text-sm font-medium', styles.textColor)}>{toast.title}</p>
            <p className={cn('text-xs mt-1 opacity-90', styles.textColor)}>{toast.message}</p>

            {toast.actions && toast.actions.length > 0 && (
              <div className="flex gap-2 mt-2">
                {toast.actions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => onAction?.(toast.id, index)}
                    className="h-6 text-xs px-2"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {toast.closeButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDismiss(toast.id)}
              className="h-4 w-4 p-0 ml-2 flex-shrink-0"
            >
              <X className={ICON_CLASSES.xs} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Modal notification component
interface ErrorModalProps {
  modal: ErrorModal;
  onDismiss: (id: string) => void;
  onAction?: (id: string, actionIndex: number) => void;
}

export function ErrorModal({ modal, onDismiss, onAction }: ErrorModalProps) {
  const [showDetails, setShowDetails] = useState(false);
  const styles = getSeverityStyles(modal.severity);
  const Icon = styles.icon;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal.closeOnEscape) {
        onDismiss(modal.id);
      }
    };

    if (modal.closeOnEscape) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [modal.closeOnEscape, modal.id, onDismiss]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && modal.closeOnBackdrop) {
      onDismiss(modal.id);
    }
  };

  const modalSizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        modal.backdrop && 'bg-black/50'
      )}
      onClick={handleBackdropClick}
    >
      <Card
        className={cn(
          'w-full animate-in zoom-in-95 duration-200',
          modalSizeClasses[modal.size || 'md'],
          styles.borderColor
        )}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Icon className={cn('h-5 w-5', styles.iconColor)} />
              <CardTitle className="text-lg">{modal.title}</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDismiss(modal.id)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <CardDescription className="text-base">{modal.message}</CardDescription>

          {modal.showDetails && modal.metadata && (
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="h-8 text-xs"
              >
                {showDetails ? 'Hide' : 'Show'} Details
              </Button>

              {showDetails && (
                <div className="bg-muted p-3 rounded-md text-xs font-mono">
                  <pre>{JSON.stringify(modal.metadata || {}, null, 2)}</pre>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2">
            {modal.actions &&
              modal.actions.map((action, index) => (
                <Button
                  key={index}
                  variant={
                    action.style === 'danger'
                      ? 'destructive'
                      : action.style === 'primary'
                        ? 'default'
                        : 'outline'
                  }
                  onClick={() => onAction?.(modal.id, index)}
                  className="w-full"
                >
                  {action.label}
                </Button>
              ))}

            {modal.reportable && (
              <Button
                variant="outline"
                onClick={() => {
                  const subject = encodeURIComponent(`Error Report - ${modal.id}`);
                  const body = encodeURIComponent(
                    `Error details: ${modal.message}\\n\\nMetadata: ${JSON.stringify(modal.metadata || {}, null, 2)}`
                  );
                  window.open(`mailto:support@rihib.dev?subject=${subject}&body=${body}`);
                }}
                className="w-full"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Report Error
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
