# Refactor Specified Directories or Files

Performs refactoring of directories or files specified as arguments.

use context7

- [ ] Copy template
  - [ ] If the specified directory or file is documentation, copy it to @docs/claude/ with the name refactor<timestamp>.md
  - [ ] If the specified directory or file is code, copy it to @docs/claude/ with the name refactor<timestamp>.md
- [ ] Analyze the directory or file specified in the argument and document it in refactor<timestamp>.md
- [ ] Create a refactoring plan based on the analysis and document it in refactor<timestamp>.md
- [ ] Create an action plan based on the plan and document it in refactor<timestamp>.md. Since action plan guidelines are already provided, follow them as a baseline
- [ ] Proceed with refactoring following this action plan. When progressing through the action plan, first create child action plans and complete parent action plans by completing the child action plans
