import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import type { Locale } from '@/lib/i18n';

interface EducationSectionProps {
  locale: Locale;
}

const educationData = [
  {
    titleKey: 'profile.graduateSchool' as const,
    periodKey: 'profile.graduateSchoolPeriod' as const,
    url: 'https://www.sfc.keio.ac.jp/academics/gsmg/program/ci.html',
    borderColor: 'border-blue-500',
  },
  {
    titleKey: 'profile.undergraduateSchool' as const,
    periodKey: 'profile.undergraduateSchoolPeriod' as const,
    url: 'https://www.sfc.keio.ac.jp/',
    borderColor: 'border-green-500',
  },
  {
    titleKey: 'profile.lawSchool' as const,
    periodKey: 'profile.lawSchoolPeriod' as const,
    url: 'https://www.keio.ac.jp/',
    borderColor: 'border-purple-500',
  },
  {
    titleKey: 'profile.highSchool' as const,
    periodKey: 'profile.highSchoolPeriod' as const,
    url: 'https://www.sakaehigashi.ed.jp/',
    borderColor: 'border-orange-500',
  },
  {
    titleKey: 'profile.exchangeSchool' as const,
    periodKey: 'profile.exchangeSchoolPeriod' as const,
    url: 'https://www.rangitoto.school.nz/',
    borderColor: 'border-red-500',
  },
];

export function EducationSection({ locale }: EducationSectionProps) {
  const { t } = useTranslation(locale);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('profile.education')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {educationData.map((item, index) => (
            <div key={index} className={`border-l-4 ${item.borderColor} pl-4`}>
              <h3 className="font-semibold text-foreground">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors inline-flex items-center gap-1"
                >
                  {t(item.titleKey)}
                  <ExternalLink size={16} />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{t(item.periodKey)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
