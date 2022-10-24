import { formatNumberToFixed } from "../src";

describe('formatNumberToFixed', () => {
  test.each([
    [102234567.89123, "102,234,567.89"],
    [1, "1.00"],
    [1.2, "1.20"],
  ])('uses proper default (full formatting with 2 decimal places for precision)', (value, expected) => {
    const result = formatNumberToFixed(value, undefined, 'en-US');
    expect(result).toBe(expected);
  });

  test.each([
    [123.454, 2, "123.45"],
    [123.456, 2, "123.46"],
    [123.455, 2, "123.46"],
    [123.465, 2, "123.47"],
    [0.0001, 3, "0.000"],
    [0.0001, 4, "0.0001"],
    [0.0001, 5, "0.00010"],
    [4.0001, 0, "4"],
    [4.123, undefined, "4.12"]
  ])('formats %p with fixed precision (%p)', (value, precision, expected) => {
    const resultUsingObjectArg = formatNumberToFixed(value, { precision: precision }, "en-US");
    const resultUsingNumberArg = formatNumberToFixed(value, precision, "en-US");
    expect(resultUsingObjectArg).toBe(expected);
    expect(resultUsingNumberArg).toBe(expected);
  });

  test.each([
    [12345.123, 2, false, "12345.12"],
    [12345.123, 2, true, "12,345.12"]
  ])('formats %p with fixed precision (%p) and group separator (%p)', (value, precision, thousandsSeparator, expected) => {
    const result = formatNumberToFixed(value, { precision: precision, thousandsSeparator: thousandsSeparator}, "en-US");
    expect(result).toBe(expected);
  });
});