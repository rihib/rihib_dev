'use client';

import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import DarkModeToggle from './DarkModeToggle';
import { type Locale } from '@/lib/i18n';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Z_INDEX, LAYOUT_SPACING, GAP } from '@/lib/constants';

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const { t } = useTranslation(locale);
  const basePath = locale === 'ja' ? '/ja' : '/en';

  return (
    <header
      className="fixed top-0 left-0 right-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border"
      style={{ zIndex: Z_INDEX.header }}
    >
      <nav
        aria-label="Primary navigation"
        className={`container mx-auto px-4 ${LAYOUT_SPACING.headerHeight} flex items-center`}
      >
        <div className="flex items-center justify-between w-full">
          <Link
            href={basePath || '/'}
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            rihib.dev
          </Link>

          <div className="flex items-center space-x-6">
            <div className={`hidden md:flex items-center ${GAP.xl}`}>
              <Button variant="ghost" asChild>
                <Link href={`${basePath}/profile`}>{t('nav.profile')}</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href={`${basePath}/news`}>{t('nav.news')}</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href={`${basePath}/blog`}>{t('nav.blog')}</Link>
              </Button>
            </div>

            <div className={`flex items-center ${GAP.md}`}>
              <LanguageToggle />
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
