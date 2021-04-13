import { OptionalType } from "./optionalType";

export type SortSelector<T> = 
  ((x: T) => OptionalType<string>) 
  | ((x: T) => OptionalType<number>) 
  | ((x: T) => OptionalType<Date>) 
  | ((x: T) => OptionalType<boolean>);