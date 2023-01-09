import { DatePart, formatDatePart } from "../src";

describe('formatDatePart', () => {
  test.each([
    ["2018-07-08 14:15:24", "year", "en-GB", "2018"],
    ["2018-07-08 14:15:24", "year", "en-US", "2018"],
    ["2018-07-08 14:15:24", "month", "en-GB", "7"],
    ["2018-07-08 14:15:24", "month", "en-US", "7"],
    ["2018-07-08 14:15:24", "day", "en-GB", "8"],
    ["2018-07-08 14:15:24", "day", "en-US", "8"],
    ["2018-07-08 14:15:24", "hour", "en-GB", "14"],
    ["2018-07-08 14:15:24", "hour", "en-US", "2 PM"],
    ["2018-07-08 14:15:24", "minute", "en-GB", "15"],
    ["2018-07-08 14:15:24", "minute", "en-US", "15"],
    ["2018-07-08 14:15:24", "second", "en-GB", "24"],
    ["2018-07-08 14:15:24", "second", "en-US", "24"],
  ])('formats %p using %p format, %p locale', (value, format, locale, expected) => {
    const result = formatDatePart(value, format as DatePart, locale);
    expect(result).toBe(expected);
  });
});