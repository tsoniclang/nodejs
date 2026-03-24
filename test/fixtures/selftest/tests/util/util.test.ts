import { attributes as A } from "@tsonic/core/lang.js";
import { Environment } from "@tsonic/dotnet/System.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as util from "@tsonic/nodejs/util.js";

export class UtilTests {
  public format_should_return_empty_string_for_null(): void {
    Assert.Equal("", util.format(null));
  }

  public format_should_return_string_as_is(): void {
    Assert.Equal("Hello World", util.format("Hello World"));
  }

  public format_should_format_string_placeholder(): void {
    Assert.Equal("Hello World", util.format("Hello %s", "World"));
  }

  public format_should_format_number_placeholder(): void {
    Assert.Equal("Count: 42", util.format("Count: %d", 42));
  }

  public format_should_format_multiple_placeholders(): void {
    Assert.Equal("%s is %d years old".replace("%s", "Alice").replace("%d", "30"), util.format("%s is %d years old", "Alice", 30));
  }

  public format_should_handle_literal_percent(): void {
    Assert.Equal("100% complete", util.format("100%% complete"));
  }

  public format_should_append_extra_arguments(): void {
    Assert.Equal("Hello World !", util.format("Hello", "World", "!"));
  }

  public format_should_format_json_placeholder(): void {
    const result = util.format("Data: %j", { name: "Alice", age: 30 });
    Assert.True(result.includes("Alice"));
    Assert.True(result.includes("30"));
  }

  public inspect_should_return_null_for_null(): void {
    Assert.Equal("null", util.inspect(null));
  }

  public inspect_should_format_string(): void {
    Assert.Equal("'Hello'", util.inspect("Hello"));
  }

  public inspect_should_format_boolean(): void {
    Assert.Equal("true", util.inspect(true));
    Assert.Equal("false", util.inspect(false));
  }

  public inspect_should_format_number(): void {
    Assert.Equal("42", util.inspect(42));
  }

  public inspect_should_format_object(): void {
    const result = util.inspect({ name: "Alice", age: 30 });
    Assert.True(result.includes("Alice"));
    Assert.True(result.includes("30"));
  }

  public isArray_should_return_true_for_array(): void {
    Assert.True(util.isArray([1, 2, 3]));
  }

  public isArray_should_return_false_for_non_array(): void {
    Assert.False(util.isArray("string"));
    Assert.False(util.isArray(42));
    Assert.False(util.isArray({}));
  }

  public isArray_should_return_false_for_null(): void {
    Assert.False(util.isArray(null));
  }

  public isDeepStrictEqual_should_return_true_for_nulls(): void {
    Assert.True(util.isDeepStrictEqual(null, null));
  }

  public isDeepStrictEqual_should_return_false_for_null_and_non_null(): void {
    Assert.False(util.isDeepStrictEqual(null, 42));
    Assert.False(util.isDeepStrictEqual(42, null));
  }

  public isDeepStrictEqual_should_return_true_for_same_reference(): void {
    const value = { name: "Alice" };
    Assert.True(util.isDeepStrictEqual(value, value));
  }

  public isDeepStrictEqual_should_return_true_for_equal_primitives(): void {
    Assert.True(util.isDeepStrictEqual(42, 42));
    Assert.True(util.isDeepStrictEqual("hello", "hello"));
    Assert.True(util.isDeepStrictEqual(true, true));
  }

  public isDeepStrictEqual_should_return_false_for_different_primitives(): void {
    Assert.False(util.isDeepStrictEqual(42, 43));
    Assert.False(util.isDeepStrictEqual("hello", "world"));
    Assert.False(util.isDeepStrictEqual(true, false));
  }

  public isDeepStrictEqual_should_return_false_for_different_types(): void {
    Assert.False(util.isDeepStrictEqual(42, "42"));
  }

  public inherits_should_not_throw(): void {
    util.inherits(null, null);
    util.inherits({}, {});
  }

  public debuglog_should_return_function(): void {
    const debug = util.debuglog("test");
    Assert.True(debug !== undefined);
    debug("test message");
    debug("test message with args: {0}", 42);
  }

  public debuglog_should_be_no_op_when_not_enabled(): void {
    const original = Environment.GetEnvironmentVariable("NODE_DEBUG");
    Environment.SetEnvironmentVariable("NODE_DEBUG", "");
    const debug = util.debuglog("test");
    debug("This should not appear");
    Environment.SetEnvironmentVariable("NODE_DEBUG", original ?? "");
  }

  public deprecate_should_wrap_function(): void {
    let called = false;
    const fn = (..._args: unknown[]): unknown => {
      called = true;
      return 42;
    };

    const deprecated = util.deprecate(fn, "This is deprecated");
    const result = deprecated();
    Assert.True(called);
    Assert.Equal(42, result);
  }

  public deprecate_should_wrap_action(): void {
    let called = false;
    const action = (..._args: unknown[]): unknown => {
      called = true;
      return undefined;
    };

    const deprecated = util.deprecate(action, "This is deprecated");
    deprecated();
    Assert.True(called);
  }
}

A.on(UtilTests)
  .method((t) => t.format_should_return_empty_string_for_null)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.format_should_return_string_as_is)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.format_should_format_string_placeholder)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.format_should_format_number_placeholder)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.format_should_format_multiple_placeholders)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.format_should_handle_literal_percent)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.format_should_append_extra_arguments)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.format_should_format_json_placeholder)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.inspect_should_return_null_for_null)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.inspect_should_format_string)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.inspect_should_format_boolean)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.inspect_should_format_number)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.inspect_should_format_object)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.isArray_should_return_true_for_array)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.isArray_should_return_false_for_non_array)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.isArray_should_return_false_for_null)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.isDeepStrictEqual_should_return_true_for_nulls)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.isDeepStrictEqual_should_return_false_for_null_and_non_null)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.isDeepStrictEqual_should_return_true_for_same_reference)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.isDeepStrictEqual_should_return_true_for_equal_primitives)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.isDeepStrictEqual_should_return_false_for_different_primitives)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.isDeepStrictEqual_should_return_false_for_different_types)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.inherits_should_not_throw)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.debuglog_should_return_function)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.debuglog_should_be_no_op_when_not_enabled)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.deprecate_should_wrap_function)
  .add(FactAttribute);
A.on(UtilTests)
  .method((t) => t.deprecate_should_wrap_action)
  .add(FactAttribute);
