// Primitive type guards for basic JavaScript types

import type {
  LoadingState,
  AsyncState,
  Result,
  Option,
  NonEmptyArray,
  Email,
  DateString,
  DateTimeString,
} from '../common';

// Primitive type guards
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value);
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

// Enhanced primitive guards
export function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value.length > 0;
}

export function isPositiveNumber(value: unknown): value is number {
  return isNumber(value) && value > 0;
}

export function isNonNegativeNumber(value: unknown): value is number {
  return isNumber(value) && value >= 0;
}

export function isInteger(value: unknown): value is number {
  return isNumber(value) && Number.isInteger(value);
}

export function isPositiveInteger(value: unknown): value is number {
  return isInteger(value) && value > 0;
}

export function isFiniteNumber(value: unknown): value is number {
  return isNumber(value) && Number.isFinite(value);
}

// Array type guards
export function isNonEmptyArray<T>(value: unknown): value is NonEmptyArray<T> {
  return Array.isArray(value) && value.length > 0;
}

export function isArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && value.every(guard);
}

export function isStringArray(value: unknown): value is string[] {
  return isArrayOf(value, isString);
}

export function isNumberArray(value: unknown): value is number[] {
  return isArrayOf(value, isNumber);
}

// Date and time guards
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

export function isDateString(value: unknown): value is DateString {
  if (!isString(value)) return false;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
}

export function isDateTimeString(value: unknown): value is DateTimeString {
  if (!isString(value)) return false;
  try {
    const date = new Date(value);
    return !isNaN(date.getTime()) && value === date.toISOString();
  } catch {
    return false;
  }
}

export function isTimestamp(value: unknown): value is number {
  return isPositiveNumber(value) && value > 0 && value < Date.now() * 2;
}

// Email validation
export function isEmail(value: unknown): value is Email {
  if (!isString(value)) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

// URL validation
export function isURL(value: unknown): value is string {
  if (!isString(value)) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function isHttpURL(value: unknown): value is string {
  return isURL(value) && (value.startsWith('http://') || value.startsWith('https://'));
}

// Generic utility guards
export function hasProperty<K extends string>(obj: unknown, key: K): obj is Record<K, unknown> {
  return isObject(obj) && key in obj;
}

export function hasProperties<K extends string>(
  obj: unknown,
  keys: K[]
): obj is Record<K, unknown> {
  return isObject(obj) && keys.every((key) => key in obj);
}

export function isOneOf<T extends readonly unknown[]>(
  value: unknown,
  options: T
): value is T[number] {
  return (options as readonly unknown[]).includes(value);
}

// Loading state guards
export function isLoadingState(value: unknown): value is LoadingState {
  return isOneOf(value, ['idle', 'loading', 'success', 'error']);
}

export function isAsyncState<T>(
  value: unknown,
  dataGuard?: (data: unknown) => data is T
): value is AsyncState<T> {
  if (!isObject(value)) return false;

  const hasRequiredProps = hasProperties(value, ['loading', 'error']);
  if (!hasRequiredProps) return false;

  const { loading, error, data } = value as Record<string, unknown>;

  if (!isBoolean(loading)) return false;
  if (error !== null && !(error instanceof Error)) return false;

  if (dataGuard && data !== null) {
    return dataGuard(data);
  }

  return true;
}

// Result type guards
export function isResult<T, E = Error>(
  value: unknown,
  dataGuard?: (data: unknown) => data is T,
  errorGuard?: (error: unknown) => error is E
): value is Result<T, E> {
  if (!isObject(value)) return false;

  if (!hasProperty(value, 'success') || !isBoolean(value.success)) {
    return false;
  }

  if (value.success) {
    return hasProperty(value, 'data') && (dataGuard ? dataGuard(value.data) : true);
  } else {
    return hasProperty(value, 'error') && (errorGuard ? errorGuard(value.error) : true);
  }
}

export function isSuccessResult<T>(
  result: Result<T, unknown>
): result is { success: true; data: T } {
  return result.success;
}

export function isErrorResult<E>(
  result: Result<unknown, E>
): result is { success: false; error: E } {
  return !result.success;
}

// Option type guards
export function isSome<T>(value: Option<T>): value is T {
  return value !== null && value !== undefined;
}

export function isNone<T>(value: Option<T>): value is null | undefined {
  return value === null || value === undefined;
}

// Environment guards
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function isTest(): boolean {
  return process.env.NODE_ENV === 'test';
}

export function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function isServer(): boolean {
  return typeof window === 'undefined';
}
