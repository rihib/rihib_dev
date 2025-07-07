# Git Workflow for Claude Code

1. `git branch` で現在のブランチを確認し、mainブランチでないことを確認
2. mainブランチの場合は `git checkout -b feature/description-of-change` で新しいフィーチャーブランチを作成
3. `git diff` で変更内容を確認
4. 変更内容を反映するためにCLAUDE.mdを更新すること。CLAUDE.mdはプロジェクトの重要なドキュメントであり、変更内容を正確に記録する必要がある。
5. `git add -A` で全変更をステージング。必ず`git add -A` で全ての変更をステージングすること。絶対に個別にファイルをステージングしないこと。
6. `git commit -m "type: description"` でコミット。Conventional Commits形式を使用すること。
7. `git push -u origin feature/description-of-change` でリモートにプッシュ。必ずプッシュすること。
8. PRがまだ作成されていない場合は`gh pr create` で下記の構造のプルリクエストを作成
   - **Why**: 変更の目的と動機
   - **What&How**: 何を変更し、どのように実装したか
   - **Note**: 重要な考慮事項、懸念事項、追加のコンテキスト
