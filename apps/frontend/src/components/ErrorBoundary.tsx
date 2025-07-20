'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Copy, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type {
  ErrorBoundaryState,
  ErrorBoundaryFallbackProps,
  ComponentError,
} from '@/types/errors';
import { createComponentError } from '@/types/errors';
import { errorLogger } from '@/lib/error-logger';
import { generateErrorId } from '@/lib/utils';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorBoundaryFallbackProps>;
  name?: string;
  onError?: (error: ComponentError, errorInfo: React.ErrorInfo) => void;
  isolate?: boolean; // If true, errors don't bubble up
  level?: 'page' | 'section' | 'component';
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private errorId: string = '';
  private retryCount: number = 0;
  private maxRetries: number = 3;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorId = generateErrorId();
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.errorId = this.state.errorId || generateErrorId();

    // Create structured error object
    const componentError = createComponentError(
      this.props.name || 'UnknownComponent',
      error.message,
      error
    );

    // Add additional context
    componentError.componentStack = errorInfo.componentStack || undefined;
    componentError.boundaryName = this.props.name || 'UnknownBoundary';
    componentError.context = {
      ...componentError.context,
      level: this.props.level || 'component',
      retryCount: this.retryCount,
      errorId: this.errorId,
      boundaryProps: {
        isolate: this.props.isolate,
        level: this.props.level,
      },
    };

    // Log error with full context
    errorLogger.logError(componentError, {
      errorInfo,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    });

    // Call custom error handler if provided
    this.props.onError?.(componentError, errorInfo);

    this.setState({
      error,
      errorInfo,
      errorId: this.errorId,
    });

    // Don't bubble up if isolate is true
    if (this.props.isolate) {
      // Prevent error from bubbling up to parent error boundaries
      // This is conceptual - in React error boundaries, there's no preventDefault
    }
  }

  reset = () => {
    this.retryCount++;
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    });
  };

  canRetry = () => {
    return this.retryCount < this.maxRetries;
  };

  render() {
    if (this.state.hasError) {
      const fallbackProps: ErrorBoundaryFallbackProps = {
        error: this.state.error!,
        errorInfo: this.state.errorInfo || undefined,
        reset: this.reset,
        errorId: this.state.errorId || 'unknown',
      };

      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent {...fallbackProps} />;
      }

      // Use level-specific fallback
      switch (this.props.level) {
        case 'page':
          return <PageErrorFallback {...fallbackProps} canRetry={this.canRetry()} />;
        case 'section':
          return <SectionErrorFallback {...fallbackProps} canRetry={this.canRetry()} />;
        default:
          return <ComponentErrorFallback {...fallbackProps} canRetry={this.canRetry()} />;
      }
    }

    return this.props.children;
  }
}

interface EnhancedErrorFallbackProps extends ErrorBoundaryFallbackProps {
  canRetry: boolean;
}

// Page-level error fallback (full screen)
function PageErrorFallback({ error, reset, errorId, canRetry }: EnhancedErrorFallbackProps) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const copyErrorId = () => {
    navigator.clipboard.writeText(errorId);
    toast({
      title: 'Error ID copied',
      description: 'Error ID has been copied to clipboard',
    });
  };

  const reportError = () => {
    const subject = encodeURIComponent(`Error Report - ${errorId}`);
    const body = encodeURIComponent(
      `Error ID: ${errorId}\\nURL: ${window.location.href}\\nUser Agent: ${navigator.userAgent}\\n\\nPlease describe what you were doing when this error occurred:`
    );
    window.open(`mailto:support@rihib.dev?subject=${subject}&body=${body}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <CardTitle className="text-xl">Something went wrong</CardTitle>
          </div>
          <CardDescription className="text-base">
            We apologize for the inconvenience. The page encountered an unexpected error.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isDevelopment && (
            <div className="bg-muted p-3 rounded-md border">
              <p className="text-sm font-mono text-muted-foreground">{error.message}</p>
              {error.stack && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
                    Stack trace
                  </summary>
                  <pre className="text-xs mt-1 whitespace-pre-wrap">{error.stack}</pre>
                </details>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2">
            {canRetry && (
              <Button onClick={reset} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            )}
            <Button variant="outline" onClick={() => window.location.reload()} className="w-full">
              Refresh Page
            </Button>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Error ID: {errorId}</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={copyErrorId}>
                  <Copy className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" onClick={reportError}>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Section-level error fallback (partial content)
function SectionErrorFallback({ error, reset, errorId, canRetry }: EnhancedErrorFallbackProps) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <Card className="w-full border-destructive/20">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <CardTitle className="text-base">Content unavailable</CardTitle>
        </div>
        <CardDescription className="text-sm">
          This section couldn&apos;t load properly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isDevelopment && (
          <div className="bg-muted p-2 rounded text-xs font-mono mb-3">{error.message}</div>
        )}
        <div className="flex gap-2">
          {canRetry && (
            <Button size="sm" onClick={reset}>
              <RefreshCw className="mr-1 h-3 w-3" />
              Retry
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Component-level error fallback (minimal)
function ComponentErrorFallback({ error, reset, canRetry }: EnhancedErrorFallbackProps) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="border border-destructive/20 rounded-md p-3 bg-destructive/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-3 w-3 text-destructive" />
          <span className="text-sm text-destructive">Component error</span>
        </div>
        {canRetry && (
          <Button variant="ghost" size="sm" onClick={reset}>
            <RefreshCw className="h-3 w-3" />
          </Button>
        )}
      </div>
      {isDevelopment && (
        <p className="text-xs text-muted-foreground mt-1 font-mono">{error.message}</p>
      )}
    </div>
  );
}

// Default error fallback for backwards compatibility
function DefaultErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return <ComponentErrorFallback error={error} reset={reset} errorId="unknown" canRetry={true} />;
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    fallback?: React.ComponentType<ErrorBoundaryFallbackProps>;
    name?: string;
    level?: 'page' | 'section' | 'component';
    isolate?: boolean;
    onError?: (error: ComponentError, errorInfo: React.ErrorInfo) => void;
  }
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary
      fallback={options?.fallback}
      name={options?.name || Component.displayName || Component.name}
      level={options?.level || 'component'}
      isolate={options?.isolate}
      onError={options?.onError}
    >
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

// Specialized error boundaries for different use cases
export function APIErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      name="APIErrorBoundary"
      level="section"
      fallback={({ error, reset, errorId }) => (
        <Card className="border-destructive/20">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <CardTitle className="text-base">Connection Error</CardTitle>
            </div>
            <CardDescription>
              Unable to load data. Please check your connection and try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={reset} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </CardContent>
        </Card>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

export function UIErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary name="UIErrorBoundary" level="component" isolate={true}>
      {children}
    </ErrorBoundary>
  );
}

export function PageErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary name="PageErrorBoundary" level="page">
      {children}
    </ErrorBoundary>
  );
}
