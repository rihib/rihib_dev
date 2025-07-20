/**
 * Design System Constants
 *
 * This file contains all design-related constants including colors, spacing,
 * typography, and visual styling values to eliminate magic numbers throughout
 * the application.
 */

/**
 * Icon sizes used throughout the application
 */
export const ICON_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
} as const;

/**
 * Common spacing values (in pixels)
 */
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

/**
 * Border radius values
 */
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem', // 2px
  base: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  full: '9999px',
} as const;

/**
 * Color classes for borders used in profile sections
 */
export const BORDER_COLORS = {
  blue: 'border-blue-500',
  green: 'border-green-500',
  purple: 'border-purple-500',
  orange: 'border-orange-500',
  red: 'border-red-500',
  yellow: 'border-yellow-500',
  pink: 'border-pink-500',
  indigo: 'border-indigo-500',
  teal: 'border-teal-500',
  cyan: 'border-cyan-500',
} as const;

/**
 * Text color classes for hover states
 */
export const TEXT_COLORS = {
  blue: 'text-blue-500',
  green: 'text-green-500',
  purple: 'text-purple-500',
  orange: 'text-orange-500',
  red: 'text-red-500',
  yellow: 'text-yellow-500',
  pink: 'text-pink-500',
  indigo: 'text-indigo-500',
  teal: 'text-teal-500',
  cyan: 'text-cyan-500',
} as const;

/**
 * Background color classes for notifications and status indicators
 */
export const BACKGROUND_COLORS = {
  red: {
    50: 'bg-red-50',
    200: 'border-red-200',
    500: 'text-red-500',
    900: 'text-red-900',
  },
  orange: {
    50: 'bg-orange-50',
    200: 'border-orange-200',
    500: 'text-orange-500',
    900: 'text-orange-900',
  },
  yellow: {
    50: 'bg-yellow-50',
    200: 'border-yellow-200',
    500: 'text-yellow-500',
    900: 'text-yellow-900',
  },
  blue: {
    50: 'bg-blue-50',
    200: 'border-blue-200',
    500: 'text-blue-500',
    600: 'to-blue-600',
    900: 'text-blue-900',
  },
  gray: {
    50: 'bg-gray-50',
    200: 'border-gray-200',
    500: 'text-gray-500',
    900: 'text-gray-900',
  },
} as const;

/**
 * Typography size classes
 */
export const TEXT_SIZES = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
} as const;

/**
 * Font weight classes
 */
export const FONT_WEIGHTS = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const;

/**
 * Utility classes for common dimensions
 */
export const DIMENSIONS = {
  button: {
    sm: 'h-6',
    md: 'h-7',
    default: 'h-8',
    lg: 'h-10',
    xl: 'h-11',
  },
  icon: {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
  },
  card: {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  },
} as const;

/**
 * Padding and margin classes
 */
export const PADDING = {
  none: 'p-0',
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-4',
  xl: 'p-6',
  '2xl': 'p-8',
} as const;

export const MARGIN = {
  none: 'm-0',
  xs: 'm-1',
  sm: 'm-2',
  md: 'm-3',
  lg: 'm-4',
  xl: 'm-6',
  '2xl': 'm-8',
} as const;

/**
 * Gap classes for flex and grid layouts
 */
export const GAP = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
  xl: 'gap-6',
  '2xl': 'gap-8',
} as const;

/**
 * Shadow classes
 */
export const SHADOWS = {
  sm: 'shadow-sm',
  base: 'shadow',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  none: 'shadow-none',
} as const;
