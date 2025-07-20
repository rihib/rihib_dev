/**
 * Constants Utility Functions
 *
 * Helper functions for working with constants in a type-safe manner.
 */

import { ICON_SIZE_MAP, type IconSizeKey } from './icons';
import { ANIMATION_DURATION } from './animation';
import { HTTP_STATUS } from './api';

/**
 * Get icon size in pixels from a size key
 */
export function getIconSize(size: IconSizeKey): number {
  return ICON_SIZE_MAP[size];
}

/**
 * Get animation duration in milliseconds
 */
export function getAnimationDuration(key: keyof typeof ANIMATION_DURATION): number {
  return ANIMATION_DURATION[key];
}

/**
 * Check if HTTP status code indicates success
 */
export function isSuccessStatus(status: number): boolean {
  return status >= 200 && status < 300;
}

/**
 * Check if HTTP status code indicates client error
 */
export function isClientError(status: number): boolean {
  return status >= 400 && status < 500;
}

/**
 * Check if HTTP status code indicates server error
 */
export function isServerError(status: number): boolean {
  return status >= 500 && status < 600;
}

/**
 * Get appropriate timeout for different request types
 */
export function getRequestTimeout(type: 'quick' | 'normal' | 'slow' | 'file-upload'): number {
  const TIMEOUTS = {
    quick: 5000,
    normal: 10000,
    slow: 30000,
    'file-upload': 60000,
  };

  return TIMEOUTS[type];
}

/**
 * Build CSS class string from constants
 */
export function buildClasses(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}
