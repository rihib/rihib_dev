# Feature Branch Cleanup and Main Branch Sync

1. Check current branch with `git branch`
2. Switch to main branch if not already on main
3. Run `git pull` to update main branch to latest state
4. Delete non-main branches with `git branch -d feature/description-of-change`. If errors occur, the branch may not be merged so it's fine to leave it.
