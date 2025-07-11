import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import type { Locale } from '@/lib/i18n';

interface ProfileHeaderProps {
  locale: Locale;
}

export function ProfileHeader({ locale }: ProfileHeaderProps) {
  const { t } = useTranslation(locale);

  return (
    <Card>
      <CardContent className="p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 text-foreground">{t('profile.fullName')}</h1>
          <p className="text-xl text-muted-foreground mb-4">{t('profile.currentRole')}</p>
          <p className="text-sm text-muted-foreground">{t('profile.affiliation')}</p>
        </div>
      </CardContent>
    </Card>
  );
}
