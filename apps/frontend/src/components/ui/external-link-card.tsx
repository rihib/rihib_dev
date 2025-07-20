'use client';

import { ExternalLink } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useExternalLink } from '@/hooks/useExternalLink';
import type { Locale } from '@/lib/i18n';
import { translations } from '@/lib/i18n';
import { DEFAULT_ICON_SIZES, TEXT_SIZES, TEXT_COLORS, PADDING } from '@/lib/constants';

export interface ExternalLinkData {
  titleKey: keyof typeof translations.en;
  url: string;
  borderColor: string;
}

interface ExternalLinkCardProps {
  item: ExternalLinkData;
  locale: Locale;
  className?: string;
  iconSize?: 12 | 14 | 16;
  textSize?: 'sm' | 'base' | 'lg';
}

export function ExternalLinkCard({
  item,
  locale,
  className = '',
  iconSize = DEFAULT_ICON_SIZES.external_link,
  textSize = 'base',
}: ExternalLinkCardProps) {
  const { t } = useTranslation(locale);
  const { getLinkProps } = useExternalLink();

  const textClasses = {
    sm: TEXT_SIZES.sm,
    base: TEXT_SIZES.base,
    lg: TEXT_SIZES.lg,
  };

  const linkProps = getLinkProps(item.url);

  return (
    <div className={`border-l-4 ${item.borderColor} pl-4 ${className}`}>
      <a
        {...linkProps}
        className={`text-foreground hover:${TEXT_COLORS.blue} transition-colors inline-flex items-center gap-1 ${textClasses[textSize]}`}
      >
        {t(item.titleKey)}
        <ExternalLink size={iconSize} />
      </a>
    </div>
  );
}
