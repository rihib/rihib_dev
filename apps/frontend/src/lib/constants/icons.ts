/**
 * Icon and Image Constants
 *
 * This file contains icon sizes, image paths, and visual asset constants.
 */

/**
 * Icon size mappings (in pixels)
 */
export const ICON_SIZE_MAP = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
} as const;

/**
 * Icon size type for components
 */
export type IconSizeKey = keyof typeof ICON_SIZE_MAP;

/**
 * Default icon sizes for different contexts
 */
export const DEFAULT_ICON_SIZES = {
  xs: 12,
  sm: 14,
  external_link: 14,
  navigation: 16,
  button: 16,
  header: 20,
  card: 16,
  notification: 16,
  modal: 20,
  social: 24,
  logo: 32,
} as const;

/**
 * Image paths
 */
export const IMAGE_PATHS = {
  badges: {
    seckhack365: '/img/seckhack365-badge.png',
  },
  logos: {
    // Add logo paths here as needed
  },
  icons: {
    // Add icon paths here as needed
  },
} as const;

/**
 * SVG viewBox constants
 */
export const VIEWBOX = {
  square: '0 0 24 24',
  wide: '0 0 32 24',
  tall: '0 0 24 32',
} as const;

/**
 * Icon class combinations for different sizes
 */
export const ICON_CLASSES = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
  '2xl': 'h-10 w-10',
  '3xl': 'h-12 w-12',
} as const;

/**
 * Icon positioning classes
 */
export const ICON_POSITIONS = {
  leading: 'mr-2',
  trailing: 'ml-2',
  above: 'mb-2',
  below: 'mt-2',
} as const;

/**
 * Icon color classes for different states
 */
export const ICON_COLORS = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  muted: 'text-muted-foreground',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
  info: 'text-blue-500',
  current: 'text-current',
} as const;

/**
 * Avatar and profile image sizes
 */
export const AVATAR_SIZES = {
  xs: 'h-6 w-6',
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
  '2xl': 'h-20 w-20',
  '3xl': 'h-24 w-24',
} as const;

/**
 * Loading spinner sizes
 */
export const SPINNER_SIZES = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
} as const;
