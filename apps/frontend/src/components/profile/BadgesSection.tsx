'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import type { Locale } from '@/lib/i18n';

interface BadgesSectionProps {
  locale: Locale;
}

export function BadgesSection({ locale }: BadgesSectionProps) {
  const { t } = useTranslation(locale);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('profile.openBadges')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-foreground mb-4">{t('profile.secHack365Badge')}</h3>
            <div className="flex justify-center">
              <a
                href="https://www.openbadge-global.com/api/v1.0/openBadge/v2/Wallet/Public/GetAssertionShare/UURiTXVaYWpUYklmRkRkYWkrZkxlUT09"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src="/img/seckhack365-badge.png"
                  alt="SecHack365修了認定"
                  width={128}
                  height={128}
                  className="w-32 h-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
