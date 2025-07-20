'use client';

import { ProfileSection } from '@/components/ui/profile-section';
import { TimelineList } from '@/components/ui/timeline-list';
import type { Locale } from '@/lib/i18n';
import type { TimelineItemData } from '@/components/ui/timeline-item';

interface FreelanceSectionProps {
  locale: Locale;
}

const freelanceData: TimelineItemData[] = [
  {
    titleKey: 'profile.gpuCloudService',
    periodKey: 'profile.gpuCloudServicePeriod',
    url: 'https://gpu.cloud.zebra-ai.net/',
    borderColor: 'border-green-500',
  },
  {
    titleKey: 'profile.sfcChineseLabWebsite',
    periodKey: 'profile.sfcChineseLabWebsitePeriod',
    url: 'https://china-lab.sfc.keio.ac.jp/',
    borderColor: 'border-blue-500',
  },
];

export function FreelanceSection({ locale }: FreelanceSectionProps) {
  return (
    <ProfileSection titleKey="profile.freelanceWork" locale={locale}>
      <TimelineList items={freelanceData} locale={locale} />
    </ProfileSection>
  );
}
