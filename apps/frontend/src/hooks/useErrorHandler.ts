'use client';

import { useCallback, useState } from 'react';

interface ErrorState {
  error: Error | null;
  isError: boolean;
}

export function useErrorHandler() {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isError: false,
  });

  const handleError = useCallback((error: Error) => {
    console.error('Error caught by useErrorHandler:', error);
    setErrorState({
      error,
      isError: true,
    });
  }, []);

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      isError: false,
    });
  }, []);

  const executeAsync = useCallback(
    async <T>(asyncFn: () => Promise<T>): Promise<T | null> => {
      try {
        clearError();
        return await asyncFn();
      } catch (error) {
        handleError(error instanceof Error ? error : new Error(String(error)));
        return null;
      }
    },
    [handleError, clearError]
  );

  return {
    error: errorState.error,
    isError: errorState.isError,
    handleError,
    clearError,
    executeAsync,
  };
}
