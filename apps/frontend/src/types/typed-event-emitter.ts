// Type-safe event emitter implementation

export interface TypedEventEmitter<EventMap extends Record<string, unknown>> {
  on<K extends keyof EventMap>(event: K, listener: (data: EventMap[K]) => void): () => void;
  emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void;
  off<K extends keyof EventMap>(event: K, listener: (data: EventMap[K]) => void): void;
  clear(): void;
  listenerCount<K extends keyof EventMap>(event: K): number;
  eventNames(): Array<keyof EventMap>;
}

// Type-safe event emitter creator
export const createTypedEventEmitter = <
  EventMap extends Record<string, unknown>,
>(): TypedEventEmitter<EventMap> => {
  const listeners = new Map<keyof EventMap, Set<(data: any) => void>>();

  return {
    on<K extends keyof EventMap>(event: K, listener: (data: EventMap[K]) => void) {
      if (!listeners.has(event)) {
        listeners.set(event, new Set());
      }
      listeners.get(event)!.add(listener);

      return () => {
        const eventListeners = listeners.get(event);
        if (eventListeners) {
          eventListeners.delete(listener);
          if (eventListeners.size === 0) {
            listeners.delete(event);
          }
        }
      };
    },

    emit<K extends keyof EventMap>(event: K, data: EventMap[K]) {
      const eventListeners = listeners.get(event);
      if (eventListeners) {
        eventListeners.forEach((listener) => listener(data));
      }
    },

    off<K extends keyof EventMap>(event: K, listener: (data: EventMap[K]) => void) {
      const eventListeners = listeners.get(event);
      if (eventListeners) {
        eventListeners.delete(listener);
        if (eventListeners.size === 0) {
          listeners.delete(event);
        }
      }
    },

    clear() {
      listeners.clear();
    },

    listenerCount<K extends keyof EventMap>(event: K): number {
      return listeners.get(event)?.size ?? 0;
    },

    eventNames(): Array<keyof EventMap> {
      return Array.from(listeners.keys());
    },
  };
};

// Event emitter with once functionality
export const createTypedEventEmitterWithOnce = <
  EventMap extends Record<string, unknown>,
>(): TypedEventEmitter<EventMap> & {
  once<K extends keyof EventMap>(event: K, listener: (data: EventMap[K]) => void): () => void;
} => {
  const emitter = createTypedEventEmitter<EventMap>();

  return {
    ...emitter,
    once<K extends keyof EventMap>(event: K, listener: (data: EventMap[K]) => void) {
      const cleanup = emitter.on(event, (data) => {
        cleanup();
        listener(data);
      });
      return cleanup;
    },
  };
};
