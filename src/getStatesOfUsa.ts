import { statesOfUsa } from "./internal/statesOfUsa";
import type { StateOfUsa } from "./types/stateOfUsa";

export function getStatesOfUsa(): StateOfUsa[] {
  return statesOfUsa;
}