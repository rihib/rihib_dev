# rihib.dev

rihibの個人Webサイト。自分についての情報を集約し、発信するためのプラットフォーム。

## 🌐 サイト概要

多言語対応（日本語・英語）の個人Webサイトで、プロフィール、ブログ、お知らせなどの情報を発信します。

### 主な機能

- **多言語対応**: 日本語・英語の切り替え（URLパスで言語指定）
- **ダークモード**: OS設定に基づく自動切り替えと手動切り替え
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **記事管理**: 外部プラットフォームの記事メタデータ管理

### ページ構成

- **Home**: プロフィール概要、最新ニュース
- **Profile**: 詳細な自己紹介、経歴、SNSリンク
- **Blog**: ブログ記事一覧（外部リンク）
- **News**: お知らせ一覧（外部リンク）

## 🛠️ 技術スタック

### 開発環境

- **モノレポ**: Turborepo
- **言語**: TypeScript
- **ランタイム**: Node.js
- **パッケージマネージャー**: pnpm
- **コード品質**: ESLint, Prettier, markdownlint

### フロントエンド

- **フレームワーク**: Next.js 14 (App Router)
- **スタイリング**: TailwindCSS + shadcn/ui
- **ホスティング**: Vercel（予定）

### バックエンド（計画中）

- **API**: Hono RPC
- **ホスティング**: Cloudflare Workers
- **認証**: Supabase + NextAuth
- **データベース**: Supabase + Drizzle ORM

## 🏗️ プロジェクト構造

```text
rihib-dev/
├── apps/
│   └── frontend/         # Next.js アプリケーション
├── packages/
│   └── config/           # 共有設定（ESLint, Prettier, Tailwind, TypeScript）
├── docs/                 # ドキュメント
│   ├── design.md         # 設計ドキュメント
│   ├── todo.md           # TODO管理
│   └── profile.md        # プロフィール情報
└── README.md
```

## 🚀 セットアップ

### 前提条件

- Node.js 18以上
- pnpm

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/rihib/rihib-dev.git
cd rihib-dev

# 依存関係をインストール
pnpm install
```

### 開発サーバーの起動

```bash
# 開発サーバーを起動
pnpm run dev
```

<http://localhost:3000> でアクセスできます。

### その他のコマンド

```bash
# 全体をビルド
pnpm run build

# リント実行
pnpm run lint

# リント自動修正
pnpm run lint:fix

# 型チェック
pnpm run type-check

# クリーンアップ
pnpm run clean
```

## 🌍 国際化

- **英語**: `/en`（デフォルト）
- **日本語**: `/ja`
- ルートパス `/` は自動的に `/en` にリダイレクト

### URL構造

```text
/en                 # 英語ホーム
/en/profile         # 英語プロフィール
/en/blog           # 英語ブログ一覧
/en/news           # 英語ニュース一覧

/ja                # 日本語ホーム
/ja/profile        # 日本語プロフィール
/ja/blog          # 日本語ブログ一覧
/ja/news          # 日本語ニュース一覧
```

## 📁 データベース

現在はSQLiteを使用（`apps/frontend/data/app.db`）。将来的にSupabaseに移行予定。

### テーブル構造

```sql
-- 記事メタデータ
articles (
  id: integer PRIMARY KEY,
  title: text,           -- 記事タイトル
  published_at: date,    -- 公開日（YYYY-MM-DD）
  url: text,            -- 外部リンク
  type: text,           -- 'blog' | 'news'
  locale: text,         -- 'en' | 'ja'
  created_at: datetime  -- 作成日時
)
```

## 📝 開発ガイドライン

### コード規約

- TypeScriptを使用
- ESLint + Prettierでコード品質を保持
- コミット前にリント・型チェックを実行
- コメントは基本的に追加しない（明示的に指示がない限り）

### 多言語対応

- 翻訳は `src/lib/i18n.ts` で管理
- ドット記法キー（例：`nav.profile`, `profile.bio`）を使用
- 日本語版と英語版は同時に更新すること
- 句読点：日本語「、。」英語「, .」

### コンポーネント設計

- shadcn/uiコンポーネントを使用
- 再利用可能なCardコンポーネントパターンを採用
- ダークモード対応（TailwindCSS design tokens使用）

## 🔄 今後の予定

- [ ] Supabase + Drizzle ORMへの移行
- [ ] Hono RPC APIの実装
- [ ] Vercel + Cloudflare Workersへのデプロイ
- [ ] 管理者ダッシュボードの実装
- [ ] CI/CDパイプラインの構築

## 👨‍💻 開発者

### 坂内理人 (Rihito Bannai)

- GitHub: [@rihib](https://github.com/rihib)
- LinkedIn: [@rihito-bannai](https://www.linkedin.com/in/rihito-bannai/)
- X: [@rihib_dev](https://x.com/rihib_dev)
