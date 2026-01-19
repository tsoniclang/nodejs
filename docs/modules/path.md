# `path`

Import:

```ts
import { path } from "@tsonic/nodejs/index.js";
```

Example:

```ts
import { console, path } from "@tsonic/nodejs/index.js";

export function main(): void {
  console.log(path.join("a", "b", "c"));
  console.log(path.basename("/tmp/file.txt"));
  console.log(path.extname("index.html"));
  console.log(path.dirname("/tmp/file.txt"));
}
```

