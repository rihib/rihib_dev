'use client';

import type { AppError } from '@/types/errors';

export interface StoredErrorEntry {
  error: AppError;
  additionalContext?: Record<string, unknown>;
  timestamp: string;
  url: string;
  userAgent: string;
}

export class ErrorStorage {
  private readonly storageKey: string;
  private readonly maxErrors: number;

  constructor(storageKey: string = 'dev_errors', maxErrors: number = 100) {
    this.storageKey = storageKey;
    this.maxErrors = maxErrors;
  }

  storeError(error: AppError, additionalContext?: Record<string, unknown>): void {
    if (!this.isStorageAvailable()) {
      return;
    }

    try {
      const storedErrors = this.getStoredErrors();
      const errorEntry: StoredErrorEntry = {
        error,
        additionalContext,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      };

      storedErrors.push(errorEntry);

      // Keep only the most recent errors
      const recentErrors = storedErrors.slice(-this.maxErrors);

      localStorage.setItem(this.storageKey, JSON.stringify(recentErrors));
    } catch (storageError) {
      console.warn('Failed to store error locally:', storageError);
    }
  }

  getStoredErrors(): StoredErrorEntry[] {
    if (!this.isStorageAvailable()) {
      return [];
    }

    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  clearStoredErrors(): void {
    if (this.isStorageAvailable()) {
      localStorage.removeItem(this.storageKey);
    }
  }

  getErrorCount(): number {
    return this.getStoredErrors().length;
  }

  getErrorsInTimeRange(startTime: Date, endTime: Date): StoredErrorEntry[] {
    const errors = this.getStoredErrors();
    return errors.filter((entry) => {
      const errorTime = new Date(entry.timestamp);
      return errorTime >= startTime && errorTime <= endTime;
    });
  }

  private isStorageAvailable(): boolean {
    return (
      typeof localStorage !== 'undefined' &&
      typeof window !== 'undefined' &&
      typeof navigator !== 'undefined'
    );
  }
}
