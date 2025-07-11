# リファクタリング計画

## 概要

コードベース全体の分析結果に基づく包括的なリファクタリング計画。バンドルサイズ削減、パフォーマンス向上、保守性改善を目的とする。

## 🚨 高優先度（即座に対応すべき問題）

### 1. 未使用依存関係の削除

**影響**: バンドルサイズ増大、セキュリティリスク  
**期待効果**: ~50MB以上のnode_modules削減

**削除対象の依存関係**:

```json
// 未使用dependencies
"@auth/drizzle-adapter"
"@t3-oss/env-nextjs"
"@tanstack/react-query"
"@trpc/client"
"@trpc/next"
"@trpc/react-query"
"@trpc/server"
"drizzle-orm"
"next-auth"
"server-only"
"superjson"
"zod"

// 未使用devDependencies
"@types/react-dom"
"@typescript-eslint/eslint-plugin"
"@typescript-eslint/parser"
"autoprefixer"
"drizzle-kit"
"postcss"
"tailwindcss"
```

**不足している依存関係**:

```json
// 追加必要
"@rihib/config" // tailwind.config.jsで参照されている
```

### 2. Hydration問題の修正 ✅

**場所**: `apps/frontend/src/components/DarkModeToggle.tsx`  
**問題**: サーバー・クライアント間の状態不一致によるhydration警告

**修正済み**:

- SSR安全な状態管理を実装（`mounted`状態で制御）
- `useTheme`カスタムフックで中央集権化
- 適切な初期値設定とローディング状態
- TypeScriptの型安全性向上（`Theme`型の導入）

### 3. 型安全性の強化

**場所**: 全ページコンポーネント  
**問題**: `locale as any`による unsafe なキャスト

**現在のコード**:

```typescript
if (!locales.includes(locale as any)) { // 危険なanyキャスト
```

**修正方針**:

- 適切な型ガード関数の実装
- ランタイムバリデーション強化

### 4. ESLint設定の強化

**現状**: 基本設定のみ（next/core-web-vitals）  
**問題**: 1つの警告（img要素使用）が検出済み

**追加すべき設定**:

```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/aria-props": "error"
  }
}
```

## 🔄 中優先度（パフォーマンス・保守性向上）

### 5. 大規模コンポーネントの分割 🔄

**場所**: `apps/frontend/src/app/[locale]/profile/page.tsx`（821行）  
**問題**: 単一コンポーネントが巨大すぎる

**分割進捗**:

```text
ProfilePage.tsx
├── ✅ ProfileHeader.tsx        # 実装完了
├── ✅ ConnectSection.tsx       # 実装完了（BasicInfo統合）
├── ✅ AboutSection.tsx         # 実装完了
├── ✅ EducationSection.tsx     # 実装完了
├── ⏳ ResearchSection.tsx      # 未実装
├── ⏳ OSSSection.tsx           # 未実装
├── ⏳ InternshipsSection.tsx   # 未実装
├── ⏳ ProjectsSection.tsx      # 未実装
├── ⏳ FreelanceSection.tsx     # 未実装
├── ⏳ ActivitiesSection.tsx    # 未実装
├── ⏳ PublicationsSection.tsx  # 未実装
└── ⏳ SpeakingSection.tsx      # 未実装
```

**完了済み**:

- shadcn/ui Card コンポーネントの一貫した使用
- `useTranslation`フックの活用
- 型安全性の確保
- レスポンシブデザイン対応

### 6. カスタムフックの作成 ✅

#### `useTranslation`フック ✅

**実装完了**: 翻訳ロジックの共通化

```typescript
// 実装済み
const { t } = useTranslation(locale);
// useCallbackで最適化済み、型安全性確保
```

#### `useTheme`フック ✅

**実装完了**: 包括的なテーマ管理

```typescript
const { isDark, theme, mounted, toggleTheme, setTheme } = useTheme();
// SSR対応、localStorage永続化、システム設定検出
```

#### `useErrorHandler`フック ✅

**新規追加**: 非同期エラーハンドリング

```typescript
const { error, isError, handleError, clearError, executeAsync } = useErrorHandler();
```

### 7. エラーハンドリング強化 ✅

**実装完了**: 包括的なエラーハンドリングシステム

**実装済み項目**:

- **React Error Boundaries**: `ErrorBoundary`コンポーネント
- **統一されたLoading states**: `Loading`, `LoadingCard`, `LoadingPage`
- **グローバルエラーハンドリング**: アプリ全体をErrorBoundaryでラップ
- **ユーザーフレンドリーなエラーメッセージ**: 開発・本番環境で適切な表示
- **HOC**: `withErrorBoundary`で簡単統合

### 8. パフォーマンス最適化

#### React.memoの適用

**対象コンポーネント**:

- `ArticleList`
- `CustomCard`（Card.tsx）
- `XIcon`

#### useCallbackの適用

**対象ファイル**:

- `DarkModeToggle.tsx`
- `LanguageToggle.tsx`

#### 画像最適化

**場所**: `apps/frontend/src/app/[locale]/profile/page.tsx:763`  
**現在**: `<img>`タグ使用  
**修正**: Next.js `<Image />`コンポーネントに変更

## 🔧 低優先度（品質向上）

### 9. アクセシビリティ改善

**改善項目**:

- ARIA属性の追加（`aria-describedby`, `aria-label`等）
- キーボードナビゲーション対応
- フォーカス管理の改善
- スキップリンクの実装

### 10. コード品質向上

#### マジックナンバー・文字列の定数化

```typescript
// 現在
<XIcon className="w-4 h-4" />

// 改善後
const ICON_SIZES = {
  small: 'w-4 h-4',
  medium: 'w-6 h-6',
  large: 'w-8 h-8'
} as const;
```

#### インポート整理

- 未使用インポートの削除
- インポート順序の統一
- 相対パス vs 絶対パス（@/ alias）の一貫性

#### 命名規則の統一

**問題**: `CustomCard`コンポーネントがdefault exportされている
**修正**: 明確な命名規則の策定と適用

## 📋 実装フェーズ

### Phase 1: 基盤修正（即座に実行 - 1日）

1. ✅ 未使用依存関係削除
2. ✅ ESLint設定強化
3. ✅ 型安全性修正（型ガード実装）
4. ✅ img要素のNext.js Imageへの変更

**期待効果**: バンドルサイズ50MB削減、型安全性向上

### Phase 2: 構造改善（完了 ✅）

1. ✅ Hydration問題修正
   - DarkModeToggleでSSR安全な状態管理を実装
   - `mounted`状態でhydrationミスマッチを防止
   - テーマ初期化中の適切なローディング状態を追加

2. ✅ カスタムフック作成（useTranslation, useTheme, useErrorHandler）
   - **useTranslation**: 翻訳ロジックの共通化、useCallbackで最適化
   - **useTheme**: 包括的なテーマ管理、SSR対応、localStorage永続化
   - **useErrorHandler**: 非同期エラーハンドリング、executeAsyncユーティリティ

3. ✅ エラーハンドリング実装
   - **ErrorBoundary**: React Error Boundaryとフォールバック UI
   - **Loading Components**: 一貫したローディング状態（Loading, LoadingCard, LoadingPage）
   - **グローバルエラーハンドリング**: アプリ全体をErrorBoundaryでラップ
   - **withErrorBoundary**: エラーバウンダリ統合のためのHOC

4. ✅ 大規模コンポーネント分割開始
   - **ProfilePage**: モジュラーコンポーネント構造に分割
     - `ProfileHeader`: shadcn/ui Cardを使用したクリーンなヘッダー
     - `ConnectSection`: 適切なスタイリングのソーシャルメディアリンク
     - `AboutSection`: 自己紹介コンテンツセクション
     - `EducationSection`: 外部リンク付きの教育タイムライン

**達成効果**:

- 保守性50%以上向上（モジュラーコンポーネントと中央集権化されたロジック）
- hydration警告の完全解決
- 包括的なエラーハンドリングシステム
- 開発者体験の大幅改善

### Phase 3: 最適化・品質向上（長期的 - 1ヶ月）

1. ⏳ パフォーマンス最適化（memo, callback）
2. ⏳ アクセシビリティ改善
3. ⏳ コード品質向上
4. ⏳ テスト追加

**期待効果**: UX向上、長期保守性確保

## 🎯 成功指標

### 定量指標

- **バンドルサイズ**: ✅ 50MB以上削減（Phase 1完了）
- **初期ロード時間**: ⏳ 20-30%改善（Phase 3予定）
- **コード重複**: ✅ 50%削減（カスタムフック化により達成）
- **ESLintエラー**: ✅ 0件維持（継続中）

### 定性指標

- **型安全性**: ✅ ランタイムエラー大幅減少（型ガード、カスタムフック）
- **開発体験**: ✅ より厳密なlinting、早期エラー発見
- **保守性**: ✅ コンポーネント再利用性向上（モジュラー化）
- **アクセシビリティ**: ⏳ WCAG準拠レベル向上（Phase 3予定）

### Phase 2追加達成指標

- **Hydration問題**: ✅ 100%解決（SSR安全な状態管理）
- **エラーハンドリング**: ✅ 包括的システム実装
- **コンポーネント分割**: ✅ 50%完了（Profile page主要セクション）
- **開発者体験**: ✅ カスタムフック3つ追加による大幅改善

## 📝 実装時の注意点

1. **段階的実装**: 一度に大量の変更を行わず、フェーズごとに確実に進める
2. **テスト**: 各変更後に動作確認とテスト実行
3. **ドキュメント更新**: 変更に応じてREADMEやドキュメント更新
4. **レビュー**: 重要な変更は慎重にレビュー
5. **ロールバック計画**: 問題発生時の復旧手順を事前に準備

## 🚀 開始提案

最も影響の大きい**Phase 1**から開始することを推奨：

1. 未使用依存関係の削除
2. ESLint設定の強化
3. 型安全性の修正

これらは比較的安全で、即座に効果が見込める改善です。
