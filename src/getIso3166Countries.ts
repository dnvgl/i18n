import { iso3166Countries } from "./internal/iso3166Countries";
import { Iso3166Country } from "./types/iso3166";

export function getIso3166Countries(): Iso3166Country[] {
  return iso3166Countries;
}