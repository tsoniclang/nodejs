import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class LookupServiceTests {
  public lookupService_ValidIPAndPort_CallsCallback(): void {
    let called = false;
    let error: Error | null = null;
    let service = "";
    dns.lookupService("127.0.0.1", 22, (err, host, svc) => {
      called = true;
      error = err;
      service = svc;
    });
    Assert.True(called);
    Assert.Null(error);
    Assert.Equal("ssh", service);
  }

  public lookupService_InvalidIP_CallsCallback(): void {
    let called = false;
    let error: Error | null = null;
    dns.lookupService("invalid-ip", 22, (err, host, svc) => {
      called = true;
      error = err;
    });
    Assert.True(called);
    Assert.NotNull(error);
  }

  public lookupService_InvalidPort_CallsCallback(): void {
    let called = false;
    let error: Error | null = null;
    dns.lookupService("127.0.0.1", 99999, (err, host, svc) => {
      called = true;
      error = err;
    });
    Assert.True(called);
    Assert.NotNull(error);
  }
}

A<LookupServiceTests>()
  .method((t) => t.lookupService_ValidIPAndPort_CallsCallback)
  .add(FactAttribute);
A<LookupServiceTests>()
  .method((t) => t.lookupService_InvalidIP_CallsCallback)
  .add(FactAttribute);
A<LookupServiceTests>()
  .method((t) => t.lookupService_InvalidPort_CallsCallback)
  .add(FactAttribute);
