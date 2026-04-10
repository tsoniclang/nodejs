import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveTests {
  public resolve_SimpleDomain_CallsCallback(): void {
    let called = false;
    let error: Error | null = null;
    let count = 0;
    dns.resolve("localhost", (err, addrs) => {
      called = true;
      error = err;
      count = addrs.length;
    });
    Assert.True(called);
    Assert.Null(error);
    Assert.True(count > 0);
  }

  public resolve_WithARecordType_CallsCallback(): void {
    let called = false;
    dns.resolveWithRrtype("localhost", "A", (err, res) => {
      called = true;
    });
    Assert.True(called);
  }

  public resolve_WithAAAARecordType_CallsCallback(): void {
    let called = false;
    dns.resolveWithRrtype("localhost", "AAAA", (err, res) => {
      called = true;
    });
    Assert.True(called);
  }

  public resolve_WithMXRecordType_CallsCallback(): void {
    let called = false;
    dns.resolveWithRrtype("localhost", "MX", (err, res) => {
      called = true;
    });
    Assert.True(called);
  }

  public resolve_WithTXTRecordType_CallsCallback(): void {
    let called = false;
    dns.resolveWithRrtype("localhost", "TXT", (err, res) => {
      called = true;
    });
    Assert.True(called);
  }

  public resolve_WithInvalidRecordType_CallsCallback(): void {
    let called = false;
    let error: Error | null = null;
    dns.resolveWithRrtype("localhost", "INVALID", (err, res) => {
      called = true;
      error = err;
    });
    Assert.True(called);
    Assert.NotNull(error);
  }
}

A<ResolveTests>()
  .method((t) => t.resolve_SimpleDomain_CallsCallback)
  .add(FactAttribute);
A<ResolveTests>()
  .method((t) => t.resolve_WithARecordType_CallsCallback)
  .add(FactAttribute);
A<ResolveTests>()
  .method((t) => t.resolve_WithAAAARecordType_CallsCallback)
  .add(FactAttribute);
A<ResolveTests>()
  .method((t) => t.resolve_WithMXRecordType_CallsCallback)
  .add(FactAttribute);
A<ResolveTests>()
  .method((t) => t.resolve_WithTXTRecordType_CallsCallback)
  .add(FactAttribute);
A<ResolveTests>()
  .method((t) => t.resolve_WithInvalidRecordType_CallsCallback)
  .add(FactAttribute);
