import { attributes as A } from "@tsonic/core/lang.js";
import { int } from "@tsonic/core/types.js";
import { Thread } from "@tsonic/dotnet/System.Threading.js";
import { Assert, CollectionAttribute, FactAttribute } from "xunit-types/Xunit.js";

import {
  performance,
  PerformanceEntry,
  PerformanceMark,
  PerformanceMeasure,
  PerformanceObserver,
  PerformanceObserverEntryList,
} from "@tsonic/nodejs/perf_hooks.js";
import { assertThrows } from "./helpers.ts";

export class PerformanceObserverTests {
  public constructor_with_null_callback_should_throw(): void {
    assertThrows(() => new PerformanceObserver(null!));
  }

  public observe_with_null_options_should_throw(): void {
    const observer = new PerformanceObserver((_list, _obs) => {
      return;
    });

    assertThrows(() => observer.observe(null!));
  }

  public observe_with_empty_entry_types_should_throw(): void {
    const observer = new PerformanceObserver((_list, _obs) => {
      return;
    });

    assertThrows(() => observer.observe({ entryTypes: [] }));
  }

  public observe_with_null_entry_types_should_throw(): void {
    const observer = new PerformanceObserver((_list, _obs) => {
      return;
    });

    assertThrows(() => observer.observe({ entryTypes: null! }));
  }

  public observer_should_receive_mark_entries(): void {
    performance.clearMarks();

    const received: PerformanceEntry[] = [];
    const observer = new PerformanceObserver((list, _obs) => {
      for (const entry of list.getEntries()) {
        received.push(entry);
      }
    });

    observer.observe({ entryTypes: ["mark"] });

    performance.mark("observed-mark");
    Thread.Sleep(10 as int);

    Assert.Equal(1, received.length);
    Assert.Equal("observed-mark", received[0].name);
    Assert.Equal("mark", received[0].entryType);

    observer.disconnect();
  }

  public observer_should_receive_measure_entries(): void {
    performance.clearMeasures();

    const received: PerformanceEntry[] = [];
    const observer = new PerformanceObserver((list, _obs) => {
      for (const entry of list.getEntries()) {
        received.push(entry);
      }
    });

    observer.observe({ entryTypes: ["measure"] });

    performance.measure("observed-measure");
    Thread.Sleep(10 as int);

    Assert.Equal(1, received.length);
    Assert.Equal("observed-measure", received[0].name);
    Assert.Equal("measure", received[0].entryType);

    observer.disconnect();
  }

  public observer_should_receive_multiple_entry_types(): void {
    performance.clearMarks();
    performance.clearMeasures();

    const received: PerformanceEntry[] = [];
    const observer = new PerformanceObserver((list, _obs) => {
      for (const entry of list.getEntries()) {
        received.push(entry);
      }
    });

    observer.observe({ entryTypes: ["mark", "measure"] });

    performance.mark("test-mark");
    performance.measure("test-measure");
    Thread.Sleep(10 as int);

    Assert.Equal(2, received.length);
    Assert.True(received.some((e) => e.name === "test-mark" && e.entryType === "mark"));
    Assert.True(received.some((e) => e.name === "test-measure" && e.entryType === "measure"));

    observer.disconnect();
  }

  public observer_should_not_receive_after_disconnect(): void {
    performance.clearMarks();

    const received: PerformanceEntry[] = [];
    const observer = new PerformanceObserver((list, _obs) => {
      for (const entry of list.getEntries()) {
        received.push(entry);
      }
    });

    observer.observe({ entryTypes: ["mark"] });

    performance.mark("before-disconnect");
    Thread.Sleep(10 as int);

    observer.disconnect();

    performance.mark("after-disconnect");
    Thread.Sleep(10 as int);

    Assert.Equal(1, received.length);
    Assert.Equal("before-disconnect", received[0].name);
  }

  public observer_should_filter_by_entry_type(): void {
    performance.clearMarks();
    performance.clearMeasures();

    const received: PerformanceEntry[] = [];
    const observer = new PerformanceObserver((list, _obs) => {
      for (const entry of list.getEntries()) {
        received.push(entry);
      }
    });

    observer.observe({ entryTypes: ["mark"] });

    performance.mark("should-receive");
    performance.measure("should-not-receive");
    Thread.Sleep(10 as int);

    Assert.Equal(1, received.length);
    Assert.Equal("should-receive", received[0].name);

    observer.disconnect();
  }

  public take_records_should_return_empty_list(): void {
    const observer = new PerformanceObserver((_list, _obs) => {
      return;
    });

    observer.observe({ entryTypes: ["mark"] });

    const records = observer.takeRecords();

    Assert.True(records !== null);
    Assert.Equal(0, records.getEntries().length);

    observer.disconnect();
  }

  public callback_should_receive_self(): void {
    performance.clearMarks();

    let receivedObserver: PerformanceObserver | null = null;
    const observer = new PerformanceObserver((_list, obs) => {
      receivedObserver = obs;
    });

    observer.observe({ entryTypes: ["mark"] });

    performance.mark("test");
    Thread.Sleep(10 as int);

    Assert.True(receivedObserver === observer);

    observer.disconnect();
  }

  public supported_entry_types_should_return_types(): void {
    const types = PerformanceObserver.supportedEntryTypes();

    Assert.True(types.length > 0);
    Assert.True(types.includes("mark"));
    Assert.True(types.includes("measure"));
  }

  public entry_list_get_entries_should_return_all(): void {
    const entries: PerformanceEntry[] = [
      new PerformanceMark("mark1", 100.0),
      new PerformanceMark("mark2", 200.0),
    ];

    const list = new PerformanceObserverEntryList(entries);
    const result = list.getEntries();

    Assert.Equal(2, result.length);
    Assert.Equal("mark1", result[0].name);
    Assert.Equal("mark2", result[1].name);
  }

  public entry_list_get_entries_by_name_should_filter(): void {
    const entries: PerformanceEntry[] = [
      new PerformanceMark("test", 100.0),
      new PerformanceMark("other", 200.0),
      new PerformanceMeasure("test", 300.0, 50.0),
    ];

    const list = new PerformanceObserverEntryList(entries);
    const result = list.getEntriesByName("test");

    Assert.Equal(2, result.length);
    Assert.True(result.every((e) => e.name === "test"));
  }

  public entry_list_get_entries_by_name_with_type_should_filter(): void {
    const entries: PerformanceEntry[] = [
      new PerformanceMark("test", 100.0),
      new PerformanceMeasure("test", 200.0, 50.0),
    ];

    const list = new PerformanceObserverEntryList(entries);
    const result = list.getEntriesByName("test", "mark");

    Assert.Equal(1, result.length);
    Assert.Equal("test", result[0].name);
    Assert.Equal("mark", result[0].entryType);
  }

  public entry_list_get_entries_by_name_with_null_name_should_throw(): void {
    const list = new PerformanceObserverEntryList([]);
    assertThrows(() => list.getEntriesByName(null!));
  }

  public entry_list_get_entries_by_type_should_filter(): void {
    const entries: PerformanceEntry[] = [
      new PerformanceMark("mark1", 100.0),
      new PerformanceMark("mark2", 200.0),
      new PerformanceMeasure("measure1", 300.0, 50.0),
    ];

    const list = new PerformanceObserverEntryList(entries);

    const marks = list.getEntriesByType("mark");
    const measures = list.getEntriesByType("measure");

    Assert.Equal(2, marks.length);
    Assert.True(marks.every((e) => e.entryType === "mark"));
    Assert.Equal(1, measures.length);
    Assert.Equal("measure", measures[0].entryType);
  }

  public entry_list_get_entries_by_type_with_null_type_should_throw(): void {
    const list = new PerformanceObserverEntryList([]);
    assertThrows(() => list.getEntriesByType(null!));
  }

  public multiple_observers_should_all_receive_notifications(): void {
    performance.clearMarks();

    const received1: PerformanceEntry[] = [];
    const received2: PerformanceEntry[] = [];

    const observer1 = new PerformanceObserver((list, _obs) => {
      for (const entry of list.getEntries()) {
        received1.push(entry);
      }
    });

    const observer2 = new PerformanceObserver((list, _obs) => {
      for (const entry of list.getEntries()) {
        received2.push(entry);
      }
    });

    observer1.observe({ entryTypes: ["mark"] });
    observer2.observe({ entryTypes: ["mark"] });

    performance.mark("test-mark");
    Thread.Sleep(10 as int);

    Assert.Equal(1, received1.length);
    Assert.Equal(1, received2.length);
    Assert.Equal("test-mark", received1[0].name);
    Assert.Equal("test-mark", received2[0].name);

    observer1.disconnect();
    observer2.disconnect();
  }
}

A.on(PerformanceObserverTests).type.add(CollectionAttribute, "perf_hooks");

A.on(PerformanceObserverTests)
  .method((t) => t.constructor_with_null_callback_should_throw)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.observe_with_null_options_should_throw)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.observe_with_empty_entry_types_should_throw)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.observe_with_null_entry_types_should_throw)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.observer_should_receive_mark_entries)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.observer_should_receive_measure_entries)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.observer_should_receive_multiple_entry_types)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.observer_should_not_receive_after_disconnect)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.observer_should_filter_by_entry_type)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.take_records_should_return_empty_list)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.callback_should_receive_self)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.supported_entry_types_should_return_types)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.entry_list_get_entries_should_return_all)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.entry_list_get_entries_by_name_should_filter)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.entry_list_get_entries_by_name_with_type_should_filter)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.entry_list_get_entries_by_name_with_null_name_should_throw)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.entry_list_get_entries_by_type_should_filter)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.entry_list_get_entries_by_type_with_null_type_should_throw)
  .add(FactAttribute);
A.on(PerformanceObserverTests)
  .method((t) => t.multiple_observers_should_all_receive_notifications)
  .add(FactAttribute);
