import { TimelineItem, type TimelineItemData } from './timeline-item';
import type { Locale } from '@/lib/i18n';

interface TimelineListProps {
  items: TimelineItemData[];
  locale: Locale;
  layout?: 'vertical' | 'grid';
  className?: string;
  itemClassName?: string;
  titleSize?: 'sm' | 'base' | 'lg';
  iconSize?: 12 | 14 | 16;
}

export function TimelineList({
  items,
  locale,
  layout = 'vertical',
  className = '',
  itemClassName = '',
  titleSize = 'base',
  iconSize = 16,
}: TimelineListProps) {
  const layoutClasses = {
    vertical: 'space-y-4',
    grid: 'grid md:grid-cols-2 gap-4',
  };

  return (
    <div className={`${layoutClasses[layout]} ${className}`}>
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          item={item}
          locale={locale}
          className={itemClassName}
          titleSize={titleSize}
          iconSize={iconSize}
        />
      ))}
    </div>
  );
}
