/**
 * Contact Information Constants
 *
 * Centralized contact information and support details.
 */

/**
 * Contact information
 */
export const CONTACT = {
  supportEmail: 'support@rihib.dev',
  personalEmail: 'rihito@keio.jp',
  github: 'https://github.com/rihib',
  linkedin: 'https://www.linkedin.com/in/rihito-bannai/',
  twitter: 'https://x.com/rihib_dev',
} as const;

/**
 * Badge dimensions for various certifications
 */
export const BADGE_DIMENSIONS = {
  secHack365: {
    width: 128,
    height: 128,
    className: 'w-32 h-auto',
  },
} as const;

/**
 * Profile section styling constants
 */
export const PROFILE_SECTION = {
  borderWidth: 'border-l-4',
  iconContainer: 'w-12 h-12', // matches ICON_CLASSES['3xl']
} as const;
