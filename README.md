# @tsonic/nodejs

Portable Node-style source surface for Tsonic.

This package is the canonical first-party declaration surface for Node-style APIs in Tsonic.

Key points:

- Node imports such as `node:fs`, `node:path`, `node:crypto`, and `node:http` resolve through this package.
- User imports stay target-neutral. The active Tsonic target chooses the implementation package.
- Runtime behavior belongs to target implementation packages.
- Crypto key APIs expose `KeyObject`-based overloads for `createPublicKey`, `createPrivateKey`, `createSecretKey`, `sign`, and `verify`.
- Broad event, stream, DNS, URL, and utility slots use the package-owned `RuntimeValue` union.

Validation for this package verifies portable declarations and ESM forwarding. Target implementation packages own behavior tests.
