'use client';

import { useCallback, useMemo } from 'react';
import type { ExternalLinkConfig } from '@/types/profile';

export interface UseExternalLinkOptions {
  target?: string;
  rel?: string;
  className?: string;
  onClick?: (url: string, event: React.MouseEvent) => void;
}

export interface ExternalLinkProps {
  href: string;
  target: string;
  rel: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function useExternalLink(options: UseExternalLinkOptions = {}) {
  const config: ExternalLinkConfig = useMemo(
    () => ({
      target: options.target || '_blank',
      rel: options.rel || 'noopener noreferrer',
      className: options.className,
    }),
    [options.target, options.rel, options.className]
  );

  const getLinkProps = useCallback(
    (url: string): ExternalLinkProps => {
      const handleClick = options.onClick
        ? (event: React.MouseEvent<HTMLAnchorElement>) => {
            options.onClick?.(url, event);
          }
        : undefined;

      return {
        href: url,
        target: config.target,
        rel: config.rel,
        className: config.className,
        onClick: handleClick,
      };
    },
    [config, options]
  );

  const openExternalLink = useCallback(
    (url: string, windowFeatures?: string) => {
      if (typeof window !== 'undefined') {
        window.open(url, config.target, windowFeatures);
      }
    },
    [config.target]
  );

  const isExternalLink = useCallback((url: string): boolean => {
    if (!url) return false;

    try {
      const urlObj = new URL(url, window.location.origin);
      return urlObj.origin !== window.location.origin;
    } catch {
      // If URL parsing fails, assume it's relative/internal
      return false;
    }
  }, []);

  return {
    config,
    getLinkProps,
    openExternalLink,
    isExternalLink,
  };
}
