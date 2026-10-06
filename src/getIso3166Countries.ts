import { iso3166Countries } from "./internal/iso3166Countries.js";
import type { Iso3166Country } from "./types/iso3166.js";

export function getIso3166Countries(): Iso3166Country[] {
  // HINT: intentionally a stable shared reference (e.g. React memoization), do not return a copy; callers must not mutate it
  return iso3166Countries;
}