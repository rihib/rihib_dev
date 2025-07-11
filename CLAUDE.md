# CLAUDE.md

## Notes

### User instructions

- @docs/design.md : Comprehensive design document including requirements, tech stack, and system architecture
- @docs/todo.md : 直近の作業内容が含まれる。ユーザーによって管理されているため、明示的に指示がない限り変更しないこと
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
- Implementation priorities defined with shadcn/ui adoption and monorepo structure (Turborepo)
- Locale validation uses centralized `locales` constant from i18n.ts instead of hardcoded arrays
- UI components use reusable Card component pattern for consistency
- Dark mode styling uses TailwindCSS design tokens (bg-background, text-foreground) for proper theme consistency
- shadcn/ui components use proper TypeScript types (CardTitle uses HTMLHeadingElement for h3 element)
- UI components implement shadcn/ui design system with Button, Card, and proper theming integration

### Development Commands

**Working directory:** All commands must be run from the `frontend/` directory.

- `cd frontend && pnpm run dev` - Start development server on <http://localhost:3000>
- `cd frontend && pnpm run build` - Build production application
- `cd frontend && pnpm run start` - Start production server
- `cd frontend && pnpm run lint && cd .. && pnpm dlx markdownlint-cli2 "**/*.md" "!frontend/**/*.md" "!node_modules/**/*.md" "!frontend/node_modules/**/*.md"` - Run ESLint, markdownlint, and prettier checks for frontend + root markdown files
- `cd frontend && pnpm run lint:fix && cd .. && pnpm dlx markdownlint-cli2 --fix "**/*.md" "!frontend/**/*.md" "!node_modules/**/*.md" "!frontend/node_modules/**/*.md"` - Run linting with auto-fix for frontend + root markdown files
- `cd frontend && pnpm run type-check` - Run TypeScript type checking

## Architecture Overview

### Project Structure

This is a monorepo with the main application in the `frontend/` directory. The project is a bilingual (English/Japanese) personal website built with Next.js 14 App Router, TypeScript, and TailwindCSS.

### Tech Stack

The project uses a modern Next.js stack with dependencies configured for future backend integration:

- Next.js 14 with App Router and TypeScript
- TailwindCSS with shadcn/ui component library for styling
- ESLint + Prettier + markdownlint for code quality
- SQLite database with better-sqlite3 for data storage
- tRPC for type-safe APIs (configured but not yet implemented)
- Drizzle ORM with NextAuth for future authentication
- Lucide React for icons
- shadcn/ui for consistent UI components with Radix UI primitives

### Layout Architecture

Centralized layout pattern with unified routing:

- Root layout (`frontend/src/app/layout.tsx`) wraps all content with `ClientLayout`
- `ClientLayout` uses `usePathname()` to detect locale from URL and renders appropriate Header
- Individual pages do NOT include their own Header components
- Unified structure uses `/frontend/src/app/[locale]/` dynamic route for all language-specific content
- Root page (`/`) redirects to English homepage (`/en`)
- Unknown paths handled by `not-found.tsx` which redirects to root

### Internationalization Strategy

Unified internationalization with dynamic routing:

- Unified routes: `/[locale]`, `/[locale]/blog`, `/[locale]/news`, `/[locale]/profile` where locale is `en` or `ja`
- English routes: `/en`, `/en/blog`, `/en/news`, `/en/profile`
- Japanese routes: `/ja`, `/ja/blog`, `/ja/news`, `/ja/profile`
- Root redirects automatically redirect to English versions

**Key files:**

- `frontend/src/lib/i18n.ts` - Translation strings and locale detection logic
- `frontend/src/hooks/useLocale.ts` - Shared hook for locale detection and pathname parsing
- `frontend/src/components/ClientLayout.tsx` - Centralized layout using useLocale hook
- `frontend/src/components/LanguageToggle.tsx` - Language switching component using useLocale hook
- `frontend/src/components/HomePage.tsx` - Shared homepage component for both locales
- `frontend/src/components/Card.tsx` - Reusable card component for consistent UI elements
- `frontend/src/components/Header.tsx` - Navigation header with Profile, News, Blog links
- `frontend/src/lib/db.ts` - SQLite database configuration and data access functions

### Database Structure

- SQLite database located at `frontend/data/app.db`
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
