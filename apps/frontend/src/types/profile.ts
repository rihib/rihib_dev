import type { translations } from '@/lib/i18n';

// Base interfaces for profile data
export interface BaseTimelineItem {
  titleKey: keyof typeof translations.en;
  periodKey: keyof typeof translations.en;
  url: string;
  borderColor: string;
  descriptionKey?: keyof typeof translations.en;
  descriptionUrl?: string;
}

export interface SocialLink {
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
}

export interface ExternalLinkItem {
  titleKey: keyof typeof translations.en;
  url: string;
  borderColor: string;
}

export interface BadgeItem {
  titleKey: keyof typeof translations.en;
  url: string;
  imagePath: string;
}

export interface PaperItem {
  titleKey: keyof typeof translations.en;
  url: string;
}

export interface OSSData {
  kubernetes: {
    mainUrl: string;
    contributions: ExternalLinkItem[];
  };
  other: ExternalLinkItem[];
}

// Profile data categories
export interface ProfileData {
  socialLinks: SocialLink[];
  internships: BaseTimelineItem[];
  education: BaseTimelineItem[];
  research: BaseTimelineItem[];
  oss: OSSData;
  personalProjects: ExternalLinkItem[];
  freelance: BaseTimelineItem[];
  activities: BaseTimelineItem[];
  badges: BadgeItem[];
  papers: PaperItem[];
  speaking: BaseTimelineItem[];
}

// Color scheme types
export interface ColorScheme {
  name: string;
  borderClass: string;
  bgClass?: string;
  textClass?: string;
}

export type ColorCategory =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

// External link configuration
export interface ExternalLinkConfig {
  target: string;
  rel: string;
  className?: string;
}
