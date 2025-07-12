# CLAUDE.md

## Notes

### User instructions

- @docs/design.md : Comprehensive design document including requirements, tech stack, and system architecture
- @docs/todo.md : 直近の作業内容が含まれる。ユーザーによって管理されているため、明示的に指示がない限り変更しないこと
- @README.md : Project overview, setup instructions, and development guide for new contributors
- どっちかだけ変えるのではなく、日本語版と英語版の両方を同時に変更すること
- @docs/profile.md の内容とサイトのProfileページの内容は常に同期させること
- 句読点は日本語版では「、。」を使用し、英語版では「, .」を使用すること

### Important Notes

- All content now uses unified `/[locale]/` dynamic route structure
- Translations use dot notation keys (e.g., 'nav.profile', 'profile.bio')
- TypeScript paths use `@/` alias for src directory
- Language toggle component handles locale transitions seamlessly
- Homepage uses shared HomePage component with locale prop for consistency
- Header navigation order: Profile, News, Blog (no Home link - logo serves as home)
- SQLite database stores all content with locale-specific data
- Project is designed for static generation and Cloudflare Pages deployment
- Backend integration planned with Supabase for auth and database, Hono for API layer
- Technical stack migration planned: SQLite → Supabase, tRPC → Hono RPC
- Turborepo monorepo structure with shared configuration packages
- Implementation priorities defined with shadcn/ui adoption and monorepo structure (Turborepo)
- Locale validation uses centralized `isValidLocale` type guard from i18n.ts for type safety
- UI components use reusable Card component pattern for consistency
- Dark mode styling uses TailwindCSS design tokens (bg-background, text-foreground) for proper theme consistency
- shadcn/ui components use proper TypeScript types (CardTitle uses HTMLHeadingElement for h3 element)
- UI components implement shadcn/ui design system with Button, Card, and proper theming integration
- ESLint configuration enhanced with strict TypeScript rules and accessibility checks
- Dependencies optimized: removed unused tRPC, Drizzle, NextAuth packages
- Image optimization: Next.js Image component used for better performance
- Error handling: Global ErrorBoundary component wraps entire app for error catching
- Custom hooks: useTranslation, useTheme, useErrorHandler for centralized logic
- Hydration-safe: Components properly handle SSR/client hydration mismatches
- Profile page: Modular component structure with separate ProfileHeader, ConnectSection, AboutSection, EducationSection components

### Development Commands

**Working directory:** All commands must be run from the project root directory.

- `pnpm run dev` - Start development server on <http://localhost:3000>
- `pnpm run build` - Build all packages and applications
- `pnpm run lint` - Run ESLint, markdownlint, and prettier checks
- `pnpm run lint:fix` - Run linting with auto-fix
- `pnpm run type-check` - Run TypeScript type checking
- `pnpm run clean` - Clean all build artifacts and node_modules

## Architecture Overview

### Project Structure

This is a Turborepo monorepo with the following structure:

```text
rihib-dev/
├── apps/
│   └── frontend/         # Next.js application
├── packages/
│   └── config/           # Shared configurations (ESLint, Prettier, Tailwind, TypeScript)
└── docs/                 # Documentation
```

The project is a bilingual (English/Japanese) personal website built with Next.js 14 App Router, TypeScript, and TailwindCSS.

### Tech Stack

The project uses a modern Turborepo monorepo stack with shared configurations:

- **Turborepo**: Monorepo build system with caching and parallel execution
- **Next.js 14**: App Router with TypeScript for the frontend application
- **TailwindCSS + shadcn/ui**: Component library and styling system
- **Shared Config Package**: Centralized ESLint, Prettier, TypeScript, and Tailwind configurations
- **SQLite**: Local database with better-sqlite3 (migrating to Supabase)
- **Development Tools**: ESLint with strict TypeScript rules and trailing spaces check, Prettier, markdownlint with trailing spaces validation for code quality

### Layout Architecture

Centralized layout pattern with unified routing:

- Root layout (`apps/frontend/src/app/layout.tsx`) wraps all content with `ClientLayout`
- `ClientLayout` uses `usePathname()` to detect locale from URL and renders appropriate Header
- Individual pages do NOT include their own Header components
- Unified structure uses `/apps/frontend/src/app/[locale]/` dynamic route for all language-specific content
- Root page (`/`) redirects to English homepage (`/en`)
- Unknown paths handled by `not-found.tsx` which redirects to root

### Internationalization Strategy

Unified internationalization with dynamic routing:

- Unified routes: `/[locale]`, `/[locale]/blog`, `/[locale]/news`, `/[locale]/profile` where locale is `en` or `ja`
- English routes: `/en`, `/en/blog`, `/en/news`, `/en/profile`
- Japanese routes: `/ja`, `/ja/blog`, `/ja/news`, `/ja/profile`
- Root redirects automatically redirect to English versions

**Key files:**

- `apps/frontend/src/lib/i18n.ts` - Translation strings and locale detection logic
- `apps/frontend/src/hooks/useLocale.ts` - Shared hook for locale detection and pathname parsing
- `apps/frontend/src/components/ClientLayout.tsx` - Centralized layout using useLocale hook
- `apps/frontend/src/components/LanguageToggle.tsx` - Language switching component using useLocale hook
- `apps/frontend/src/components/HomePage.tsx` - Shared homepage component for both locales
- `apps/frontend/src/components/Card.tsx` - Reusable card component for consistent UI elements
- `apps/frontend/src/components/Header.tsx` - Navigation header with Profile, News, Blog links
- `apps/frontend/src/lib/db.ts` - SQLite database configuration and data access functions

### Database Structure

- SQLite database located at `apps/frontend/data/app.db`
- `articles` table: id, title, published_at, url, type, locale, created_at
  - `type` field distinguishes between 'blog' and 'news' articles
  - `published_at` uses DATE type with YYYY-MM-DD format for proper date handling
- **Performance optimizations:**
  - WAL (Write-Ahead Logging) mode for better write concurrency
  - Composite index on `(locale, type)` for efficient filtering
  - Index on `published_at` for optimized date-based sorting
  - Transactional bulk inserts for improved initialization performance
  - Lazy database initialization to avoid blocking event loop during module import
- **Data integrity features:**
  - DATE type ensures proper date sorting and SQLite date function compatibility
  - YYYY-MM-DD format for consistent date handling
  - Asynchronous directory creation to prevent runtime errors
  - CHECK constraint for type validation
  - Atomic bulk inserts using transactions for all-or-nothing data initialization
- **SQLite date functions:** Queries use `date()` and `datetime()` functions for robust date operations
- **Architecture patterns:**
  - Lazy initialization with singleton pattern for database connection
  - Promise-based async API for all data access functions
  - Shared ArticleList component for consistent UI rendering
- Data access functions: `getArticles(locale, type)`, `getBlogPosts(locale)`, `getNewsItems(locale)` (all async)
