# Modules and Runtime Model

`@tsonic/nodejs` declares its Node-style module graph in package metadata.

It is a normal first-party source package, not a surface and not a generated
binding package.

## Module aliases

Examples include:

- `node:fs`
- `node:path`
- `node:http`
- `node:crypto`
- `node:net`
- `node:tls`
- `node:zlib`

Direct package imports remain supported too:

```ts
import { readFileSync } from "@tsonic/nodejs/fs.js";
```

That gives users two practical import styles:

- Node-style `node:*` / bare aliases for normal authored code
- explicit package subpaths when you want the import boundary to be obvious

## Package metadata

The current manifest defines:

- ambient declarations
- module alias map
- exported subpaths
- required type roots
- runtime framework references where needed
- runtime package dependencies where needed

That means the package manifest is doing real work. It is not just package
decoration.

That is why adding `@tsonic/nodejs` can update effective workspace runtime
requirements without making Node a separate ambient surface.

That is why the site now describes `@tsonic/nodejs` as a real first-party
source package, not a generated companion.

## Relationship to ASP.NET Core bindings

Some Node-like capabilities rely on CLR frameworks underneath. The important
thing for users is still the package boundary:

- author against `@tsonic/nodejs`
- let package metadata pull in the CLR binding/runtime requirements

In the current repo, that includes a framework reference on
`Microsoft.AspNetCore.App` plus the required type package
`@tsonic/aspnetcore`.

That keeps the authoring model source-first even when CLR frameworks are part of
the implementation underneath.

## Scope

This package aims for practical Node-style APIs for Tsonic projects. It is not a
promise of byte-for-byte parity with upstream Node.
