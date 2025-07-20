// Form management and validation utility types

// Form utilities
export type FormSubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export interface FormField<T = string> {
  value: T;
  error?: string;
  touched: boolean;
  dirty: boolean;
  disabled?: boolean;
  required?: boolean;
}

export type FormFields<T extends Record<string, unknown>> = {
  [K in keyof T]: FormField<T[K]>;
};

export interface FormState<T extends Record<string, unknown>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  dirty: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  submitCount: number;
}

export type FormValidator<T> = (value: T) => string | undefined;

export type FieldValidator<T, F extends keyof T> = (
  value: T[F],
  allValues: T
) => string | undefined;

export type FormValidators<T extends Record<string, unknown>> = {
  [K in keyof T]?: FieldValidator<T, K>;
};

// Search and filter utilities
export interface SearchResult<T> {
  item: T;
  score: number;
  matches: Array<{
    field: keyof T;
    indices: [number, number][];
  }>;
}

export interface FilterConfig<T> {
  field: keyof T;
  type: 'text' | 'select' | 'range' | 'date' | 'boolean';
  label: string;
  options?: Array<{ value: unknown; label: string }>;
  placeholder?: string;
}

// File upload utilities
export interface FileUploadConfig {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  onUpload: (files: File[]) => Promise<void>;
  onError?: (error: Error) => void;
  onProgress?: (progress: number) => void;
}

export interface UploadedFile {
  id: string;
  file: File;
  url?: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}
