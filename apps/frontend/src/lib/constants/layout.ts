/**
 * Layout Constants
 *
 * This file contains layout-related constants including grid systems,
 * breakpoints, z-index values, and container dimensions.
 */

/**
 * Z-index values for layering elements
 */
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  overlay: 20,
  modal: 30,
  popover: 40,
  header: 50,
  toast: 60,
  tooltip: 70,
  top: 9999,
} as const;

/**
 * Breakpoint values (matching Tailwind CSS defaults)
 */
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Container max-widths
 */
export const CONTAINER = {
  sm: 'max-w-screen-sm', // 640px
  md: 'max-w-screen-md', // 768px
  lg: 'max-w-screen-lg', // 1024px
  xl: 'max-w-screen-xl', // 1280px
  '2xl': 'max-w-screen-2xl', // 1536px
  full: 'max-w-full',
} as const;

/**
 * Grid template columns
 */
export const GRID_COLS = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
} as const;

/**
 * Flexbox utilities
 */
export const FLEX = {
  direction: {
    row: 'flex-row',
    col: 'flex-col',
    rowReverse: 'flex-row-reverse',
    colReverse: 'flex-col-reverse',
  },
  wrap: {
    wrap: 'flex-wrap',
    nowrap: 'flex-nowrap',
    reverse: 'flex-wrap-reverse',
  },
  justify: {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  },
  align: {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
  },
} as const;

/**
 * Position utilities
 */
export const POSITION = {
  static: 'static',
  fixed: 'fixed',
  absolute: 'absolute',
  relative: 'relative',
  sticky: 'sticky',
} as const;

/**
 * Layout spacing for specific use cases
 */
export const LAYOUT_SPACING = {
  headerHeight: 'h-[var(--header-height)]', // 4rem / 64px
  section: 'space-y-6',
  cardContent: 'space-y-4',
  formGroup: 'space-y-3',
  buttonGroup: 'space-x-3',
  navigation: 'space-x-6',
} as const;

/**
 * Width utilities
 */
export const WIDTH = {
  auto: 'w-auto',
  full: 'w-full',
  screen: 'w-screen',
  fit: 'w-fit',
  min: 'w-min',
  max: 'w-max',
  xs: 'w-20',
  sm: 'w-24',
  md: 'w-32',
  lg: 'w-48',
  xl: 'w-64',
} as const;

/**
 * Height utilities
 */
export const HEIGHT = {
  auto: 'h-auto',
  full: 'h-full',
  screen: 'h-screen',
  fit: 'h-fit',
  min: 'h-min',
  max: 'h-max',
  xs: 'h-20',
  sm: 'h-24',
  md: 'h-32',
  lg: 'h-48',
  xl: 'h-64',
} as const;
