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

## Keys

Key creation and signing helpers use `KeyObject` for parsed key material:

```ts
import { createPrivateKey, createPublicKey, sign, verify } from "node:crypto";

export function verifyMessage(privatePem: string, message: byte[]): boolean {
  const privateKey = createPrivateKey(privatePem);
  const publicKey = createPublicKey(privateKey);
  const signature = sign("sha256", message, privateKey);
  return verify("sha256", message, publicKey, signature);
}
```

This keeps repeated signing and verification paths typed around key objects
instead of untyped `unknown` values.

This is a package import, not ambient behavior. Keep the model explicit:

- `@tsonic/js` gives you the JS world
- `@tsonic/nodejs` gives you Node-style modules like `node:crypto`
