---
title: events
---

# `events`

Import:

```ts
import { EventEmitter } from "node:events";
```

Example:

```ts
import { EventEmitter } from "node:events";

export function main(): void {
  const emitter = new EventEmitter();
  emitter.on("ready", () => console.log("ready"));
  emitter.emit("ready");
}
```

This module is useful for event-emitter style APIs inside first-party
source-package applications and libraries.
