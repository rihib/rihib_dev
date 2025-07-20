'use client';

import { ProfileSection } from '@/components/ui/profile-section';
import { TimelineList } from '@/components/ui/timeline-list';
import type { Locale } from '@/lib/i18n';
import type { TimelineItemData } from '@/components/ui/timeline-item';

interface ActivitiesSectionProps {
  locale: Locale;
}

const activitiesData: TimelineItemData[] = [
  {
    titleKey: 'profile.secHack365',
    periodKey: 'profile.secHack365Period',
    url: 'https://sechack365.nict.go.jp/achievement/2023/pdf/28Ss.pdf',
    borderColor: 'border-purple-500',
  },
  {
    titleKey: 'profile.tokyo42',
    periodKey: 'profile.tokyo42Period',
    url: 'https://42tokyo.jp/',
    borderColor: 'border-orange-500',
  },
  {
    titleKey: 'profile.klabExpertCamp',
    periodKey: 'profile.klabExpertCampPeriod',
    url: 'https://klab-hr.snar.jp/jobboard/detail.aspx?id=ceG7Rw98wQU',
    borderColor: 'border-green-500',
  },
  {
    titleKey: 'profile.interopTokyo',
    periodKey: 'profile.interopTokyoPeriod',
    url: 'https://archive.interop.jp/2023/shownet/noc/',
    borderColor: 'border-blue-500',
  },
];

export function ActivitiesSection({ locale }: ActivitiesSectionProps) {
  return (
    <ProfileSection titleKey="profile.activities" locale={locale}>
      <TimelineList items={activitiesData} locale={locale} />
    </ProfileSection>
  );
}
