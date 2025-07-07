# Git Workflow for Claude Code

## 重要な前提条件

**必ず最初に `git status` を実行して現在の状態を確認してください。**

### 未コミットの変更がある場合の対処法

`git status` で変更やUntracked filesが表示された場合：

1. **変更内容を確認**: `git diff` で変更内容を確認
2. **mainブランチでないことを確認**: `git branch` で現在のブランチを確認し、mainブランチでないことを確認
3. **変更を現在のブランチにコミット**: `git commit -m "type: description"` (Conventional Commits形式)

### 新しい変更を加える場合のワークフロー

**前提**: 未コミットの変更が存在しない状態

**必ず最初に `git add -A` で全ての変更をステージングすること。絶対に個別にファイルをステージングしないこと。**

1. **Lint チェック**: Markdown, TypeScript等のファイルはlintチェックを通す
2. **状態確認**: `git status` で作業ディレクトリがクリーンであることを確認
3. **フィーチャーブランチ作成**: `git checkout -b feature/description-of-change`
4. **変更を加える**: コードやファイルを修正
5. **変更内容確認**: `git diff` で意図した変更のみが含まれていることを確認
6. **ステージング**: `git add -A` で全変更をステージング
7. **コミット**: `git commit -m "type: description"` (Conventional Commits形式)
8. **リモートにプッシュ**: `git push -u origin feature/description-of-change`
9. **プルリクエスト作成**: `gh pr create` で以下の構造を使用
   - **Why**: 変更の目的と動機
   - **What&How**: 何を変更し、どのように実装したか
   - **Note**: 重要な考慮事項、懸念事項、追加のコンテキスト
