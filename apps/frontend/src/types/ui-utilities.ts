// UI, styling, and design system utility types

import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

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
