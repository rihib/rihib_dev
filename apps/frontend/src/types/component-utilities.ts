// Component composition and React-specific utility types

import type { ReactNode, ComponentType, FC, PropsWithChildren } from 'react';

// Component composition utilities
export interface WithDisplayName<T extends ComponentType<any>> {
  (props: React.ComponentProps<T>): ReactNode;
  displayName: string;
}

export type ComponentWithDisplayName<P = {}> = FC<P> & {
  displayName: string;
};

export type ForwardRefComponentWithDisplayName<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithChildren<P> & React.RefAttributes<T>
> & {
  displayName: string;
};

// HOC (Higher Order Component) utilities
export type HOC<InjectedProps, OwnProps = {}> = <
  C extends ComponentType<Matching<InjectedProps, React.ComponentProps<C>>>,
>(
  component: C
) => ComponentType<Subtract<React.ComponentProps<C>, InjectedProps> & OwnProps>;

export type Matching<T, U> = { [K in keyof T & keyof U]: T[K] };

export type Subtract<T, K> = Omit<T, keyof K>;

// Render prop utilities
export type RenderProp<P = {}> = (props: P) => ReactNode;

export type ChildrenRenderProp<P = {}> = {
  children: RenderProp<P>;
};

export type FunctionAsChild<P = {}> = {
  children: (props: P) => ReactNode;
};

// Component prop extraction utilities
export type ExtractProps<T> = T extends ComponentType<infer P> ? P : never;

export type ExtractRef<T> = T extends React.RefAttributes<infer R> ? R : never;

export type PropsOf<T extends keyof React.JSX.IntrinsicElements | ComponentType<any>> =
  T extends keyof React.JSX.IntrinsicElements
    ? React.JSX.IntrinsicElements[T]
    : T extends ComponentType<infer P>
      ? P
      : never;

// Event handler utilities
export type EventHandler<T extends Event = Event> = (event: T) => void;

export type AsyncEventHandler<T extends Event = Event> = (event: T) => Promise<void>;

export type EventHandlerWithContext<T extends Event = Event, C = unknown> = (
  event: T,
  context: C
) => void;

export type PreventableEventHandler<T extends Event = Event> = (event: T) => void | boolean;

// State management utilities
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type StateUpdater<T> = (prevState: T) => T;

export type StateHook<T> = [T, SetState<T>];

export type ReducerAction<T extends string = string, P = unknown> = {
  type: T;
  payload?: P;
};

export type ReducerState<T> = T;

export type Reducer<S, A> = (state: S, action: A) => S;

// Async utilities
export type AsyncOperationState = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export interface AsyncOperation<T, E = Error> {
  state: AsyncOperationState;
  data?: T;
  error?: E;
  isIdle: boolean;
  isPending: boolean;
  isFulfilled: boolean;
  isRejected: boolean;
}

export type PromiseResolver<T> = (value: T | PromiseLike<T>) => void;

export type PromiseRejecter = (reason?: any) => void;

export type DeferredPromise<T> = {
  promise: Promise<T>;
  resolve: PromiseResolver<T>;
  reject: PromiseRejecter;
};

// Conditional rendering utilities
export interface ConditionalProps {
  when: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

export interface SwitchProps<T extends string | number> {
  value: T;
  children: React.ReactElement<CaseProps<T>>[];
  fallback?: ReactNode;
}

export interface CaseProps<T extends string | number> {
  when: T | T[];
  children: ReactNode;
}

// List rendering utilities
export interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  emptyState?: ReactNode;
  loading?: boolean;
  loadingState?: ReactNode;
  error?: Error | null;
  errorState?: ReactNode;
}

export interface VirtualizedListProps<T> extends ListProps<T> {
  itemHeight: number | ((item: T, index: number) => number);
  containerHeight: number;
  overscan?: number;
  scrollToIndex?: number;
  onScroll?: (scrollTop: number) => void;
}

// Performance utilities
export interface PerformanceMetrics {
  renderTime: number;
  updateTime: number;
  memoryUsage: number;
  bundleSize: number;
  cacheHits: number;
  cacheMisses: number;
}

export interface LazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  fallback?: ReactNode;
}

// Accessibility utilities
export interface A11yProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-atomic'?: boolean;
  'aria-busy'?: boolean;
  'aria-controls'?: string;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-disabled'?: boolean;
  'aria-invalid'?: boolean | 'grammar' | 'spelling';
  'aria-pressed'?: boolean;
  'aria-readonly'?: boolean;
  'aria-required'?: boolean;
  'aria-selected'?: boolean;
  role?: string;
  tabIndex?: number;
}

export interface FocusManagement {
  autoFocus?: boolean;
  restoreFocus?: boolean;
  trapFocus?: boolean;
  initialFocus?: string;
  finalFocus?: string;
}

// Testing utilities
export interface TestProps {
  'data-testid'?: string;
  'data-test'?: string;
  'data-qa'?: string;
}

export interface MockProps<T> {
  mock?: Partial<T>;
  loading?: boolean;
  error?: Error | null;
}

// Development utilities
export interface DevtoolsProps {
  debug?: boolean;
  name?: string;
  trace?: boolean;
  profile?: boolean;
}

export interface ComponentInfo {
  name: string;
  version: string;
  props: Record<string, unknown>;
  state?: Record<string, unknown>;
  context?: Record<string, unknown>;
  performance?: PerformanceMetrics;
}
