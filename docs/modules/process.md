# `process`

Import:

```ts
import { process } from "@tsonic/nodejs/index.js";
```

Example:

```ts
import { console, process } from "@tsonic/nodejs/index.js";

export function main(): void {
  console.log(`pid: ${process.pid}`);
  console.log(`platform: ${process.platform}`);
  console.log(`cwd: ${process.cwd()}`);
}
```

