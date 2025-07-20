// Utilities for creating and working with discriminated unions

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

// Type-safe pattern matching helper for discriminated unions
export const match = <T extends { type: string }, R>(
  value: T,
  patterns: Record<T['type'], (value: T) => R>
): R => {
  const handler = patterns[value.type as T['type']];
  if (!handler) {
    throw new Error(`No pattern match for type: ${value.type}`);
  }
  return handler(value);
};

// Helper for exhaustive switch checking
export const assertUnreachable = (value: never): never => {
  throw new Error(`Unreachable case: ${value}`);
};

// Create a discriminated union validator
export const createUnionValidator = <T extends Record<string, unknown>>(
  discriminantKey: keyof T,
  validators: Record<string, (obj: unknown) => obj is T>
) => {
  return (obj: unknown): obj is T => {
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }

    const typedObj = obj as Record<string, unknown>;
    const discriminant = String(typedObj[discriminantKey as string]);
    const validator = validators[discriminant];

    return validator ? validator(obj) : false;
  };
};
