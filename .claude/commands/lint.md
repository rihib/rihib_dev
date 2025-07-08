# Lintチェック

このコマンドは、プロジェクトの品質を保つために必要なリンティングツールを実行します。

## 実行されるチェック

1. **markdownlint**
   - Markdownファイルの形式とスタイルをチェック
   - ドキュメントの一貫性を保つ

2. **ESLint**
   - JavaScript/TypeScriptコードの品質をチェック
   - 構文エラーやベストプラクティスの違反を検出
   - Next.js向けのESLintルールを適用

3. **Prettier**
   - コードの自動フォーマット
   - 一貫したコードスタイルを維持
   - JavaScript/TypeScript、CSS、JSONファイルをフォーマット

## 実行方法

### 基本的なリンティング

```bash
cd frontend && pnpm run lint && cd .. && pnpm dlx markdownlint-cli2 "**/*.md" "!frontend/**/*.md" "!node_modules/**/*.md" "!frontend/node_modules/**/*.md"
```

### 自動修正を含むリンティング

```bash
cd frontend && pnpm run lint:fix && cd .. && pnpm dlx markdownlint-cli2 --fix "**/*.md" "!frontend/**/*.md" "!node_modules/**/*.md" "!frontend/node_modules/**/*.md"
```

## 注意事項

- コミット前に必ず実行してください
- エラーが発生した場合は修正してから次のステップに進んでください
- 自動修正できるエラーについては `pnpm run lint:fix` を使用してください
- Markdownファイルとコードの両方がチェックされます
