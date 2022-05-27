import { isValidIso4217Code } from "../src";

describe('isValidIso4217Code', () => {
  test.each([
    ["PLN", true],
    [985, true],
    ["Pln", false],
    ["pln", false],
    [-1, false],
    [0, false],
    [1000, false],
    ["", false],
    ["_", false],
    ["__", false],
    ["___", false],
    ["____", false],
    ["ABCD", false],
  ])('validates %p code', (code, expected) => {
    expect(isValidIso4217Code(code)).toBe(expected);
  });
});