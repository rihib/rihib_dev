// Utility types for common patterns and improved developer experience

import type { ReactNode, ComponentType, FC, PropsWithChildren } from 'react';
import type { LucideIcon } from 'lucide-react';

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

// Form utilities
export type FormSubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export interface FormField<T = string> {
  value: T;
  error?: string;
  touched: boolean;
  dirty: boolean;
  disabled?: boolean;
  required?: boolean;
}

export type FormFields<T extends Record<string, unknown>> = {
  [K in keyof T]: FormField<T[K]>;
};

export interface FormState<T extends Record<string, unknown>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  dirty: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  submitCount: number;
}

export type FormValidator<T> = (value: T) => string | undefined;

export type FieldValidator<T, F extends keyof T> = (
  value: T[F],
  allValues: T
) => string | undefined;

export type FormValidators<T extends Record<string, unknown>> = {
  [K in keyof T]?: FieldValidator<T, K>;
};

// API utilities
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiEndpoint<P = Record<string, unknown>, R = unknown> = (params: P) => Promise<R>;

export type ApiClient = Record<string, ApiEndpoint>;

export interface ApiHookOptions<T> {
  enabled?: boolean;
  retry?: number | boolean;
  retryDelay?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  cacheTime?: number;
  staleTime?: number;
}

export interface ApiMutationOptions<T, V> {
  onSuccess?: (data: T, variables: V) => void;
  onError?: (error: Error, variables: V) => void;
  onSettled?: (data: T | undefined, error: Error | null, variables: V) => void;
}

// Theme utilities
export type ThemeValue<T> = T | ((theme: any) => T);

export type ResponsiveThemeValue<T> = T | Record<string, T>;

export interface ThemeBreakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export type ThemeBreakpoint = keyof ThemeBreakpoints;

// CSS utilities
export type CSSValue = string | number;

export type CSSProperty = keyof React.CSSProperties;

export type CSSRuleSet = Partial<React.CSSProperties>;

export interface ResponsiveCSSValue<T extends CSSValue> {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

export type CSSVariableKey = `--${string}`;

export type CSSVariables = Record<CSSVariableKey, CSSValue>;

// Animation utilities
export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';

export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';

export type AnimationIterationCount = number | 'infinite';

export type AnimationPlayState = 'paused' | 'running';

export interface AnimationKeyframes {
  [key: string]: CSSRuleSet;
}

export interface AnimationDefinition {
  keyframes: AnimationKeyframes;
  duration?: string | number;
  timingFunction?: string;
  delay?: string | number;
  iterationCount?: AnimationIterationCount;
  direction?: AnimationDirection;
  fillMode?: AnimationFillMode;
  playState?: AnimationPlayState;
}

// Icon utilities
export interface IconDefinition {
  name: string;
  component: LucideIcon;
  keywords?: string[];
  category?: string;
}

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export interface IconProps {
  size?: IconSize;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

// Layout utilities
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type AlignItems = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';

export type AlignContent =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around';

export interface FlexboxUtilities {
  direction?: ResponsiveCSSValue<FlexDirection>;
  wrap?: ResponsiveCSSValue<FlexWrap>;
  justify?: ResponsiveCSSValue<JustifyContent>;
  align?: ResponsiveCSSValue<AlignItems>;
  alignContent?: ResponsiveCSSValue<AlignContent>;
}

export type GridTemplateColumns = string;

export type GridTemplateRows = string;

export type GridAutoFlow = 'row' | 'column' | 'row dense' | 'column dense';

export interface GridUtilities {
  templateColumns?: ResponsiveCSSValue<GridTemplateColumns>;
  templateRows?: ResponsiveCSSValue<GridTemplateRows>;
  autoFlow?: ResponsiveCSSValue<GridAutoFlow>;
  gap?: ResponsiveCSSValue<CSSValue>;
  columnGap?: ResponsiveCSSValue<CSSValue>;
  rowGap?: ResponsiveCSSValue<CSSValue>;
}

// Spacing utilities
export type SpacingValue =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 8
  | 10
  | 12
  | 16
  | 20
  | 24
  | 32
  | 40
  | 48
  | 56
  | 64;

export interface SpacingUtilities {
  m?: ResponsiveCSSValue<SpacingValue>; // margin
  mt?: ResponsiveCSSValue<SpacingValue>; // margin-top
  mr?: ResponsiveCSSValue<SpacingValue>; // margin-right
  mb?: ResponsiveCSSValue<SpacingValue>; // margin-bottom
  ml?: ResponsiveCSSValue<SpacingValue>; // margin-left
  mx?: ResponsiveCSSValue<SpacingValue>; // margin-left & margin-right
  my?: ResponsiveCSSValue<SpacingValue>; // margin-top & margin-bottom
  p?: ResponsiveCSSValue<SpacingValue>; // padding
  pt?: ResponsiveCSSValue<SpacingValue>; // padding-top
  pr?: ResponsiveCSSValue<SpacingValue>; // padding-right
  pb?: ResponsiveCSSValue<SpacingValue>; // padding-bottom
  pl?: ResponsiveCSSValue<SpacingValue>; // padding-left
  px?: ResponsiveCSSValue<SpacingValue>; // padding-left & padding-right
  py?: ResponsiveCSSValue<SpacingValue>; // padding-top & padding-bottom
}

// Typography utilities
export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';

export type LineHeight = 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';

export type LetterSpacing = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';

export interface TypographyUtilities {
  fontSize?: ResponsiveCSSValue<FontSize>;
  fontWeight?: ResponsiveCSSValue<FontWeight>;
  lineHeight?: ResponsiveCSSValue<LineHeight>;
  letterSpacing?: ResponsiveCSSValue<LetterSpacing>;
  textAlign?: ResponsiveCSSValue<TextAlign>;
  textTransform?: ResponsiveCSSValue<TextTransform>;
}

// Color utilities
export type ColorScale = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type ColorName =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';

export type ColorToken = `${ColorName}-${ColorScale}`;

export interface ColorUtilities {
  color?: ResponsiveCSSValue<ColorToken | 'inherit' | 'current' | 'transparent'>;
  backgroundColor?: ResponsiveCSSValue<ColorToken | 'inherit' | 'current' | 'transparent'>;
  borderColor?: ResponsiveCSSValue<ColorToken | 'inherit' | 'current' | 'transparent'>;
}

// Shadow utilities
export type ShadowSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'none';

export interface ShadowUtilities {
  shadow?: ResponsiveCSSValue<ShadowSize>;
}

// Border utilities
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

export type BorderWidth = 0 | 1 | 2 | 4 | 8;

export interface BorderUtilities {
  borderRadius?: ResponsiveCSSValue<BorderRadius>;
  borderWidth?: ResponsiveCSSValue<BorderWidth>;
  borderTopWidth?: ResponsiveCSSValue<BorderWidth>;
  borderRightWidth?: ResponsiveCSSValue<BorderWidth>;
  borderBottomWidth?: ResponsiveCSSValue<BorderWidth>;
  borderLeftWidth?: ResponsiveCSSValue<BorderWidth>;
}

// Combined utility types
export interface StyleUtilities
  extends SpacingUtilities,
    TypographyUtilities,
    ColorUtilities,
    ShadowUtilities,
    BorderUtilities,
    FlexboxUtilities {
  display?: ResponsiveCSSValue<'block' | 'inline' | 'flex' | 'grid' | 'none' | 'inline-block'>;
  position?: ResponsiveCSSValue<'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'>;
  overflow?: ResponsiveCSSValue<'visible' | 'hidden' | 'scroll' | 'auto'>;
  zIndex?: ResponsiveCSSValue<number>;
  opacity?: ResponsiveCSSValue<number>;
  cursor?: ResponsiveCSSValue<'pointer' | 'default' | 'not-allowed' | 'wait' | 'text'>;
}

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

// Menu and navigation utilities
export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  children?: MenuItem[];
  onClick?: () => void;
  badge?: string | number;
  keyboard?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
  current?: boolean;
}

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
  icon?: LucideIcon;
  badge?: string | number;
}

// Search and filter utilities
export interface SearchResult<T> {
  item: T;
  score: number;
  matches: Array<{
    field: keyof T;
    indices: [number, number][];
  }>;
}

export interface FilterConfig<T> {
  field: keyof T;
  type: 'text' | 'select' | 'range' | 'date' | 'boolean';
  label: string;
  options?: Array<{ value: unknown; label: string }>;
  placeholder?: string;
}

// Notification utilities
export interface NotificationAction {
  label: string;
  onClick: () => void;
  style?: 'primary' | 'secondary' | 'danger';
}

export interface Notification {
  id: string;
  title?: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  persistent?: boolean;
  actions?: NotificationAction[];
  icon?: LucideIcon;
  onDismiss?: () => void;
}

// Modal and dialog utilities
export interface ModalAction {
  label: string;
  onClick: () => void;
  style?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
}

export interface ConfirmationDialog {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  destructive?: boolean;
}

// File upload utilities
export interface FileUploadConfig {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  onUpload: (files: File[]) => Promise<void>;
  onError?: (error: Error) => void;
  onProgress?: (progress: number) => void;
}

export interface UploadedFile {
  id: string;
  file: File;
  url?: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

// Chart and data visualization utilities
export interface ChartDataPoint {
  x: number | string | Date;
  y: number;
  label?: string;
  color?: string;
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
  color?: string;
  type?: 'line' | 'bar' | 'area' | 'scatter';
}

export interface ChartConfig {
  width?: number;
  height?: number;
  responsive?: boolean;
  theme?: 'light' | 'dark';
  animation?: boolean;
  legend?: boolean;
  tooltip?: boolean;
  grid?: boolean;
  zoom?: boolean;
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
