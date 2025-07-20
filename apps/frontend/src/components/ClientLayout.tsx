'use client';

import Header from '@/components/Header';
import { useLocale } from '@/hooks/useLocale';
import { UIErrorBoundary } from '@/components/ErrorBoundary';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { locale } = useLocale();

  return (
    <>
      <UIErrorBoundary>
        <Header locale={locale} />
      </UIErrorBoundary>
      <UIErrorBoundary>
        <main className="pt-[var(--header-height)]">{children}</main>
      </UIErrorBoundary>
    </>
  );
}
