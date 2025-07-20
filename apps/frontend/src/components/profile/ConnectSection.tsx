'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { useProfileData } from '@/hooks/useProfileData';
import { useExternalLink } from '@/hooks/useExternalLink';
import type { Locale } from '@/lib/i18n';

interface ConnectSectionProps {
  locale: Locale;
}

export function ConnectSection({ locale }: ConnectSectionProps) {
  const { t } = useTranslation(locale);
  const { socialLinks } = useProfileData();
  const { getLinkProps } = useExternalLink();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('profile.connect')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            const linkProps = getLinkProps(link.href);
            return (
              <a
                key={link.label}
                {...linkProps}
                className="flex items-center space-x-3 bg-muted hover:bg-muted/80 px-4 py-2 rounded-lg transition-colors"
              >
                <Icon size={24} />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
