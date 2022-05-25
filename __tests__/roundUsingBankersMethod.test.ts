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
    [23.5, -0, 24],
    [24.5, 0, 24],
    [-23.5, 0, -24],
    [-24.5, 0, -24],
    [-0.001, 1, -0],
    [1.5254, 2, 1.53],
    [1.5254, 2.1, 1.53],
    [1.5254, 2.9, 1.53],
    [1.5254, Infinity, 1.5254],
    [1.123456789, Infinity, 1.123456789],
  ])('rounds %p using precision %p', (value, precision, expected) => {
    expect(roundUsingBankersMethod(value, precision)).toEqual(expected);
  });

  test.each([
    [1.049, -Infinity],
    [1.049, Number.NaN],
  ])('throws error on invalid arguments (rounds %p using precision %p)', (value, precision) => {
    expect(() => roundUsingBankersMethod(value, precision))
      .toThrowError(new RangeError("precision value is out of range."));
  });
});