'use client';

import { use } from 'react';
import { isValidLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ConnectSection } from '@/components/profile/ConnectSection';
import { AboutSection } from '@/components/profile/AboutSection';
import { ValueSection } from '@/components/profile/ValueSection';
import { EducationSection } from '@/components/profile/EducationSection';
import { ResearchSection } from '@/components/profile/ResearchSection';
import { OSSSection } from '@/components/profile/OSSSection';
import { InternshipSection } from '@/components/profile/InternshipSection';
import { PersonalProjectsSection } from '@/components/profile/PersonalProjectsSection';
import { FreelanceSection } from '@/components/profile/FreelanceSection';
import { ActivitiesSection } from '@/components/profile/ActivitiesSection';
import { BadgesSection } from '@/components/profile/BadgesSection';
import { SpeakingSection } from '@/components/profile/SpeakingSection';
import { PapersSection } from '@/components/profile/PapersSection';

export default function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <ProfileHeader locale={locale} />
        <ConnectSection locale={locale} />
        <AboutSection locale={locale} />
        <ValueSection locale={locale} />

        {/* Education & Research */}
        <div className="grid md:grid-cols-2 gap-8">
          <EducationSection locale={locale} />
          <ResearchSection locale={locale} />
        </div>

        <OSSSection locale={locale} />
        <InternshipSection locale={locale} />
        <PersonalProjectsSection locale={locale} />
        <FreelanceSection locale={locale} />
        <ActivitiesSection locale={locale} />
        <BadgesSection locale={locale} />
        <SpeakingSection locale={locale} />
        <PapersSection locale={locale} />
      </div>
    </main>
  );
}
