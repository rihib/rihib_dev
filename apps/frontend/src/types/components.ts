// Comprehensive component prop interfaces for type safety

import type { ComponentPropsWithoutRef, ElementRef, ReactNode, RefObject } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';

import type {
  BaseComponentProps,
  InteractiveElementProps,
  SizeVariant,
  ColorVariant,
  LoadingState,
  ClickHandler,
  KeyboardHandler,
} from './common';
import type { Article } from './api';
import type { TranslationKeys, SupportedLocale } from './translations';
import type { BaseTimelineItem, ExternalLinkItem, ProfileData, SocialLink } from './profile';

// Button component props
export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  isFullWidth?: boolean;
  onClick?: ClickHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

// Card component props
export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  padding?: SizeVariant;
  hover?: boolean;
  interactive?: boolean;
  selected?: boolean;
}

export interface CardHeaderProps extends BaseComponentProps {
  align?: 'left' | 'center' | 'right';
}

export interface CardContentProps extends BaseComponentProps {
  padding?: SizeVariant;
}

export interface CardFooterProps extends BaseComponentProps {
  align?: 'left' | 'center' | 'right';
  spacing?: SizeVariant;
}

// Layout component props
export interface LayoutProps extends BaseComponentProps {
  sidebar?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  centered?: boolean;
}

export interface SectionProps extends BaseComponentProps {
  as?: 'section' | 'div' | 'article' | 'aside';
  spacing?: SizeVariant;
  background?: ColorVariant;
  bordered?: boolean;
}

export interface ContainerProps extends BaseComponentProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: SizeVariant;
  centered?: boolean;
}

// Navigation component props
export interface NavLinkProps extends BaseComponentProps {
  href: string;
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
  prefetch?: boolean;
}

export interface BreadcrumbProps extends BaseComponentProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

// Form component props
export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  size?: SizeVariant;
  variant?: 'default' | 'filled' | 'outlined';
  fullWidth?: boolean;
  clearable?: boolean;
}

export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  label?: string;
  error?: string;
  helperText?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  autoGrow?: boolean;
}

export interface SelectProps<T = string> extends BaseComponentProps {
  value?: T;
  onValueChange?: (value: T) => void;
  options: SelectOption<T>[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  multiple?: boolean;
}

export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  group?: string;
}

// Feedback component props
export interface AlertProps extends BaseComponentProps {
  variant?: 'default' | 'destructive' | 'warning' | 'success' | 'info';
  title?: string;
  description?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: LucideIcon;
}

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  duration?: number;
  action?: ToastAction;
  onDismiss?: (id: string) => void;
}

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface LoadingProps extends BaseComponentProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  size?: SizeVariant;
  text?: string;
  overlay?: boolean;
}

export interface SkeletonProps extends BaseComponentProps {
  width?: number | string;
  height?: number | string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
}

// Data display component props
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

// Theme and accessibility component props
export interface ThemeToggleProps extends BaseComponentProps {
  size?: SizeVariant;
  showLabel?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
}

export interface LanguageToggleProps extends BaseComponentProps {
  currentLocale: SupportedLocale;
  onLocaleChange: (locale: SupportedLocale) => void;
  supportedLocales: SupportedLocale[];
  showFlags?: boolean;
  variant?: 'dropdown' | 'tabs' | 'buttons';
}

export interface ColorSchemeToggleProps extends BaseComponentProps {
  currentScheme: 'light' | 'dark' | 'system';
  onSchemeChange: (scheme: 'light' | 'dark' | 'system') => void;
  showLabel?: boolean;
}

// Error boundary and error handling props
export interface ErrorBoundaryProps extends BaseComponentProps {
  fallback?: React.ComponentType<ComponentErrorBoundaryFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
}

export interface ComponentErrorBoundaryFallbackProps {
  error: Error;
  errorInfo?: React.ErrorInfo;
  resetErrorBoundary: () => void;
  resetKeys?: Array<string | number>;
}

export interface ErrorDisplayProps extends BaseComponentProps {
  error: Error;
  title?: string;
  showDetails?: boolean;
  onRetry?: () => void;
  onReport?: (error: Error) => void;
}

// Modal and overlay component props
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  preventScroll?: boolean;
}

export interface OverlayProps extends BaseComponentProps {
  isOpen: boolean;
  onClose?: () => void;
  blur?: boolean;
  opacity?: number;
  zIndex?: number;
}

export interface PopoverProps extends BaseComponentProps {
  trigger: ReactNode;
  content: ReactNode;
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end';
  offset?: number;
  delay?: number;
  closeOnClickOutside?: boolean;
  disabled?: boolean;
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

export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: LucideIcon;
  label: string; // For accessibility
  tooltip?: string;
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

// Search and filter component props
export interface SearchProps extends Omit<InputProps, 'type'> {
  onSearch: (query: string) => void;
  onClear?: () => void;
  suggestions?: string[];
  showSuggestions?: boolean;
  debounceMs?: number;
  minLength?: number;
}

export interface FilterProps<T = Record<string, unknown>> extends BaseComponentProps {
  filters: FilterOption<T>[];
  values: Partial<T>;
  onFilterChange: (values: Partial<T>) => void;
  resetable?: boolean;
  collapsible?: boolean;
}

export interface FilterOption<T = Record<string, unknown>> {
  key: keyof T;
  label: string;
  type: 'text' | 'select' | 'multiselect' | 'date' | 'daterange' | 'number' | 'boolean';
  options?: SelectOption[];
  placeholder?: string;
  validation?: (value: unknown) => boolean;
}

// Animation and transition component props
export interface AnimatedProps extends BaseComponentProps {
  animation?: 'fade' | 'slide' | 'scale' | 'bounce' | 'rotate';
  duration?: number;
  delay?: number;
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  trigger?: 'hover' | 'focus' | 'click' | 'scroll' | 'manual';
  repeat?: boolean | number;
}

export interface TransitionProps extends BaseComponentProps {
  show: boolean;
  appear?: boolean;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  duration?: number;
}

// Utility component props
export interface ConditionalWrapperProps {
  condition: boolean;
  wrapper: (children: ReactNode) => ReactNode;
  children: ReactNode;
}

export interface LazyLoadProps extends BaseComponentProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  placeholder?: ReactNode;
  loading?: ReactNode;
  error?: ReactNode;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

// Forward ref types for components
export type ForwardRefComponent<T, P = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

// Generic component props with ref forwarding
export interface ComponentWithRef<T extends HTMLElement, P = {}> {
  ref?: RefObject<T>;
  props: P;
}

// Polymorphic component types
export type PolymorphicComponentProp<T extends React.ElementType> = {
  as?: T;
};

export type PolymorphicComponentPropsWithRef<
  T extends React.ElementType,
  Props = {},
> = PolymorphicComponentProp<T> & Props & Omit<React.ComponentPropsWithRef<T>, keyof Props | 'as'>;

// Component composition utilities
export interface CompositeComponentProps extends BaseComponentProps {
  components?: {
    [key: string]: React.ComponentType<any>;
  };
  slots?: {
    [key: string]: ReactNode;
  };
}

// Event handler prop types with better generics
export interface EventHandlerProps<T extends HTMLElement = HTMLElement> {
  onClick?: ClickHandler<T>;
  onKeyDown?: KeyboardHandler<T>;
  onFocus?: (event: React.FocusEvent<T>) => void;
  onBlur?: (event: React.FocusEvent<T>) => void;
  onMouseEnter?: (event: React.MouseEvent<T>) => void;
  onMouseLeave?: (event: React.MouseEvent<T>) => void;
}
