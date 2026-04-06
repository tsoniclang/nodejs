import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Environment } from "@tsonic/dotnet/System.js";

import { process } from "@tsonic/nodejs/process.js";

import { isWindows } from "./helpers.ts";

export class ProcessEnvTests {
  public env_returns_a_valid_object(): void {
    Assert.True(process.env !== undefined);
  }

  public env_contains_system_environment_variables(): void {
    Assert.True(
      process.env.containsKey("PATH") || process.env.containsKey("Path")
    );
  }

  public env_allows_setting_values(): void {
    const key = "TSONIC_TEST_VAR";
    const original = process.env.get(key);

    try {
      process.env.set(key, "test-value");

      Assert.Equal("test-value", process.env.get(key));
      Assert.Equal("test-value", Environment.GetEnvironmentVariable(key));
    } finally {
      if (original === undefined) {
        process.env.remove(key);
      } else {
        process.env.set(key, original);
      }
    }
  }

  public env_allows_removing_values(): void {
    const key = "TSONIC_TEST_VAR_REMOVE";
    const original = process.env.get(key);

    try {
      process.env.set(key, "value");
      Assert.True(process.env.containsKey(key));

      Assert.True(process.env.remove(key));
      Assert.False(process.env.containsKey(key));
      Assert.True(process.env.get(key) === undefined);
      Assert.True(Environment.GetEnvironmentVariable(key) === undefined);
    } finally {
      if (original === undefined) {
        process.env.remove(key);
      } else {
        process.env.set(key, original);
      }
    }
  }

  public env_windows_lookup_is_case_insensitive(): void {
    if (!isWindows()) {
      return;
    }

    const key = "TSONIC_CASE_TEST";
    const original = process.env.get(key);

    try {
      process.env.set(key, "value");
      Assert.Equal("value", process.env.get("TSONIC_CASE_TEST"));
      Assert.Equal("value", process.env.get("tsonic_case_test"));
      Assert.Equal("value", process.env.get("Tsonic_Case_Test"));
    } finally {
      if (original === undefined) {
        process.env.remove(key);
      } else {
        process.env.set(key, original);
      }
    }
  }

  public env_unix_lookup_is_case_sensitive(): void {
    if (isWindows()) {
      return;
    }

    const upperKey = "TSONIC_CASE_TEST";
    const lowerKey = "tsonic_case_test";
    const originalUpper = process.env.get(upperKey);
    const originalLower = process.env.get(lowerKey);

    try {
      process.env.set(upperKey, "value1");
      process.env.set(lowerKey, "value2");

      Assert.Equal("value1", process.env.get(upperKey));
      Assert.Equal("value2", process.env.get(lowerKey));
    } finally {
      if (originalUpper === undefined) {
        process.env.remove(upperKey);
      } else {
        process.env.set(upperKey, originalUpper);
      }

      if (originalLower === undefined) {
        process.env.remove(lowerKey);
      } else {
        process.env.set(lowerKey, originalLower);
      }
    }
  }

  public env_setting_undefined_removes_the_key(): void {
    const key = "TSONIC_NULL_TEST";
    const original = process.env.get(key);

    try {
      process.env.set(key, "value");
      Assert.True(process.env.containsKey(key));

      process.env.set(key, undefined);
      Assert.False(process.env.containsKey(key));
      Assert.True(process.env.get(key) === undefined);
    } finally {
      if (original === undefined) {
        process.env.remove(key);
      } else {
        process.env.set(key, original);
      }
    }
  }
}

A<ProcessEnvTests>()
  .method((t) => t.env_returns_a_valid_object)
  .add(FactAttribute);
A<ProcessEnvTests>()
  .method((t) => t.env_contains_system_environment_variables)
  .add(FactAttribute);
A<ProcessEnvTests>()
  .method((t) => t.env_allows_setting_values)
  .add(FactAttribute);
A<ProcessEnvTests>()
  .method((t) => t.env_allows_removing_values)
  .add(FactAttribute);
A<ProcessEnvTests>()
  .method((t) => t.env_windows_lookup_is_case_insensitive)
  .add(FactAttribute);
A<ProcessEnvTests>()
  .method((t) => t.env_unix_lookup_is_case_sensitive)
  .add(FactAttribute);
A<ProcessEnvTests>()
  .method((t) => t.env_setting_undefined_removes_the_key)
  .add(FactAttribute);
