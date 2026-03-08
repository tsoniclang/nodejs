# `path`

Import:

```ts
import { basename, dirname, extname, join } from "node:path";
```

Example:

```ts
import { basename, dirname, extname, join } from "node:path";

export function main(): void {
  console.log(join("a", "b", "c"));
  console.log(basename("/tmp/file.txt"));
  console.log(extname("index.html"));
  console.log(dirname("/tmp/file.txt"));
}
```
