'use client';

import { useCallback } from 'react';
import type { Locale } from '@/lib/i18n';
import { translations, defaultLocale } from '@/lib/i18n';

export function useTranslation(locale: Locale) {
  const t = useCallback(
    (key: keyof typeof translations.en) => {
      return translations[locale][key] || translations[defaultLocale][key];
    },
    [locale]
  );

  return { t };
}
