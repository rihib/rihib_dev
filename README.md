# rihib.dev

Bilingual personal website for Rihito Bannai, featuring profile, blog, and news content.

## Overview

A modern personal website built with Next.js 14 and TypeScript, supporting both Japanese and English languages.

**Key Features:**

- Bilingual support (Japanese/English) with URL-based language switching
- Dark mode with automatic OS detection
- Responsive design for mobile and desktop
- External content management for blog posts and news

**Pages:**

- **Home**: Profile overview and latest news
- **Profile**: Detailed bio, experience, and social links
- **Blog**: External blog post listings
- **News**: External news and announcements

## Tech Stack

**Frontend:**

- Next.js 14 (App Router) + TypeScript
- TailwindCSS + shadcn/ui
- SQLite database (migrating to Supabase)

**Development:**

- Turborepo monorepo
- pnpm package manager
- ESLint, Prettier, markdownlint

**Planned Backend:**

- Hono RPC API on Cloudflare Workers
- Supabase authentication and database
- Vercel deployment

## Project Structure

```text
rihib-dev/
├── apps/frontend/        # Next.js application
├── packages/config/      # Shared configurations
└── docs/                 # Documentation
```

## Quick Start

**Prerequisites:** Node.js 18+ and pnpm

```bash
# Clone and install
git clone https://github.com/rihib/rihib-dev.git
cd rihib-dev
pnpm install

# Start development server
pnpm run dev
```

Access at <http://localhost:3000>

**Available Commands:**

- `pnpm run build` - Build all packages
- `pnpm run lint` - Run linting
- `pnpm run type-check` - Type checking
- `pnpm run clean` - Clean build artifacts

## Internationalization

**URL Structure:**

- English: `/en` (default)
- Japanese: `/ja`
- Root `/` redirects to `/en`

## Database

Currently using SQLite (`apps/frontend/data/app.db`), migrating to Supabase.

**Articles Table:**

- id, title, published_at, url, type ('blog'|'news'), locale ('en'|'ja')

## Development Guidelines

- TypeScript with strict linting
- Simultaneous Japanese/English updates
- shadcn/ui component patterns
- Dark mode with TailwindCSS tokens

## Author

### Rihito Bannai

- GitHub: [@rihib](https://github.com/rihib)
- LinkedIn: [@rihito-bannai](https://www.linkedin.com/in/rihito-bannai/)
- X: [@rihib_dev](https://x.com/rihib_dev)
