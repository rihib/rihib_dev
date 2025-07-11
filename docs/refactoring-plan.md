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

### 2. Hydration問題の修正

**場所**: `apps/frontend/src/components/DarkModeToggle.tsx:8-21`  
**問題**: サーバー・クライアント間の状態不一致によるhydration警告

**現在のコード**:

```typescript
const [isDark, setIsDark] = useState(false); // 常にfalseで開始
useEffect(() => {
  const isDarkMode = localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  setIsDark(isDarkMode); // hydration後に状態変更
```

**修正方針**:

- SSRセーフな初期状態管理
- `useIsomorphicLayoutEffect`の使用
- 適切な初期値設定

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

### 5. 大規模コンポーネントの分割

**場所**: `apps/frontend/src/app/[locale]/profile/page.tsx`（821行）  
**問題**: 単一コンポーネントが巨大すぎる

**分割提案**:

```text
ProfilePage.tsx
├── ProfileHeader.tsx
├── BasicInfo.tsx
├── Education.tsx
├── Research.tsx
├── OSS.tsx
├── Internships.tsx
├── Projects.tsx
├── Freelance.tsx
├── Activities.tsx
├── Publications.tsx
└── Speaking.tsx
```

### 6. カスタムフックの作成

#### `useTranslation`フック

**目的**: 翻訳ロジックの共通化

```typescript
// 現在（各コンポーネントで重複）
const t = (key: keyof typeof import('@/lib/i18n').translations.en) =>
  getTranslation(locale as 'en' | 'ja', key);

// 改善後
const { t } = useTranslation(locale);
```

#### `useTheme`フック

**目的**: ダークモード管理の改善

```typescript
const { isDark, toggleTheme, setTheme } = useTheme();
```

### 7. エラーハンドリング強化

**現状**: エラーバウンダリなし、グローバルエラーハンドリングなし

**実装項目**:

- React Error Boundaries
- 統一されたLoading states
- データベースエラーの適切な処理
- ユーザーフレンドリーなエラーメッセージ

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

### Phase 2: 構造改善（1-2週間）

1. 🔄 Hydration問題修正
2. 🔄 カスタムフック作成（useTranslation, useTheme）
3. 🔄 エラーハンドリング実装
4. 🔄 大規模コンポーネント分割開始

**期待効果**: 保守性向上、開発体験改善

### Phase 3: 最適化・品質向上（長期的 - 1ヶ月）

1. ⏳ パフォーマンス最適化（memo, callback）
2. ⏳ アクセシビリティ改善
3. ⏳ コード品質向上
4. ⏳ テスト追加

**期待効果**: UX向上、長期保守性確保

## 🎯 成功指標

### 定量指標

- **バンドルサイズ**: 50MB以上削減
- **初期ロード時間**: 20-30%改善
- **コード重複**: 50%削減
- **ESLintエラー**: 0件維持

### 定性指標

- **型安全性**: ランタイムエラー大幅減少
- **開発体験**: より厳密なlinting、早期エラー発見
- **保守性**: コンポーネント再利用性向上
- **アクセシビリティ**: WCAG準拠レベル向上

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
