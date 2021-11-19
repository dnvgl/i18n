import { statesOfUsa } from "./internal/statesOfUsa";
import { StateOfUsa } from "./types/stateOfUsa";

export function getStatesOfUsa(): StateOfUsa[] {
  return statesOfUsa;
}