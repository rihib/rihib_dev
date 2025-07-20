// DOM and React-related type guards for browser environment validation

import {
  isObject,
  hasProperty,
  isString,
  isNumber,
  isBoolean,
  isNull,
  isUndefined,
  isArray,
} from './primitive-guards';

// React-specific guards
export function isReactElement(value: unknown): value is React.ReactElement {
  return (
    isObject(value) &&
    hasProperty(value, '$$typeof') &&
    hasProperty(value, 'type') &&
    hasProperty(value, 'props')
  );
}

export function isReactNode(value: unknown): value is React.ReactNode {
  return (
    isString(value) ||
    isNumber(value) ||
    isBoolean(value) ||
    isNull(value) ||
    isUndefined(value) ||
    isReactElement(value) ||
    (isArray(value) && value.every(isReactNode))
  );
}

// DOM-related guards
export function isHTMLElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement;
}

export function isElement(value: unknown): value is Element {
  return value instanceof Element;
}

export function isEvent(value: unknown): value is Event {
  return value instanceof Event;
}

export function isMouseEvent(value: unknown): value is MouseEvent {
  return value instanceof MouseEvent;
}

export function isKeyboardEvent(value: unknown): value is KeyboardEvent {
  return value instanceof KeyboardEvent;
}

// Browser API guards
export function isFormData(value: unknown): value is FormData {
  return value instanceof FormData;
}

export function isFile(value: unknown): value is File {
  return value instanceof File;
}

export function isBlob(value: unknown): value is Blob {
  return value instanceof Blob;
}

// Error boundary guards
export function isReactErrorInfo(value: unknown): value is React.ErrorInfo {
  return isObject(value) && hasProperty(value, 'componentStack') && isString(value.componentStack);
}
