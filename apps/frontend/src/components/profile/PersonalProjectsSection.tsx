'use client';

import { ProfileSection } from '@/components/ui/profile-section';
import { ExternalLinkGrid } from '@/components/ui/external-link-grid';
import { useProfileData } from '@/hooks/useProfileData';
import type { Locale } from '@/lib/i18n';

interface PersonalProjectsSectionProps {
  locale: Locale;
}

export function PersonalProjectsSection({ locale }: PersonalProjectsSectionProps) {
  const { personalProjects } = useProfileData();

  return (
    <ProfileSection titleKey="profile.personalDevelopment" locale={locale}>
      <ExternalLinkGrid items={personalProjects} locale={locale} iconSize={14} />
    </ProfileSection>
  );
}
