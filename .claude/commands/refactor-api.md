# Refactor API

Refactoring under @apps/api/ . use context7

- [ ] Run build, type checking, and linting to ensure no errors or warnings occur. If they do occur, fix them by finding and addressing the root cause rather than disabling the errors or warnings themselves
- [ ] Remove dead code, unnecessary dependencies, and unused imports
  - Use tools like eslint-plugin-unused-imports
- [ ] Eliminate magic numbers and replace them with constants or environment variables
- [ ] Remove duplicate code and consolidate common functionality (custom hooks, etc.)
- [ ] Standardize naming conventions and code style
- [ ] Improve type safety by utilizing type guards and utility types. Practice defensive programming and strengthen error handling
- [ ] Improve logging to make code production-ready. Implement structured logging and request ID assignment to enable tracking of the same request
- [ ] Be mindful of clean architecture principles, implement dependency inversion, and properly organize code dependencies
- [ ] Split large components, files, and functions into appropriate sizes
  - Target approximately 500 lines for files and 50 lines for functions. Avoid splitting too small as it reduces readability - aim for appropriate granularity that's neither too small nor too large
- [ ] Research the latest versions of Node.js, Next.js, and other libraries and update to use those versions
- [ ] Optimize code from performance, accessibility, and security perspectives
- [ ] Run build, type checking, and linting again to ensure no errors or warnings occur. If they do occur, fix them by finding and addressing the root cause rather than disabling the errors or warnings themselves
