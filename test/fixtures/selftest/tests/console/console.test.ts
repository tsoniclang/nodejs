import { attributes as A } from "@tsonic/core/lang.js";
import { int } from "@tsonic/core/types.js";
import { Thread } from "@tsonic/dotnet/System.Threading.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { console } from "@tsonic/nodejs/console.js";

class ComplexConsoleNested {
  value: number = 42;
  array: number[] = [1, 2, 3];
}

class ComplexConsoleObject {
  name: string = "test";
  nested: ComplexConsoleNested = new ComplexConsoleNested();
  nullValue: string | undefined = undefined;
}

class SimpleConsoleObject {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

export class ConsoleTests {
  log_should_not_throw(): void {
    console.log("test message");
    console.log("test with %s", "format");
    console.log(undefined);
  }

  error_should_not_throw(): void {
    console.error("error message");
    console.error("error with %s", "format");
    console.error(undefined);
  }

  warn_should_not_throw(): void {
    console.warn("warning message");
    console.warn("warning with %s", "format");
  }

  info_should_not_throw(): void {
    console.info("info message");
    console.info("info with %s", "format");
  }

  debug_should_not_throw(): void {
    console.debug("debug message");
    console.debug("debug with %s", "format");
  }

  assert_should_not_throw_when_true(): void {
    console.assert(true, "This should not print");
    console.assert(1 === 1, "This should not print either");
  }

  assert_should_output_when_false(): void {
    const brokenMath = false;
    console.assert(false, "This assertion failed");
    console.assert(brokenMath, "Math is broken");
  }

  clear_should_not_throw(): void {
    console.clear();
  }

  count_should_track_counts(): void {
    console.countReset("testCounter");
    console.count("testCounter");
    console.count("testCounter");
    console.count("testCounter");
  }

  count_should_use_default_label(): void {
    console.countReset();
    console.count();
    console.count();
  }

  countReset_should_reset_counter(): void {
    console.count("resetTest");
    console.count("resetTest");
    console.countReset("resetTest");
    console.count("resetTest");
  }

  dir_should_not_throw(): void {
    console.dir(new SimpleConsoleObject("test", 42));
    console.dir("simple string");
    console.dir(undefined);
  }

  dirxml_should_not_throw(): void {
    console.dirxml(new SimpleConsoleObject("test", 0));
    console.dirxml("test", 123, new SimpleConsoleObject("empty", 0));
  }

  group_should_not_throw(): void {
    console.group("Test Group");
    console.log("Inside group");
    console.groupEnd();
  }

  group_without_label(): void {
    console.group();
    console.log("Inside anonymous group");
    console.groupEnd();
  }

  groupCollapsed_should_not_throw(): void {
    console.groupCollapsed("Collapsed Group");
    console.log("Inside collapsed group");
    console.groupEnd();
  }

  nestedGroups_should_work(): void {
    console.group("Outer");
    console.log("Outer message");
    console.group("Inner");
    console.log("Inner message");
    console.groupEnd();
    console.log("Back to outer");
    console.groupEnd();
  }

  groupEnd_without_group_should_not_throw(): void {
    console.groupEnd();
    console.groupEnd();
    console.groupEnd();
  }

  table_should_not_throw(): void {
    console.table([
      new SimpleConsoleObject("Alice", 30),
      new SimpleConsoleObject("Bob", 25),
    ]);
    console.table(undefined);
    console.table("simple string");
  }

  time_should_measure_elapsed_time(): void {
    console.time("testTimer");
    Thread.Sleep(10 as int);
    console.timeEnd("testTimer");
  }

  time_with_default_label(): void {
    console.time();
    Thread.Sleep(5 as int);
    console.timeEnd();
  }

  timeLog_should_log_intermediate_time(): void {
    console.time("logTimer");
    Thread.Sleep(5 as int);
    console.timeLog("logTimer", "checkpoint 1");
    Thread.Sleep(5 as int);
    console.timeLog("logTimer", "checkpoint 2");
    console.timeEnd("logTimer");
  }

  timeLog_with_data(): void {
    console.time("dataTimer");
    console.timeLog("dataTimer", "value", 42, "more data");
    console.timeEnd("dataTimer");
  }

  timeEnd_without_matching_time_should_not_throw(): void {
    console.timeEnd("nonExistentTimer");
  }

  trace_should_not_throw(): void {
    console.trace("Trace message");
    console.trace("Trace with %s", "formatting");
    console.trace();
  }

  profile_should_not_throw(): void {
    console.profile("testProfile");
    console.profileEnd("testProfile");
  }

  profileEnd_without_profile_should_not_throw(): void {
    console.profileEnd("nonExistent");
  }

  timeStamp_should_not_throw(): void {
    console.timeStamp("testStamp");
    console.timeStamp();
  }

  formatting_string_substitution(): void {
    console.log("Hello %s", "World");
    console.log("Multiple %s %s", "substitutions", "here");
  }

  formatting_number_substitution(): void {
    console.log("Number: %d", 42);
    console.log("Integer: %i", 123);
    console.log("Float: %f", 3.14);
  }

  formatting_object_substitution(): void {
    console.log("Object: %o", new SimpleConsoleObject("test", 42));
    console.log("Object: %O", new SimpleConsoleObject("test", 0));
  }

  formatting_escaped_percent(): void {
    console.log("Percentage: 50%%");
  }

  formatting_extra_parameters(): void {
    console.log("One %s", "param", "extra", "params");
  }

  formatting_no_parameters(): void {
    console.log("No substitution needed");
  }

  multipleConsecutiveCalls_should_work(): void {
    for (let index = 0 as int; index < (10 as int); index += 1 as int) {
      console.log("Message %d", index);
    }
  }

  mixedLoggingMethods_should_work(): void {
    console.log("Log message");
    console.error("Error message");
    console.warn("Warning message");
    console.info("Info message");
    console.debug("Debug message");
  }

  complexObjects_should_not_throw(): void {
    const complexObj = new ComplexConsoleObject();

    console.log("Complex object: %o", complexObj);
    console.dir(complexObj);
  }

  counterScenario_should_track_multiple_counters(): void {
    console.countReset("api");
    console.countReset("db");
    console.countReset("cache");
    console.count("api");
    console.count("db");
    console.count("api");
    console.count("cache");
    console.count("api");
  }

  timerScenario_should_handle_multiple_timers(): void {
    console.time("timer1");
    console.time("timer2");
    Thread.Sleep(10 as int);
    console.timeEnd("timer1");
    Thread.Sleep(10 as int);
    console.timeEnd("timer2");
  }
}

A<ConsoleTests>().method((t) => t.log_should_not_throw).add(FactAttribute);
A<ConsoleTests>().method((t) => t.error_should_not_throw).add(FactAttribute);
A<ConsoleTests>().method((t) => t.warn_should_not_throw).add(FactAttribute);
A<ConsoleTests>().method((t) => t.info_should_not_throw).add(FactAttribute);
A<ConsoleTests>().method((t) => t.debug_should_not_throw).add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.assert_should_not_throw_when_true)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.assert_should_output_when_false)
  .add(FactAttribute);
A<ConsoleTests>().method((t) => t.clear_should_not_throw).add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.count_should_track_counts)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.count_should_use_default_label)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.countReset_should_reset_counter)
  .add(FactAttribute);
A<ConsoleTests>().method((t) => t.dir_should_not_throw).add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.dirxml_should_not_throw)
  .add(FactAttribute);
A<ConsoleTests>().method((t) => t.group_should_not_throw).add(FactAttribute);
A<ConsoleTests>().method((t) => t.group_without_label).add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.groupCollapsed_should_not_throw)
  .add(FactAttribute);
A<ConsoleTests>().method((t) => t.nestedGroups_should_work).add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.groupEnd_without_group_should_not_throw)
  .add(FactAttribute);
A<ConsoleTests>().method((t) => t.table_should_not_throw).add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.time_should_measure_elapsed_time)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.time_with_default_label)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.timeLog_should_log_intermediate_time)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.timeLog_with_data)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.timeEnd_without_matching_time_should_not_throw)
  .add(FactAttribute);
A<ConsoleTests>().method((t) => t.trace_should_not_throw).add(FactAttribute);
A<ConsoleTests>().method((t) => t.profile_should_not_throw).add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.profileEnd_without_profile_should_not_throw)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.timeStamp_should_not_throw)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.formatting_string_substitution)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.formatting_number_substitution)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.formatting_object_substitution)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.formatting_escaped_percent)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.formatting_extra_parameters)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.formatting_no_parameters)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.multipleConsecutiveCalls_should_work)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.mixedLoggingMethods_should_work)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.complexObjects_should_not_throw)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.counterScenario_should_track_multiple_counters)
  .add(FactAttribute);
A<ConsoleTests>()
  .method((t) => t.timerScenario_should_handle_multiple_timers)
  .add(FactAttribute);
