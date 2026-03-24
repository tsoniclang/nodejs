import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { AssertionError } from "@tsonic/nodejs/assert.js";
import * as assert from "@tsonic/nodejs/assert.js";

import { assertThrows, assertThrowsAsync } from "./helpers.ts";

export class AssertAsyncTests {
  public strict_should_alias_strictEqual(): void {
    assert.strict(42, 42);
    const error = assertThrows(() => assert.strict(42, "42"));
    Assert.True(error instanceof AssertionError);
  }

  public async rejects_should_pass_when_promise_rejects(): Promise<void> {
    const operation = (): Promise<unknown> => Promise.reject(new Error("boom"));
    await assert.rejects(operation);
  }

  public async rejects_should_throw_when_promise_resolves(): Promise<void> {
    const operation = (): Promise<unknown> => Promise.resolve<unknown>(null);
    const error = await assertThrowsAsync(() => assert.rejects(operation));
    Assert.True(error instanceof AssertionError);
  }

  public async doesNotReject_should_pass_when_promise_resolves(): Promise<void> {
    const operation = (): Promise<unknown> => Promise.resolve<unknown>(null);
    await assert.doesNotReject(operation);
  }

  public async doesNotReject_should_throw_when_promise_rejects(): Promise<void> {
    const operation = (): Promise<unknown> => Promise.reject(new Error("nope"));
    const error = await assertThrowsAsync(() => assert.doesNotReject(operation));
    Assert.True(error instanceof AssertionError);
  }
}

A.on(AssertAsyncTests)
  .method((t) => t.strict_should_alias_strictEqual)
  .add(FactAttribute);
A.on(AssertAsyncTests)
  .method((t) => t.rejects_should_pass_when_promise_rejects)
  .add(FactAttribute);
A.on(AssertAsyncTests)
  .method((t) => t.rejects_should_throw_when_promise_resolves)
  .add(FactAttribute);
A.on(AssertAsyncTests)
  .method((t) => t.doesNotReject_should_pass_when_promise_resolves)
  .add(FactAttribute);
A.on(AssertAsyncTests)
  .method((t) => t.doesNotReject_should_throw_when_promise_rejects)
  .add(FactAttribute);
