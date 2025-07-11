# [www.rihib.dev](https://www.rihib.dev)

rihibの個人Webサイト。自分についての情報を集約し、発信するためのプラットフォーム。

## 要件

### 機能

- 多言語対応
  - 日本語、英語の切り替え
  - URLパスで言語を指定（例: `/ja`, `/en`）
  - デフォルトは英語
- ダークモード対応
  - ユーザーのOS設定に基づく自動切り替え
  - 手動切り替えも可能
- 公開ページ（日英切り替え、ダークモード切り替え）
  - Home
    - プロフィールの概要
    - Profile, Blog一覧ページへのリンクボタン
    - News一覧
      - お知らせ一覧ページ
      - ページ下部に表示
      - ページネーションあり
  - Profile
    - 自己紹介、レジュメ
    - SNSへのリンク
      - [LinkedIn](https://www.linkedin.com/in/rihito-bannai/)
      - [GitHub](https://github.com/rihib)
      - [X](https://x.com/rihib_dev)
  - Blog
    - ブログ一覧ページ
    - ページネーションあり
- admin
  - Login
    - 管理者認証
    - Googleアカウントでのログインのみ
  - お知らせ/ブログ記事メタデータ管理
    - ページのコンテンツ自体は外部リンクに飛ぶ
      - お知らせはLinkedInの投稿やXを使う
      - ブログはQiita, Zenn, note, Mediumなどに投稿
    - メタデータのみDBで管理
      - メタデータ内容:
        - タイトル
        - リンク
        - 作成日
        - 出版日
        - 記事タイプ（blog/news）
    - 機能:
      - メタデータ一覧表示
        - ページネーションあり
      - 新規メタデータ作成
      - 既存メタデータ編集
      - メタデータ削除

### 非機能

- 基本的に維持費用はドメイン代を除いて0円に抑えたい

## 技術スタック

- モノレポを採用し、GitHub ActionsでCI/CDを実行する。
- TypeScriptを使用し、Node.jsランタイムで実行する。
- フロントエンドはNext.js(App Router)を使用し、Vercelでホスティングする。基本的なデザインはshadcn/ui（TailwindCSS）を使用する。
- APIはHono RPCを使用して作成し、Cloudflare Workersでホスティングする。
- 認証とデータベースはSupabaseを使用する。ORMはDrizzleを使用する。

### 開発ツール

- エディタ
  - VSCode
- Agentic Coding
  - Copilot
  - Claude Code
  - Claude Code Actions
- 開発環境管理
  - mise
- モノレポ
  - Turborepo
- CI/CD
  - GitHub Actions
- IaC
  - Terraform

### 言語

- 言語
  - TypeScript
- ランタイム
  - Node.js
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

### フロントエンド

- ホスティング
  - Vercel
- フレームワーク
  - Next.js (App Router)
- CSSフレームワーク
  - TailwindCSS
- UIコンポーネント
  - @shadcn/ui

### バックエンド

- ホスティング
  - Cloudflare Workers
- API
  - Hono RPC
- API仕様
  - OpenAPI 3.0

### 認証

- 認証ライブラリ
  - NextAuth
- 認証プロバイダ
  - Supabase

### データベース

- ORM
  - Drizzle
- RDB
  - Supabase

### その他

- レジストラ
  - Cloudflare Registrar
- アナリティクス
  - Google Analytics

## 設計

### テーブル

- articles（記事）
  - id: integer (primary key)
  - title（記事タイトル）: text
  - link（記事リンク）: text
  - created_at（メタデータ作成日時）: datetime
  - published_at（記事公開日）: date
  - type（記事タイプ）: 'blog' | 'news'
  - locale（記事の言語）: 'en' | 'ja'

### API
