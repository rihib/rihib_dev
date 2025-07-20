import { type ComponentPropsWithoutRef, type ElementRef } from 'react';

// Base utility types
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type PartialBy<T, K extends keyof T> = Prettify<Partial<Pick<T, K>> & Omit<T, K>>;

export type RequiredBy<T, K extends keyof T> = Prettify<Required<Pick<T, K>> & Omit<T, K>>;

// Component props utilities
export type ComponentProps<T extends keyof React.JSX.IntrinsicElements> =
  ComponentPropsWithoutRef<T>;

export type ElementProps<T extends React.ElementType> = ComponentPropsWithoutRef<T>;

// Removed ElementRefType due to complex type constraints

// Size variants for consistent component sizing
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ColorVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

export type LayoutVariant = 'default' | 'compact' | 'comfortable' | 'spacious';

// Status types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

// Common props for interactive elements
export interface InteractiveElementProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

// Accessibility props
export interface AccessibilityProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-selected'?: boolean;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  role?: string;
  tabIndex?: number;
}

// Data attributes for testing and analytics
export interface DataAttributes {
  'data-testid'?: string;
  'data-analytics'?: string;
  'data-component'?: string;
}

// Common component base props
export interface BaseComponentProps extends AccessibilityProps, DataAttributes {
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

// Event handler types with proper generics
export type ClickHandler<T extends HTMLElement = HTMLElement> = (
  event: React.MouseEvent<T>
) => void;

export type KeyboardHandler<T extends HTMLElement = HTMLElement> = (
  event: React.KeyboardEvent<T>
) => void;

export type ChangeHandler<T extends HTMLElement = HTMLElement> = (
  event: React.ChangeEvent<T>
) => void;

export type FocusHandler<T extends HTMLElement = HTMLElement> = (
  event: React.FocusEvent<T>
) => void;

// Form types
export interface FormField<T = string> {
  value: T;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

export interface FormState<T extends Record<string, unknown>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Responsive design types
export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ResponsiveValue<T> = T | Partial<Record<BreakpointKey, T>>;

// Animation and transition types
export type AnimationDuration = 'fast' | 'normal' | 'slow';

export type TransitionTiming = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';

// Environment and configuration types
export type Environment = 'dev' | 'staging' | 'prd';

export interface EnvironmentConfig {
  env: Environment;
  apiUrl: string;
  enableLogging: boolean;
  enableAnalytics: boolean;
  version: string;
}

// Generic collection types
export interface PaginatedCollection<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface SortOptions<T> {
  field: keyof T;
  direction: 'asc' | 'desc';
}

export interface FilterOptions<T> {
  field: keyof T;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith';
  value: unknown;
}

// ID types for different entities
export type ID = string | number;

export type ArticleID = number;

export type UserID = string;

// Date and time utilities
export type DateString = string; // ISO 8601 date string

export type TimeString = string; // ISO 8601 time string

export type DateTimeString = string; // ISO 8601 datetime string

// URL and link types
export type URL = string;

export type RelativeURL = string;

export type AbsoluteURL = string;

// Safe unknown type for external data
export type SafeUnknown = Record<string, unknown> | unknown[] | string | number | boolean | null;

// Advanced utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export type NonNullable<T> = T extends null | undefined ? never : T;

export type NonEmptyArray<T> = [T, ...T[]];

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export type Flatten<T> = T extends ReadonlyArray<infer U> ? U : T;

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type ValuesOf<T> = T[keyof T];

export type KeysOf<T> = keyof T;

export type StringKeys<T> = Extract<keyof T, string>;

export type NumberKeys<T> = Extract<keyof T, number>;

export type SymbolKeys<T> = Extract<keyof T, symbol>;

// Function utility types
export type AsyncFunction<T extends readonly unknown[], R> = (...args: T) => Promise<R>;

export type SyncFunction<T extends readonly unknown[], R> = (...args: T) => R;

export type AnyFunction = (...args: any[]) => any;

export type NoArgFunction<R = void> = () => R;

export type SingleArgFunction<T, R = void> = (arg: T) => R;

// Branded types for better type safety
export type Brand<T, B> = T & { __brand: B };

export type Email = Brand<string, 'Email'>;
export type UserId = Brand<string, 'UserId'>;
export type Timestamp = Brand<number, 'Timestamp'>;
export type PositiveNumber = Brand<number, 'PositiveNumber'>;
export type NonEmptyString = Brand<string, 'NonEmptyString'>;

// Result type for better error handling
export type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

// Option type for null-safe programming
export type Option<T> = T | null | undefined;

export type Some<T> = NonNullable<T>;

export type None = null | undefined;
