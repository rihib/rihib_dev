# rihib.dev

Bilingual personal website for Rihito Bannai with profile, blog, and news content.

## Overview

Modern personal website built with Next.js 15, React 19, TypeScript, and bilingual support (Japanese/English).

**Features**: URL-based language switching, dark mode, responsive design, API-driven content management

**Pages**: Home (profile + news), Profile (bio/experience), Blog/News (external listings)

## Tech Stack

**Frontend**: Turborepo + Next.js 15 + React 19 + TypeScript + TailwindCSS + shadcn/ui

**Backend**: Hono RPC + Zod validation + Supabase (PostgreSQL)

**Development**: pnpm, ESLint, Prettier, markdownlint, Docker (Supabase)

## Quick Start

**Prerequisites**: Node.js 18+, pnpm, Docker, Supabase CLI

```bash
git clone https://github.com/rihib/www-rihib-dev.git
cd www-rihib-dev
pnpm install
supabase start    # Start local Supabase
pnpm dev         # Start frontend + API
```

**Access**:
- Frontend: <http://localhost:3000>
- API: <http://localhost:8787>
- Supabase Studio: <http://localhost:54323>

**Commands**: `pnpm build|lint|type-check|clean` + `supabase start|stop|status`

## Architecture

- **Routing**: `/[locale]` (en/ja), root → `/en`
- **Database**: Supabase PostgreSQL with articles table (id, title, url, type, locale)
- **API**: Hono server with CORS, environment-based configuration
- **Components**: shadcn/ui design system
- **Environment**: `dev` (local Supabase) | `prd` (remote Supabase)

## Author

### Rihito Bannai

GitHub: [@rihib](https://github.com/rihib) | LinkedIn: [@rihito-bannai](https://www.linkedin.com/in/rihito-bannai/) | X: [@rihib_dev](https://x.com/rihib_dev)
