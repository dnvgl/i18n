/**
 * @jest-environment ./testEnvironments/timezoneEnvironment.ts
 * @timezone Europe/Warsaw
 */
import { formatDate, formatDateToISO, formatTime } from "../src/index.js";

describe('date formatting in a timezone ahead of UTC (Europe/Warsaw)', () => {
  test('runs in Europe/Warsaw timezone', () => {
    expect(new Date(2025, 0, 1).getTimezoneOffset()).toBe(-60);
  });

  test('date-only string is formatted as local midnight', () => {
    expect(formatDate("2025-03-31", "days", "en-GB")).toBe("31/03/2025");
    expect(formatDate("2025-03-31", "minutes", "en-GB")).toBe("31/03/2025, 00:00");
    expect(formatTime("2025-03-31", "seconds", "en-GB")).toBe("00:00:00");
  });

  test.each([
    ["2020-03-30T14:46:27+02:00", "minutes", "30/03/2020, 14:46"],
    ["2020-03-30T12:46:45.484Z", "minutes", "30/03/2020, 14:46"],
    ["2020-03-30T14:46:27+02:00", "seconds", "30/03/2020, 14:46:27"],
    ["2020-03-30T12:46:45.484Z", "seconds", "30/03/2020, 14:46:45"],
  ] as const)('formats %p as an instant in local time using %p format', (value, format, expected) => {
    expect(formatDate(value, format, "en-GB")).toBe(expected);
  });

  test.each([
    [new Date(2020, 5, 10, 22, 15, 7), true, "2020-06-10T20:15:07.000Z"],
    [new Date(2020, 5, 11, 1, 15, 7), false, "2020-06-11"], // HINT: 2020-06-10T23:15:07Z
    [new Date(2025, 2, 31), false, "2025-03-31"], // HINT: 2025-03-30T22:00:00Z
    ["2020-06-10T20:15:07.000Z", true, "2020-06-10T20:15:07.000Z"],
    ["2020-06-10T22:15:07+02:00", true, "2020-06-10T20:15:07.000Z"],
    ["2020-06-10T23:30:00Z", false, "2020-06-11"],
    ["2020-06-10", false, "2020-06-10"],
    ["2020-06-10", true, "2020-06-10T00:00:00.000Z"],
  ])('formatDateToISO formats %p (include time: %p): time in UTC, date only as local day', (value, includeTime, expected) => {
    expect(formatDateToISO(value, includeTime)).toBe(expected);
  });

  test('formatDateToISO rejects invalid date', () => {
    expect(() => formatDateToISO("2020-13-01")).toThrow(RangeError);
    expect(() => formatDateToISO(new Date(NaN))).toThrow(RangeError);
  });
});
