import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";
import { LookupOptions } from "@tsonic/nodejs/dns.js";

export class LookupTests {
  public lookup_SimpleDomain_CallsCallback(): void {
    let called = false;
    dns.lookup("localhost", null, (err, addr, fam) => {
      called = true;
    });
    // TODO: callback is synchronous in stub; real implementation will be async
    Assert.True(called);
  }

  public lookup_WithIPv4Family_CallsCallback(): void {
    let called = false;
    dns.lookup("localhost", 4, (err, addr, fam) => {
      called = true;
    });
    Assert.True(called);
  }

  public lookup_WithIPv6Family_CallsCallback(): void {
    let called = false;
    dns.lookup("localhost", 6, (err, addr, fam) => {
      called = true;
    });
    Assert.True(called);
  }

  public lookup_WithOptionsAll_CallsCallback(): void {
    let called = false;
    const opts = new LookupOptions();
    opts.all = true;
    dns.lookupAll("localhost", opts, (err, addrs) => {
      called = true;
    });
    Assert.True(called);
  }

  public lookup_WithIPv4FirstOrder_CallsCallback(): void {
    let called = false;
    const opts = new LookupOptions();
    opts.all = true;
    opts.order = "ipv4first";
    dns.lookupAll("localhost", opts, (err, addrs) => {
      called = true;
    });
    Assert.True(called);
  }

  public lookup_InvalidHostname_CallsCallback(): void {
    let called = false;
    dns.lookup("this-hostname-definitely-does-not-exist-12345.invalid", null, (err, addr, fam) => {
      called = true;
    });
    Assert.True(called);
  }

  public lookup_WithOptionsFamily_CallsCallback(): void {
    let called = false;
    dns.lookup("localhost", 4, (err, addr, fam) => {
      called = true;
    });
    Assert.True(called);
  }

  public lookup_WithStringFamilyIPv4_CallsCallback(): void {
    let called = false;
    const opts = new LookupOptions();
    opts.family = "IPv4";
    dns.lookup("localhost", opts, (err, addr, fam) => {
      called = true;
    });
    Assert.True(called);
  }

  public lookup_WithStringFamilyIPv6_CallsCallback(): void {
    let called = false;
    const opts = new LookupOptions();
    opts.family = "IPv6";
    dns.lookup("localhost", opts, (err, addr, fam) => {
      called = true;
    });
    Assert.True(called);
  }
}

A.on(LookupTests)
  .method((t) => t.lookup_SimpleDomain_CallsCallback)
  .add(FactAttribute);
A.on(LookupTests)
  .method((t) => t.lookup_WithIPv4Family_CallsCallback)
  .add(FactAttribute);
A.on(LookupTests)
  .method((t) => t.lookup_WithIPv6Family_CallsCallback)
  .add(FactAttribute);
A.on(LookupTests)
  .method((t) => t.lookup_WithOptionsAll_CallsCallback)
  .add(FactAttribute);
A.on(LookupTests)
  .method((t) => t.lookup_WithIPv4FirstOrder_CallsCallback)
  .add(FactAttribute);
A.on(LookupTests)
  .method((t) => t.lookup_InvalidHostname_CallsCallback)
  .add(FactAttribute);
A.on(LookupTests)
  .method((t) => t.lookup_WithOptionsFamily_CallsCallback)
  .add(FactAttribute);
A.on(LookupTests)
  .method((t) => t.lookup_WithStringFamilyIPv4_CallsCallback)
  .add(FactAttribute);
A.on(LookupTests)
  .method((t) => t.lookup_WithStringFamilyIPv6_CallsCallback)
  .add(FactAttribute);
