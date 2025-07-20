// Theme system types for consistent styling

// Core theme values
export type Theme = 'light' | 'dark' | 'system';

export type ColorMode = 'light' | 'dark';

// Color palette definition
export interface ColorPalette {
  // Primary colors
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };

  // Secondary colors
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };

  // Semantic colors
  success: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };

  warning: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };

  error: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };

  info: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };

  // Neutral/gray colors
  neutral: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
}

// Semantic color mapping
export interface SemanticColors {
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  border: string;
  input: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  ring: string;
  radius: string;
}

// Typography system
export interface TypographyScale {
  fontFamily: {
    sans: string[];
    serif: string[];
    mono: string[];
  };
  fontSize: {
    xs: [string, { lineHeight: string; letterSpacing?: string }];
    sm: [string, { lineHeight: string; letterSpacing?: string }];
    base: [string, { lineHeight: string; letterSpacing?: string }];
    lg: [string, { lineHeight: string; letterSpacing?: string }];
    xl: [string, { lineHeight: string; letterSpacing?: string }];
    '2xl': [string, { lineHeight: string; letterSpacing?: string }];
    '3xl': [string, { lineHeight: string; letterSpacing?: string }];
    '4xl': [string, { lineHeight: string; letterSpacing?: string }];
    '5xl': [string, { lineHeight: string; letterSpacing?: string }];
    '6xl': [string, { lineHeight: string; letterSpacing?: string }];
    '7xl': [string, { lineHeight: string; letterSpacing?: string }];
    '8xl': [string, { lineHeight: string; letterSpacing?: string }];
    '9xl': [string, { lineHeight: string; letterSpacing?: string }];
  };
  fontWeight: {
    thin: string;
    extralight: string;
    light: string;
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
    extrabold: string;
    black: string;
  };
}

// Spacing system
export interface SpacingScale {
  0: string;
  px: string;
  0.5: string;
  1: string;
  1.5: string;
  2: string;
  2.5: string;
  3: string;
  3.5: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  14: string;
  16: string;
  20: string;
  24: string;
  28: string;
  32: string;
  36: string;
  40: string;
  44: string;
  48: string;
  52: string;
  56: string;
  60: string;
  64: string;
  72: string;
  80: string;
  96: string;
}

// Breakpoint system
export interface BreakpointScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// Shadow system
export interface ShadowScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
}

// Border radius system
export interface RadiusScale {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

// Z-index system
export interface ZIndexScale {
  auto: string;
  0: string;
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  dropdown: string;
  sticky: string;
  fixed: string;
  modal: string;
  popover: string;
  tooltip: string;
  toast: string;
}

// Complete theme configuration
export interface ThemeConfig {
  colors: ColorPalette & SemanticColors;
  typography: TypographyScale;
  spacing: SpacingScale;
  breakpoints: BreakpointScale;
  shadows: ShadowScale;
  radius: RadiusScale;
  zIndex: ZIndexScale;
}

// Theme context types
export interface ThemeContextValue {
  theme: Theme;
  colorMode: ColorMode;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  config: ThemeConfig;
}

// Theme provider props
export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  attribute?: string;
  value?: Record<string, string>;
  config?: Partial<ThemeConfig>;
}

// CSS variable mapping
export interface CSSVariables {
  [key: string]: string;
}

// Theme variant types
export type ThemeVariant = 'default' | 'compact' | 'comfortable';

// Component theme variants
export interface ComponentTheme {
  base: string;
  variants: Record<string, Record<string, string>>;
  defaultVariants: Record<string, string>;
}

// Animation and transition values
export interface AnimationConfig {
  duration: {
    75: string;
    100: string;
    150: string;
    200: string;
    300: string;
    500: string;
    700: string;
    1000: string;
  };
  ease: {
    linear: string;
    in: string;
    out: string;
    inOut: string;
  };
}

// Media query utilities
export type MediaQuery = `@media (min-width: ${string})`;

export interface MediaQueries {
  xs: MediaQuery;
  sm: MediaQuery;
  md: MediaQuery;
  lg: MediaQuery;
  xl: MediaQuery;
  '2xl': MediaQuery;
}

// Theme utilities for component styling
export interface StyleVariants<T extends Record<string, unknown> = Record<string, unknown>> {
  base?: string;
  variants?: {
    [key in keyof T]?: Record<string, string>;
  };
  compoundVariants?: Array<
    {
      [key in keyof T]?: T[key];
    } & {
      class: string;
    }
  >;
  defaultVariants?: {
    [key in keyof T]?: T[key];
  };
}

// Color utility types
export type ColorWeight = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type ColorScale =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

export type SemanticColorKey = keyof SemanticColors;

// Theme preference detection
export interface ThemePreference {
  theme: Theme;
  source: 'localStorage' | 'system' | 'default';
}

// Dark mode configuration
export interface DarkModeConfig {
  selector?: string;
  attribute?: string;
  value?: {
    light: string;
    dark: string;
  };
}

// Theme transition configuration
export interface ThemeTransition {
  property: string;
  duration: string;
  easing: string;
}

export type ThemeTransitionConfig = ThemeTransition[];
