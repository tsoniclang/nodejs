import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as os from "@tsonic/nodejs/os.js";

export class OsTests {
  platform_should_return_valid_platform(): void {
    const value = os.platform();
    Assert.NotNull(value);
    Assert.False(value.length === 0);
    const valid = ["win32", "linux", "darwin", "freebsd"];
    Assert.True(valid.includes(value));
  }

  arch_should_return_valid_architecture(): void {
    const value = os.arch();
    Assert.NotNull(value);
    Assert.False(value.length === 0);
    const valid = ["x64", "ia32", "arm", "arm64", "wasm", "s390x"];
    Assert.True(valid.includes(value));
  }

  hostname_should_return_non_empty_string(): void {
    const value = os.hostname();
    Assert.NotNull(value);
    Assert.False(value.length === 0);
  }

  tmpdir_should_return_non_empty_string(): void {
    const value = os.tmpdir();
    Assert.NotNull(value);
    Assert.False(value.length === 0);
  }

  homedir_should_return_non_empty_string(): void {
    const value = os.homedir();
    Assert.NotNull(value);
    Assert.False(value.length === 0);
  }

  eol_should_be_correct_for_platform(): void {
    const value = os.EOL;
    Assert.NotNull(value);
    // On POSIX it is "\n", on Windows "\r\n"
    Assert.True(value === "\n" || value === "\r\n");
  }

  dev_null_should_be_correct_for_platform(): void {
    const value = os.devNull;
    Assert.NotNull(value);
    Assert.True(value === "/dev/null" || value === "\\\\.\\nul");
  }

  type_should_return_valid_type(): void {
    const value = os.type();
    Assert.NotNull(value);
    Assert.False(value.length === 0);
    const valid = ["Windows_NT", "Linux", "Darwin", "FreeBSD"];
    Assert.True(valid.includes(value));
  }

  release_should_return_non_empty_string(): void {
    const value = os.release();
    Assert.NotNull(value);
    Assert.False(value.length === 0);
  }

  endianness_should_return_be_or_le(): void {
    const value = os.endianness();
    Assert.True(value === "BE" || value === "LE");
  }

  totalmem_should_return_positive_value(): void {
    const value = os.totalmem();
    Assert.True(value > 0);
  }

  freemem_should_return_positive_value(): void {
    const value = os.freemem();
    Assert.True(value > 0);
  }

  uptime_should_return_non_negative_value(): void {
    const value = os.uptime();
    Assert.True(value >= 0);
  }

  loadavg_should_return_array_of_three(): void {
    const value = os.loadavg();
    Assert.NotNull(value);
    Assert.Equal(3, value.length);
  }

  cpus_should_return_non_empty_array(): void {
    const value = os.cpus();
    Assert.NotNull(value);
    Assert.True(value.length > 0);
    for (const cpu of value) {
      Assert.NotNull(cpu);
      Assert.NotNull(cpu.model);
      Assert.NotNull(cpu.times);
    }
  }

  available_parallelism_should_return_positive_value(): void {
    const value = os.availableParallelism();
    Assert.True(value > 0);
  }

  user_info_should_return_valid_info(): void {
    const value = os.userInfo();
    Assert.NotNull(value);
    Assert.NotNull(value.username);
    Assert.False(value.username.length === 0);
    Assert.NotNull(value.homedir);
    Assert.False(value.homedir.length === 0);
  }
}

A<OsTests>()
  .method((t) => t.platform_should_return_valid_platform)
  .add(FactAttribute);
A<OsTests>()
  .method((t) => t.arch_should_return_valid_architecture)
  .add(FactAttribute);
A<OsTests>()
  .method((t) => t.hostname_should_return_non_empty_string)
  .add(FactAttribute);
A<OsTests>()
  .method((t) => t.tmpdir_should_return_non_empty_string)
  .add(FactAttribute);
A<OsTests>()
  .method((t) => t.homedir_should_return_non_empty_string)
  .add(FactAttribute);
A<OsTests>()
  .method((t) => t.eol_should_be_correct_for_platform)
  .add(FactAttribute);
A<OsTests>()
  .method((t) => t.dev_null_should_be_correct_for_platform)
  .add(FactAttribute);
A<OsTests>()
  .method((t) => t.type_should_return_valid_type)
  .add(FactAttribute);
A<OsTests>()
  .method((t) => t.release_should_return_non_empty_string)
  .add(FactAttribute);
A<OsTests>()
  .method((t) => t.endianness_should_return_be_or_le)
  .add(FactAttribute);
A<OsTests>()
  .method((t) => t.totalmem_should_return_positive_value)
  .add(FactAttribute);
A<OsTests>()
  .method((t) => t.freemem_should_return_positive_value)
  .add(FactAttribute);
A<OsTests>()
  .method((t) => t.uptime_should_return_non_negative_value)
  .add(FactAttribute);
A<OsTests>()
  .method((t) => t.loadavg_should_return_array_of_three)
  .add(FactAttribute);
A<OsTests>()
  .method((t) => t.cpus_should_return_non_empty_array)
  .add(FactAttribute);
A<OsTests>()
  .method((t) => t.available_parallelism_should_return_positive_value)
  .add(FactAttribute);
A<OsTests>()
  .method((t) => t.user_info_should_return_valid_info)
  .add(FactAttribute);
