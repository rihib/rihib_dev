export const locales = ['en', 'ja'] as const;
export type Locale = (typeof locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export const defaultLocale: Locale = 'en';

import { allTranslations } from './translations';

/**
 * Combined translations from all namespace files.
 * The translations are organized by namespace in separate files:
 * - common.ts: Navigation and common UI elements
 * - home.ts: Homepage content
 * - profile.ts: Profile page content
 * - blog.ts: Blog page content
 * - news.ts: News page content
 * - errors.ts: Error messages
 */
export const translations = allTranslations;

/**
 * Get a translation for a specific locale and key.
 * Falls back to the default locale if the key is not found.
 */
export function getTranslation(locale: Locale, key: keyof typeof translations.en) {
  return translations[locale][key] || translations[defaultLocale][key];
}
