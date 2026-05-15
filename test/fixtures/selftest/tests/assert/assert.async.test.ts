import { attributes as A } from "@tsonic/core/lang.js";
import type { RuntimeValue } from "@tsonic/nodejs/index.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { AssertionError } from "@tsonic/nodejs/assert.js";
import * as assert from "@tsonic/nodejs/assert.js";

import { assertThrows, assertThrowsAsync } from "./helpers.ts";

export class AssertAsyncTests {
  strict_should_alias_strictEqual(): void {
    assert.strict(42, 42);
    const error = assertThrows(() => assert.strict(42, "42"));
    Assert.True(error instanceof AssertionError);
  }

  async rejects_should_pass_when_promise_rejects(): Promise<void> {
    const operation = (): Promise<RuntimeValue> => Promise.reject(new Error("boom"));
    await assert.rejects(operation);
  }

  async rejects_should_throw_when_promise_resolves(): Promise<void> {
    const operation = (): Promise<RuntimeValue> => Promise.resolve<RuntimeValue>(null);
    const error = await assertThrowsAsync(() => assert.rejects(operation));
    Assert.True(error instanceof AssertionError);
  }

  async doesNotReject_should_pass_when_promise_resolves(): Promise<void> {
    const operation = (): Promise<RuntimeValue> => Promise.resolve<RuntimeValue>(null);
    await assert.doesNotReject(operation);
  }

  async doesNotReject_should_throw_when_promise_rejects(): Promise<void> {
    const operation = (): Promise<RuntimeValue> => Promise.reject(new Error("nope"));
    const error = await assertThrowsAsync(() => assert.doesNotReject(operation));
    Assert.True(error instanceof AssertionError);
  }
}

A<AssertAsyncTests>()
  .method((t) => t.strict_should_alias_strictEqual)
  .add(FactAttribute);
A<AssertAsyncTests>()
  .method((t) => t.rejects_should_pass_when_promise_rejects)
  .add(FactAttribute);
A<AssertAsyncTests>()
  .method((t) => t.rejects_should_throw_when_promise_resolves)
  .add(FactAttribute);
A<AssertAsyncTests>()
  .method((t) => t.doesNotReject_should_pass_when_promise_resolves)
  .add(FactAttribute);
A<AssertAsyncTests>()
  .method((t) => t.doesNotReject_should_throw_when_promise_rejects)
  .add(FactAttribute);
