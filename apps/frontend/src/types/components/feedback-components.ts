// Feedback and notification component prop interfaces

import type { LucideIcon } from 'lucide-react';
import type { BaseComponentProps, SizeVariant } from '../common';

// Alert component props
export interface AlertProps extends BaseComponentProps {
  variant?: 'default' | 'destructive' | 'warning' | 'success' | 'info';
  title?: string;
  description?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: LucideIcon;
}

// Toast component props
export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  duration?: number;
  action?: ToastAction;
  onDismiss?: (id: string) => void;
}

export interface ToastAction {
  label: string;
  onClick: () => void;
}

// Loading component props
export interface LoadingProps extends BaseComponentProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  size?: SizeVariant;
  text?: string;
  overlay?: boolean;
}

export interface SkeletonProps extends BaseComponentProps {
  width?: number | string;
  height?: number | string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
}

// Error boundary and error handling props
export interface ErrorBoundaryProps extends BaseComponentProps {
  fallback?: React.ComponentType<ComponentErrorBoundaryFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
}

export interface ComponentErrorBoundaryFallbackProps {
  error: Error;
  errorInfo?: React.ErrorInfo;
  resetErrorBoundary: () => void;
  resetKeys?: Array<string | number>;
}

export interface ErrorDisplayProps extends BaseComponentProps {
  error: Error;
  title?: string;
  showDetails?: boolean;
  onRetry?: () => void;
  onReport?: (error: Error) => void;
}
