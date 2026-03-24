import { Assert } from "xunit-types/Xunit.js";

import { URL, URLSearchParams } from "@tsonic/nodejs/url.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/url/url.tests.cs
 */
export class URLTests {
  public URL_Constructor_ShouldParseSimpleURL(): void {
    const parsed = new URL("https://example.com/path");
    Assert.Equal("https://example.com/path", parsed.href);
  }

  public URL_Constructor_WithBase_ShouldResolveRelativeURL(): void {
    const parsed = new URL("/path", "https://example.com");
    Assert.Equal("https://example.com/path", parsed.href);
  }

  public URL_protocol_ShouldReturnProtocolWithColon(): void {
    const parsed = new URL("https://example.com");
    Assert.Equal("https:", parsed.protocol);
  }

  public URL_protocol_Setter_ShouldChangeProtocol(): void {
    const parsed = new URL("https://example.com");
    parsed.protocol = "http:";
    Assert.StartsWith("http://example.com", parsed.href);
  }

  public URL_hostname_ShouldReturnHostname(): void {
    const parsed = new URL("https://example.com:8080");
    Assert.Equal("example.com", parsed.hostname);
  }

  public URL_hostname_Setter_ShouldChangeHostname(): void {
    const parsed = new URL("https://example.com");
    parsed.hostname = "test.com";
    Assert.Equal("test.com", parsed.hostname);
  }

  public URL_port_ShouldReturnPort(): void {
    const parsed = new URL("https://example.com:8080");
    Assert.Equal("8080", parsed.port);
  }

  public URL_port_WithDefaultPort_ShouldReturnEmpty(): void {
    const parsed = new URL("https://example.com:443");
    Assert.Equal("", parsed.port);
  }

  public URL_port_Setter_ShouldChangePort(): void {
    const parsed = new URL("https://example.com");
    parsed.port = "8080";
    Assert.Contains(":8080", parsed.href);
  }

  public URL_host_ShouldReturnHostnameAndPort(): void {
    const parsed = new URL("https://example.com:8080");
    Assert.Equal("example.com:8080", parsed.host);
  }

  public URL_host_WithDefaultPort_ShouldReturnHostnameOnly(): void {
    const parsed = new URL("https://example.com:443");
    Assert.Equal("example.com", parsed.host);
  }

  public URL_pathname_ShouldReturnPath(): void {
    const parsed = new URL("https://example.com/path/to/resource");
    Assert.Equal("/path/to/resource", parsed.pathname);
  }

  public URL_pathname_Setter_ShouldChangePath(): void {
    const parsed = new URL("https://example.com/old");
    parsed.pathname = "/new/path";
    Assert.Equal("/new/path", parsed.pathname);
  }

  public URL_search_ShouldReturnQueryString(): void {
    const parsed = new URL("https://example.com?foo=bar&baz=qux");
    Assert.Equal("?foo=bar&baz=qux", parsed.search);
  }

  public URL_search_Setter_ShouldChangeQueryString(): void {
    const parsed = new URL("https://example.com");
    parsed.search = "?key=value";
    Assert.Equal("?key=value", parsed.search);
  }

  public URL_hash_ShouldReturnFragment(): void {
    const parsed = new URL("https://example.com#section");
    Assert.Equal("#section", parsed.hash);
  }

  public URL_hash_Setter_ShouldChangeFragment(): void {
    const parsed = new URL("https://example.com");
    parsed.hash = "#new-section";
    Assert.Equal("#new-section", parsed.hash);
  }

  public URL_username_ShouldReturnUsername(): void {
    const parsed = new URL("https://user:pass@example.com");
    Assert.Equal("user", parsed.username);
  }

  public URL_password_ShouldReturnPassword(): void {
    const parsed = new URL("https://user:pass@example.com");
    Assert.Equal("pass", parsed.password);
  }

  public URL_origin_ShouldReturnOrigin(): void {
    const parsed = new URL("https://example.com:8080/path");
    Assert.Equal("https://example.com:8080", parsed.origin);
  }

  public URL_searchParams_ShouldReturnURLSearchParams(): void {
    const parsed = new URL("https://example.com?foo=bar");
    Assert.NotNull(parsed.searchParams);
    Assert.Equal("bar", parsed.searchParams.get("foo") as string);
  }

  public URL_toString_ShouldReturnSerializedURL(): void {
    const parsed = new URL("https://example.com/path");
    Assert.Equal(parsed.href, parsed.toString());
  }

  public URL_toJSON_ShouldReturnSerializedURL(): void {
    const parsed = new URL("https://example.com/path");
    Assert.Equal(parsed.href, parsed.toJSON());
  }

  public URL_canParse_WithValidURL_ShouldReturnTrue(): void {
    Assert.True(URL.canParse("https://example.com"));
  }

  public URL_canParse_WithInvalidURL_ShouldReturnFalse(): void {
    Assert.False(URL.canParse("not a url"));
  }

  public URL_canParse_WithRelativeURLAndBase_ShouldReturnTrue(): void {
    Assert.True(URL.canParse("/path", "https://example.com"));
  }

  public URL_parse_WithValidURL_ShouldReturnURL(): void {
    const parsed = URL.parse("https://example.com");
    Assert.NotNull(parsed);
    Assert.Equal("https://example.com/", parsed!.href);
  }

  public URL_parse_WithInvalidURL_ShouldReturnNull(): void {
    const parsed = URL.parse("not a url");
    Assert.Null(parsed);
  }
}

export class URLSearchParamsTests {
  public URLSearchParams_Constructor_Empty_ShouldCreateEmpty(): void {
    const params = new URLSearchParams();
    Assert.Equal(0, params.size);
  }

  public URLSearchParams_Constructor_WithString_ShouldParse(): void {
    const params = new URLSearchParams("foo=bar&baz=qux");
    Assert.Equal(2, params.size);
    Assert.Equal("bar", params.get("foo") as string);
    Assert.Equal("qux", params.get("baz") as string);
  }

  public URLSearchParams_Constructor_WithQueryString_ShouldParseWithoutQuestionMark(): void {
    const params = new URLSearchParams("?foo=bar");
    Assert.Equal("bar", params.get("foo") as string);
  }

  public URLSearchParams_append_ShouldAddParameter(): void {
    const params = new URLSearchParams();
    params.append("key", "value");
    Assert.Equal("value", params.get("key") as string);
  }

  public URLSearchParams_append_AllowsDuplicates(): void {
    const params = new URLSearchParams();
    params.append("key", "value1");
    params.append("key", "value2");
    const values = params.getAll("key");
    Assert.Equal(2, values.length);
    Assert.Equal("value1", values[0] as string);
    Assert.Equal("value2", values[1] as string);
  }

  public URLSearchParams_set_ShouldReplaceExistingValues(): void {
    const params = new URLSearchParams("key=old");
    params.set("key", "new");
    Assert.Equal("new", params.get("key") as string);
    Assert.Equal(1, params.getAll("key").length);
  }

  public URLSearchParams_get_WithNonExistentKey_ShouldReturnNull(): void {
    const params = new URLSearchParams();
    Assert.Null(params.get("nonexistent"));
  }

  public URLSearchParams_getAll_ShouldReturnAllValues(): void {
    const params = new URLSearchParams("key=1&key=2&key=3");
    const values = params.getAll("key");
    Assert.Equal(3, values.length);
  }

  public URLSearchParams_getAll_WithNonExistentKey_ShouldReturnEmptyArray(): void {
    const params = new URLSearchParams();
    Assert.Equal(0, params.getAll("nonexistent").length);
  }

  public URLSearchParams_has_WithExistingKey_ShouldReturnTrue(): void {
    const params = new URLSearchParams("key=value");
    Assert.True(params.has("key"));
  }

  public URLSearchParams_has_WithNonExistentKey_ShouldReturnFalse(): void {
    const params = new URLSearchParams();
    Assert.False(params.has("key"));
  }

  public URLSearchParams_has_WithValue_ShouldCheckBothKeyAndValue(): void {
    const params = new URLSearchParams("key=value1&key=value2");
    Assert.True(params.has("key", "value1"));
    Assert.False(params.has("key", "value3"));
  }

  public URLSearchParams_delete_ShouldRemoveParameter(): void {
    const params = new URLSearchParams("key=value");
    params.delete("key");
    Assert.False(params.has("key"));
  }

  public URLSearchParams_delete_WithValue_ShouldRemoveSpecificPair(): void {
    const params = new URLSearchParams("key=value1&key=value2");
    params.delete("key", "value1");
    Assert.Equal(1, params.getAll("key").length);
    Assert.Equal("value2", params.get("key") as string);
  }

  public URLSearchParams_sort_ShouldSortByKeys(): void {
    const params = new URLSearchParams("c=3&a=1&b=2");
    params.sort();
    Assert.Equal("a=1&b=2&c=3", params.toString());
  }

  public URLSearchParams_keys_ShouldReturnAllKeys(): void {
    const params = new URLSearchParams("a=1&b=2&c=3");
    const keys = params.keys();
    Assert.Equal(3, keys.length);
  }

  public URLSearchParams_values_ShouldReturnAllValues(): void {
    const params = new URLSearchParams("a=1&b=2&c=3");
    const values = params.values();
    Assert.Equal(3, values.length);
  }

  public URLSearchParams_forEach_ShouldIterateOverAllPairs(): void {
    const params = new URLSearchParams("a=1&b=2");
    let count = 0;
    params.forEach(() => {
      count += 1;
    });
    Assert.Equal(2, count);
  }

  public URLSearchParams_toString_ShouldReturnQueryString(): void {
    const params = new URLSearchParams("a=1&b=2");
    Assert.Equal("a=1&b=2", params.toString());
  }

  public URLSearchParams_toString_WithEmptyParams_ShouldReturnEmptyString(): void {
    const params = new URLSearchParams();
    Assert.Equal("", params.toString());
  }

  public URLSearchParams_size_ShouldReturnCorrectCount(): void {
    const params = new URLSearchParams("a=1&b=2&c=3");
    Assert.Equal(3, params.size);
  }

  public URLSearchParams_size_AfterModifications_ShouldUpdate(): void {
    const params = new URLSearchParams();
    Assert.Equal(0, params.size);

    params.append("a", "1");
    Assert.Equal(1, params.size);

    params.append("b", "2");
    Assert.Equal(2, params.size);

    params.delete("a");
    Assert.Equal(1, params.size);
  }
}
