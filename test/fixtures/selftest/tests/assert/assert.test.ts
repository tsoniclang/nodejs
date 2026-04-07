import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { AssertionError } from "@tsonic/nodejs/assert.js";
import * as assert from "@tsonic/nodejs/assert.js";

import { assertThrows } from "./helpers.ts";

export class AssertTests {
  public ok_with_true_should_not_throw(): void {
    assert.ok(true);
  }

  public ok_with_false_should_throw(): void {
    const error = assertThrows(() => assert.ok(false));
    Assert.True(error instanceof AssertionError);
  }

  public ok_with_false_should_throw_with_message(): void {
    const error = assertThrows(() => assert.ok(false, "Test message"));
    Assert.True(error instanceof AssertionError);
    if (!(error instanceof AssertionError)) {
      return;
    }
    Assert.Equal("Test message", error.message);
  }

  public fail_should_always_throw(): void {
    const error = assertThrows(() => assert.fail());
    Assert.True(error instanceof AssertionError);
  }

  public fail_with_message_should_throw_with_message(): void {
    const error = assertThrows(() => assert.fail("Custom failure"));
    Assert.True(error instanceof AssertionError);
    if (!(error instanceof AssertionError)) {
      return;
    }
    Assert.Equal("Custom failure", error.message);
  }

  public equal_with_equal_values_should_not_throw(): void {
    assert.equal(5, 5);
    assert.equal("hello", "hello");
  }

  public equal_with_different_values_should_throw(): void {
    const error = assertThrows(() => assert.equal(5, 6));
    Assert.True(error instanceof AssertionError);
  }

  public equal_with_numeric_coercion_should_not_throw(): void {
    assert.equal(5, 5.0);
  }

  public notEqual_with_different_values_should_not_throw(): void {
    assert.notEqual(5, 6);
    assert.notEqual("hello", "world");
  }

  public notEqual_with_equal_values_should_throw(): void {
    const error = assertThrows(() => assert.notEqual(5, 5));
    Assert.True(error instanceof AssertionError);
  }

  public strictEqual_with_equal_values_should_not_throw(): void {
    assert.strictEqual(5, 5);
    assert.strictEqual("hello", "hello");
  }

  public strictEqual_with_different_values_should_throw(): void {
    const error = assertThrows(() => assert.strictEqual(5, 6));
    Assert.True(error instanceof AssertionError);
  }

  public strictEqual_with_different_types_should_throw(): void {
    const error = assertThrows(() => assert.strictEqual(5, "5"));
    Assert.True(error instanceof AssertionError);
  }

  public notStrictEqual_with_different_values_should_not_throw(): void {
    assert.notStrictEqual(5, 6);
    assert.notStrictEqual(5, "5");
  }

  public notStrictEqual_with_equal_values_should_throw(): void {
    const error = assertThrows(() => assert.notStrictEqual(5, 5));
    Assert.True(error instanceof AssertionError);
  }

  public deepEqual_with_equal_objects_should_not_throw(): void {
    const first = { name: "Alice", age: 30 };
    const second = { name: "Alice", age: 30 };
    assert.deepEqual(first, second);
  }

  public deepEqual_with_different_objects_should_throw(): void {
    const first = { name: "Alice", age: 30 };
    const second = { name: "Bob", age: 25 };
    const error = assertThrows(() => assert.deepEqual(first, second));
    Assert.True(error instanceof AssertionError);
  }

  public deepEqual_with_nested_objects_should_work(): void {
    const first = { user: { name: "Alice" } };
    const second = { user: { name: "Alice" } };
    assert.deepEqual(first, second);
  }

  public deepEqual_with_equal_arrays_should_not_throw(): void {
    const first = [1, 2, 3];
    const second = [1, 2, 3];
    assert.deepEqual(first, second);
  }

  public deepEqual_with_different_arrays_should_throw(): void {
    const first = [1, 2, 3];
    const second = [1, 2, 4];
    const error = assertThrows(() => assert.deepEqual(first, second));
    Assert.True(error instanceof AssertionError);
  }

  public deepEqual_with_equal_uint8arrays_should_not_throw(): void {
    const first = new Uint8Array([1, 2, 3, 4]);
    const second = new Uint8Array([1, 2, 3, 4]);
    assert.deepEqual(first, second);
  }

  public deepEqual_with_different_uint8arrays_should_throw(): void {
    const first = new Uint8Array([1, 2, 3, 4]);
    const second = new Uint8Array([1, 2, 3, 5]);
    const error = assertThrows(() => assert.deepEqual(first, second));
    Assert.True(error instanceof AssertionError);
  }

  public notDeepEqual_with_different_objects_should_not_throw(): void {
    assert.notDeepEqual({ name: "Alice" }, { name: "Bob" });
  }

  public notDeepEqual_with_equal_objects_should_throw(): void {
    const error = assertThrows(() =>
      assert.notDeepEqual({ name: "Alice" }, { name: "Alice" }),
    );
    Assert.True(error instanceof AssertionError);
  }

  public deepStrictEqual_with_equal_objects_should_not_throw(): void {
    assert.deepStrictEqual(
      { name: "Alice", age: 30 },
      { name: "Alice", age: 30 },
    );
  }

  public deepStrictEqual_with_different_objects_should_throw(): void {
    const error = assertThrows(() =>
      assert.deepStrictEqual(
        { name: "Alice", age: 30 },
        { name: "Bob", age: 25 },
      ),
    );
    Assert.True(error instanceof AssertionError);
  }

  public notDeepStrictEqual_with_different_objects_should_not_throw(): void {
    assert.notDeepStrictEqual({ name: "Alice" }, { name: "Bob" });
  }

  public notDeepStrictEqual_with_equal_objects_should_throw(): void {
    const error = assertThrows(() =>
      assert.notDeepStrictEqual({ name: "Alice" }, { name: "Alice" }),
    );
    Assert.True(error instanceof AssertionError);
  }

  public throws_when_function_throws_should_not_throw(): void {
    assert.throws(() => {
      throw new Error("Test error");
    });
  }

  public throws_when_function_does_not_throw_should_throw(): void {
    const error = assertThrows(() => assert.throws(() => undefined));
    Assert.True(error instanceof AssertionError);
  }

  public throws_with_message_should_include_message(): void {
    const error = assertThrows(() =>
      assert.throws(() => undefined, "Should have thrown"),
    );
    Assert.True(error instanceof AssertionError);
    if (!(error instanceof AssertionError)) {
      return;
    }
    Assert.Equal("Should have thrown", error.message);
  }

  public doesNotThrow_when_function_does_not_throw_should_not_throw(): void {
    assert.doesNotThrow(() => undefined);
  }

  public doesNotThrow_when_function_throws_should_throw(): void {
    const error = assertThrows(() =>
      assert.doesNotThrow(() => {
        throw new Error("Error");
      }),
    );
    Assert.True(error instanceof AssertionError);
  }

  public match_with_matching_string_should_not_throw(): void {
    assert.match("hello world", /world/);
  }

  public match_with_non_matching_string_should_throw(): void {
    const error = assertThrows(() => assert.match("hello world", /goodbye/));
    Assert.True(error instanceof AssertionError);
  }

  public match_with_complex_pattern_should_work(): void {
    assert.match("test123", /\d+/);
  }

  public doesNotMatch_with_non_matching_string_should_not_throw(): void {
    assert.doesNotMatch("hello world", /goodbye/);
  }

  public doesNotMatch_with_matching_string_should_throw(): void {
    const error = assertThrows(() =>
      assert.doesNotMatch("hello world", /world/),
    );
    Assert.True(error instanceof AssertionError);
  }

  public ifError_with_null_should_not_throw(): void {
    assert.ifError(null);
  }

  public ifError_with_non_null_should_throw(): void {
    const error = assertThrows(() => assert.ifError("error"));
    Assert.True(error instanceof AssertionError);
  }

  public ifError_with_exception_should_throw_exception(): void {
    const exception = new Error("Test error");
    const thrown = assertThrows(() => assert.ifError(exception));
    Assert.True(thrown === exception);
  }

  public AssertionError_should_have_correct_properties(): void {
    const error = new AssertionError("Test message", 5, 10, "===");
    Assert.Equal("Test message", error.message);
    Assert.Equal(5, error.actual);
    Assert.Equal(10, error.expected);
    Assert.Equal("===", error.operator);
    Assert.False(error.generatedMessage);
    Assert.Equal("ERR_ASSERTION", error.code);
  }

  public AssertionError_without_message_should_generate_message(): void {
    const error = new AssertionError(undefined, 5, 10, "===");
    Assert.True(error.message.length > 0);
    Assert.True(error.generatedMessage);
  }
}

A<AssertTests>().method((t) => t.ok_with_true_should_not_throw).add(FactAttribute);
A<AssertTests>().method((t) => t.ok_with_false_should_throw).add(FactAttribute);
A<AssertTests>()
  .method((t) => t.ok_with_false_should_throw_with_message)
  .add(FactAttribute);
A<AssertTests>().method((t) => t.fail_should_always_throw).add(FactAttribute);
A<AssertTests>()
  .method((t) => t.fail_with_message_should_throw_with_message)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.equal_with_equal_values_should_not_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.equal_with_different_values_should_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.equal_with_numeric_coercion_should_not_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.notEqual_with_different_values_should_not_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.notEqual_with_equal_values_should_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.strictEqual_with_equal_values_should_not_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.strictEqual_with_different_values_should_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.strictEqual_with_different_types_should_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.notStrictEqual_with_different_values_should_not_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.notStrictEqual_with_equal_values_should_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.deepEqual_with_equal_objects_should_not_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.deepEqual_with_different_objects_should_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.deepEqual_with_nested_objects_should_work)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.deepEqual_with_equal_arrays_should_not_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.deepEqual_with_different_arrays_should_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.deepEqual_with_equal_uint8arrays_should_not_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.deepEqual_with_different_uint8arrays_should_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.notDeepEqual_with_different_objects_should_not_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.notDeepEqual_with_equal_objects_should_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.deepStrictEqual_with_equal_objects_should_not_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.deepStrictEqual_with_different_objects_should_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.notDeepStrictEqual_with_different_objects_should_not_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.notDeepStrictEqual_with_equal_objects_should_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.throws_when_function_throws_should_not_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.throws_when_function_does_not_throw_should_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.throws_with_message_should_include_message)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.doesNotThrow_when_function_does_not_throw_should_not_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.doesNotThrow_when_function_throws_should_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.match_with_matching_string_should_not_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.match_with_non_matching_string_should_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.match_with_complex_pattern_should_work)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.doesNotMatch_with_non_matching_string_should_not_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.doesNotMatch_with_matching_string_should_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.ifError_with_null_should_not_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.ifError_with_non_null_should_throw)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.ifError_with_exception_should_throw_exception)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.AssertionError_should_have_correct_properties)
  .add(FactAttribute);
A<AssertTests>()
  .method((t) => t.AssertionError_without_message_should_generate_message)
  .add(FactAttribute);
