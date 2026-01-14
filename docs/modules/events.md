# `events`

Import:

```ts
import { EventEmitter } from "@tsonic/nodejs/index.js";
```

Example:

```ts
import { console, EventEmitter } from "@tsonic/nodejs/index.js";

class MyEmitter extends EventEmitter {}

export function main(): void {
  const emitter = new MyEmitter();
  emitter.on("data", (chunk) => console.log(chunk));
  emitter.emit("data", "hello");
}
```

