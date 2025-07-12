# 個人サイト完成に向けた実装計画

このドキュメントは、現在の実装状況と基本設計(spec.md)との差異を踏まえ、完全な個人サイトにするための実装計画を整理したものです。

## 現在の実装状況（2025年1月時点）

### ✅ 実装済み機能

- **フロントエンド基盤**: Next.js 14 App Router + TypeScript + TailwindCSS
- **国際化**: 日英切り替え機能（URLベース）
- **ダークモード**: 完全実装済み
- **データベース**: SQLite (better-sqlite3) による基本的なコンテンツ管理
- **公開ページ**: Home, Profile, Blog, News の基本機能
- **開発環境**: ESLint, Prettier, markdownlint による品質管理

### ❌ 未実装機能

- **管理機能**: 認証・管理者パネル・コンテンツ管理
- **バックエンドAPI**: Hono + Cloudflare Workers
- **認証基盤**: NextAuth + Supabase
- **UI改善**: shadcn/ui コンポーネント
- **デプロイ**: Vercel/Cloudflare Workers 設定

## 基本設計との主要な差異

### 技術スタック移行が必要な箇所

- **ランタイム**: Node.js → Deno
- **データベース**: SQLite → Supabase (PostgreSQL)
- **ORM**: 生SQL → Drizzle ORM
- **バックエンド**: 未実装 → Hono + Cloudflare Workers
- **RPC**: 未実装 → Hono RPC
- **モノレポ**: 未実装 → Turborepo
- **UI**: 素のTailwind → shadcn/ui

### 技術的負債

- `tRPC` が package.json に含まれているが設計では `Hono RPC` を採用
- `Drizzle ORM` が設定済みだが未実装（現在は better-sqlite3 を使用）
- `NextAuth` が設定済みだが未実装

## 技術スタック移行課題

### 1. ランタイム環境の変更

- **現在**: Node.js
- **目標**: Deno
- **課題**:
  - package.json から deno.json への移行
  - Node.js依存のライブラリ（Next.js）の Deno 対応検討
  - npm パッケージから Deno モジュールへの移行

### 2. モノレポ構成導入

- **現在**: シングルパッケージ構成
- **目標**: Turborepo
- **課題**:
  - フロントエンドとバックエンドの分離
  - 共通パッケージの抽出
  - turborepo.json 設定

## バックエンド実装課題

### 1. API サーバー構築

- **技術**: Hono + Cloudflare Workers
- **必要作業**:
  - [ ] Hono サーバーセットアップ
  - [ ] Cloudflare Workers 設定
  - [ ] wrangler.toml 設定
  - [ ] API エンドポイント設計・実装
    - [ ] `/api/v1/articles` - 記事メタデータ管理（blog/news統一）
    - [ ] `/api/v1/auth` - 認証エンドポイント
  - [ ] OpenAPI ドキュメント作成
    - [ ] API 仕様書の作成 (OpenAPI 3.0)
    - [ ] Swagger UI の設定
    - [ ] エンドポイントの詳細ドキュメント化

### 2. RPC レイヤー実装

- **技術**: Hono RPC
- **必要作業**:
  - [ ] Hono RPC クライアント設定
  - [ ] 型安全な API クライアント実装
  - [ ] フロントエンドとの統合

### 3. データベース実装

- **技術**: Drizzle ORM + Supabase
- **必要作業**:
  - [ ] Supabase プロジェクト作成
  - [ ] Drizzle ORM 設定（Supabase 統合）
  - [ ] データベーススキーマ設計
    - [ ] users テーブル（管理者用、Supabase Auth と連携）
    - [ ] articles テーブル（title, link, created_at, type のみ）
      - type カラムで blog/news を判別
  - [ ] マイグレーションファイル作成
  - [ ] シードデータ作成

## 認証システム実装課題

### 1. NextAuth 統合

- **技術**: NextAuth + Supabase
- **必要作業**:
  - [ ] Supabase プロジェクト作成（データベースと共通）
  - [ ] Supabase Auth 設定
  - [ ] NextAuth 設定（Supabase アダプター使用）
  - [ ] OAuth プロバイダー設定（Google/GitHub）
  - [ ] セッション管理実装

### 2. 管理者認証

- **必要作業**:
  - [ ] 管理者権限チェック実装
  - [ ] 保護されたルート設定
  - [ ] 管理者ダッシュボード作成

## コンテンツ管理システム実装課題

### 1. 管理者パネル

- **必要作業**:
  - [ ] `/admin` ルート実装
  - [ ] ログインページ実装
  - [ ] 記事管理画面（blog/news統一）
    - [ ] 記事一覧表示（タイプ別フィルタリング）
    - [ ] 記事メタデータ作成・編集フォーム（タイトル、リンク、作成日、タイプ）
    - [ ] 外部リンク管理（Qiita/Notion）

### 2. 動的コンテンツ表示

- **必要作業**:
  - [ ] 記事詳細ページ実装（外部リンクへのリダイレクト）
    - [ ] ブログ記事詳細ページ
    - [ ] お知らせ詳細ページ
  - [ ] モックデータからDB データへの切り替え

## UI/UX 改善課題

### 1. shadcn/ui 導入

- **必要作業**:
  - [ ] shadcn/ui セットアップ
  - [ ] 既存コンポーネントの shadcn/ui 移行
  - [ ] フォームコンポーネント実装
  - [ ] ダイアログ・モーダル実装

### 2. 追加機能

- **必要作業**:
  - [ ] 検索機能実装
  - [ ] タグ・カテゴリ機能
  - [ ] RSS フィード生成
  - [ ] SEO メタタグ最適化

## デプロイ・インフラ課題

### 1. デプロイメント環境設定

- **必要作業**:
  - [ ] Supabase 本番環境設定
  - [ ] Vercel デプロイメント設定（Next.js との相性を優先）
  - [ ] ドメイン設定（www.rihib.dev）
  - [ ] 環境変数設定（Supabase 接続情報等）

### 2. CI/CD パイプライン

- **必要作業**:
  - [ ] GitHub Actions によるデプロイ自動化
  - [ ] プレビュー環境設定
  - [ ] テスト自動化
  - [ ] デプロイ前の型チェック・リント

## 追加機能・改善課題

### 1. 分析・監視

- **必要作業**:
  - [ ] Google Analytics 設定
  - [ ] エラー監視システム
  - [ ] パフォーマンス監視

### 2. セキュリティ

- **必要作業**:
  - [ ] CSRF 対策
  - [ ] XSS 対策
  - [ ] セキュリティヘッダー設定
  - [ ] レート制限実装

### 3. パフォーマンス最適化

- **必要作業**:
  - [ ] 画像最適化
  - [ ] コード分割
  - [ ] キャッシュ戦略
  - [ ] CDN 設定

## 実装優先度と実行計画

### Phase 1: 基盤技術移行（最優先）

#### 直近のネクストアクション（todo.md）に基づく優先実装

1. **shadcn/ui 導入** 🎯
   - [ ] shadcn/ui セットアップ
   - [ ] 既存コンポーネントの移行（Card, Button, Header等）
   - [ ] フォームコンポーネント実装
   - [ ] 管理画面向けUIコンポーネント準備
   - **理由**: 現在のUI実装は基本的だが、管理機能実装時に高品質なUIコンポーネントが必要

2. **Deno 環境移行** 🎯
   - [ ] deno.json 設定
   - [ ] Node.js から Deno への移行戦略策定
   - [ ] Next.js の Deno 対応状況調査
   - [ ] 依存関係の Deno 対応確認・代替案検討
   - **理由**: 基本設計の要件だが、Next.js との互換性課題があるため慎重な移行が必要

3. **Turborepo 導入** 🎯
   - [ ] turborepo.json 設定
   - [ ] モノレポ構成への移行
   - [ ] パッケージ分離（frontend/backend）
   - [ ] 共通パッケージ抽出
   - **理由**: バックエンド実装前にモノレポ構成を整備することで、開発効率を向上

### Phase 2: 現在の実装改善

1. **ホームページお知らせ統合** 🎯
   - [ ] お知らせ一覧ページ削除
   - [ ] ホームページ下部へのお知らせ表示統合
   - [ ] ページネーション実装
   - **理由**: 現在の構成改善により、ユーザビリティ向上

2. **環境変数整備** 🎯
   - [ ] dev/prd 環境の切り替え機能
   - [ ] 環境別設定ファイル作成
   - [ ] データベース接続設定の環境別管理
   - **理由**: 本番デプロイ前に環境管理を整備

### Phase 3: バックエンド基盤構築

1. **API設計・OpenAPI仕様定義** 🎯
   - [ ] 必要APIエンドポイント洗い出し
   - [ ] OpenAPI 3.0 仕様作成
   - [ ] `/api/v1/articles` 設計（blog/news統一）
   - [ ] `/api/v1/auth` 設計
   - **理由**: バックエンド実装前に明確な仕様定義が必要

2. **Supabase + Drizzle ORM 実装**
   - [ ] Supabase プロジェクト作成
   - [ ] Drizzle ORM 設定（Supabase統合）
   - [ ] データベーススキーマ実装
   - [ ] 現在のSQLiteからSupabaseへの移行
   - **理由**: 本格的なデータベース基盤構築

3. **Hono バックエンド API 実装**
   - [ ] Hono サーバーセットアップ
   - [ ] Hono RPC 実装
   - [ ] Cloudflare Workers 設定
   - [ ] 型安全なAPIクライアント実装

### Phase 4: 認証・管理機能

1. **NextAuth + Supabase 認証**
   - [ ] NextAuth 設定（Supabase統合）
   - [ ] Google OAuth 設定
   - [ ] 管理者権限制御実装
   - [ ] セッション管理

2. **管理者パネル実装**
    - [ ] `/admin` ルート実装
    - [ ] 記事管理画面（CRUD機能）
    - [ ] 管理者ダッシュボード
    - [ ] 外部リンク管理

### Phase 5: デプロイ・最適化

1. **デプロイ環境構築**
    - [ ] Vercel デプロイ設定
    - [ ] Cloudflare Workers デプロイ
    - [ ] ドメイン設定（www.rihib.dev）
    - [ ] CI/CD パイプライン（GitHub Actions）

2. **追加機能・最適化**
    - [ ] Google Analytics 統合
    - [ ] セキュリティ対策
    - [ ] パフォーマンス最適化
    - [ ] 検索・タグ機能

## 重要な技術的判断と注意点

### 技術スタック移行に関する課題

1. **Deno移行の複雑性**
   - Next.js の Deno 対応は限定的
   - 現実的には Node.js での実装を継続し、将来的にDeno移行を検討
   - 当面は基本設計の他の要素（Supabase、Hono）を優先

2. **tRPC vs Hono RPC**
   - 現在の package.json には tRPC が含まれている
   - 基本設計では Hono RPC を採用
   - 統一性のためHono RPCで実装を進める

3. **データベース移行戦略**
   - 現在: SQLite (better-sqlite3) で基本機能実装済み
   - 目標: Supabase PostgreSQL への移行
   - 段階的移行により現在の機能を維持しながら移行

### 実装の進め方

1. **段階的実装**: 現在動作している機能を壊さずに段階的に移行
2. **最小viable product**: 各フェーズで動作するプロダクトを維持
3. **設計仕様の柔軟性**: 技術的制約により一部設計を調整する可能性

### 次のアクション

**immediate actions (1-2週間)**:

1. shadcn/ui 導入
2. ホームページお知らせ統合
3. 環境変数整備

**short-term actions (1-2ヶ月)**:

1. Turborepo 導入
2. API設計・OpenAPI仕様定義
3. Supabase + Drizzle ORM 実装

**medium-term actions (2-3ヶ月)**:

1. 認証・管理機能実装
2. デプロイ環境構築

This roadmap ensures efficient development while meeting design requirements and leveraging current implementation.
