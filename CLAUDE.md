# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo with the main application in the `frontend/` directory. The project is a bilingual (English/Japanese) personal website built with Next.js 14 App Router, TypeScript, and TailwindCSS.

## Development Commands

**Working directory:** All commands must be run from the `frontend/` directory.

- `cd frontend && pnpm run dev` - Start development server on <http://localhost:3000>
- `cd frontend && pnpm run build` - Build production application
- `cd frontend && pnpm run start` - Start production server
- `cd frontend && pnpm run lint` - Run ESLint
- `cd frontend && pnpm run type-check` - Run TypeScript type checking

## Architecture Overview

### Tech Stack

The project uses a modern Next.js stack with dependencies configured for future backend integration:

- Next.js 14 with App Router and TypeScript
- TailwindCSS for styling
- tRPC for type-safe APIs (configured but not yet implemented)
- Drizzle ORM with NextAuth for future authentication
- Lucide React for icons

### Internationalization Strategy

Manual internationalization with path-based routing:

- English routes: `/`, `/blog`, `/news`, `/profile`
- Japanese routes: `/ja`, `/ja/blog`, `/ja/news`, `/ja/profile`

**Key files:**

- `frontend/src/lib/i18n.ts` - Translation strings and locale detection logic
- `frontend/src/components/ClientLayout.tsx` - Centralized layout with pathname-based locale detection
- `frontend/src/components/LanguageToggle.tsx` - Language switching component

### Layout Architecture

Centralized layout pattern to prevent header duplication:

- Root layout (`frontend/src/app/layout.tsx`) wraps all content with `ClientLayout`
- `ClientLayout` uses `usePathname()` to detect locale from URL and renders appropriate Header
- Individual pages do NOT include their own Header components
- Japanese pages live in `/frontend/src/app/ja/` without their own layout.tsx file

### Current Implementation Status

- **Frontend:** Fully implemented with bilingual support and dark mode
- **Backend:** Dependencies installed but not yet implemented (tRPC, Drizzle, NextAuth)
- **Content:** Currently hardcoded in page components, planned to integrate with external sources
- **Testing:** No test setup currently configured

### Important Notes

- Do NOT add layout.tsx files in `/frontend/src/app/ja/` directory - causes header duplication
- Translations use dot notation keys (e.g., 'nav.home', 'profile.bio')
- TypeScript paths use `@/` alias for src directory
- Project is designed for static generation and Cloudflare Pages deployment
- Backend integration planned with Supabase for auth and database, Hono for API layer
