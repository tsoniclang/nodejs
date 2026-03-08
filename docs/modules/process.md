# `process`

Import:

```ts
import { process } from "@tsonic/nodejs/index.js";
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
