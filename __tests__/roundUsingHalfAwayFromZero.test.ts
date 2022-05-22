import { roundUsingHalfAwayFromZero } from "../src";

describe('roundUsingHalfAwayFromZero', () => {
  test.each([
    [1.049, 1, 1],
    [1.05, 1, 1.1],
    [1.15, 1, 1.2],
    [1.25, 1, 1.3],
    [1.55, 1, 1.6],
    [1.535, 2, 1.54],
    [23.5, 0, 24],
    [24.5, 0, 25],
    [-23.5, 0, -24],
    [-24.5, 0, -25],
    [1.5254, 2, 1.53],
    [10.075, 2, 10.08],
    [10.075, 2.1, 10.08],
    [10.075, 2.9, 10.08],
    [0.1234567890123455, 15, 0.123456789012346],
    [0.1234567890123454, 15, 0.123456789012345],
    [0.1234567890123454, 15.99, 0.123456789012345],
    [0.1234567890123454, Infinity, 0.1234567890123454],
    [10.075, Infinity, 10.075],
  ])('rounds %p using precision %p', (value, precision, expected) => {
    expect(roundUsingHalfAwayFromZero(value, precision)).toEqual(expected);
  });

  test.each([
    [1.049, -Infinity],
    [1.049, -1],
    [1.049, 16],
    [1.049, Number.NaN],
  ])('throws error on invalid arguments (rounds %p using precision %p)', (value, precision) => {
    expect(() => roundUsingHalfAwayFromZero(value, precision))
      .toThrowError(new RangeError("precision value is out of range."));
  });
});