import { statesOfUsa } from "./internal/statesOfUsa.js";
import type { StateOfUsa } from "./types/stateOfUsa.js";

export function getStatesOfUsa(): StateOfUsa[] {
  return statesOfUsa;
}