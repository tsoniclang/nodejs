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
