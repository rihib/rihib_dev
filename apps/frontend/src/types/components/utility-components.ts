// Utility and generic component prop interfaces

import type { ReactNode, RefObject } from 'react';
import type { BaseComponentProps, SizeVariant, ClickHandler, KeyboardHandler } from '../common';
import type { SupportedLocale } from '../translations';

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
