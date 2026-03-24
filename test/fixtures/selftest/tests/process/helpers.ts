import { Directory, File, Path } from "@tsonic/dotnet/System.IO.js";
import {
  OSPlatform,
  RuntimeInformation,
} from "@tsonic/dotnet/System.Runtime.InteropServices.js";
import { Guid } from "@tsonic/dotnet/System.js";
import { Assert } from "xunit-types/Xunit.js";

export const isWindows = (): boolean =>
  RuntimeInformation.IsOSPlatform(OSPlatform.Windows);

export const createTempDir = (): string => {
  const root = Path.Combine(Path.GetTempPath(), "nodejs-next-process-tests");
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

export const assertThrows = (action: () => void): void => {
  let threw = false;
  try {
    action();
  } catch {
    threw = true;
  }

  Assert.True(threw);
};

export const assertFileExists = (value: string): void => {
  Assert.True(File.Exists(value));
};
