// Form and input component prop interfaces

import type { ComponentPropsWithoutRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { BaseComponentProps, SizeVariant, ClickHandler } from '../common';

// Button component props
export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  isFullWidth?: boolean;
  onClick?: ClickHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

// Input component props
export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  size?: SizeVariant;
  variant?: 'default' | 'filled' | 'outlined';
  fullWidth?: boolean;
  clearable?: boolean;
}

// Textarea component props
export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  label?: string;
  error?: string;
  helperText?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  autoGrow?: boolean;
}

// Select component props
export interface SelectProps<T = string> extends BaseComponentProps {
  value?: T;
  onValueChange?: (value: T) => void;
  options: SelectOption<T>[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  multiple?: boolean;
}

export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  group?: string;
}

// Search component props
export interface SearchProps extends Omit<InputProps, 'type'> {
  onSearch: (query: string) => void;
  onClear?: () => void;
  suggestions?: string[];
  showSuggestions?: boolean;
  debounceMs?: number;
  minLength?: number;
}

// Filter component props
export interface FilterProps<T = Record<string, unknown>> extends BaseComponentProps {
  filters: FilterOption<T>[];
  values: Partial<T>;
  onFilterChange: (values: Partial<T>) => void;
  resetable?: boolean;
  collapsible?: boolean;
}

export interface FilterOption<T = Record<string, unknown>> {
  key: keyof T;
  label: string;
  type: 'text' | 'select' | 'multiselect' | 'date' | 'daterange' | 'number' | 'boolean';
  options?: SelectOption[];
  placeholder?: string;
  validation?: (value: unknown) => boolean;
}
