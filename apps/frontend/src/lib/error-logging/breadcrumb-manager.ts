'use client';

import type { ErrorBreadcrumb } from '@/types/errors';

export class BreadcrumbManager {
  private breadcrumbs: ErrorBreadcrumb[] = [];
  private readonly maxBreadcrumbs: number;

  constructor(maxBreadcrumbs: number = 50) {
    this.maxBreadcrumbs = maxBreadcrumbs;
  }

  addBreadcrumb(breadcrumb: Omit<ErrorBreadcrumb, 'timestamp'>): void {
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

  getBreadcrumbs(): ErrorBreadcrumb[] {
    return [...this.breadcrumbs];
  }

  getRecentBreadcrumbs(count: number = 5): ErrorBreadcrumb[] {
    return this.breadcrumbs.slice(-count);
  }

  clearBreadcrumbs(): void {
    this.breadcrumbs = [];
  }

  getBreadcrumbCount(): number {
    return this.breadcrumbs.length;
  }
}
