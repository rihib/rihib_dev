'use client';

import { ExternalLink } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useExternalLink } from '@/hooks/useExternalLink';
import type { Locale } from '@/lib/i18n';
import type { BaseTimelineItem } from '@/types/profile';
import type { TranslationKeys, SupportedLocale } from '@/types/translations';
import type { SizeVariant, BaseComponentProps } from '@/types/common';

// Enhanced timeline item interface with better typing
export interface TimelineItemData extends BaseTimelineItem {
  subItems?: TimelineItemData[];
  priority?: 'high' | 'medium' | 'low';
  category?: string;
  tags?: string[];
}

interface TimelineItemProps {
  item: TimelineItemData;
  locale: Locale;
  className?: string;
  titleSize?: 'sm' | 'base' | 'lg';
  iconSize?: 12 | 14 | 16;
}

export function TimelineItem({
  item,
  locale,
  className = '',
  titleSize = 'base',
  iconSize = 16,
}: TimelineItemProps) {
  const { t } = useTranslation(locale);
  const { getLinkProps } = useExternalLink();

  const titleClasses: Record<'sm' | 'base' | 'lg', string> = {
    sm: 'font-medium text-foreground',
    base: 'font-semibold text-foreground',
    lg: 'text-lg font-semibold text-foreground',
  };

  const mainLinkProps = getLinkProps(item.url);
  const descriptionLinkProps = item.descriptionUrl ? getLinkProps(item.descriptionUrl) : null;

  return (
    <div className={className}>
      <div className={`border-l-4 ${item.borderColor} pl-4`}>
        <h3 className={titleClasses[titleSize]}>
          <a
            {...mainLinkProps}
            className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
          >
            {t(item.titleKey)}
            <ExternalLink size={iconSize} />
          </a>
        </h3>
        {item.periodKey && (
          <p className={`${titleSize === 'sm' ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
            {t(item.periodKey)}
          </p>
        )}
        {item.descriptionKey && descriptionLinkProps && (
          <div className="mt-2 inline-block">
            <a
              {...descriptionLinkProps}
              className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 bg-blue-50 px-2 py-1 rounded text-sm font-medium"
            >
              {t(item.descriptionKey)}
              <ExternalLink size={12} />
            </a>
          </div>
        )}
      </div>
      {item.subItems && (
        <div className="ml-4 mt-2 space-y-2">
          {item.subItems.map((subItem: TimelineItemData, index: number) => (
            <TimelineItem key={index} item={subItem} locale={locale} titleSize="sm" iconSize={14} />
          ))}
        </div>
      )}
    </div>
  );
}
