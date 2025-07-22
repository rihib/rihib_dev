# Refactor Specified Directories or Files

Performs refactoring of directories or files specified as arguments.

use context7

- [ ] Create @docs/claude/refactor<timestamp>.md.
- [ ] Analyze the directory or file specified in the argument and document it in refactor<timestamp>.md
- [ ] Create a refactoring plan based on the analysis and document it in refactor<timestamp>.md
- [ ] Create an action plan based on the plan and document it in refactor<timestamp>.md. Please create an action plan according to the following perspectives
  - If the specified directory or file is documentation:
    - Refactor @CLAUDE.md
      - Motivation: To provide guidelines for Claude's work, it must be kept up-to-date, accurate, and concise, containing only essential information.
      - Verify content is current and accurate
      - Include only information necessary for Claude's work, remove low-priority information, and keep it concise
      - Make ambiguous or verbose expressions clear and concise
      - Review overall document structure and add/update/delete/move sections as needed
    - Refactor @README.md
      - Motivation: To help first-time visitors understand the project's purpose, usage, and technical architecture.
      - Verify content is current and accurate
      - Include only essential information needed to understand this repository overview, remove overly specific or low-priority information, and keep it concise
      - Make ambiguous or verbose expressions clear and concise
      - Review overall document structure and add/update/delete/move sections as needed
  - If the specified directory or file is code:
    - Run build, type checking, and linting to ensure no errors or warnings occur. If they do occur, fix them by finding and addressing the root cause rather than disabling the errors or warnings themselves
    - Remove dead code, unnecessary dependencies, and unused imports
      - Use tools like eslint-plugin-unused-imports
    - Eliminate magic numbers and replace them with constants or environment variables
    - Remove duplicate code and consolidate common functionality (custom hooks, etc.)
    - Standardize naming conventions and code style
    - Improve type safety by utilizing type guards and utility types. Practice defensive programming and strengthen error handling
    - Improve logging to make code production-ready. Implement structured logging and request ID assignment to enable tracking of the same request
    - Be mindful of clean architecture principles, implement dependency inversion, and properly organize code dependencies
    - Split large components, files, and functions into appropriate sizes
      - Target approximately 500 lines for files and 50 lines for functions. Avoid splitting too small as it reduces readability - aim for appropriate granularity that's neither too small nor too large
    - Research the latest versions of Node.js, Next.js, and other libraries and update to use those versions
    - Optimize code from performance, accessibility, and security perspectives
- [ ] Proceed with refactoring following this action plan. When progressing through the action plan, first create child action plans and complete parent action plans by completing the child action plans
