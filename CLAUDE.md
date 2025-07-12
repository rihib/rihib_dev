# CLAUDE.md

## User Instructions

- @docs/design.md: Comprehensive design document with requirements and tech stack
- @docs/todo.md: Current tasks managed by user - do not modify unless instructed
- @README.md: Project overview and setup for new contributors
- @docs/profile.md: Must sync with site Profile page content
- Update both Japanese and English versions simultaneously
- Use Japanese punctuation 「、。」 and English punctuation ", ." appropriately

## Current Architecture

### Project Structure

Turborepo monorepo with Next.js 14 App Router, TypeScript, TailwindCSS, and SQLite database.

### Routing & Internationalization

- Dynamic routes: `/[locale]` where locale is `en` or `ja`
- Root `/` redirects to `/en`
- Translation keys use dot notation (e.g., `nav.profile`, `profile.bio`)
- Locale validation via `isValidLocale` type guard in i18n.ts

### Database

- SQLite at `apps/frontend/data/app.db` (migrating to Supabase)
- Articles table: id, title, published_at, url, type, locale, created_at
- Optimized with WAL mode, composite indexes, and transactional operations

### UI Components

- shadcn/ui design system implementation
- Reusable Card component pattern
- Dark mode with TailwindCSS design tokens
- Modular Profile page components

## Development Commands

Run from project root:

- `pnpm run dev` - Start development server on <http://localhost:3000>
- `pnpm run build` - Build all packages
- `pnpm run lint` - Run linting checks
- `pnpm run lint:fix` - Fix linting issues
- `pnpm run type-check` - Run TypeScript checks

## Key Files

- `apps/frontend/src/lib/i18n.ts` - Translation strings and locale detection
- `apps/frontend/src/hooks/useLocale.ts` - Locale detection hook
- `apps/frontend/src/components/ClientLayout.tsx` - Centralized layout
- `apps/frontend/src/lib/db.ts` - SQLite database access
