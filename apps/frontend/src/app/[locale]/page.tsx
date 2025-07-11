import HomePage from '@/components/HomePage';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/lib/i18n';

export default function LocalePage({ params }: { params: { locale: string } }) {
  const { locale } = params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <HomePage locale={locale} />;
}
