import { attributes as A } from "@tsonic/core/lang.js";
import { int } from "@tsonic/core/types.js";
import { Thread } from "@tsonic/dotnet/System.Threading.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { console } from "@tsonic/nodejs/console.js";

export class ConsoleTests {
  public log_should_not_throw(): void {
    console.log("test message");
    console.log("test with %s", "format");
    console.log(undefined);
  }

  public error_should_not_throw(): void {
    console.error("error message");
    console.error("error with %s", "format");
    console.error(undefined);
  }

  public warn_should_not_throw(): void {
    console.warn("warning message");
    console.warn("warning with %s", "format");
  }

  public info_should_not_throw(): void {
    console.info("info message");
    console.info("info with %s", "format");
  }

  public debug_should_not_throw(): void {
    console.debug("debug message");
    console.debug("debug with %s", "format");
  }

  public assert_should_not_throw_when_true(): void {
    console.assert(true, "This should not print");
    console.assert(1 === 1, "This should not print either");
  }

  public assert_should_output_when_false(): void {
    const brokenMath = false;
    console.assert(false, "This assertion failed");
    console.assert(brokenMath, "Math is broken");
  }

  public clear_should_not_throw(): void {
    console.clear();
  }

  public count_should_track_counts(): void {
    console.countReset("testCounter");
    console.count("testCounter");
    console.count("testCounter");
    console.count("testCounter");
  }

  public count_should_use_default_label(): void {
    console.countReset();
    console.count();
    console.count();
  }

  public countReset_should_reset_counter(): void {
    console.count("resetTest");
    console.count("resetTest");
    console.countReset("resetTest");
    console.count("resetTest");
  }

  public dir_should_not_throw(): void {
    console.dir({ name: "test", value: 42 });
    console.dir("simple string");
    console.dir(undefined);
  }

  public dirxml_should_not_throw(): void {
    console.dirxml({ name: "test" });
    console.dirxml("test", 123, {});
  }

  public group_should_not_throw(): void {
    console.group("Test Group");
    console.log("Inside group");
    console.groupEnd();
  }

  public group_without_label(): void {
    console.group();
    console.log("Inside anonymous group");
    console.groupEnd();
  }

  public groupCollapsed_should_not_throw(): void {
    console.groupCollapsed("Collapsed Group");
    console.log("Inside collapsed group");
    console.groupEnd();
  }

  public nestedGroups_should_work(): void {
    console.group("Outer");
    console.log("Outer message");
    console.group("Inner");
    console.log("Inner message");
    console.groupEnd();
    console.log("Back to outer");
    console.groupEnd();
  }

  public groupEnd_without_group_should_not_throw(): void {
    console.groupEnd();
    console.groupEnd();
    console.groupEnd();
  }

  public table_should_not_throw(): void {
    console.table([
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
    ]);
    console.table(undefined);
    console.table("simple string");
  }

  public time_should_measure_elapsed_time(): void {
    console.time("testTimer");
    Thread.Sleep(10 as int);
    console.timeEnd("testTimer");
  }

  public time_with_default_label(): void {
    console.time();
    Thread.Sleep(5 as int);
    console.timeEnd();
  }

  public timeLog_should_log_intermediate_time(): void {
    console.time("logTimer");
    Thread.Sleep(5 as int);
    console.timeLog("logTimer", "checkpoint 1");
    Thread.Sleep(5 as int);
    console.timeLog("logTimer", "checkpoint 2");
    console.timeEnd("logTimer");
  }

  public timeLog_with_data(): void {
    console.time("dataTimer");
    console.timeLog("dataTimer", "value", 42, "more data");
    console.timeEnd("dataTimer");
  }

  public timeEnd_without_matching_time_should_not_throw(): void {
    console.timeEnd("nonExistentTimer");
  }

  public trace_should_not_throw(): void {
    console.trace("Trace message");
    console.trace("Trace with %s", "formatting");
    console.trace();
  }

  public profile_should_not_throw(): void {
    console.profile("testProfile");
    console.profileEnd("testProfile");
  }

  public profileEnd_without_profile_should_not_throw(): void {
    console.profileEnd("nonExistent");
  }

  public timeStamp_should_not_throw(): void {
    console.timeStamp("testStamp");
    console.timeStamp();
  }

  public formatting_string_substitution(): void {
    console.log("Hello %s", "World");
    console.log("Multiple %s %s", "substitutions", "here");
  }

  public formatting_number_substitution(): void {
    console.log("Number: %d", 42);
    console.log("Integer: %i", 123);
    console.log("Float: %f", 3.14);
  }

  public formatting_object_substitution(): void {
    console.log("Object: %o", { name: "test", value: 42 });
    console.log("Object: %O", { name: "test" });
  }

  public formatting_escaped_percent(): void {
    console.log("Percentage: 50%%");
  }

  public formatting_extra_parameters(): void {
    console.log("One %s", "param", "extra", "params");
  }

  public formatting_no_parameters(): void {
    console.log("No substitution needed");
  }

  public multipleConsecutiveCalls_should_work(): void {
    for (let index = 0 as int; index < (10 as int); index += 1 as int) {
      console.log("Message %d", index);
    }
  }

  public mixedLoggingMethods_should_work(): void {
    console.log("Log message");
    console.error("Error message");
    console.warn("Warning message");
    console.info("Info message");
    console.debug("Debug message");
  }

  public complexObjects_should_not_throw(): void {
    const complexObj = {
      name: "test",
      nested: {
        value: 42,
        array: [1, 2, 3],
      },
      nullValue: undefined as string | undefined,
    };

    console.log("Complex object: %o", complexObj);
    console.dir(complexObj);
  }

  public counterScenario_should_track_multiple_counters(): void {
    console.countReset("api");
    console.countReset("db");
    console.countReset("cache");
    console.count("api");
    console.count("db");
    console.count("api");
    console.count("cache");
    console.count("api");
  }

  public timerScenario_should_handle_multiple_timers(): void {
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
