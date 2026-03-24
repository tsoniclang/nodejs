const formatAssertionValue = (value: unknown): string => {
  if (value === null) {
    return "null";
  }
  if (value === undefined) {
    return "undefined";
  }
  if (typeof value === "string") {
    return `"${value}"`;
  }
  return String(value);
};

const generateMessage = (
  actual: unknown,
  expected: unknown,
  operator: string
): string => {
  switch (operator) {
    case "==":
      return `Expected ${formatAssertionValue(actual)} == ${formatAssertionValue(expected)}`;
    case "!=":
      return `Expected ${formatAssertionValue(actual)} != ${formatAssertionValue(expected)}`;
    case "===":
      return `Expected ${formatAssertionValue(actual)} === ${formatAssertionValue(expected)}`;
    case "!==":
      return `Expected ${formatAssertionValue(actual)} !== ${formatAssertionValue(expected)}`;
    case "deepEqual":
      return `Expected values to be deeply equal:\n${formatAssertionValue(actual)}\nvs\n${formatAssertionValue(expected)}`;
    case "notDeepEqual":
      return "Expected values not to be deeply equal";
    case "throws":
      return "Missing expected exception";
    case "doesNotThrow":
      return "Got unwanted exception";
    default:
      return `Assertion failed: ${formatAssertionValue(actual)}`;
  }
};

export class AssertionError extends Error {
  public actual: unknown = undefined;
  public expected: unknown = undefined;
  public operator: string = "";
  public generatedMessage: boolean = false;

  public get code(): string {
    return "ERR_ASSERTION";
  }

  public constructor(
    message?: string,
    actual?: unknown,
    expected?: unknown,
    operator: string = ""
  ) {
    super(message ?? generateMessage(actual, expected, operator));
    this.actual = actual as unknown;
    this.expected = expected as unknown;
    this.operator = operator;
    this.generatedMessage = message === undefined;
  }
}
