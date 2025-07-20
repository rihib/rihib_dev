'use client';

import { ProfileSection } from '@/components/ui/profile-section';
import { TimelineList } from '@/components/ui/timeline-list';
import type { Locale } from '@/lib/i18n';
import type { TimelineItemData } from '@/components/ui/timeline-item';

interface SpeakingSectionProps {
  locale: Locale;
}

const speakingData: TimelineItemData[] = [
  {
    titleKey: 'profile.wakamonogMeeting',
    periodKey: 'profile.wakamonogMeetingDate',
    url: 'https://docomo-openlab.jp/720/',
    borderColor: 'border-blue-500',
  },
];

export function SpeakingSection({ locale }: SpeakingSectionProps) {
  return (
    <ProfileSection titleKey="profile.speaking" locale={locale}>
      <TimelineList items={speakingData} locale={locale} />
    </ProfileSection>
  );
}
