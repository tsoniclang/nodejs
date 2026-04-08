---
title: Getting Started
---

# Getting Started

## Enable the package

```bash
tsonic init --surface @tsonic/js
tsonic add npm @tsonic/nodejs
tsonic restore
```

If the workspace is still CLR-first, switch `surface` to `@tsonic/js` first.

## Start with normal Node-style imports

```ts
import * as fs from "node:fs";
import * as path from "node:path";
```

Example:

```ts
import * as fs from "node:fs";
import * as path from "node:path";

export function main(): void {
  const file = path.join("src", "App.ts");
  console.log(file, fs.existsSync(file));
}
```

## Remember the model

- `@tsonic/js` is still the ambient surface
- `@tsonic/nodejs` is the package that adds `node:*` modules
- package metadata can add CLR framework/runtime requirements during restore

That last point is important: `@tsonic/nodejs` is not just a bag of `.d.ts`
files. Its package manifest actively contributes module aliases, runtime
packages, and framework requirements to the workspace.

## Typical next steps

- `node:fs` and `node:path` for file/process work
- `node:http` for servers
- `node:crypto` for hashes and signatures
- `node:events` for emitter-style flows
- `node:process` for process-level information and environment access
