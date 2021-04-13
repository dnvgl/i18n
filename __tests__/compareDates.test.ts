import { compareDates } from "../src";

describe('compareDates', () => {
  test.each([
    ["2018-05-05", "2018-05-10", -1],
    ["2018-05-10", "2018-05-05", 1],
    ["2018-05-10", "2018-05-10", 0],
    ["2021-04-13T00:00:00.000Z", "2021-04-13", 0],
    ["2021-04-13T00:00:00.001Z", "2021-04-13", 1],
    ["2018-05-10", null, 1],
    ["2018-05-10", undefined, 1],
    [null, "2018-05-10", -1],
    [undefined, "2018-05-10", -1],
  ])('compares ISO strings %p, %p', (a, b, expected) => {
    expect(compareDates(a, b)).toEqual(expected);
  });
  
  test.each([
    [new Date("2018-05-05"), new Date("2018-05-10"), -1],
    [new Date("2018-05-10"), new Date("2018-05-05"), 1],
    [new Date("2018-05-10"), new Date("2018-05-10"), 0],
    [new Date("2018-05-10"), null, 1],
    [new Date("2018-05-10"), undefined, 1],
    [null, new Date("2018-05-10"), -1],
    [undefined, new Date("2018-05-10"), -1],
  ])('compares date types %p and %p', (a, b, expected) => {
    expect(compareDates(a, b)).toEqual(expected);
  });
});