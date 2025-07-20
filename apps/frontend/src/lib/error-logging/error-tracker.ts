'use client';

import type { ErrorBreadcrumb } from '@/types/errors';

export interface TrackingContext {
  sessionId: string;
  userId?: string;
}

export class ErrorTracker {
  private readonly context: TrackingContext;

  constructor(private addBreadcrumb: (breadcrumb: Omit<ErrorBreadcrumb, 'timestamp'>) => void) {
    this.context = {
      sessionId: this.getSessionId(),
      userId: this.getUserId(),
    };
  }

  // Navigation tracking for better error context
  trackNavigation(from: string, to: string): void {
    this.addBreadcrumb({
      category: 'navigation',
      message: `Navigated from ${from} to ${to}`,
      level: 'info',
      data: { from, to },
    });
  }

  // User action tracking
  trackUserAction(action: string, target?: string, data?: Record<string, unknown>): void {
    this.addBreadcrumb({
      category: 'user_action',
      message: `User ${action}${target ? ` on ${target}` : ''}`,
      level: 'info',
      data: { action, target, ...data },
    });
  }

  // API call tracking
  trackApiCall(method: string, endpoint: string, status?: number, duration?: number): void {
    this.addBreadcrumb({
      category: 'api',
      message: `${method} ${endpoint}${status ? ` - ${status}` : ''}`,
      level: status && status >= 400 ? 'warning' : 'info',
      data: { method, endpoint, status, duration },
    });
  }

  // Generic event tracking
  trackEvent(category: string, message: string, data?: Record<string, unknown>): void {
    this.addBreadcrumb({
      category,
      message,
      level: 'info',
      data,
    });
  }

  // Performance tracking
  trackPerformance(metric: string, value: number, unit: string = 'ms'): void {
    this.addBreadcrumb({
      category: 'performance',
      message: `${metric}: ${value}${unit}`,
      level: 'info',
      data: { metric, value, unit },
    });
  }

  getContext(): TrackingContext {
    return { ...this.context };
  }

  updateUserId(userId: string): void {
    this.context.userId = userId;
  }

  private getUserId(): string | undefined {
    // Get user ID from your auth system
    // This is a placeholder - implement based on your auth solution
    return undefined;
  }

  private getSessionId(): string {
    if (typeof sessionStorage === 'undefined') {
      return this.generateId();
    }

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
}
