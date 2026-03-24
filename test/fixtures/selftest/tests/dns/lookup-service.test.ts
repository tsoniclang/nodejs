import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class LookupServiceTests {
  public lookupService_ValidIPAndPort_CallsCallback(): void {
    let called = false;
    dns.lookupService("127.0.0.1", 22, (err, host, svc) => {
      called = true;
    });
    // TODO: callback is synchronous in stub; real implementation will be async
    Assert.True(called);
  }

  public lookupService_InvalidIP_CallsCallback(): void {
    let called = false;
    dns.lookupService("invalid-ip", 22, (err, host, svc) => {
      called = true;
    });
    Assert.True(called);
  }

  public lookupService_InvalidPort_CallsCallback(): void {
    let called = false;
    dns.lookupService("127.0.0.1", 99999, (err, host, svc) => {
      called = true;
    });
    Assert.True(called);
  }
}

A.on(LookupServiceTests)
  .method((t) => t.lookupService_ValidIPAndPort_CallsCallback)
  .add(FactAttribute);
A.on(LookupServiceTests)
  .method((t) => t.lookupService_InvalidIP_CallsCallback)
  .add(FactAttribute);
A.on(LookupServiceTests)
  .method((t) => t.lookupService_InvalidPort_CallsCallback)
  .add(FactAttribute);
