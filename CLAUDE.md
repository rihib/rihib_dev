# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm run dev` - Start development server on http://localhost:3000
- `pnpm run build` - Build production application
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint
- `pnpm run type-check` - Run TypeScript type checking

## Architecture Overview

This is a bilingual (English/Japanese) personal website built with Next.js 14 App Router, TypeScript, and TailwindCSS.

### Internationalization Strategy

The application uses a manual internationalization approach with path-based routing:
- English routes: `/`, `/blog`, `/news`
- Japanese routes: `/ja`, `/ja/blog`, `/ja/news`

**Key files:**
- `src/lib/i18n.ts` - Translation strings and locale logic
- `src/components/ClientLayout.tsx` - Centralized layout that detects locale from pathname
- `src/components/LanguageToggle.tsx` - Language switching component

### Layout Architecture

The application uses a centralized layout approach to prevent header duplication:
- Root layout (`src/app/layout.tsx`) wraps all content with `ClientLayout`
- `ClientLayout` uses `usePathname()` to detect if URL starts with `/ja` and renders appropriate Header
- Individual pages do NOT include their own Header components
- Japanese pages live in `/src/app/ja/` but do NOT have their own layout.tsx file

### Component Structure

- **Header** - Navigation with language and dark mode toggles
- **DarkModeToggle** - Uses localStorage and CSS classes for theme switching
- **LanguageToggle** - Programmatic navigation between `/` and `/ja` prefixed routes
- **ClientLayout** - Handles pathname-based locale detection and header rendering

### Content Management

Blog and news content is currently hardcoded in page components with external links to Qiita and Notion. Future backend integration planned with:
- Hono for API layer
- Drizzle ORM with Cloudflare D1
- NextAuth for authentication

### Git Workflow

When making changes to the codebase, follow these steps:

1. **Create feature branch**: `git checkout -b feature/description-of-change`
2. **Stage all changes**: `git add -A`
3. **Commit with Conventional Commits format**: `git commit -m "type: description"`
4. **Push branch to remote**: `git push -u origin feature/description-of-change`
5. **Create Pull Request**: Use `gh pr create` with the following structure:
   - **Why**: Purpose and motivation for the change
   - **What&How**: What was changed and how it was implemented
   - **Note**: Important considerations, concerns, or additional context
6. **Include generated footer**: All commits should include the Claude Code footer:
   ```
   🤖 Generated with [Claude Code](https://claude.ai/code)
   
   Co-Authored-By: Claude <noreply@anthropic.com>
   ```

### Important Notes

- Do NOT add layout.tsx files in `/src/app/ja/` directory - this causes header duplication
- Translations use dot notation keys (e.g., 'nav.home', 'profile.bio')
- TypeScript paths use `@/` alias for src directory
- The application is designed for static generation and Cloudflare Pages deployment