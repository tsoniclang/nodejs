# `crypto`

Import:

```ts
import { crypto } from "@tsonic/nodejs/index.js";
```

Example:

```ts
import { console, crypto } from "@tsonic/nodejs/index.js";

export function main(): void {
  const hash = crypto.createHash("sha256").update("hello").digest("hex");
  console.log(hash);
}
```

