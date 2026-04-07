import { attributes as A } from "@tsonic/core/lang.js";
import {
  CollectionDefinitionAttribute,
} from "xunit-types/Xunit.js";

export class PerfHooksCollectionDefinition {}

// @ts-expect-error Tsonic supports attribute named arguments beyond constructor parameters.
A<PerfHooksCollectionDefinition>().add(CollectionDefinitionAttribute, "perf_hooks", {
  DisableParallelization: true,
});
