import { ExternalLinkCard, type ExternalLinkData } from './external-link-card';
import type { Locale } from '@/lib/i18n';

interface ExternalLinkGridProps {
  items: ExternalLinkData[];
  locale: Locale;
  layout?: 'vertical' | 'grid';
  className?: string;
  itemClassName?: string;
  iconSize?: 12 | 14 | 16;
  textSize?: 'sm' | 'base' | 'lg';
}

export function ExternalLinkGrid({
  items,
  locale,
  layout = 'grid',
  className = '',
  itemClassName = '',
  iconSize = 14,
  textSize = 'base',
}: ExternalLinkGridProps) {
  const layoutClasses = {
    vertical: 'space-y-2',
    grid: 'grid md:grid-cols-2 gap-4',
  };

  return (
    <div className={`${layoutClasses[layout]} ${className}`}>
      {items.map((item, index) => (
        <ExternalLinkCard
          key={index}
          item={item}
          locale={locale}
          className={itemClassName}
          iconSize={iconSize}
          textSize={textSize}
        />
      ))}
    </div>
  );
}
