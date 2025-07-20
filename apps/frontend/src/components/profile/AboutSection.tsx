'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import type { Locale } from '@/lib/i18n';

interface AboutSectionProps {
  locale: Locale;
}

export function AboutSection({ locale }: AboutSectionProps) {
  const { t } = useTranslation(locale);

  return (
    <Card id="about">
      <CardHeader>
        <CardTitle>{t('profile.about')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>{t('profile.bio')}</p>
          <p>{t('profile.bio2')}</p>
          <p>{t('profile.bio3')}</p>
        </div>
      </CardContent>
    </Card>
  );
}
