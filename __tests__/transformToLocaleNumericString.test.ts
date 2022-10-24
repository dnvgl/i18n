import { transformToInputNumericString } from "../src";

describe('transformToLocaleNumericString', () => {
  test.each([
    ["  $-102,234,567.89123 - ", "en-US", "-102234567.89123"],
    ["fg$%^  -102.234.567,89123 -", "de", "-102234567,89123"],
  ])('removes incorrect characters from %p when locale is %p', (value, locale, expected) => {
    const result = transformToInputNumericString(value, undefined, locale);
    expect(result).toBe(expected);
  });

  test.each([
    ["-100", true, "-100"],
    ["-100", false, "100"],
    ["100", true, "100"],
    ["100", false, "100"],
  ])('removes checks minus sign in %p when negative is allowed: %p', (value, negativeAllowed, expected) => {
    const result = transformToInputNumericString(value, { negativeAllowed: negativeAllowed });
    expect(result).toBe(expected);
  });

  test.each([
    ["140.123", 0, "140"],
    ["140.", 0, "140"],
    ["140.", 1, "140."],
    ["140.123", 1, "140.1"],
    ["140.123", 2, "140.12"],
    ["140.129", 2, "140.12"],
    ["140.123", 3, "140.123"],
    ["140.123", 5, "140.123"],
  ])('transforms fractional part of %p based on precision: %p', (value, precision, expected) => {
    const result = transformToInputNumericString(value, { fractionalPart: precision }, "en-US");
    expect(result).toBe(expected);
  });

  test.each([
    ["", 2, ""],
    [".", 2, "0.00"],
    ["140.123", 0, "140"],
    ["140", 5, "140.00000"],
    ["140.12", 5, "140.12000"],
    ["140.12345", 2, "140.12"],
  ])('forces fractional part of %p when precision is %p', (value, precision, expected) => {
    const result = transformToInputNumericString(value, { fractionalPart: precision, forceFractionalPart: true }, "en-US");
    expect(result).toBe(expected);
  });

  test.each([
    ["", ""],
    [".", "0."],
    ["-", "-"],
    ["-.", "-0."],
  ])('handles cases when user is typing %p', (value, expected) => {
    const result = transformToInputNumericString(value, undefined, "en-US");
    expect(result).toBe(expected);
  });

  test.each([
    ["", undefined, 4, ""],
    ["", 4, undefined, ""],
    ["", 4, 4, ""],
    ["4", undefined, 4, "4"],
    ["4", 4, undefined, "4"],
    ["4", 4, 4, "4"],
    ["4", undefined, 3, "3"],
    ["4", undefined, 3.1, "3.1"],
    ["4", undefined, 3.129, "3.12"],
    ["-2", undefined, -3, "-3"],
    ["-2", undefined, -3.1, "-3.1"],
    ["-2", undefined, -3.129, "-3.12"],
    ["4", 5, undefined, "5"],
    ["4", 5.1, undefined, "5.1"],
    ["4", 5.129, undefined, "5.12"],
    ["-10", -5, undefined, "-5"],
    ["-10", -5.1, undefined, "-5.1"],
    ["-10", -5.129, undefined, "-5.12"],
    ["-10", 5, undefined, "5"],
    ["10", undefined, -10, "-10"],
  ])('clamp value %p according to settings, min: %p, max: %p when max precision', (value, min, max, expected) => {
    const result = transformToInputNumericString(value, { minAllowedValue: min, maxAllowedValue: max, fractionalPart: 2 }, "en-US");
    expect(result).toBe(expected);
  });

  test.each([
    [".", "0.", 1, false],
    ["0.2", "0.", 1, false],
    ["0.5", "0.5", 1, false],
    ["0.5", "0.5", 2, false],
    ["0.50", "0.50", 2, false],
    ["0.55", "0.5", 2, false],
    ["0.52", "0.5", 2, false],
    ["0.501", "0.5", 3, false],
    ["0.501", "0.500", 3, true],
    ["0.001", "0.000", 3, true],
  ])('removes fractional part when not half, actual: %p, expected: %p, precision: %p, force fractional part: %p', (value, expected, fractionalPart, forceFractionalPart) => {
    const result = transformToInputNumericString(value, { allowOnlyHalfs: true, fractionalPart: fractionalPart, forceFractionalPart: forceFractionalPart }, "en-US");
    expect(result).toBe(expected);
  });

  test.each([
    ["-10", "en-GB", "-10"],
    [`-10`, "lt-LT", `-10`],
    [`−10`, "lt-LT", `−10`],
    [`10٫1`, "ar-SA", `10٫1`],
  ])('accepts specific and regular characters, actual: %p, locale: %p', (value, locale, expected) => {
    const result = transformToInputNumericString(value, undefined, locale);
    expect(result).toBe(expected);
  });
});