# Node.js Compatibility (`@tsonic/nodejs`)

Tsonic targets the .NET BCL by default. If you want **Node-style APIs** (`fs`, `path`, `crypto`, `process`, `http`, ...), use `surface: "@tsonic/js"` and add `@tsonic/nodejs`.

This is **not** Node.js itself, and it is **not a byte-for-byte clone** of the Node standard library. It is a curated, Node-inspired API surface implemented on .NET for Tsonic projects.

## Table of Contents

### Getting Started

1. [Getting Started](getting-started.md) - enable `@tsonic/nodejs` in a Tsonic project
2. [Importing Modules](imports.md) - what to import from `@tsonic/nodejs/index.js` vs submodules

### Modules

3. [`path`](modules/path.md)
4. [`fs`](modules/fs.md)
5. [`events`](modules/events.md)
6. [`crypto`](modules/crypto.md)
7. [`process`](modules/process.md)
8. [`http`](modules/http.md) (separate submodule)

## Overview

In JS-surface projects with `@tsonic/nodejs` installed you can write natural Node imports:

```ts
import { readFileSync } from "node:fs";
import { join } from "node:path";

export function main(): void {
  const path = join("a", "b", "c");
  console.log(path);
  const text = readFileSync("./README.md", "utf-8");
  console.log(text);
}
```

Direct package imports from `@tsonic/nodejs/index.js` remain supported when you want explicit package-root access instead of Node module specifiers.

## Relationship to `@tsonic/js`

- `@tsonic/js` provides JavaScript runtime APIs (e.g. `JSON`, JS-style `console`, timers).
- `@tsonic/nodejs` provides Node-style APIs (e.g. `fs`, `path`, `crypto`, `http`).

Use `@tsonic/js` for the ambient JavaScript world. Add `@tsonic/nodejs` when you want Node module imports.
