// Translation system types for type-safe internationalization

import { allTranslations } from '@/lib/translations';

// Extract translation keys with proper typing
export type TranslationKeys = keyof typeof allTranslations.en;

// Extract locale types
export type SupportedLocale = keyof typeof allTranslations;

// Translation value types
export type TranslationValue = string | number | boolean | TranslationObject;

export interface TranslationObject {
  [key: string]: TranslationValue;
}

// Complete translation structure
export type TranslationStructure = typeof allTranslations;

// Translation function types
export type TranslateFunction = (key: TranslationKeys, ...args: unknown[]) => string;

export type TranslateFunctionWithParams = <T extends Record<string, unknown>>(
  key: TranslationKeys,
  params?: T
) => string;

// Translation interpolation types
export interface TranslationParams {
  [key: string]: string | number | boolean | Date;
}

export interface TranslationInterpolationConfig {
  prefix?: string;
  suffix?: string;
  escapeValue?: boolean;
  format?: (value: unknown, format?: string, language?: string) => string;
}

// Translation namespace types for better organization
export type CommonTranslationKeys = keyof typeof allTranslations.en & string;
export type HomeTranslationKeys = Extract<CommonTranslationKeys, `home.${string}`>;
export type ProfileTranslationKeys = Extract<CommonTranslationKeys, `profile.${string}`>;
export type BlogTranslationKeys = Extract<CommonTranslationKeys, `blog.${string}`>;
export type NewsTranslationKeys = Extract<CommonTranslationKeys, `news.${string}`>;
export type ErrorTranslationKeys = Extract<CommonTranslationKeys, `error.${string}`>;

// Translation provider types
export interface TranslationProviderProps {
  children: React.ReactNode;
  locale: SupportedLocale;
  fallbackLocale?: SupportedLocale;
  translations?: Partial<TranslationStructure>;
}

export interface TranslationContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: TranslateFunctionWithParams;
  isLoading: boolean;
  error: Error | null;
}

// Translation loading states
export type TranslationLoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface TranslationState {
  locale: SupportedLocale;
  translations: TranslationStructure[SupportedLocale];
  loading: TranslationLoadingState;
  error: Error | null;
  lastUpdated?: string;
}

// Translation validation types
export interface TranslationValidationResult {
  isValid: boolean;
  missing: string[];
  extra: string[];
  errors: TranslationValidationError[];
}

export interface TranslationValidationError {
  key: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

// Pluralization support
export type PluralRule = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

export type PluralTranslation = {
  [K in PluralRule]?: string;
};

export interface PluralOptions {
  count: number;
  ordinal?: boolean;
}

// Date and number formatting types
export interface DateFormatOptions extends Intl.DateTimeFormatOptions {
  locale?: SupportedLocale;
}

export interface NumberFormatOptions extends Intl.NumberFormatOptions {
  locale?: SupportedLocale;
}

// Translation hook return types
export interface UseTranslationReturn {
  t: TranslateFunctionWithParams;
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  isLoading: boolean;
  error: Error | null;
}

export interface UseLocaleReturn {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  supportedLocales: SupportedLocale[];
  isRTL: boolean;
}

// Translation file structure validation
export interface TranslationFileStructure {
  [namespace: string]: {
    [key: string]: string | TranslationFileStructure;
  };
}

// Translation metadata
export interface TranslationMetadata {
  version: string;
  lastModified: string;
  author?: string;
  description?: string;
  coverage?: number; // Percentage of keys translated
}

// Translation import/export types
export interface TranslationExportData {
  locale: SupportedLocale;
  translations: TranslationStructure[SupportedLocale];
  metadata: TranslationMetadata;
}

export interface TranslationImportResult {
  success: boolean;
  imported: number;
  skipped: number;
  errors: string[];
}

// Type guards for translation validation
export function isValidTranslationKey(key: string): key is TranslationKeys {
  return key in allTranslations.en;
}

export function isValidLocale(locale: string): locale is SupportedLocale {
  return locale in allTranslations;
}

export function isTranslationObject(value: unknown): value is TranslationObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Utility types for translation key extraction
export type ExtractNamespaceKeys<T extends string> = Extract<TranslationKeys, `${T}.${string}`>;

export type RemoveNamespacePrefix<T extends string, P extends string> = T extends `${P}.${infer R}`
  ? R
  : never;

// Translation key autocomplete helper
export type TranslationKeyAutocomplete<T extends string = ''> = T extends TranslationKeys
  ? T
  : TranslationKeys;

// Conditional translation types
export type ConditionalTranslation<T extends boolean> = T extends true ? TranslationKeys : string;

// Translation with default value
export interface TranslationWithDefault {
  key: TranslationKeys;
  defaultValue: string;
  params?: TranslationParams;
}

// Translation error types
export interface TranslationError extends Error {
  code: 'MISSING_KEY' | 'INVALID_PARAMS' | 'LOAD_FAILED' | 'PARSE_ERROR';
  key?: string;
  locale?: SupportedLocale;
  details?: Record<string, unknown>;
}

// Translation cache types
export interface TranslationCacheEntry {
  key: TranslationKeys;
  value: string;
  params?: TranslationParams;
  locale: SupportedLocale;
  timestamp: number;
  hitCount: number;
}

export interface TranslationCache {
  get(key: string): TranslationCacheEntry | undefined;
  set(key: string, entry: TranslationCacheEntry): void;
  clear(): void;
  size(): number;
}
