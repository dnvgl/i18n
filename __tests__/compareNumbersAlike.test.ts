import { compareNumbersAlike } from "../src";

describe('compareNumbersAlike', () => {
  test.each([
    [null, undefined, 1],
    [null, null, 0],
    [undefined, undefined, 0],
    [undefined, null, -1]
  ])('compares not defined %p and %p', (a, b, expected) => {
    expect(compareNumbersAlike(a, b)).toEqual(expected);
  });

  test.each([
    [5, null, 1],
    [5, undefined, 1],
    [5, Number.NaN, 1],
    [5, 5, 0],
    [5, 4, 1],
    [5, 6, -1],
    [0, 0, 0],
    [Infinity, Infinity, 0],
    [-Infinity, -Infinity, 0],
    [null, Number.NaN, -1],
    [null, 5, -1],
    [undefined, Number.NaN, -1],
    [undefined, 5, -1],
    [Number.NaN, undefined, 1],
    [Number.NaN, Number.NaN, 0],
    [Number.NaN, null, 1],
    [Number.NaN, 5, -1],
    [Number.NaN, Infinity, -1],
    [Infinity, Number.NaN, 1],
    [Number.NaN, -Infinity, -1],
    [-Infinity, Number.NaN, 1],
  ])('compares number types %p and %p', (a, b, expected) => {
    expect(compareNumbersAlike(a, b)).toEqual(expected);
  });
  
  test.each([
    [null, new Date("invalid"), -1],
    [undefined, new Date("invalid"), -1],
    [new Date("invalid"), undefined, 1],
    [new Date("invalid"), null, 1],
    [new Date("invalid"), new Date(), -1],
    [new Date("2018-05-05"), new Date("invalid"), 1],
    [new Date("2018-05-05"), new Date("2018-05-05"), 0],
    [new Date("2018-05-10"), new Date("2018-05-05"), 1],
    [new Date("2018-05-05"), new Date("2018-05-10"), -1],
  ])('compares date types %p and %p', (a, b, expected) => {
    expect(compareNumbersAlike(a, b)).toEqual(expected);
  });

  test.each([
    [null, true, -1],
    [null, false, -1],
    [undefined, true, -1],
    [undefined, false, -1],
    [true, null, 1],
    [false, null, 1],
    [true, undefined, 1],
    [false, undefined, 1],
    [true, false, 1],
    [false, true, -1],
    [false, false, 0],
    [true, true, 0],
  ])('compares boolean types %p and %p', (a, b, expected) => {
    expect(compareNumbersAlike(a, b)).toEqual(expected);
  });
});

// HINT: type tests below

// @ts-expect-error
compareNumbersAlike(new Date("2018-05-05"), true); // HINT: mixed types
// @ts-expect-error
compareNumbersAlike(false, 5); // HINT: mixed types
// @ts-expect-error
compareNumbersAlike(new Date("2018-05-05"), 5); // HINT: mixed types
// @ts-expect-error
compareNumbersAlike(); // HINT: missing arguments
// @ts-expect-error
compareNumbersAlike(5, "10"); // HINT: invalid types