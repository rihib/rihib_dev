# Checkout & Commit & Push & Create PR

NOTE: Even if you think no changes exist, always run `git add -A`. Since these instructions are given because changes exist, there must be changes, so always run `git add -A` in any case.

1. Check current branch with `git branch` and confirm it's not the main branch
2. If on main branch, create a new feature branch with `git checkout -b feature/description-of-change`
3. Review changes with `git diff`
4. If there are important changes, update @CLAUDE.md content. @CLAUDE.md is a document containing only essential information needed for Claude to work, and should be kept up-to-date, accurate, and concise without unnecessary information
5. Run lint checks. If errors occur, fix them before proceeding to the next step
6. Stage all changes with `git add -A`. Always use `git add -A` to stage all changes. Never stage files individually
7. Commit with `git commit -m "<type>[optional scope]: <description>"` using Conventional Commits format
   - type:
     - `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
     - `chore`: Other changes that do not modify src or test files
     - `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
     - `docs`: Documentation only changes
     - `feat`: New feature
     - `fix`: Bug fix
     - `perf`: A code change that improves performance
     - `refactor`: A code change that neither fixes a bug nor adds a feature
     - `release`: Create a release commit
     - `revert`: Reverts a previous commit
     - `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
     - `test`: Adding missing or correcting existing tests
     - `wip`: Work in progress, not ready for review
     - BREAKING CHANGE: If the commit introduces a breaking change, appends a `！` after the type/scope, and add `BREAKING CHANGE: <description>` in the commit message body
8. Push to remote with `git push -u origin feature/description-of-change`. Always push
9. If PR hasn't been created yet, create a pull request with `gh pr create` using the following structure:

   - **Why**: Purpose and motivation for the changes
   - **What&How**: What was changed and how it was implemented
   - **Note**: Important considerations, concerns, and additional context
