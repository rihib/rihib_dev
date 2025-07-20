'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import type { Locale } from '@/lib/i18n';
import { translations } from '@/lib/i18n';
import type { ReactNode } from 'react';

interface ProfileSectionProps {
  titleKey: keyof typeof translations.en;
  locale: Locale;
  children: ReactNode;
  id?: string;
  className?: string;
  contentClassName?: string;
}

export function ProfileSection({
  titleKey,
  locale,
  children,
  id,
  className = '',
  contentClassName = '',
}: ProfileSectionProps) {
  const { t } = useTranslation(locale);

  return (
    <Card id={id} className={className}>
      <CardHeader>
        <CardTitle>{t(titleKey)}</CardTitle>
      </CardHeader>
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  );
}
