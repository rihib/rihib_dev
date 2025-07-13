import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import DarkModeToggle from './DarkModeToggle';
import { getTranslation, type Locale } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const t = (key: keyof typeof import('@/lib/i18n').translations.en) => getTranslation(locale, key);
  const basePath = locale === 'ja' ? '/ja' : '/en';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border">
      <nav
        aria-label="Primary navigation"
        className="container mx-auto px-4 h-[var(--header-height)] flex items-center"
      >
        <div className="flex items-center justify-between w-full">
          <Link
            href={basePath || '/'}
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            rihib.dev
          </Link>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
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

            <div className="flex items-center space-x-3">
              <LanguageToggle />
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
