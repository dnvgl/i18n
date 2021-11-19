import { getStatesOfUsa } from "../src";

describe('getStatesOfUsa', () => {
  test('check the list', () => {
    const states = getStatesOfUsa();
    expect(states).toHaveLength(50);
    expect(states.every(x => x.alpha2Code.length === 2 && x.alpha2Code.toUpperCase() === x.alpha2Code)).toBeTruthy();
    expect(states.every(x => x.name.length > 0)).toBeTruthy();
  });
});