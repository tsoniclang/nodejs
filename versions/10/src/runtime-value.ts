export interface RuntimeObject {
  readonly __runtimeObjectBrand?: undefined;
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
