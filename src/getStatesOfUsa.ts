import { statesOfUsa } from "./internal/statesOfUsa.js";
import type { StateOfUsa } from "./types/stateOfUsa.js";

export function getStatesOfUsa(): StateOfUsa[] {
  // HINT: intentionally a stable shared reference (e.g. React memoization), do not return a copy; callers must not mutate it
  return statesOfUsa;
}