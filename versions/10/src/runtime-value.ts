export interface RuntimeObject {
  [key: string]: RuntimeValue;
}

export type RuntimeArray = RuntimeValue[];

export type RuntimeValue =
  | string
  | number
  | boolean
  | RuntimeArray
  | RuntimeObject
  | null
  | undefined;
