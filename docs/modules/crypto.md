---
title: crypto
---

# `crypto`

Import:

```ts
import { createHash } from "node:crypto";
```

Example:

```ts
import { createHash } from "node:crypto";

export function main(): void {
  const hash = createHash("sha256").update("hello").digest("hex");
  console.log(hash);
}
```

This is a package import, not ambient behavior. Keep the model explicit:

- `@tsonic/js` gives you the JS world
- `@tsonic/nodejs` gives you Node-style modules like `node:crypto`
