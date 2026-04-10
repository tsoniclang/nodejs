import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { Resolver, ResolverOptions } from "@tsonic/nodejs/dns.js";

export class ResolverTests {
  public Resolver_Constructor_CreatesInstance(): void {
    const resolver = new Resolver();
    Assert.NotNull(resolver);
  }

  public Resolver_ConstructorWithOptions_CreatesInstance(): void {
    const options = new ResolverOptions();
    options.timeout = 5000;
    options.tries = 3;
    const resolver = new Resolver(options);
    Assert.NotNull(resolver);
  }

  public Resolver_Cancel_DoesNotThrow(): void {
    const resolver = new Resolver();
    resolver.cancel();
    // If we got here, no exception was thrown
    Assert.True(true);
  }

  public Resolver_Cancel_SubsequentCallsReturnCancelledError(): void {
    const resolver = new Resolver();
    resolver.cancel();

    let error: Error | null = null;
    resolver.resolve4("localhost", (err, addrs) => {
      error = err;
    });

    Assert.NotNull(error);
    Assert.True(error!.message.includes("ECANCELLED"));
  }

  public Resolver_Resolve4_CallsCallback(): void {
    const resolver = new Resolver();
    let called = false;
    resolver.resolve4("localhost", (err, addrs) => {
      called = true;
    });
    Assert.True(called);
  }

  public Resolver_Resolve6_CallsCallback(): void {
    const resolver = new Resolver();
    let called = false;
    resolver.resolve6("localhost", (err, addrs) => {
      called = true;
    });
    Assert.True(called);
  }

  public Resolver_ResolveMx_CallsCallback(): void {
    const resolver = new Resolver();
    let called = false;
    resolver.resolveMx("localhost", (err, recs) => {
      called = true;
    });
    Assert.True(called);
  }

  public Resolver_ResolveSoa_CallsCallbackWithRecord(): void {
    const resolver = new Resolver();
    let called = false;
    let error: Error | null = null;
    let nsname = "";
    resolver.resolveSoa("localhost", (err, rec) => {
      called = true;
      error = err;
      nsname = rec.nsname;
    });
    Assert.True(called);
    Assert.Null(error);
    Assert.Equal("localhost", nsname);
  }

  public Resolver_Reverse_CallsCallback(): void {
    const resolver = new Resolver();
    let called = false;
    resolver.reverse("127.0.0.1", (err, hosts) => {
      called = true;
    });
    Assert.True(called);
  }

  public Resolver_SetLocalAddress_DoesNotThrow(): void {
    const resolver = new Resolver();
    resolver.setLocalAddress("0.0.0.0", "::0");
    // If we got here, no exception was thrown
    Assert.True(true);
  }

  public Resolver_GetServers_ReturnsArray(): void {
    const resolver = new Resolver();
    const servers = resolver.getServers();
    Assert.NotNull(servers);
  }

  public Resolver_SetServers_DoesNotThrow(): void {
    const resolver = new Resolver();
    resolver.setServers(["8.8.8.8"]);
    // If we got here, no exception was thrown
    Assert.True(true);
  }
}

A<ResolverTests>()
  .method((t) => t.Resolver_Constructor_CreatesInstance)
  .add(FactAttribute);
A<ResolverTests>()
  .method((t) => t.Resolver_ConstructorWithOptions_CreatesInstance)
  .add(FactAttribute);
A<ResolverTests>()
  .method((t) => t.Resolver_Cancel_DoesNotThrow)
  .add(FactAttribute);
A<ResolverTests>()
  .method((t) => t.Resolver_Cancel_SubsequentCallsReturnCancelledError)
  .add(FactAttribute);
A<ResolverTests>()
  .method((t) => t.Resolver_Resolve4_CallsCallback)
  .add(FactAttribute);
A<ResolverTests>()
  .method((t) => t.Resolver_Resolve6_CallsCallback)
  .add(FactAttribute);
A<ResolverTests>()
  .method((t) => t.Resolver_ResolveMx_CallsCallback)
  .add(FactAttribute);
A<ResolverTests>()
  .method((t) => t.Resolver_ResolveSoa_CallsCallbackWithRecord)
  .add(FactAttribute);
A<ResolverTests>()
  .method((t) => t.Resolver_Reverse_CallsCallback)
  .add(FactAttribute);
A<ResolverTests>()
  .method((t) => t.Resolver_SetLocalAddress_DoesNotThrow)
  .add(FactAttribute);
A<ResolverTests>()
  .method((t) => t.Resolver_GetServers_ReturnsArray)
  .add(FactAttribute);
A<ResolverTests>()
  .method((t) => t.Resolver_SetServers_DoesNotThrow)
  .add(FactAttribute);
