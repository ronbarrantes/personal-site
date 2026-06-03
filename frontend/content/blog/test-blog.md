---
title: Test Blog
description: A first Markdown post to verify blog routing and code highlighting.
date: 2026-06-02
draft: true
---

# Test Blog

This is a test post written as plain Markdown.

## Code Highlighting

The code fence below should render with syntax colors.

```ts
function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

console.log(slugify("WireGuard on Oracle Cloud"));
```

## List Test

- Markdown stays simple.
- Code snippets still get color.
- Blog posts build from files in git.

> This quote should look like part of the site, not a default Markdown page.
