import { formatMonth, MonthFormat } from "../src";

describe('formatMonth', () => {
  test.each([
    ["2018-01-01 12:00:00", "en-US", "2-digit", "01"],
    ["2018-01-01 12:00:00", "en-US", "numeric", "1"],
    ["2018-01-01 12:00:00", "en-US", "long", "January"],
    ["2018-01-01 12:00:00", "en-US", "short", "Jan"],
    ["2018-01-01 12:00:00", "en-US", "narrow", "J"],

    ["2018-12-01 12:00:00", "en-US", "2-digit", "12"],
    ["2018-12-01 12:00:00", "en-US", "numeric", "12"],
    ["2018-12-01 12:00:00", "en-US", "long", "December"],
    ["2018-12-01 12:00:00", "en-US", "short", "Dec"],
    ["2018-12-01 12:00:00", "en-US", "narrow", "D"],

    ["2018-01-01 12:00:00", "pl-PL", "2-digit", "01"],
    ["2018-01-01 12:00:00", "pl-PL", "numeric", "1"],
    ["2018-01-01 12:00:00", "pl-PL", "long", "styczeń"],
    ["2018-01-01 12:00:00", "pl-PL", "short", "sty"],
    ["2018-01-01 12:00:00", "pl-PL", "narrow", "S"],

    ["2018-12-01 12:00:00", "pl-PL", "2-digit", "12"],
    ["2018-12-01 12:00:00", "pl-PL", "numeric", "12"],
    ["2018-12-01 12:00:00", "pl-PL", "long", "grudzień"],
    ["2018-12-01 12:00:00", "pl-PL", "short", "gru"],
    ["2018-12-01 12:00:00", "pl-PL", "narrow", "G"],
  ])('formats using date argument', (value, locale, format, expected) => {
    const result = formatMonth(value, format as MonthFormat, locale);
    expect(result).toBe(expected);
  });

  test.each([
    [0, "en-US", "numeric", "1"],
    [0, "en-US", "long", "January"],
    [11, "en-US", "numeric", "12"],
    [11, "en-US", "long", "December"],
  ])('formats using month number argument', (value, locale, format, expected) => {
    const result = formatMonth(value, format as MonthFormat, locale);
    expect(result).toBe(expected);
  });

  test("fails to compile", () => {
    try {
      // @ts-expect-error
      formatMonth("2018-01-01 12:00:00", "TEST", "pl-PL"); // HINT: incorrect month format
    } catch {}
  });
});