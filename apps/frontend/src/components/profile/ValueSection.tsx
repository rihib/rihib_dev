'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import type { Locale } from '@/lib/i18n';

interface ValueSectionProps {
  locale: Locale;
}

export function ValueSection({ locale }: ValueSectionProps) {
  const { t } = useTranslation(locale);

  return (
    <Card id="value">
      <CardHeader>
        <CardTitle>{t('profile.value')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>{t('profile.valuePara1')}</p>
          <p>{t('profile.valuePara2')}</p>
          <p>{t('profile.valuePara3')}</p>
          <p>{t('profile.valuePara4')}</p>
          <p>{t('profile.valuePara5')}</p>
        </div>
      </CardContent>
    </Card>
  );
}
