'use client';

import { ProfileSection } from '@/components/ui/profile-section';
import { TimelineList } from '@/components/ui/timeline-list';
import type { Locale } from '@/lib/i18n';
import type { TimelineItemData } from '@/components/ui/timeline-item';

interface ResearchSectionProps {
  locale: Locale;
}

const researchData: TimelineItemData[] = [
  {
    titleKey: 'profile.wideProject',
    periodKey: 'profile.wideProjectPeriod',
    url: 'https://www.wide.ad.jp/',
    borderColor: 'border-blue-500',
  },
  {
    titleKey: 'profile.muraiJoinGroup',
    periodKey: 'profile.muraiJoinGroupPeriod',
    url: 'https://rg.sfc.keio.ac.jp/',
    borderColor: 'border-purple-500',
    subItems: [
      {
        titleKey: 'profile.delightGroup',
        periodKey: 'profile.delightGroupPeriod',
        url: 'https://delight.sfc.wide.ad.jp/',
        borderColor: 'border-red-400',
      },
      {
        titleKey: 'profile.kumoGroup',
        periodKey: 'profile.kumoGroupPeriod',
        url: 'https://delight.sfc.wide.ad.jp/ja/news/20230927_announcement_of_reforming_delight',
        borderColor: 'border-orange-400',
      },
    ],
  },
  {
    titleKey: 'profile.nakasawaOkoshi',
    periodKey: 'profile.nakasawaOkoshiPeriod',
    url: 'https://www.jn.sfc.keio.ac.jp/',
    borderColor: 'border-green-500',
  },
];

export function ResearchSection({ locale }: ResearchSectionProps) {
  return (
    <ProfileSection titleKey="profile.research" locale={locale}>
      <TimelineList items={researchData} locale={locale} />
    </ProfileSection>
  );
}
