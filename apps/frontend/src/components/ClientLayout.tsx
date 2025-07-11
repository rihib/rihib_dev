'use client';

import Header from '@/components/Header';
import { useLocale } from '@/hooks/useLocale';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { locale } = useLocale();

  return (
    <>
      <Header locale={locale} />
      {children}
    </>
  );
}
