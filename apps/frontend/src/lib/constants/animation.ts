/**
 * Animation Constants
 *
 * This file contains animation-related constants including durations,
 * easing functions, and transition classes.
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
 * Easing functions
 */
export const EASING = {
  linear: 'ease-linear',
  in: 'ease-in',
  out: 'ease-out',
  inOut: 'ease-in-out',
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
 * Animation classes
 */
export const ANIMATIONS = {
  spin: 'animate-spin',
  ping: 'animate-ping',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  none: 'animate-none',
} as const;

/**
 * Transform utilities
 */
export const TRANSFORMS = {
  scale: {
    50: 'scale-50',
    75: 'scale-75',
    90: 'scale-90',
    95: 'scale-95',
    100: 'scale-100',
    105: 'scale-105',
    110: 'scale-110',
    125: 'scale-125',
  },
  translate: {
    y: {
      '-2': '-translate-y-2',
      '-1': '-translate-y-1',
      '0': 'translate-y-0',
      '1': 'translate-y-1',
      '2': 'translate-y-2',
    },
    x: {
      '-2': '-translate-x-2',
      '-1': '-translate-x-1',
      '0': 'translate-x-0',
      '1': 'translate-x-1',
      '2': 'translate-x-2',
    },
  },
  rotate: {
    0: 'rotate-0',
    45: 'rotate-45',
    90: 'rotate-90',
    180: 'rotate-180',
    '-45': '-rotate-45',
    '-90': '-rotate-90',
    '-180': '-rotate-180',
  },
} as const;

/**
 * Opacity utilities
 */
export const OPACITY = {
  0: 'opacity-0',
  25: 'opacity-25',
  50: 'opacity-50',
  75: 'opacity-75',
  90: 'opacity-90',
  100: 'opacity-100',
} as const;

/**
 * Common animation combinations
 */
export const ANIMATION_PRESETS = {
  fadeIn: `${TRANSITIONS.opacity} ${TRANSITION_DURATION.normal} ${EASING.out}`,
  fadeOut: `${TRANSITIONS.opacity} ${TRANSITION_DURATION.normal} ${EASING.in}`,
  slideIn: `${TRANSITIONS.transform} ${TRANSITION_DURATION.medium} ${EASING.out}`,
  slideOut: `${TRANSITIONS.transform} ${TRANSITION_DURATION.medium} ${EASING.in}`,
  scaleIn: `${TRANSITIONS.transform} ${TRANSITION_DURATION.normal} ${EASING.out}`,
  scaleOut: `${TRANSITIONS.transform} ${TRANSITION_DURATION.normal} ${EASING.in}`,
  colorChange: `${TRANSITIONS.colors} ${TRANSITION_DURATION.normal}`,
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
