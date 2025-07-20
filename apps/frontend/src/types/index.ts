// Central type exports for improved developer experience and discoverability

// Core utility types
export type * from './common';

// API and data types
export type * from './api';
export type * from './profile';

// UI and component types
export type * from './components';
export type * from './theme';

// Error handling types
export type * from './errors';

// Internationalization types
export type * from './translations';

// Type guards and validators
export * from './guards';

// Re-export commonly used types from appropriate modules

// Re-export specific utilities that are commonly used
export {
  // Type guards
  isString,
  isNumber,
  isArray,
  isObject,
  isDefined,
  isNonEmptyString,
  isDateString,
  isURL,
  isEmail,

  // API guards
  isApiResponse,
  isApiError,
  isArticle,
  isArticlesResponse,

  // Error guards
  isAppError,
  isNetworkError,
  isValidationError,

  // Form guards
  isFormData,

  // React guards
  isReactElement,
  isReactNode,

  // Environment guards
  isProduction,
  isDevelopment,
  isClient,
  isServer,

  // Validation utilities
  validateAndGuard,
  createArrayGuard,
  createObjectGuard,

  // Debug utilities
  getType,
  debugTypeInfo,
} from './guards';

// Export error factories for convenience
export {
  createAppError,
  createNetworkError,
  createValidationError,
  createComponentError,
  createAPIClientError,
  createHookError,
  createPerformanceError,
  aggregateErrors,
} from './errors';

// Type assertion utilities for better developer experience
export {
  assertIsString,
  assertIsNumber,
  assertIsArray,
  assertIsObject,
  assertUnreachable,
} from './guards';

// Import guard functions for the TypePredicates object
import {
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isArray,
  isObject,
  isDefined,
  isNonEmptyString,
  isEmail,
  isURL,
  isDate,
  isDateString,
  isApiResponse,
  isApiError,
  isArticle,
  isAppError,
  isReactElement,
  isReactNode,
  isHTMLElement,
  isEvent,
  isProduction,
  isDevelopment,
  isClient,
  isServer,
} from './guards';

// Commonly used type predicates as standalone exports
export const TypePredicates = {
  // Primitives
  isString,
  isNumber,
  isBoolean,
  isFunction,

  // Collections
  isArray,
  isObject,
  isNonEmptyArray: <T>(value: unknown): value is [T, ...T[]] =>
    Array.isArray(value) && value.length > 0,

  // Values
  isDefined,
  isNull: (value: unknown): value is null => value === null,
  isUndefined: (value: unknown): value is undefined => value === undefined,
  isNullish: (value: unknown): value is null | undefined => value === null || value === undefined,

  // Strings
  isNonEmptyString,
  isEmail,
  isURL,

  // Dates
  isDate,
  isDateString,

  // API
  isApiResponse,
  isApiError,
  isArticle,

  // Errors
  isAppError,
  isError: (value: unknown): value is Error => value instanceof Error,

  // React
  isReactElement,
  isReactNode,

  // Browser APIs
  isHTMLElement,
  isEvent,

  // Environment
  isProduction,
  isDevelopment,
  isClient,
  isServer,
} as const;

// Type helpers for creating discriminated unions
export const createDiscriminatedUnion = <T extends Record<string, unknown>, K extends keyof T>(
  key: K
) => ({
  is:
    <V>(value: V) =>
    (obj: T): obj is T & Record<K, V> =>
      obj[key] === value,
  match: <R>(obj: T, cases: Record<string, (obj: T) => R>) => {
    const discriminant = String(obj[key]);
    const handler = cases[discriminant];
    if (handler) {
      return handler(obj);
    }
    throw new Error(`No handler for discriminant: ${discriminant}`);
  },
});

// Type-safe event emitter creator
export const createTypedEventEmitter = <EventMap extends Record<string, unknown>>() => ({
  listeners: new Map<keyof EventMap, Set<(data: any) => void>>(),

  on<K extends keyof EventMap>(event: K, listener: (data: EventMap[K]) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);

    return () => {
      const eventListeners = this.listeners.get(event);
      if (eventListeners) {
        eventListeners.delete(listener);
        if (eventListeners.size === 0) {
          this.listeners.delete(event);
        }
      }
    };
  },

  emit<K extends keyof EventMap>(event: K, data: EventMap[K]) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(data));
    }
  },

  off<K extends keyof EventMap>(event: K, listener: (data: EventMap[K]) => void) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(listener);
      if (eventListeners.size === 0) {
        this.listeners.delete(event);
      }
    }
  },

  clear() {
    this.listeners.clear();
  },
});

// Utility for creating type-safe state machines
export const createStateMachine = <
  States extends string,
  Events extends string,
  Context extends Record<string, unknown> = {},
>(config: {
  initial: States;
  states: Record<
    States,
    {
      on?: Partial<Record<Events, States>>;
      entry?: (context: Context) => void;
      exit?: (context: Context) => void;
    }
  >;
}) => ({
  current: config.initial,
  context: {} as Context,

  send(event: Events, context?: Partial<Context>): States {
    const currentState = config.states[this.current];
    const nextState = currentState.on?.[event];

    if (nextState) {
      currentState.exit?.(this.context);
      this.current = nextState;

      if (context) {
        this.context = { ...this.context, ...context };
      }

      config.states[nextState].entry?.(this.context);
    }

    return this.current;
  },

  can(event: Events): boolean {
    return !!config.states[this.current].on?.[event];
  },

  getState(): States {
    return this.current;
  },

  getContext(): Context {
    return this.context;
  },
});

// Export version information for debugging
export const TypeSystemInfo = {
  version: '1.0.0',
  features: [
    'Comprehensive type definitions',
    'Runtime type guards',
    'Enhanced error types',
    'Type-safe API client',
    'Component prop interfaces',
    'Translation type safety',
    'Theme system types',
    'Utility type collections',
    'Development helpers',
  ],
  created: '2024',
  lastUpdated: new Date().toISOString(),
} as const;
