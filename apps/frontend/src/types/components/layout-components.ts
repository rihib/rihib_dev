// Layout and navigation component prop interfaces

import type { ReactNode } from 'react';
import type { BaseComponentProps, SizeVariant, ColorVariant } from '../common';

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
