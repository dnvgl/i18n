import type { OptionalType } from "./optionalType.js";

export type SortDataType = 
  OptionalType<string> 
  | OptionalType<number> 
  | OptionalType<Date> 
  | OptionalType<boolean>;