'use client';

import { ProfileSection } from '@/components/ui/profile-section';
import { TimelineList } from '@/components/ui/timeline-list';
import { useProfileData } from '@/hooks/useProfileData';
import type { Locale } from '@/lib/i18n';

interface InternshipSectionProps {
  locale: Locale;
}

export function InternshipSection({ locale }: InternshipSectionProps) {
  const { internships } = useProfileData();

  return (
    <ProfileSection titleKey="profile.recentExperience" locale={locale} id="internship">
      <TimelineList items={internships} locale={locale} />
    </ProfileSection>
  );
}
