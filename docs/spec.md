# [www.rihib.dev](https://www.rihib.dev)

私（rihib）の個人Webサイトを作成したい。

## 要件

### 機能

- 公開ページ（日英切り替え、ダークモード切り替え）
  - プロフィールページ
    - 自己紹介（bio、レジュメ）
    - SNS（LinkedIn、GitHub、X）
    - お知らせ
  - お知らせ一覧ページ
  - お知らせ詳細ページ
  - ブログ一覧ページ
  - ブログ詳細ページ
- 管理者ページ
  - ログインページ
  - お知らせ/ブログ記事編集
    - ページ自体はNotionなどの公開ページやQiitaに飛ぶようにする
    - ページタイトル+ページリンク+作成日のみDBで管理

### 非機能

- 基本的に維持費用はドメイン代を除いて0円に抑えたい

## 技術スタック

[T3 Stack](https://create.t3.gg/ja/introduction)

- 開発
  - VSCode
  - Claude Code
  - Claude Code Actions
  - mise
  - GitHub Actions
- 分析ツール
  - Google Analytics
- 言語
  - TypeScript
- ランタイム
  - Deno（採用、より成熟してる）
  - Bun（未成熟で不安なので見送り）
- バージョン管理
  - Volta
- パッケージマネージャー管理
  - Corepack
- パッケージマネージャー
  - pnpm
- ビルド
  - Vite
- モノレポ
  - Turborepo
- フロントエンドフレームワーク
  - Next.js（採用、他技術スタックとの相性が良い）
  - Remix（コミュティが小さい）
- CSSフレームワーク
  - TailwindCSS
- UIコンポーネント
  - @shadcn/ui
- バックエンドフレームワーク
  - Hono
- RPC
  - Hono RPC（採用、Honoとの相性が良い）
  - tRPC（RESTじゃない）
- 認証プラットフォーム
  - Supabase
- 認証ライブラリ
  - NextAuth
- ORM
  - Drizzle（採用、TypeScriptでSQLライクに書ける）
  - Prisma（DSLで抽象度の高いクエリを書く必要がある）
- レジストラ
  - Cloudflare Registrar
- ホスティング
  - [【徹底比較】Vercel vs Cloudflare：Next.js向けホスティング](https://qiita.com/syukan3/items/037a5ff83c9282ecd7e8)
  - Cloudflare Pages（採用、静的ページのみ使う予定、課金リスクが少ない）
  - Vercel（課金リスクがある、Cloudflareで統一したい）
- サーバーレス
  - Cloudflare Workers（採用、Honoと相性が良い）
  - Vercel Functions（Cloudflareで統一したい）
- DB
  - Cloudflare D1（採用）
  - MongoDB（Cloudflareで統一したい）
- オブジェクトストレージ
  - Cloudflare R2（採用）
  - Vercel Blob（Cloudflareで統一したい）
