'use client';

import { useMemo, useCallback } from 'react';
import type { ColorScheme, ColorCategory } from '@/types/profile';

// Predefined color schemes
const COLOR_SCHEMES: Record<string, ColorScheme> = {
  // Primary colors
  blue: {
    name: 'blue',
    borderClass: 'border-blue-600',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-700',
  },
  green: {
    name: 'green',
    borderClass: 'border-green-600',
    bgClass: 'bg-green-50',
    textClass: 'text-green-700',
  },
  purple: {
    name: 'purple',
    borderClass: 'border-purple-600',
    bgClass: 'bg-purple-50',
    textClass: 'text-purple-700',
  },
  orange: {
    name: 'orange',
    borderClass: 'border-orange-600',
    bgClass: 'bg-orange-50',
    textClass: 'text-orange-700',
  },
  red: {
    name: 'red',
    borderClass: 'border-red-600',
    bgClass: 'bg-red-50',
    textClass: 'text-red-700',
  },
  yellow: {
    name: 'yellow',
    borderClass: 'border-yellow-600',
    bgClass: 'bg-yellow-50',
    textClass: 'text-yellow-700',
  },
  indigo: {
    name: 'indigo',
    borderClass: 'border-indigo-600',
    bgClass: 'bg-indigo-50',
    textClass: 'text-indigo-700',
  },
  pink: {
    name: 'pink',
    borderClass: 'border-pink-600',
    bgClass: 'bg-pink-50',
    textClass: 'text-pink-700',
  },
  gray: {
    name: 'gray',
    borderClass: 'border-gray-600',
    bgClass: 'bg-gray-50',
    textClass: 'text-gray-700',
  },
  cyan: {
    name: 'cyan',
    borderClass: 'border-cyan-600',
    bgClass: 'bg-cyan-50',
    textClass: 'text-cyan-700',
  },
  emerald: {
    name: 'emerald',
    borderClass: 'border-emerald-600',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-700',
  },
  lime: {
    name: 'lime',
    borderClass: 'border-lime-600',
    bgClass: 'bg-lime-50',
    textClass: 'text-lime-700',
  },
};

// Color categories for semantic usage
const COLOR_CATEGORIES: Record<ColorCategory, string[]> = {
  primary: ['blue', 'indigo'],
  secondary: ['purple', 'pink'],
  success: ['green', 'emerald'],
  warning: ['yellow', 'orange'],
  error: ['red'],
  info: ['cyan', 'blue'],
  neutral: ['gray'],
};

export function useColorScheme() {
  const getAllSchemes = useCallback((): ColorScheme[] => {
    return Object.values(COLOR_SCHEMES);
  }, []);

  const getScheme = useCallback((name: string): ColorScheme | undefined => {
    return COLOR_SCHEMES[name];
  }, []);

  const getSchemesByCategory = useCallback((category: ColorCategory): ColorScheme[] => {
    const colorNames = COLOR_CATEGORIES[category] || [];
    return colorNames
      .map((name) => COLOR_SCHEMES[name])
      .filter((scheme): scheme is ColorScheme => Boolean(scheme));
  }, []);

  const getRandomScheme = useCallback((excludeColors?: string[]): ColorScheme => {
    const availableSchemes = Object.values(COLOR_SCHEMES).filter(
      (scheme) => !excludeColors?.includes(scheme.name)
    );
    if (availableSchemes.length === 0) {
      return COLOR_SCHEMES.blue as ColorScheme;
    }
    const randomIndex = Math.floor(Math.random() * availableSchemes.length);
    return availableSchemes[randomIndex] as ColorScheme;
  }, []);

  const getCycledScheme = useCallback((index: number, excludeColors?: string[]): ColorScheme => {
    const availableSchemes = Object.values(COLOR_SCHEMES).filter(
      (scheme) => !excludeColors?.includes(scheme.name)
    );
    if (availableSchemes.length === 0) {
      return COLOR_SCHEMES.blue as ColorScheme;
    }
    const cycledIndex = index % availableSchemes.length;
    return availableSchemes[cycledIndex] as ColorScheme;
  }, []);

  const generateColorSequence = useCallback((count: number): ColorScheme[] => {
    const allSchemes = Object.values(COLOR_SCHEMES);
    const sequence: ColorScheme[] = [];

    for (let i = 0; i < count; i++) {
      const cycledIndex = i % allSchemes.length;
      const scheme = allSchemes[cycledIndex];
      if (scheme) {
        sequence.push(scheme);
      }
    }

    return sequence;
  }, []);

  const createCustomScheme = useCallback(
    (name: string, borderClass: string, bgClass?: string, textClass?: string): ColorScheme => {
      return {
        name,
        borderClass,
        bgClass,
        textClass,
      };
    },
    []
  );

  // Memoized color schemes for better performance
  const memoizedSchemes = useMemo(() => COLOR_SCHEMES, []);
  const memoizedCategories = useMemo(() => COLOR_CATEGORIES, []);

  return {
    schemes: memoizedSchemes,
    categories: memoizedCategories,
    getAllSchemes,
    getScheme,
    getSchemesByCategory,
    getRandomScheme,
    getCycledScheme,
    generateColorSequence,
    createCustomScheme,
  };
}
