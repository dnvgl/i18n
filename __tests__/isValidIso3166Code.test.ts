import { isValidIso3166Code } from "../src";

describe('isValidIso3166Code', () => {
  test.each([
    ["PL", true],
    ["POL", true],
    [616, true],
    ["Pl", false],
    ["pl", false],
    [-1, false],
    [0, false],
    [1000, false],
    ["", false],
    ["ABCD", false],
  ])('validates %p code', (code, expected) => {
    expect(isValidIso3166Code(code)).toBe(expected);
  });
});