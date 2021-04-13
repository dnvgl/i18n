import { roundUsingBankersMethod } from "../src";

describe('roundUsingBankersMethod', () => {
  // HINT: the same output as in .NET framework
  test.each([
    [1.05, 1, 1],
    [1.15, 1, 1.2],
    [1.25, 1, 1.2],
    [1.35, 1, 1.4],
    [1.45, 1, 1.4],
    [1.55, 1, 1.6],
    [1.65, 1, 1.6],
    [1.75, 1, 1.8],
    [1.85, 1, 1.8],
    [1.95, 1, 2],
    [1.535, 2, 1.54],
    [23.5, 0, 24],
    [24.5, 0, 24],
    [-23.5, 0, -24],
    [-24.5, 0, -24],
    [1.5254, 2, 1.53]
  ])('rounds %p using precision %p', (value, precision, expected) => {
    expect(roundUsingBankersMethod(value, precision)).toEqual(expected);
  });
});