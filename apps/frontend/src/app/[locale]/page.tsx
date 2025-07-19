import HomePage from '@/components/HomePage';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/lib/i18n';

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <HomePage locale={locale} />;
}
