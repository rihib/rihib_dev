# Memo

下記の変更を加えて。

- published_atはdatetimeではなく、dateの粒度を使うように統一したい（変更の途中）
- Avoid hardcoding the supported locales array `["en", "ja"]`; import the shared locales constant from @/lib/i18n to keep supported locales centralized.
- @frontend/src/components/HomePage.tsx The repeated card markup and className strings could be extracted into a reusable Card component to reduce duplication and improve maintainability
