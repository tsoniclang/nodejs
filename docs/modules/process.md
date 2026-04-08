---
title: process
---

# `process`

Preferred import:

```ts
import * as process from "node:process";
```

Example:

```ts
import * as process from "node:process";

export function main(): void {
  console.log(`pid: ${process.pid}`);
  console.log(`platform: ${process.platform}`);
  console.log(`cwd: ${process.cwd()}`);
}
```

Prefer importing `node:process` explicitly rather than assuming process-like
ambient globals.
