# フィーチャーブランチの削除とmainブランチの同期

1. `git branch`で現在のブランチを確認
2. 現在のブランチがmainブランチでない場合はmainブランチに切り替える
3. `git branch -d feature/description-of-change`でmainブランチ以外のブランチを削除する。エラーが出た場合はそのブランチはマージされていない可能性があるので削除しなくて良い。
4. `git pull`を実行してmainブランチを最新の状態にする
