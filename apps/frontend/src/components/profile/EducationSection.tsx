'use client';

import { ProfileSection } from '@/components/ui/profile-section';
import { TimelineList } from '@/components/ui/timeline-list';
import { useProfileData } from '@/hooks/useProfileData';
import type { Locale } from '@/lib/i18n';

interface EducationSectionProps {
  locale: Locale;
}

export function EducationSection({ locale }: EducationSectionProps) {
  const { education } = useProfileData();

  return (
    <ProfileSection titleKey="profile.education" locale={locale}>
      <TimelineList items={education} locale={locale} />
    </ProfileSection>
  );
}
