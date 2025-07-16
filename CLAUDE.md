# CLAUDE.md

## Guidelines

- Update Japanese and English simultaneously with proper punctuation: 「、。」 vs ", ."
- Sync @docs/profile.md with Profile page content
- Use @docs/todo.md for task tracking (user-managed)

## Project Architecture

**Stack**: Turborepo + Next.js 14 App Router + TypeScript + TailwindCSS + shadcn/ui + SQLite

**Routing**: `/[locale]` (en/ja), root redirects to `/en`

**Database**: SQLite at `apps/frontend/data/app.db`, articles table with type/locale fields

## Commands

Run from root:

- `pnpm dev` - Development server (localhost:3000)
- `pnpm build` - Build all packages
- `pnpm lint` / `pnpm lint:fix` - Linting
- `pnpm type-check` - TypeScript validation

## Key Files

- `apps/frontend/src/lib/i18n.ts` - Translations/locale detection
- `apps/frontend/src/lib/db.ts` - Database access
- `apps/frontend/src/components/ClientLayout.tsx` - Layout
