---
title: path
---

# `path`

Import:

```ts
import { basename, dirname, extname, join } from "node:path";
```

Example:

```ts
import { basename, dirname, extname, join } from "node:path";

export function main(): void {
  console.log(join("a", "b", "c"));
  console.log(basename("/tmp/file.txt"));
  console.log(extname("index.html"));
  console.log(dirname("/tmp/file.txt"));
}
```

This module is one of the clearest examples of the package model:

- no new ambient surface is introduced
- the functionality is added by the `@tsonic/nodejs` package
- the recommended authoring style is still standard `node:path`
