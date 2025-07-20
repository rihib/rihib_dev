// Utility type guards for advanced validation and debugging

import { isObject, isArrayOf, hasProperty, isString, isArray } from './primitive-guards';

// Composite guards for complex validation
export function validateAndGuard<T>(
  value: unknown,
  guard: (value: unknown) => value is T,
  errorMessage?: string
): T {
  if (guard(value)) {
    return value;
  }
  throw new Error(errorMessage || `Value failed type guard validation`);
}

export function createArrayGuard<T>(itemGuard: (item: unknown) => item is T) {
  return (value: unknown): value is T[] => {
    return isArrayOf(value, itemGuard);
  };
}

export function createObjectGuard<T extends Record<string, unknown>>(schema: {
  [K in keyof T]: (value: unknown) => value is T[K];
}) {
  return (value: unknown): value is T => {
    if (!isObject(value)) return false;

    return Object.entries(schema).every(([key, guard]) => {
      return hasProperty(value, key) && guard(value[key]);
    });
  };
}

// Debug utilities for type checking
export function getType(value: unknown): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return 'array';
  if (value instanceof Date) return 'date';
  if (value instanceof RegExp) return 'regexp';
  if (value instanceof Error) return 'error';
  return typeof value;
}

export function debugTypeInfo(value: unknown): Record<string, unknown> {
  return {
    type: getType(value),
    constructor: value?.constructor?.name,
    isArray: Array.isArray(value),
    isObject: isObject(value),
    keys: isObject(value) ? Object.keys(value) : undefined,
    length: isArray(value) || isString(value) ? (value as any).length : undefined,
    prototype: value?.constructor?.prototype?.constructor?.name,
  };
}

// Type assertion utilities
export function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error(`Expected string, got ${typeof value}`);
  }
}

export function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number') {
    throw new Error(`Expected number, got ${typeof value}`);
  }
}

export function assertIsArray<T>(value: unknown): asserts value is T[] {
  if (!Array.isArray(value)) {
    throw new Error(`Expected array, got ${typeof value}`);
  }
}

export function assertIsObject(value: unknown): asserts value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`Expected object, got ${typeof value}`);
  }
}

// Type-safe exhaustive checking
export function assertUnreachable(x: never): never {
  throw new Error(`Unreachable code reached with value: ${x}`);
}
