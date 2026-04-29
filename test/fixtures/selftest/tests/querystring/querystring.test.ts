import { Assert } from "xunit-types/Xunit.js";

import * as querystring from "@tsonic/nodejs/querystring.js";
import type {
  QueryStringInput,
  QueryStringOutput,
  QueryStringValue,
} from "@tsonic/nodejs/querystring.js";

const makeInput = (): QueryStringInput =>
  new Map<string, QueryStringValue>();

const countKeys = (value: QueryStringOutput): number => {
  let count = 0;
  for (const _key of value.keys()) {
    count += 1;
  }
  return count;
};

export class QueryStringTests {
  stringify_ShouldSerializeSimpleObject(): void {
    const obj = makeInput();
    obj.set("foo", "bar");
    obj.set("baz", "qux");

    const result = querystring.stringify(obj);

    Assert.Contains("foo=bar", result);
    Assert.Contains("baz=qux", result);
    Assert.Contains("&", result);
  }

  stringify_ShouldHandleArrayValues(): void {
    const obj = makeInput();
    obj.set("foo", "bar");
    obj.set("baz", ["qux", "quux"]);

    const result = querystring.stringify(obj);

    Assert.Contains("foo=bar", result);
    Assert.Contains("baz=qux", result);
    Assert.Contains("baz=quux", result);
  }

  stringify_ShouldHandleEmptyObject(): void {
    const result = querystring.stringify(makeInput());

    Assert.Equal("", result);
  }

  stringify_ShouldHandleNullObject(): void {
    const result = querystring.stringify(null);

    Assert.Equal("", result);
  }

  stringify_ShouldUseCustomSeparators(): void {
    const obj = makeInput();
    obj.set("foo", "bar");
    obj.set("baz", "qux");

    const result = querystring.stringify(obj, ";", ":");

    Assert.Contains("foo:bar", result);
    Assert.Contains("baz:qux", result);
    Assert.Contains(";", result);
  }

  stringify_ShouldEscapeSpecialCharacters(): void {
    const obj = makeInput();
    obj.set("key with spaces", "value with spaces");
    obj.set("special", "hello&world");

    const result = querystring.stringify(obj);

    Assert.DoesNotContain(" ", result);
    Assert.Contains("key%20with%20spaces", result);
  }

  parse_ShouldParseSimpleQueryString(): void {
    const result = querystring.parse("foo=bar&baz=qux");

    Assert.Equal("bar", result.get("foo") as string);
    Assert.Equal("qux", result.get("baz") as string);
  }

  parse_ShouldHandleMultipleValuesForSameKey(): void {
    const result = querystring.parse("foo=bar&foo=baz");

    const values = result.get("foo") as string[];
    Assert.Equal(2, values.length);
    Assert.True(values.includes("bar"));
    Assert.True(values.includes("baz"));
  }

  parse_ShouldHandleEmptyString(): void {
    const result = querystring.parse("");

    Assert.Equal(0, countKeys(result));
  }

  parse_ShouldHandleLeadingQuestionMark(): void {
    const result = querystring.parse("?foo=bar&baz=qux");

    Assert.Equal("bar", result.get("foo") as string);
    Assert.Equal("qux", result.get("baz") as string);
  }

  parse_ShouldHandleCustomSeparators(): void {
    const result = querystring.parse("foo:bar;baz:qux", ";", ":");

    Assert.Equal("bar", result.get("foo") as string);
    Assert.Equal("qux", result.get("baz") as string);
  }

  parse_ShouldUnescapeSpecialCharacters(): void {
    const result = querystring.parse(
      "key%20with%20spaces=value%20with%20spaces"
    );

    Assert.Equal("value with spaces", result.get("key with spaces") as string);
  }

  parse_ShouldRespectMaxKeys(): void {
    const result = querystring.parse("a=1&b=2&c=3&d=4", undefined, undefined, 2);

    Assert.Equal(2, countKeys(result));
  }

  parse_ShouldHandleMaxKeysZero(): void {
    const result = querystring.parse("a=1&b=2&c=3&d=4", undefined, undefined, 0);

    Assert.Equal(4, countKeys(result));
  }

  parse_ShouldHandleKeyWithoutValue(): void {
    const result = querystring.parse("foo=bar&baz&qux=quux");

    Assert.Equal("bar", result.get("foo") as string);
    Assert.Equal("", result.get("baz") as string);
    Assert.Equal("quux", result.get("qux") as string);
  }

  encode_ShouldBeAliasForStringify(): void {
    const obj = makeInput();
    obj.set("foo", "bar");

    const stringifyResult = querystring.stringify(obj);
    const encodeResult = querystring.encode(obj);

    Assert.Equal(stringifyResult, encodeResult);
  }

  decode_ShouldBeAliasForParse(): void {
    const str = "foo=bar&baz=qux";

    const parseResult = querystring.parse(str);
    const decodeResult = querystring.decode(str);

    Assert.Equal(countKeys(parseResult), countKeys(decodeResult));
    Assert.Equal(parseResult.get("foo") as string, decodeResult.get("foo") as string);
  }

  escape_ShouldPercentEncodeString(): void {
    const result = querystring.escape("hello world");

    Assert.Equal("hello%20world", result);
  }

  escape_ShouldHandleSpecialCharacters(): void {
    const result = querystring.escape("hello&world=test");

    Assert.DoesNotContain("&", result);
    Assert.DoesNotContain("=", result);
    Assert.Contains("%26", result);
    Assert.Contains("%3D", result);
  }

  unescape_ShouldDecodePercentEncodedString(): void {
    const result = querystring.unescape("hello%20world");

    Assert.Equal("hello world", result);
  }

  unescape_ShouldHandleMalformedString(): void {
    const result = querystring.unescape("hello%world");

    Assert.NotNull(result);
  }

  roundTrip_ShouldPreserveData(): void {
    const original = makeInput();
    original.set("name", "John Doe");
    original.set("email", "john@example.com");
    original.set("tags", ["developer", "designer"]);

    const encoded = querystring.stringify(original);
    const decoded = querystring.parse(encoded);

    Assert.Equal("John Doe", decoded.get("name") as string);
    Assert.Equal("john@example.com", decoded.get("email") as string);
    const tags = decoded.get("tags") as string[];
    Assert.Equal(2, tags.length);
  }
}
