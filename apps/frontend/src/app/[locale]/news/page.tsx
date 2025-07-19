import { getTranslation, isValidLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { getNewsItems } from '@/lib/api';
import ArticleList from '@/components/ArticleList';

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = (key: keyof typeof import('@/lib/i18n').translations.en) => getTranslation(locale, key);

  const newsItems = await getNewsItems(locale);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">{t('news.title')}</h1>

        <ArticleList
          articles={newsItems}
          readMoreText={t('news.readMore')}
          emptyMessage={locale === 'ja' ? 'まだニュースがありません。' : 'No news available yet.'}
        />
      </div>
    </main>
  );
}
