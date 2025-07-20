'use client';

import { ExternalLink } from 'lucide-react';
import { ProfileSection } from '@/components/ui/profile-section';
import { ExternalLinkGrid } from '@/components/ui/external-link-grid';
import { useTranslation } from '@/hooks/useTranslation';
import { useProfileData } from '@/hooks/useProfileData';
import { useExternalLink } from '@/hooks/useExternalLink';
import type { Locale } from '@/lib/i18n';
import { DEFAULT_ICON_SIZES, TEXT_COLORS } from '@/lib/constants';

interface OSSSectionProps {
  locale: Locale;
}

export function OSSSection({ locale }: OSSSectionProps) {
  const { t } = useTranslation(locale);
  const { oss } = useProfileData();
  const { getLinkProps } = useExternalLink();

  const kubernetesLinkProps = getLinkProps(oss.kubernetes.mainUrl);

  return (
    <ProfileSection titleKey="profile.oss" locale={locale} id="oss">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-foreground mb-3">
            <a
              {...kubernetesLinkProps}
              className={`hover:${TEXT_COLORS.blue} transition-colors inline-flex items-center gap-1`}
            >
              {t('profile.kubernetes')}
              <ExternalLink size={DEFAULT_ICON_SIZES.navigation} />
            </a>
          </h3>
          <div className="ml-4">
            <ExternalLinkGrid
              items={oss.kubernetes.contributions}
              locale={locale}
              layout="vertical"
              iconSize={DEFAULT_ICON_SIZES.xs}
              textSize="sm"
            />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-3">{t('profile.otherOss')}</h3>
          <div className="ml-4">
            <ExternalLinkGrid
              items={oss.other}
              locale={locale}
              layout="vertical"
              iconSize={DEFAULT_ICON_SIZES.xs}
              textSize="sm"
            />
          </div>
        </div>
      </div>
    </ProfileSection>
  );
}
