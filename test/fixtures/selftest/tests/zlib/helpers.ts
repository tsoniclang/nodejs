import { Assert } from "xunit-types/Xunit.js";
import { Buffer } from "@tsonic/nodejs/buffer.js";

export const utf8Bytes = (str: string): Uint8Array =>
  Buffer.from(str, "utf8").buffer;

export const utf8String = (bytes: Uint8Array): string =>
  Buffer.fromUint8Array(bytes).toString("utf8");

export const assertThrows = (action: () => void): void => {
  let threw = false;
  try {
    action();
  } catch {
    threw = true;
  }

  Assert.True(threw);
};
