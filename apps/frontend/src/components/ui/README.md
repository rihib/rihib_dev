# Reusable UI Components

This directory contains reusable UI components that eliminate code duplication across the profile sections.

## Components Overview

### ProfileSection

A wrapper component for all profile sections that provides consistent card layout with title.

```tsx
<ProfileSection titleKey="profile.education" locale={locale}>
  <TimelineList items={data} locale={locale} />
</ProfileSection>
```

### TimelineItem

A single timeline entry with title, optional period, external link, and optional sub-items.

```tsx
<TimelineItem item={timelineData} locale={locale} titleSize="base" iconSize={16} />
```

**Features:**

- Support for nested sub-items
- Configurable title sizes (sm, base, lg)
- Configurable icon sizes (12, 14, 16)
- Optional description links
- Automatic responsive text sizing for sub-items

### TimelineList

A list container for multiple timeline items with flexible layout options.

```tsx
<TimelineList
  items={timelineData}
  locale={locale}
  layout="vertical" // or "grid"
  titleSize="base"
  iconSize={16}
/>
```

**Layout Options:**

- `vertical`: Items stacked vertically with space-y-4
- `grid`: Items in a responsive grid (md:grid-cols-2)

### ExternalLinkCard

A simple card for displaying external links with borders and icons.

```tsx
<ExternalLinkCard item={linkData} locale={locale} iconSize={14} textSize="base" />
```

### ExternalLinkGrid

A grid container for multiple external link cards.

```tsx
<ExternalLinkGrid
  items={linkData}
  locale={locale}
  layout="grid" // or "vertical"
  iconSize={14}
  textSize="base"
/>
```

## Type Definitions

### TimelineItemData

```tsx
interface TimelineItemData {
  titleKey: keyof typeof translations.en;
  periodKey?: keyof typeof translations.en;
  url: string;
  borderColor: string;
  descriptionKey?: keyof typeof translations.en;
  descriptionUrl?: string;
  subItems?: TimelineItemData[];
}
```

### ExternalLinkData

```tsx
interface ExternalLinkData {
  titleKey: keyof typeof translations.en;
  url: string;
  borderColor: string;
}
```

## Border Color System

The components use Tailwind CSS border color classes for visual differentiation:

- Blue variants: `border-blue-400`, `border-blue-500`, `border-blue-600`
- Green variants: `border-green-400`, `border-green-500`, `border-green-600`
- Purple variants: `border-purple-400`, `border-purple-500`, `border-purple-600`
- Orange variants: `border-orange-400`, `border-orange-500`, `border-orange-600`
- Red variants: `border-red-400`, `border-red-500`, `border-red-600`
- And more color variants for visual variety

## Usage Examples

### Basic Timeline Section

```tsx
const educationData: TimelineItemData[] = [
  {
    titleKey: 'profile.graduateSchool',
    periodKey: 'profile.graduateSchoolPeriod',
    url: 'https://example.com',
    borderColor: 'border-blue-500',
  },
];

export function EducationSection({ locale }: { locale: Locale }) {
  return (
    <ProfileSection titleKey="profile.education" locale={locale}>
      <TimelineList items={educationData} locale={locale} />
    </ProfileSection>
  );
}
```

### Timeline with Sub-items

```tsx
const researchData: TimelineItemData[] = [
  {
    titleKey: 'profile.researchGroup',
    periodKey: 'profile.researchGroupPeriod',
    url: 'https://example.com',
    borderColor: 'border-purple-500',
    subItems: [
      {
        titleKey: 'profile.subGroup1',
        periodKey: 'profile.subGroup1Period',
        url: 'https://example.com/sub1',
        borderColor: 'border-red-400',
      },
    ],
  },
];
```

### Grid Layout for Projects

```tsx
const projectsData: ExternalLinkData[] = [
  {
    titleKey: 'profile.project1',
    url: 'https://github.com/user/project1',
    borderColor: 'border-blue-400',
  },
];

export function ProjectsSection({ locale }: { locale: Locale }) {
  return (
    <ProfileSection titleKey="profile.projects" locale={locale}>
      <ExternalLinkGrid items={projectsData} locale={locale} iconSize={14} />
    </ProfileSection>
  );
}
```

## Benefits

1. **Code Reusability**: Common patterns are abstracted into reusable components
2. **Type Safety**: Proper TypeScript interfaces ensure translation key safety
3. **Consistency**: All sections follow the same visual and behavioral patterns
4. **Maintainability**: Changes to common patterns only need to be made in one place
5. **Flexibility**: Components are customizable through props for different use cases
6. **Performance**: Reduced bundle size through code deduplication
