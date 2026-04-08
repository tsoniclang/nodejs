# Imports

You can use either:

- Node-style aliases such as `node:fs`
- direct package subpaths such as `@tsonic/nodejs/fs.js`

## Recommended style

Prefer `node:*` imports when you want the most natural authoring style:

```ts
import * as fs from "node:fs";
import * as path from "node:path";
```

Use direct package imports when you want explicit package-root references.

## Package root imports

These remain valid:

```ts
import { fs, path, process, crypto } from "@tsonic/nodejs/index.js";
```

Use them when you want explicit package-root access rather than Node-style
module specifiers.

## Bare aliases

The package currently also declares bare aliases such as:

- `fs`
- `path`
- `crypto`
- `process`

But the recommended public style remains `node:*` imports because they are
clearer and match user expectation better.
