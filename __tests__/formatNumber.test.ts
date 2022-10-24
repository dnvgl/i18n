import { createNumberFormat, formatNumber } from "../src";

const IntlWhitespace = String.fromCharCode(160);

describe('formatNumber', () => {
  test.each([
    [102234567.89123, "en-US", "102,234,567.89123"],
    [1, "en-US", "1"],
    [1.2, "en-US", "1.2"],
    [12345.78, "de-LI" /* Liechtenstein */, "12’345.78"],
    [11.1e+3, "en-US", "11,100"],
    [123456789123457000, "en-US", "123,456,789,123,457,000"]
  ])('uses proper default (full formatting with full precision) for %p locale', (value, locale, expected) => {
    const result = formatNumber(value, undefined, locale);
    expect(result).toBe(expected);
  });

  test.each([
    [123.454, 2, "123.45"],
    [123.456, 2, "123.46"],
    [0.01, 5, "0.01"],
    [0.0001, 3, "0"],
    [0.0001, 4, "0.0001"],
    [0.0001, 5, "0.0001"],
    [4.0001, 0, "4"]
  ])('formats %p with max precision (%p)', (value, precision, expected) => {
    const result = formatNumber(value, { maxPrecision: precision }, "en-US");
    expect(result).toBe(expected);
  });

  test.each([
    [123.454, 2, "123.454"],
    [123.456, 2, "123.456"],
    [0.0001, 3, "0.0001"],
    [0.0001, 4, "0.0001"],
    [0.0001, 5, "0.00010"],
    [4.0001, 0, "4.0001"]
  ])('formats %p with min precision (%p)', (value, precision, expected) => {
    const result = formatNumber(value, { minPrecision: precision }, "en-US");
    expect(result).toBe(expected);
  });

  test.each([
    [123.78, "en", false, "123.78"],
    [123.78, "en", true, "123.78"],
    [1234.78, "en", false, "1234.78"],
    [1234.78, "en", true, "1,234.78"],
    [1234567.78, "en", true, "1,234,567.78"],
    [123.78, "de", false, "123,78"],
    [123.78, "de", true, "123,78"],
    [1234.78, "de", false, "1234,78"],
    [1234.78, "de", true, "1.234,78"],
    [1234567.78, "de", true, "1.234.567,78"],
    [0.000000003, "en", false, "0.000000003"], // HINT: should not be 3e-9
    [1234567.78, "pl", true, `1${IntlWhitespace}234${IntlWhitespace}567,78`],
  ])('formats %p with proper locale (%p) when thousands separator option is %p', (value, locale, thousandsSeparator, expected) => {
    const result = formatNumber(value, { thousandsSeparator: thousandsSeparator }, locale);
    expect(result).toBe(expected);
  });

  test.each([
    [3.155, 2, 2, true, "3.16"],
    [3.155, 2, 2, false, "3.16"],
    [3.165, 2, 2, true, "3.16"],
    [3.165, 2, 2, false, "3.17"],
    [3.12, 2, 2, true, "3.12"],
    [3.122, 2, 2, true, "3.12"],
    [3.18, 2, 2, true, "3.18"],
    [3.188, 2, 2, true, "3.19"],
    [3.1, 2, 2, true, "3.10"],
    [3.155, undefined, 5, true, "3.155"],
    [3.155, 2, undefined, true, "3.155"],
  ])('formats %p with min precision (%p) and max precision (%p) with bankers rounding (%p)', (value, minPrecision, maxPrecision, useBankersRounding, expected) => {
    const result = formatNumber(value, { minPrecision: minPrecision, maxPrecision: maxPrecision, useBankersRounding: useBankersRounding}, "en-US");
    expect(result).toBe(expected);
  });

  test.each([
    [123456789123457000, "en-US", "123,456,789,123,457,000"],
    [123456789123457000.34535, "en-US", "123,456,789,123,457,010"],
  ])('formats big numbers %p using locale p%', (value, locale, expected) => {
    const result = formatNumber(value, undefined, locale);
    expect(result).toBe(expected);
  });

  test.each([
    [-0.2, undefined, 2, true, "-0.2"],
    [-0.2, undefined, 2, false, "-0.2"],
    [0.002, 2, 2, true, "0.00"],
    [0.002, 2, 2, false, "0.00"],
    [-0.002, 2, 2, true, "-0.00"],
    [-0.002, 2, 2, false, "0.00"],
    [-0.002, undefined, 2, true, "-0"],
    [-0.002, undefined, 2, false, "0"],
    [-0, undefined, 2, true, "-0"],
    [-0, undefined, 2, false, "0"],
  ])('formats %p with min precision (%p) and max precision (%p) with negative zero (%p)', (value, minPrecision, maxPrecision, negativeZero, expected) => {
    const result = formatNumber(value, { minPrecision: minPrecision, maxPrecision: maxPrecision, negativeZero: negativeZero}, "en-US");
    expect(result).toBe(expected);
  });

  test("combined using createNumberFormat()", () => {
    expect("1.23").toBe(formatNumber(1.23, createNumberFormat(undefined, "en-US")));
    expect("1.23").toBe(formatNumber(1.23, createNumberFormat({}, "en-US")));
    expect("0").toBe(formatNumber(-0, createNumberFormat({ negativeZero: false }, "en-US")));
    expect("-0").toBe(formatNumber(-0, createNumberFormat({ negativeZero: true }, "en-US")));
    expect("1234,78").toBe(formatNumber(1234.78, createNumberFormat({ thousandsSeparator: false }, "de")));
    expect("1.234,78").toBe(formatNumber(1234.78, createNumberFormat({ useBankersRounding: true }, "de")));
  });
});