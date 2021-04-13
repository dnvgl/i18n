import { formatInteger } from "../src";

describe('formatInteger', () => {
  test.each([
    [1.05, "1"],
    [15454.15, "15,454"],
  ])('formats %p', (value, expected) => {
    expect(formatInteger(value, "en")).toEqual(expected);
  });
});