/**
 * Animation Constants
 *
 * This file contains actively used animation-related constants.
 */

/**
 * Animation durations in milliseconds
 */
export const ANIMATION_DURATION = {
  instant: 0,
  fast: 150,
  normal: 200,
  medium: 300,
  slow: 500,
  slower: 750,
  slowest: 1000,
} as const;

/**
 * CSS transition duration classes
 */
export const TRANSITION_DURATION = {
  instant: 'duration-0',
  fast: 'duration-150',
  normal: 'duration-200',
  medium: 'duration-300',
  slow: 'duration-500',
  slower: 'duration-700',
  slowest: 'duration-1000',
} as const;

/**
 * Common transition classes
 */
export const TRANSITIONS = {
  all: 'transition-all',
  colors: 'transition-colors',
  opacity: 'transition-opacity',
  shadow: 'transition-shadow',
  transform: 'transition-transform',
  none: 'transition-none',
} as const;

/**
 * Auto-close delays for notifications (in milliseconds)
 */
export const AUTO_CLOSE_DELAYS = {
  short: 3000,
  medium: 5000,
  long: 8000,
  veryLong: 12000,
} as const;

/**
 * Progress bar update intervals (in milliseconds)
 */
export const PROGRESS_INTERVALS = {
  smooth: 50,
  normal: 100,
  coarse: 200,
} as const;
