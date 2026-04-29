import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";
import { LookupOptions } from "@tsonic/nodejs/dns.js";

export class LookupTests {
  lookup_SimpleDomain_CallsCallback(): void {
    let called = false;
    let error: Error | null = null;
    let address = "";
    let family = 0;
    dns.lookup("localhost", null, (err, addr, fam) => {
      called = true;
      error = err;
      address = addr;
      family = fam;
    });
    Assert.True(called);
    Assert.Null(error);
    Assert.True(address.length > 0);
    Assert.True(family === 4 || family === 6);
  }

  lookup_WithIPv4Family_CallsCallback(): void {
    let called = false;
    let error: Error | null = null;
    let address = "";
    let family = 0;
    dns.lookup("localhost", 4, (err, addr, fam) => {
      called = true;
      error = err;
      address = addr;
      family = fam;
    });
    Assert.True(called);
    Assert.Null(error);
    Assert.Equal(4, family);
    Assert.True(address.includes("."));
  }

  lookup_WithIPv6Family_CallsCallback(): void {
    let called = false;
    dns.lookup("localhost", 6, (err, addr, fam) => {
      called = true;
    });
    Assert.True(called);
  }

  lookup_WithOptionsAll_CallsCallback(): void {
    let called = false;
    let count = 0;
    const opts = new LookupOptions();
    opts.all = true;
    dns.lookupAll("localhost", opts, (err, addrs) => {
      called = true;
      count = addrs.length;
    });
    Assert.True(called);
    Assert.True(count > 0);
  }

  lookup_WithIPv4FirstOrder_CallsCallback(): void {
    let called = false;
    const opts = new LookupOptions();
    opts.all = true;
    opts.order = "ipv4first";
    dns.lookupAll("localhost", opts, (err, addrs) => {
      called = true;
    });
    Assert.True(called);
  }

  lookup_InvalidHostname_CallsCallback(): void {
    let called = false;
    let error: Error | null = null;
    dns.lookup("this-hostname-definitely-does-not-exist-12345.invalid", null, (err, addr, fam) => {
      called = true;
      error = err;
    });
    Assert.True(called);
    Assert.NotNull(error);
  }

  lookup_WithOptionsFamily_CallsCallback(): void {
    let called = false;
    dns.lookup("localhost", 4, (err, addr, fam) => {
      called = true;
    });
    Assert.True(called);
  }

  lookup_WithOptionsFamilyIPv4_CallsCallback(): void {
    let called = false;
    let family = 0;
    const opts = new LookupOptions();
    opts.family = 4;
    dns.lookup("localhost", opts, (err, addr, fam) => {
      called = true;
      family = fam;
    });
    Assert.True(called);
    Assert.Equal(4, family);
  }

  lookup_WithOptionsFamilyIPv6_CallsCallback(): void {
    let called = false;
    const opts = new LookupOptions();
    opts.family = 6;
    dns.lookup("localhost", opts, (err, addr, fam) => {
      called = true;
    });
    Assert.True(called);
  }
}

A<LookupTests>()
  .method((t) => t.lookup_SimpleDomain_CallsCallback)
  .add(FactAttribute);
A<LookupTests>()
  .method((t) => t.lookup_WithIPv4Family_CallsCallback)
  .add(FactAttribute);
A<LookupTests>()
  .method((t) => t.lookup_WithIPv6Family_CallsCallback)
  .add(FactAttribute);
A<LookupTests>()
  .method((t) => t.lookup_WithOptionsAll_CallsCallback)
  .add(FactAttribute);
A<LookupTests>()
  .method((t) => t.lookup_WithIPv4FirstOrder_CallsCallback)
  .add(FactAttribute);
A<LookupTests>()
  .method((t) => t.lookup_InvalidHostname_CallsCallback)
  .add(FactAttribute);
A<LookupTests>()
  .method((t) => t.lookup_WithOptionsFamily_CallsCallback)
  .add(FactAttribute);
A<LookupTests>()
  .method((t) => t.lookup_WithOptionsFamilyIPv4_CallsCallback)
  .add(FactAttribute);
A<LookupTests>()
  .method((t) => t.lookup_WithOptionsFamilyIPv6_CallsCallback)
  .add(FactAttribute);
