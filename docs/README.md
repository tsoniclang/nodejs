# Node.js Compatibility (`@tsonic/nodejs`)

Tsonic targets the .NET BCL by default. If you want **Node-style APIs** (like `fs`, `path`, `crypto`, `process`, and `http`), use `@tsonic/nodejs`.

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

In Tsonic projects you import Node-style APIs from `@tsonic/nodejs/index.js`:

```ts
import { console, fs, path } from "@tsonic/nodejs/index.js";

export function main(): void {
  console.log(path.join("a", "b", "c"));
  const text = fs.readFileSync("./README.md", "utf-8");
  console.log(text);
}
```

Some namespaces are emitted as separate ESM entry points (for example `nodejs.Http`), and you import those via a subpath:

```ts
import { http } from "@tsonic/nodejs/nodejs.Http.js";
```

## Relationship to `@tsonic/js`

- `@tsonic/js` provides JavaScript runtime APIs (e.g. `JSON`, JS-style `console`, timers).
- `@tsonic/nodejs` provides Node-style APIs (e.g. `fs`, `path`, `crypto`, `http`).

You can enable either or both in a project.

