import { Github, Linkedin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import XIcon from '@/components/XIcon';
import type { Locale } from '@/lib/i18n';

interface ConnectSectionProps {
  locale: Locale;
}

const socialLinks = [
  {
    href: 'https://github.com/rihib',
    icon: Github,
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/rihito-bannai/',
    icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: 'https://x.com/rihib_dev',
    icon: XIcon,
    label: 'X',
  },
];

export function ConnectSection({ locale }: ConnectSectionProps) {
  const { t } = useTranslation(locale);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('profile.connect')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-muted hover:bg-muted/80 px-4 py-2 rounded-lg transition-colors"
              >
                <Icon size={24} />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
