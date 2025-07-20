/**
 * Constants Index
 *
 * Central export file for all application constants. This provides a clean
 * interface for importing constants throughout the application.
 */

// Design system constants
export * from './design';
export * from './layout';
export * from './animation';
export * from './icons';

// Configuration constants
export * from './api';
export * from './environment';
export * from './contact';

// Utilities
export * from './utils';

// Re-export commonly used constants for convenience
export {
  ICON_SIZES,
  BORDER_COLORS,
  TEXT_COLORS,
  TEXT_SIZES,
  DIMENSIONS,
  PADDING,
  MARGIN,
  GAP,
} from './design';

export { Z_INDEX, LAYOUT_SPACING, FLEX, POSITION } from './layout';

export {
  ANIMATION_DURATION,
  TRANSITION_DURATION,
  TRANSITIONS,
  AUTO_CLOSE_DELAYS,
  PROGRESS_INTERVALS,
} from './animation';

export { DEFAULT_ICON_SIZES, ICON_CLASSES, ICON_COLORS } from './icons';

export { API_ENDPOINTS, HTTP_STATUS, TIMEOUTS, PORTS } from './api';

export { ENVIRONMENTS, ENVIRONMENT_URLS, DEFAULT_PORTS } from './environment';

/**
 * Type exports for better TypeScript support
 */
export type { IconSizeKey } from './icons';

export type { Environment } from './environment';
