'use client';

import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import type { Locale } from '@/lib/i18n';

interface PapersSectionProps {
  locale: Locale;
}

const papersData = [
  {
    titleKey: 'profile.paperTitle' as const,
    authorsKey: 'profile.paperAuthors' as const,
    venueKey: 'profile.paperVenue' as const,
    yearKey: 'profile.paperYear' as const,
    url: 'https://ipsj.ixsq.nii.ac.jp/records/213965',
    borderColor: 'border-blue-500',
  },
];

export function PapersSection({ locale }: PapersSectionProps) {
  const { t } = useTranslation(locale);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('profile.papers')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {papersData.map((paper, index) => (
            <div key={index} className={`border-l-4 ${paper.borderColor} pl-4`}>
              <h3 className="font-semibold text-foreground mb-2">
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t(paper.titleKey)}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground mb-1">{t(paper.authorsKey)}</p>
              <p className="text-sm text-muted-foreground mb-1">{t(paper.venueKey)}</p>
              <p className="text-sm text-muted-foreground">{t(paper.yearKey)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
