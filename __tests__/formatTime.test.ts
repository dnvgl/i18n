import { formatTime, TimeFormatPrecision } from "../src";

describe('formatTime', () => {
  test.each([
    ["2018-07-08 14:15:24", "en-GB", "14:15"],
    ["2018-07-08 14:15:24", "en-US", "2:15 PM"],
    // TODO: relative time (to be reverted when be able to mock timezone on windows machine)
    //[new Date("2020-03-30T14:46:27+02:00"), "en-GB", "14:46"],
  ])('formats %p without minutes using locale %p', (value, locale, expected) => {
    const result = formatTime(value, "minutes", locale);
    expect(result).toBe(expected);
  });

  test.each([
    ["2018-07-08 14:15:24", "en-GB", "14:15:24"],
    ["2018-07-08 14:15:24", "en-US", "2:15:24 PM"],
    ["2018-07-08 14:15:24", "de-DE", "14:15:24"],
    [new Date("2018-07-08 14:15:24"), "en-US", "2:15:24 PM"],
    // TODO: relative time (to be reverted when be able to mock timezone on windows machine)
    //["2020-03-30T14:46:27+02:00", "en-GB", "14:46:27"],
    //["2020-03-30T12:46:45.484Z", "en-GB", "14:46:45"],
  ])('formats %p with seconds using locale %p', (value, locale, expected) => {
    const result = formatTime(value, "seconds", locale);
    expect(result).toBe(expected);
  });

  test.each([
    [[14, 15, 2], "minutes", "en-US", "2:15 PM"],
    [[14, 15, 8], "seconds", "en-US", "2:15:08 PM"],
    [[14, 15, 8], "minutes", "pl-PL", "14:15"],
    [[14, 15, 8], "seconds", "pl-PL", "14:15:08"],
  ] as [[number, number, number], TimeFormatPrecision, string, string][])
  ('formats %p using format %p and locale %p', (values, format, locale, expected) => {
    const result = formatTime(values, format, locale);
    expect(result).toBe(expected);
  });

  test("fails to compile", () => {
    // @ts-expect-error
    formatTime([1,1,1,1], "minutes", "pl-PL"); // HINT: incorrect array length
    // @ts-expect-error
    formatTime([1,1], "minutes", "pl-PL"); // HINT: incorrect array length
    // @ts-expect-error
    formatTime([1,1,null], "minutes", "pl-PL"); // HINT: invalid type
    // @ts-expect-error
    formatTime(); // HINT: missing arguments
  });
});