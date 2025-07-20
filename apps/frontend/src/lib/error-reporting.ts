'use client';

import type { AppError, ErrorReportData } from '@/types/errors';

interface ErrorReportingConfig {
  apiUrl?: string;
  apiKey?: string;
  enabledInDevelopment?: boolean;
  sampleRate?: number; // 0-1, percentage of errors to report
  enableUserReporting?: boolean;
  enableAutomaticReporting?: boolean;
}

class ErrorReportingService {
  private config: ErrorReportingConfig;
  private queue: ErrorReportData[] = [];
  private isOnline = true;
  private retryCount = 0;
  private maxRetries = 3;

  constructor(config: ErrorReportingConfig = {}) {
    this.config = {
      apiUrl: process.env.NEXT_PUBLIC_ERROR_REPORTING_URL,
      apiKey: process.env.NEXT_PUBLIC_ERROR_REPORTING_KEY,
      enabledInDevelopment: false,
      sampleRate: 1.0,
      enableUserReporting: true,
      enableAutomaticReporting: true,
      ...config,
    };

    // Only set up browser-specific handlers on the client side
    if (typeof window !== 'undefined') {
      this.setupNetworkStatusHandlers();
      this.setupBeforeUnloadHandler();
    }
  }

  private setupNetworkStatusHandlers() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  private setupBeforeUnloadHandler() {
    window.addEventListener('beforeunload', () => {
      this.flushQueue();
    });
  }

  shouldReport(error: AppError): boolean {
    // Don't report in development unless explicitly enabled
    if (process.env.NODE_ENV === 'development' && !this.config.enabledInDevelopment) {
      return false;
    }

    // Don't report if automatic reporting is disabled
    if (!this.config.enableAutomaticReporting) {
      return false;
    }

    // Don't report low severity errors in production
    if (process.env.NEXT_PUBLIC_ENV === 'prd' && error.severity === 'low') {
      return false;
    }

    // Sample rate check
    if (Math.random() > (this.config.sampleRate || 1.0)) {
      return false;
    }

    // Don't report certain categories
    const skipCategories = ['validation', 'client'];
    if (skipCategories.includes(error.category)) {
      return false;
    }

    return true;
  }

  reportError(error: AppError, context?: Record<string, unknown>): void {
    if (!this.shouldReport(error)) {
      return;
    }

    const reportData = this.buildReportData(error, context);

    if (this.isOnline) {
      // Don't await - fire and forget to avoid promise creation
      this.sendReport(reportData).catch((err) => {
        console.error('Error reporting failed:', err);
      });
    } else {
      this.queueReport(reportData);
    }
  }

  reportUserFeedback(
    error: AppError,
    userFeedback: {
      description: string;
      email?: string;
      reproductionSteps?: string[];
      userAgent?: string;
    }
  ): void {
    if (!this.config.enableUserReporting) {
      return;
    }

    const reportData = this.buildReportData(error, {
      userFeedback,
      reportType: 'user_feedback',
    });

    // Fire and forget to avoid promise creation
    this.sendReport(reportData).catch((err) => {
      console.error('User feedback reporting failed:', err);
    });
  }

  private buildReportData(
    error: AppError,
    additionalContext?: Record<string, unknown>
  ): ErrorReportData {
    const reportData: ErrorReportData = {
      error: {
        ...error,
        // Sanitize sensitive data
        context: this.sanitizeContext(error.context || {}),
      },
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userId: this.getUserId(),
      sessionId: this.getSessionId(),
      buildVersion: process.env.NEXT_PUBLIC_BUILD_VERSION || 'unknown',
      environment: process.env.NEXT_PUBLIC_ENV || 'dev',
      breadcrumbs: this.getBreadcrumbs(),
    };

    // Add additional context if provided
    if (additionalContext) {
      (reportData as any).additionalContext = this.sanitizeContext(additionalContext);
    }

    return reportData;
  }

  private sanitizeContext(context: Record<string, unknown>): Record<string, unknown> {
    const sensitiveKeys = ['password', 'token', 'apiKey', 'secret', 'authorization'];
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(context)) {
      const lowerKey = key.toLowerCase();

      if (sensitiveKeys.some((sensitive) => lowerKey.includes(sensitive))) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeContext(value as Record<string, unknown>);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  private async sendReport(reportData: ErrorReportData): Promise<boolean> {
    if (!this.config.apiUrl) {
      console.warn('Error reporting API URL not configured');
      return false;
    }

    try {
      const response = await fetch(this.config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'X-API-Key': this.config.apiKey }),
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        this.retryCount = 0;
        return true;
      } else {
        throw new Error(`Error reporting failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to send error report:', error);

      // Retry logic
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        setTimeout(() => this.sendReport(reportData), 1000 * Math.pow(2, this.retryCount));
      } else {
        this.queueReport(reportData);
      }

      return false;
    }
  }

  private queueReport(reportData: ErrorReportData) {
    this.queue.push(reportData);

    // Limit queue size
    if (this.queue.length > 100) {
      this.queue = this.queue.slice(-50); // Keep only the 50 most recent
    }

    // Store in localStorage as backup
    this.storeQueuedReports();
  }

  private async processQueue() {
    if (!this.isOnline || this.queue.length === 0) {
      return;
    }

    const reportsToSend = [...this.queue];
    this.queue = [];

    for (const report of reportsToSend) {
      const success = await this.sendReport(report);
      if (!success) {
        // If sending fails, add back to queue
        this.queueReport(report);
        break; // Stop processing if one fails
      }
    }

    this.storeQueuedReports();
  }

  private flushQueue() {
    if (this.queue.length === 0 || typeof navigator === 'undefined') {
      return;
    }

    // Use sendBeacon for reliable sending on page unload
    if (navigator.sendBeacon && this.config.apiUrl) {
      const payload = JSON.stringify({
        reports: this.queue,
        timestamp: new Date().toISOString(),
        type: 'batch_unload',
      });

      navigator.sendBeacon(this.config.apiUrl, payload);
    }
  }

  private storeQueuedReports() {
    if (typeof localStorage === 'undefined') return;

    try {
      localStorage.setItem('error_report_queue', JSON.stringify(this.queue));
    } catch (error) {
      console.warn('Failed to store queued error reports:', error);
    }
  }

  private loadQueuedReports() {
    if (typeof localStorage === 'undefined') return;

    try {
      const stored = localStorage.getItem('error_report_queue');
      if (stored) {
        this.queue = JSON.parse(stored);
        localStorage.removeItem('error_report_queue');
      }
    } catch (error) {
      console.warn('Failed to load queued error reports:', error);
    }
  }

  private getUserId(): string | undefined {
    // Implement based on your auth system
    return undefined;
  }

  private getSessionId(): string {
    if (typeof sessionStorage === 'undefined') {
      return 'server-session';
    }

    let sessionId = sessionStorage.getItem('error_session_id');
    if (!sessionId) {
      sessionId = this.generateId();
      sessionStorage.setItem('error_session_id', sessionId);
    }
    return sessionId;
  }

  private getBreadcrumbs(): any[] {
    // To avoid circular dependency, we'll implement a simple breadcrumb system here
    // or return empty array for now - this can be enhanced later
    return [];
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // Public API for manual error reporting
  reportManualError(title: string, description: string, context?: Record<string, unknown>): void {
    const manualError: AppError = {
      code: 'MANUAL_REPORT',
      message: description,
      category: 'client',
      severity: 'medium',
      timestamp: new Date().toISOString(),
      userMessage: title,
      context: {
        ...context,
        reportType: 'manual',
      },
    };

    this.reportError(manualError);
  }

  // Analytics and debugging
  getQueuedReportsCount(): number {
    return this.queue.length;
  }

  getConfig(): ErrorReportingConfig {
    return { ...this.config };
  }

  updateConfig(newConfig: Partial<ErrorReportingConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  // Initialize method to load queued reports and start processing
  initialize() {
    this.loadQueuedReports();
    if (this.isOnline) {
      this.processQueue();
    }
  }
}

// Create singleton instance
export const errorReporting = new ErrorReportingService();

// Initialize on module load
if (typeof window !== 'undefined') {
  errorReporting.initialize();
}

// Development helper
if (process.env.NODE_ENV === 'development') {
  (window as any).errorReporting = errorReporting;
}
