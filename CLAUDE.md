# CLAUDE.md

## Guidelines

- Update Japanese and English simultaneously with proper punctuation: 「、。」 vs ", ."
- Sync @docs/profile.md with Profile page content
- Use @docs/todo.md for task tracking (user-managed)

## Project Architecture

**Stack**: Turborepo + Next.js 15 App Router + React 19 + TypeScript + TailwindCSS + shadcn/ui + Hono RPC + Zod + Supabase

**Routing**: `/[locale]` (en/ja), root redirects to `/en`

**Database**:

- `dev`: Local Supabase (PostgreSQL) at `http://127.0.0.1:54321`
- `prd`: Remote Supabase (PostgreSQL)

**Environment**:

- `dev`: Development environment (localhost:3000 frontend, localhost:8787 API, localhost:54321 Supabase)
- `prd`: Production environment (same domain for frontend/API, remote Supabase)

## Commands

Run from root:

- `pnpm dev` - Development server (frontend: localhost:3000, API: localhost:8787)
- `pnpm build` - Build all packages
- `pnpm lint` / `pnpm lint:fix` - Linting
- `pnpm type-check` - TypeScript validation

Supabase commands:

- `supabase start` - Start local Supabase (required for development)
- `supabase stop` - Stop local Supabase
- `supabase status` - Check Supabase status
- `supabase db reset` - Reset database with fresh migrations and seed data

## Key Files

**Frontend:**

- `apps/frontend/src/lib/i18n.ts` - Translations/locale detection
- `apps/frontend/src/lib/api.ts` - API client with proper type guards
- `apps/frontend/src/lib/constants/` - Centralized constants (design, animation, contact, etc.)
- `apps/frontend/src/components/ClientLayout.tsx` - Layout

**API:**

- `apps/api/src/index.ts` - Hono API server (main entry point)
- `apps/api/src/routes/` - Route definitions (modular structure)
- `apps/api/src/controllers/` - Business logic layer
- `apps/api/src/services/` - Data access layer
- `apps/api/src/supabase.ts` - Supabase client and database operations
- `apps/api/src/schemas.ts` - Zod validation schemas
- `apps/api/src/types.ts` - TypeScript type definitions
- `apps/api/src/utils/` - Utility functions (logging, error handling, etc.)
- `apps/api/src/constants/` - API constants and configuration
- `apps/api/docs/` - API documentation (README, OpenAPI spec)

**Database:**

- `supabase/migrations/` - Database schema migrations
- `supabase/seed.sql` - Seed data for development
- `supabase/config.toml` - Supabase configuration

**Environment:**

- `.env.local` - Development environment variables
- `.env.example` - Environment variables template
- `.env.production` - Production environment variables

## Development Setup

**Prerequisites:**

- Node.js 18+
- pnpm 9+
- Docker (for Supabase)
- Supabase CLI

**First-time setup:**

1. `pnpm install` - Install dependencies
2. `supabase start` - Start local Supabase
3. `pnpm dev` - Start development servers

**Daily development:**

1. `supabase start` (if not running)
2. `pnpm dev`
3. Open:
   - Frontend: <http://localhost:3000>
   - API: <http://localhost:8787>
   - Supabase Studio: <http://localhost:54323>

**Database management:**

- Migrations: Place SQL files in `supabase/migrations/`
- Seed data: Edit `supabase/seed.sql`
- Reset database: `supabase db reset`
