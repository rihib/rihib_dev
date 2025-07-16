# rihib.dev

Bilingual personal website for Rihito Bannai with profile, blog, and news content.

## Overview

Modern personal website built with Next.js 14, TypeScript, and bilingual support (Japanese/English).

**Features**: URL-based language switching, dark mode, responsive design, external content management

**Pages**: Home (profile + news), Profile (bio/experience), Blog/News (external listings)

## Tech Stack

**Current**: Turborepo + Next.js 14 + TypeScript + TailwindCSS + shadcn/ui + SQLite

**Development**: pnpm, ESLint, Prettier, markdownlint

**Planned**: Hono RPC API + Supabase + Vercel/Cloudflare Workers

## Quick Start

Prerequisites: Node.js 18+ and pnpm

```bash
git clone https://github.com/rihib/www-rihib-dev.git
cd www-rihib-dev
pnpm install
pnpm dev
```

Access: <http://localhost:3000>

**Commands**: `pnpm build|lint|type-check|clean`

## Structure

- **Routing**: `/[locale]` (en/ja), root → `/en`
- **Database**: SQLite articles table (id, title, url, type, locale)
- **Components**: shadcn/ui design system

## Author

### Rihito Bannai

GitHub: [@rihib](https://github.com/rihib) | LinkedIn: [@rihito-bannai](https://www.linkedin.com/in/rihito-bannai/) | X: [@rihib_dev](https://x.com/rihib_dev)
