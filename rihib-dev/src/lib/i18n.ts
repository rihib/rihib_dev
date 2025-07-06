export const locales = ['en', 'ja'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const translations = {
  en: {
    'nav.home': 'Home',
    'nav.profile': 'Profile',
    'nav.blog': 'Blog',
    'nav.news': 'News',
    'profile.title': 'Profile',
    'profile.about': 'About Me',
    'profile.connect': 'Connect',
    'profile.bio': 'I am a software engineer passionate about building great products with modern technologies.',
    'profile.bio2': 'I love working with TypeScript, React, and cloud technologies to create scalable solutions.',
    'blog.title': 'Blog',
    'blog.readMore': 'Read more',
    'news.title': 'News',
    'news.readMore': 'Read more',
    'home.title': 'Welcome to rihib.dev',
    'home.subtitle': 'Personal website and portfolio',
  },
  ja: {
    'nav.home': 'ホーム',
    'nav.profile': 'プロフィール',
    'nav.blog': 'ブログ',
    'nav.news': 'お知らせ',
    'profile.title': 'プロフィール',
    'profile.about': '自己紹介',
    'profile.connect': 'コンタクト',
    'profile.bio': '私は現代技術を使って素晴らしいプロダクトを作ることに情熱を持つソフトウェアエンジニアです。',
    'profile.bio2': 'TypeScript、React、クラウド技術を使ってスケーラブルなソリューションを作ることが好きです。',
    'blog.title': 'ブログ',
    'blog.readMore': '続きを読む',
    'news.title': 'お知らせ',
    'news.readMore': '続きを読む',
    'home.title': 'rihib.dev へようこそ',
    'home.subtitle': '個人ウェブサイトとポートフォリオ',
  },
} as const;

export function getTranslation(locale: Locale, key: keyof typeof translations.en) {
  return translations[locale][key] || translations[defaultLocale][key];
}