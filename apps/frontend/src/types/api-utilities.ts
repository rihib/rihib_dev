// API and data fetching utility types

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
