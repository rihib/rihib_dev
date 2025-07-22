# API Documentation

この`apps/api/docs/`ディレクトリには、Rihib APIのOpenAPI仕様書が格納されています。

## ファイル構成

- `openapi.yaml` - OpenAPI 3.0.3仕様書（メインドキュメント）
- `README.md` - このファイル

## API概要

Rihib APIは、個人ウェブサイト用のREST APIで、ブログ記事やニュース記事の取得機能を提供します。

### 主要エンドポイント

- `GET /api/articles` - タイプとロケールによる記事の取得（統一エンドポイント）

### 技術スタック

- **フレームワーク**: Hono
- **バリデーション**: Zod
- **データベース**: Supabase (PostgreSQL)
- **言語**: TypeScript

### 環境

- **開発**: `http://localhost:8787`
- **本番**: `https://rihib.dev`

## OpenAPI仕様書の確認方法

### 1. Swagger UI

オンラインのSwagger Editorで確認:

1. <https://editor.swagger.io/> にアクセス
2. `openapi.yaml`の内容をコピー&ペースト

### 2. VS Code拡張機能

VS Codeで確認:

- `OpenAPI (Swagger) Editor` 拡張機能をインストール
- `openapi.yaml`を開いてプレビュー

### 3. コマンドライン

```bash
# swagger-uiをグローバルインストール（初回のみ）
npm install -g swagger-ui-serve

# ローカルサーバーでOpenAPI仕様書を表示
swagger-ui-serve apps/api/docs/openapi.yaml
```

## スキーマとの対応

OpenAPI仕様書は、`apps/api/src/schemas.ts`で定義されているZodスキーマに基づいて作成されています。

- `ArticleSchema` → `Article`
- `LocaleSchema` → `Locale`
- `ArticleTypeSchema` → `ArticleType`
- `ArticlesResponseSchema` → `ArticlesResponse`
- `ErrorResponseSchema` → `ErrorResponse`

## 更新方法

API仕様に変更があった場合は、以下を更新してください：

1. `apps/api/src/schemas.ts` - Zodスキーマの更新
2. `apps/api/src/routes/` - エンドポイントの実装
3. `apps/api/docs/openapi.yaml` - OpenAPI仕様書の更新

この順序で更新することで、実装とドキュメントの整合性を保つことができます。
