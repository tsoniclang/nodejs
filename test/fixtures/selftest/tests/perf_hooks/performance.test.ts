import { attributes as A } from "@tsonic/core/lang.js";
import { int } from "@tsonic/core/types.js";
import { Thread } from "@tsonic/dotnet/System.Threading.js";
import { Assert, CollectionAttribute, FactAttribute } from "xunit-types/Xunit.js";

import { performance, PerformanceMark, PerformanceMeasure } from "@tsonic/nodejs/perf_hooks.js";
import type { MeasureOptions } from "@tsonic/nodejs/perf_hooks.js";
import { assertThrows } from "./helpers.ts";

export class PerformanceTests {
  now_should_return_positive_number(): void {
    const timestamp = performance.now();
    Assert.True(timestamp > 0);
  }

  now_should_be_monotonic_increasing(): void {
    const t1 = performance.now();
    Thread.Sleep(10 as int);
    const t2 = performance.now();

    Assert.True(t2 > t1);
    Assert.True(t2 - t1 >= 10);
  }

  mark_should_create_mark(): void {
    performance.clearMarks();

    const entry = performance.mark("test-mark");

    Assert.True(entry !== null);
    Assert.Equal("test-mark", entry.name);
    Assert.Equal("mark", entry.entryType);
    Assert.Equal(0, entry.duration);
    Assert.True(entry.startTime > 0);
  }

  mark_with_null_name_should_throw(): void {
    assertThrows(() => performance.mark(null!));
  }

  mark_with_empty_name_should_throw(): void {
    assertThrows(() => performance.mark(""));
  }

  mark_with_detail_should_store_detail(): void {
    performance.clearMarks();

    const detail = "test-detail-value";
    const entry = performance.mark("detailed-mark", { detail });

    Assert.True(entry instanceof PerformanceMark);
    Assert.Equal(detail, (entry as PerformanceMark).detail);
  }

  mark_with_custom_start_time_should_use_provided_time(): void {
    performance.clearMarks();

    const customTime = 12345.678;
    const entry = performance.mark("custom-time-mark", { startTime: customTime });

    Assert.Equal(customTime, entry.startTime);
  }

  measure_between_marks_should_calculate_duration(): void {
    performance.clearMarks();
    performance.clearMeasures();

    performance.mark("start");
    Thread.Sleep(50 as int);
    performance.mark("end");

    const entry = performance.measure("test-measure", "start", "end");

    Assert.True(entry !== null);
    Assert.Equal("test-measure", entry.name);
    Assert.Equal("measure", entry.entryType);
    Assert.True(entry.duration >= 50);
    Assert.True(entry.duration < 200);
  }

  measure_with_null_name_should_throw(): void {
    assertThrows(() => performance.measure(null!));
  }

  measure_with_empty_name_should_throw(): void {
    assertThrows(() => performance.measure(""));
  }

  measure_with_missing_start_mark_should_use_zero(): void {
    performance.clearMarks();
    performance.clearMeasures();

    performance.mark("end");
    const entry = performance.measure("test", "nonexistent-start", "end");

    Assert.Equal(0, entry.startTime);
  }

  measure_with_missing_end_mark_should_use_now(): void {
    performance.clearMarks();
    performance.clearMeasures();

    const startMark = performance.mark("start");
    Thread.Sleep(10 as int);
    const beforeMeasure = performance.now();
    const entry = performance.measure("test", "start", "nonexistent-end");

    Assert.True(entry.startTime === startMark.startTime);
    Assert.True(entry.duration > 10);
    Assert.True(entry.startTime + entry.duration <= beforeMeasure + 5);
  }

  measure_with_no_marks_should_work_with_current_time(): void {
    performance.clearMarks();
    performance.clearMeasures();

    const entry = performance.measure("test-no-marks");

    Assert.True(entry !== null);
    Assert.Equal(0, entry.startTime);
    Assert.True(entry.duration > 0);
  }

  measure_with_options_should_work(): void {
    performance.clearMarks();
    performance.clearMeasures();

    performance.mark("start");
    Thread.Sleep(50 as int);
    performance.mark("end");

    const detail = "test-detail";
    const options: MeasureOptions = {
      startMark: "start",
      endMark: "end",
      detail,
    };
    const entry = performance.measure("test-options", options);

    Assert.True(entry instanceof PerformanceMeasure);
    Assert.Equal(detail, (entry as PerformanceMeasure).detail);
    Assert.True(entry.duration >= 50);
  }

  measure_with_explicit_times_should_work(): void {
    performance.clearMeasures();

    const options: MeasureOptions = {
      start: 100.0,
      end: 250.5,
    };
    const entry = performance.measure("explicit-times", options);

    Assert.Equal(100.0, entry.startTime);
    Assert.Equal(150.5, entry.duration);
  }

  get_entries_should_return_all_entries(): void {
    performance.clearMarks();
    performance.clearMeasures();

    performance.mark("mark1");
    performance.mark("mark2");
    performance.measure("measure1");

    const allEntries = performance.getEntries();

    Assert.True(allEntries.length >= 3);
    Assert.True(allEntries.some((e) => e.name === "mark1"));
    Assert.True(allEntries.some((e) => e.name === "mark2"));
    Assert.True(allEntries.some((e) => e.name === "measure1"));
  }

  get_entries_by_name_should_filter_by_name(): void {
    performance.clearMarks();
    performance.clearMeasures();

    performance.mark("test");
    performance.mark("other");
    performance.measure("test");

    const filtered = performance.getEntriesByName("test");

    Assert.Equal(2, filtered.length);
    Assert.True(filtered.every((e) => e.name === "test"));
  }

  get_entries_by_name_with_null_name_should_throw(): void {
    assertThrows(() => performance.getEntriesByName(null!));
  }

  get_entries_by_name_with_type_should_filter_by_both(): void {
    performance.clearMarks();
    performance.clearMeasures();

    performance.mark("test");
    performance.measure("test");

    const filtered = performance.getEntriesByName("test", "mark");

    Assert.Equal(1, filtered.length);
    Assert.Equal("test", filtered[0].name);
    Assert.Equal("mark", filtered[0].entryType);
  }

  get_entries_by_type_should_filter_by_type(): void {
    performance.clearMarks();
    performance.clearMeasures();

    performance.mark("mark1");
    performance.mark("mark2");
    performance.measure("measure1");

    const marks = performance.getEntriesByType("mark");
    const measures = performance.getEntriesByType("measure");

    Assert.True(marks.length >= 2);
    Assert.True(marks.every((e) => e.entryType === "mark"));
    Assert.True(measures.length >= 1);
    Assert.True(measures.every((e) => e.entryType === "measure"));
  }

  get_entries_by_type_with_null_type_should_throw(): void {
    assertThrows(() => performance.getEntriesByType(null!));
  }

  clear_marks_should_remove_all_marks(): void {
    performance.clearMarks();

    performance.mark("mark1");
    performance.mark("mark2");

    performance.clearMarks();

    const marks = performance.getEntriesByType("mark");
    Assert.Equal(0, marks.length);
  }

  clear_marks_with_name_should_remove_specific_mark(): void {
    performance.clearMarks();

    performance.mark("keep");
    performance.mark("remove");

    performance.clearMarks("remove");

    const marks = performance.getEntriesByType("mark");
    Assert.Equal(1, marks.length);
    Assert.Equal("keep", marks[0].name);
  }

  clear_measures_should_remove_all_measures(): void {
    performance.clearMeasures();

    performance.measure("measure1");
    performance.measure("measure2");

    performance.clearMeasures();

    const measures = performance.getEntriesByType("measure");
    Assert.Equal(0, measures.length);
  }

  clear_measures_with_name_should_remove_specific_measure(): void {
    performance.clearMeasures();

    performance.measure("keep");
    performance.measure("remove");

    performance.clearMeasures("remove");

    const measures = performance.getEntriesByType("measure");
    Assert.Equal(1, measures.length);
    Assert.Equal("keep", measures[0].name);
  }
}

A<PerformanceTests>().add(CollectionAttribute, "perf_hooks");

A<PerformanceTests>()
  .method((t) => t.now_should_return_positive_number)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.now_should_be_monotonic_increasing)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.mark_should_create_mark)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.mark_with_null_name_should_throw)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.mark_with_empty_name_should_throw)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.mark_with_detail_should_store_detail)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.mark_with_custom_start_time_should_use_provided_time)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.measure_between_marks_should_calculate_duration)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.measure_with_null_name_should_throw)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.measure_with_empty_name_should_throw)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.measure_with_missing_start_mark_should_use_zero)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.measure_with_missing_end_mark_should_use_now)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.measure_with_no_marks_should_work_with_current_time)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.measure_with_options_should_work)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.measure_with_explicit_times_should_work)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.get_entries_should_return_all_entries)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.get_entries_by_name_should_filter_by_name)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.get_entries_by_name_with_null_name_should_throw)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.get_entries_by_name_with_type_should_filter_by_both)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.get_entries_by_type_should_filter_by_type)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.get_entries_by_type_with_null_type_should_throw)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.clear_marks_should_remove_all_marks)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.clear_marks_with_name_should_remove_specific_mark)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.clear_measures_should_remove_all_measures)
  .add(FactAttribute);
A<PerformanceTests>()
  .method((t) => t.clear_measures_with_name_should_remove_specific_measure)
  .add(FactAttribute);
