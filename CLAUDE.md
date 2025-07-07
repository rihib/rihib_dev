# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo with the main application in the `frontend/` directory. The project is a bilingual (English/Japanese) personal website built with Next.js 14 App Router, TypeScript, and TailwindCSS.

## Development Commands

**Working directory:** All commands must be run from the `frontend/` directory.

- `cd frontend && pnpm run dev` - Start development server on <http://localhost:3000>
- `cd frontend && pnpm run build` - Build production application
- `cd frontend && pnpm run start` - Start production server
- `cd frontend && pnpm run lint` - Run ESLint, markdownlint, and prettier checks
- `cd frontend && pnpm run lint:fix` - Run linting with auto-fix (ESLint, markdownlint, prettier)
- `cd frontend && pnpm run type-check` - Run TypeScript type checking

## Architecture Overview

### Tech Stack

The project uses a modern Next.js stack with dependencies configured for future backend integration:

- Next.js 14 with App Router and TypeScript
- TailwindCSS for styling
- ESLint + Prettier + markdownlint for code quality
- SQLite database with better-sqlite3 for data storage
- tRPC for type-safe APIs (configured but not yet implemented)
- Drizzle ORM with NextAuth for future authentication
- Lucide React for icons

### Internationalization Strategy

Unified internationalization with dynamic routing:

- Unified routes: `/[locale]`, `/[locale]/blog`, `/[locale]/news`, `/[locale]/profile` where locale is `en` or `ja`
- English routes: `/en`, `/en/blog`, `/en/news`, `/en/profile`
- Japanese routes: `/ja`, `/ja/blog`, `/ja/news`, `/ja/profile`
- Root redirects automatically redirect to English versions

**Key files:**

- `frontend/src/lib/i18n.ts` - Translation strings and locale detection logic
- `frontend/src/components/ClientLayout.tsx` - Centralized layout with pathname-based locale detection
- `frontend/src/components/LanguageToggle.tsx` - Language switching component (handles locale transitions)
- `frontend/src/components/HomePage.tsx` - Shared homepage component for both locales
- `frontend/src/components/Header.tsx` - Navigation header with Profile, News, Blog links
- `frontend/src/lib/db.ts` - SQLite database configuration and data access functions

### Layout Architecture

Centralized layout pattern with unified routing:

- Root layout (`frontend/src/app/layout.tsx`) wraps all content with `ClientLayout`
- `ClientLayout` uses `usePathname()` to detect locale from URL and renders appropriate Header
- Individual pages do NOT include their own Header components
- Unified structure uses `/frontend/src/app/[locale]/` dynamic route for all language-specific content
- Root redirects in `/frontend/src/app/` automatically redirect to English versions using `permanentRedirect`

### Current Implementation Status

- **Frontend:** Fully implemented with bilingual support and dark mode
- **Backend:** Dependencies installed but not yet implemented (tRPC, Drizzle, NextAuth)
- **Database:** SQLite database implemented with blog posts and news items storage
- **Content:** Migrated from hardcoded data to SQLite database with locale-based retrieval
- **Testing:** No test setup currently configured

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

### Database Structure

- SQLite database located at `frontend/data/app.db`
- `blog_posts` table: id, title, excerpt, date, url, locale, created_at
- `news_items` table: id, title, excerpt, date, url, locale, created_at
- Data access functions: `getBlogPosts(locale)`, `getNewsItems(locale)`
