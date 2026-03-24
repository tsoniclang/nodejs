import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveTests {
  public resolve_SimpleDomain_CallsCallback(): void {
    let called = false;
    dns.resolve("localhost", (err, addrs) => {
      called = true;
    });
    Assert.True(called);
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
    dns.resolveWithRrtype("localhost", "INVALID", (err, res) => {
      called = true;
    });
    Assert.True(called);
  }
}

A.on(ResolveTests)
  .method((t) => t.resolve_SimpleDomain_CallsCallback)
  .add(FactAttribute);
A.on(ResolveTests)
  .method((t) => t.resolve_WithARecordType_CallsCallback)
  .add(FactAttribute);
A.on(ResolveTests)
  .method((t) => t.resolve_WithAAAARecordType_CallsCallback)
  .add(FactAttribute);
A.on(ResolveTests)
  .method((t) => t.resolve_WithMXRecordType_CallsCallback)
  .add(FactAttribute);
A.on(ResolveTests)
  .method((t) => t.resolve_WithTXTRecordType_CallsCallback)
  .add(FactAttribute);
A.on(ResolveTests)
  .method((t) => t.resolve_WithInvalidRecordType_CallsCallback)
  .add(FactAttribute);
