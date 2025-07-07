# 技術選定

[T3 Stack](https://create.t3.gg/ja/introduction)も参考にしている。

## 開発ツール

- エディタ
  - VSCode
- Agentic Coding
  - Copilot
  - Claude Code
  - Claude Code Actions
- モノレポ
  - Turborepo
- CI/CD
  - GitHub Actions
- 開発環境管理
  - mise

## 言語

- 言語
  - TypeScript
- ランタイム
  - Deno（採用、より成熟してる）
  - Bun（不採用、未成熟）
- バージョン管理
  - Volta
- パッケージマネージャー
  - pnpm
- パッケージマネージャー管理
  - Corepack
- リンター、フォーマッター
  - ESLint
  - Prettier
  - markdownlint

## フロントエンド

- ホスティング
  - Vercel（採用、Next.jsとの相性が良い）
  - Cloudflare Pages（不採用）
- フレームワーク
  - Next.js（採用、他技術スタックとの相性が良い）
  - Vite（不採用、未成熟）
  - Remix（不採用、未成熟）
- CSSフレームワーク
  - TailwindCSS
- UIコンポーネント
  - @shadcn/ui

## バックエンド

- ホスティング
  - Cloudflare Workers（採用、Honoとの相性が良い）
  - Vercel Functions（不採用）
- フレームワーク
  - Hono
- RPC
  - Hono RPC（採用、Honoとの相性が良い）
  - tRPC（不採用、RESTじゃない）

## 認証

- 認証ライブラリ
  - NextAuth
- 認証
  - Supabase

## データベース

- ORM
  - Drizzle（採用、TypeScriptでSQLライクに書ける、Supabaseとの相性が良い）
  - Prisma（不採用、DSLで抽象度の高いクエリを書く必要がある）
- RDB
  - Supabase（採用、PostgreSQLベース、認証と統合、無料枠が充実）
  - Cloudflare D1（不採用、認証プラットフォームとの統合を優先）

## その他

- レジストラ
  - Cloudflare Registrar
- アナリティクス
  - Google Analytics
