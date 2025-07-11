'use client';

import { useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { Button } from '@/components/ui/button';

export default function LanguageToggle() {
  const router = useRouter();
  const { pathSegments, isJapanese } = useLocale();

  const toggleLanguage = () => {
    // Get path without locale
    const basePath = '/' + pathSegments.slice(1).join('/');
    const normalizedBasePath = basePath === '/' ? '' : basePath;

    const newPathname = isJapanese ? `/en${normalizedBasePath}` : `/ja${normalizedBasePath}`;
    router.push(newPathname);
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="flex items-center space-x-2"
      aria-label="Toggle language"
    >
      <Globe size={16} />
      <span className="text-sm font-medium">{isJapanese ? 'EN' : 'JA'}</span>
    </Button>
  );
}
