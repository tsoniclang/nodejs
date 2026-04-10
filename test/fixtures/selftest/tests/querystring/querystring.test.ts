import type { JsValue } from "@tsonic/core/types.js";
import { Assert } from "xunit-types/Xunit.js";

import * as querystring from "@tsonic/nodejs/querystring.js";

export class QueryStringTests {
  public stringify_ShouldSerializeSimpleObject(): void {
    const obj: Record<string, JsValue> = {
      foo: "bar",
      baz: "qux",
    };

    const result = querystring.stringify(obj);

    Assert.Contains("foo=bar", result);
    Assert.Contains("baz=qux", result);
    Assert.Contains("&", result);
  }

  public stringify_ShouldHandleArrayValues(): void {
    const obj: Record<string, JsValue> = {
      foo: "bar",
      baz: ["qux", "quux"],
    };

    const result = querystring.stringify(obj);

    Assert.Contains("foo=bar", result);
    Assert.Contains("baz=qux", result);
    Assert.Contains("baz=quux", result);
  }

  public stringify_ShouldHandleEmptyObject(): void {
    const obj: Record<string, JsValue> = {};

    const result = querystring.stringify(obj);

    Assert.Equal("", result);
  }

  public stringify_ShouldHandleNullObject(): void {
    const result = querystring.stringify(null);

    Assert.Equal("", result);
  }

  public stringify_ShouldUseCustomSeparators(): void {
    const obj: Record<string, JsValue> = {
      foo: "bar",
      baz: "qux",
    };

    const result = querystring.stringify(obj, ";", ":");

    Assert.Contains("foo:bar", result);
    Assert.Contains("baz:qux", result);
    Assert.Contains(";", result);
  }

  public stringify_ShouldEscapeSpecialCharacters(): void {
    const obj: Record<string, JsValue> = {
      "key with spaces": "value with spaces",
      special: "hello&world",
    };

    const result = querystring.stringify(obj);

    Assert.DoesNotContain(" ", result);
    Assert.Contains("key%20with%20spaces", result);
  }

  public parse_ShouldParseSimpleQueryString(): void {
    const result = querystring.parse("foo=bar&baz=qux");

    Assert.Equal("bar", result["foo"] as string);
    Assert.Equal("qux", result["baz"] as string);
  }

  public parse_ShouldHandleMultipleValuesForSameKey(): void {
    const result = querystring.parse("foo=bar&foo=baz");

    const values = result["foo"] as string[];
    Assert.Equal(2, values.length);
    Assert.True(values.includes("bar"));
    Assert.True(values.includes("baz"));
  }

  public parse_ShouldHandleEmptyString(): void {
    const result = querystring.parse("");

    Assert.Equal(0, Object.keys(result).length);
  }

  public parse_ShouldHandleLeadingQuestionMark(): void {
    const result = querystring.parse("?foo=bar&baz=qux");

    Assert.Equal("bar", result["foo"] as string);
    Assert.Equal("qux", result["baz"] as string);
  }

  public parse_ShouldHandleCustomSeparators(): void {
    const result = querystring.parse("foo:bar;baz:qux", ";", ":");

    Assert.Equal("bar", result["foo"] as string);
    Assert.Equal("qux", result["baz"] as string);
  }

  public parse_ShouldUnescapeSpecialCharacters(): void {
    const result = querystring.parse(
      "key%20with%20spaces=value%20with%20spaces"
    );

    Assert.Equal("value with spaces", result["key with spaces"] as string);
  }

  public parse_ShouldRespectMaxKeys(): void {
    const result = querystring.parse("a=1&b=2&c=3&d=4", undefined, undefined, 2);

    Assert.Equal(2, Object.keys(result).length);
  }

  public parse_ShouldHandleMaxKeysZero(): void {
    const result = querystring.parse("a=1&b=2&c=3&d=4", undefined, undefined, 0);

    Assert.Equal(4, Object.keys(result).length);
  }

  public parse_ShouldHandleKeyWithoutValue(): void {
    const result = querystring.parse("foo=bar&baz&qux=quux");

    Assert.Equal("bar", result["foo"] as string);
    Assert.Equal("", result["baz"] as string);
    Assert.Equal("quux", result["qux"] as string);
  }

  public encode_ShouldBeAliasForStringify(): void {
    const obj: Record<string, JsValue> = { foo: "bar" };

    const stringifyResult = querystring.stringify(obj);
    const encodeResult = querystring.encode(obj);

    Assert.Equal(stringifyResult, encodeResult);
  }

  public decode_ShouldBeAliasForParse(): void {
    const str = "foo=bar&baz=qux";

    const parseResult = querystring.parse(str);
    const decodeResult = querystring.decode(str);

    Assert.Equal(
      Object.keys(parseResult).length,
      Object.keys(decodeResult).length
    );
    Assert.Equal(parseResult["foo"] as string, decodeResult["foo"] as string);
  }

  public escape_ShouldPercentEncodeString(): void {
    const result = querystring.escape("hello world");

    Assert.Equal("hello%20world", result);
  }

  public escape_ShouldHandleSpecialCharacters(): void {
    const result = querystring.escape("hello&world=test");

    Assert.DoesNotContain("&", result);
    Assert.DoesNotContain("=", result);
    Assert.Contains("%26", result);
    Assert.Contains("%3D", result);
  }

  public unescape_ShouldDecodePercentEncodedString(): void {
    const result = querystring.unescape("hello%20world");

    Assert.Equal("hello world", result);
  }

  public unescape_ShouldHandleMalformedString(): void {
    const result = querystring.unescape("hello%world");

    Assert.NotNull(result);
  }

  public roundTrip_ShouldPreserveData(): void {
    const original: Record<string, JsValue> = {
      name: "John Doe",
      email: "john@example.com",
      tags: ["developer", "designer"],
    };

    const encoded = querystring.stringify(original);
    const decoded = querystring.parse(encoded);

    Assert.Equal("John Doe", decoded["name"] as string);
    Assert.Equal("john@example.com", decoded["email"] as string);
    const tags = decoded["tags"] as string[];
    Assert.Equal(2, tags.length);
  }
}
