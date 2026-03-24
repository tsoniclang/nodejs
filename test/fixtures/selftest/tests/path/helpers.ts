import { Directory, Path } from "@tsonic/dotnet/System.IO.js";
import {
  OSPlatform,
  RuntimeInformation,
} from "@tsonic/dotnet/System.Runtime.InteropServices.js";
import { Guid } from "@tsonic/dotnet/System.js";
import { Assert } from "xunit-types/Xunit.js";

export const isWindows = (): boolean =>
  RuntimeInformation.IsOSPlatform(OSPlatform.Windows);

export const isPosix = (): boolean => !isWindows();

export const assertContains = (needle: string, haystack: string): void => {
  Assert.True(haystack.includes(needle));
};

export const assertDoesNotContain = (
  needle: string,
  haystack: string,
): void => {
  Assert.True(!haystack.includes(needle));
};

export const assertOneOf = (actual: string, expected: string[]): void => {
  Assert.True(expected.includes(actual));
};

export const createTempDir = (): string => {
  const root = Path.Combine(Path.GetTempPath(), "nodejs-next-tests");
  Directory.CreateDirectory(root);
  const dir = Path.Combine(root, Guid.NewGuid().ToString("n"));
  Directory.CreateDirectory(dir);
  return dir;
};

export const deleteIfExists = (value: string): void => {
  if (Directory.Exists(value)) {
    Directory.Delete(value, true);
  }
};
