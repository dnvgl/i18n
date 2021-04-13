import { OptionalType } from "./optionalType";

export type SortDataType = 
  OptionalType<string> 
  | OptionalType<number> 
  | OptionalType<Date> 
  | OptionalType<boolean>;