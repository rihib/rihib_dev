import { commonTranslations } from './common';
import { homeTranslations } from './home';
import { profileTranslations } from './profile';
import { blogTranslations } from './blog';
import { newsTranslations } from './news';
import { errorTranslations } from './errors';

// Combine all translations with proper TypeScript inference
export const allTranslations = {
  en: {
    ...commonTranslations.en,
    ...homeTranslations.en,
    ...profileTranslations.en,
    ...blogTranslations.en,
    ...newsTranslations.en,
    ...errorTranslations.en,
  },
  ja: {
    ...commonTranslations.ja,
    ...homeTranslations.ja,
    ...profileTranslations.ja,
    ...blogTranslations.ja,
    ...newsTranslations.ja,
    ...errorTranslations.ja,
  },
} as const;

// Export individual translation objects for potential direct access
export {
  commonTranslations,
  homeTranslations,
  profileTranslations,
  blogTranslations,
  newsTranslations,
  errorTranslations,
};
