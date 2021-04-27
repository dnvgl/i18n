import { isEuropeanUnionMember } from "../src";

describe('isEuropeanUnionMember', () => {
  test.each([
    ["PL", true],
    ["POL", true],
    ["BEL", true],
    [616, true], // HINT: POL
    ["US", false],
    ["USA", false],
    [840, false], // HINT: USA
    ["Pl", false],
    ["pl", false],
    [-1, false],
    [0, false],
    [1000, false],
    ["", false],
    ["ABCD", false],
  ])('validates %p code', (code, expected) => {
    expect(isEuropeanUnionMember(code)).toBe(expected);
  });
});