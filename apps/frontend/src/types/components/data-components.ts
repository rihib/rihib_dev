// Data display and presentation component prop interfaces

import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { BaseComponentProps, SizeVariant } from '../common';
import type { Article } from '../api';
import type { TranslationKeys, SupportedLocale } from '../translations';
import type { BaseTimelineItem, ExternalLinkItem, SocialLink } from '../profile';

// Article display component props
export interface ArticleListProps extends BaseComponentProps {
  articles: Article[];
  readMoreText: string;
  emptyMessage: string;
  loading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export interface ArticleCardProps extends BaseComponentProps {
  article: Article;
  readMoreText: string;
  showDate?: boolean;
  showType?: boolean;
  compact?: boolean;
}

// Timeline component props
export interface TimelineProps<T = BaseTimelineItem> extends BaseComponentProps {
  items: T[];
  orientation?: 'vertical' | 'horizontal';
  variant?: 'default' | 'compact' | 'detailed';
}

export interface TimelineItemProps extends BaseComponentProps {
  item: BaseTimelineItem;
  translate: (key: TranslationKeys) => string;
  index?: number;
  isLast?: boolean;
}

// Profile component props
export interface ProfileSectionProps extends BaseComponentProps {
  titleKey: TranslationKeys;
  locale: SupportedLocale;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export interface ProfileHeaderProps extends BaseComponentProps {
  name: string;
  title: string;
  description: string;
  socialLinks: SocialLink[];
  avatarSrc?: string;
  backgroundSrc?: string;
}

export interface ExternalLinkCardProps extends BaseComponentProps {
  item: ExternalLinkItem;
  translate: (key: TranslationKeys) => string;
  showIcon?: boolean;
  target?: '_blank' | '_self';
}

export interface ExternalLinkGridProps extends BaseComponentProps {
  items: ExternalLinkItem[];
  translate: (key: TranslationKeys) => string;
  columns?: 1 | 2 | 3 | 4;
  spacing?: SizeVariant;
}

// Table component props
export interface TableProps<T = Record<string, unknown>> extends BaseComponentProps {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  error?: Error | null;
  emptyMessage?: string;
  striped?: boolean;
  hoverable?: boolean;
  sortable?: boolean;
  onSort?: (column: keyof T, direction: 'asc' | 'desc') => void;
}

export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T;
  header: string;
  width?: number | string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T, index: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
}

// Icon component props
export interface IconProps extends BaseComponentProps {
  icon: LucideIcon;
  size?: number | SizeVariant;
  color?: string;
  stroke?: number;
  fill?: string;
  rotation?: number;
  flip?: 'horizontal' | 'vertical' | 'both';
}

export interface IconButtonProps extends BaseComponentProps {
  icon: LucideIcon;
  label: string; // For accessibility
  tooltip?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}
