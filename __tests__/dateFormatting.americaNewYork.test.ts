/**
 * @jest-environment ./testEnvironments/timezoneEnvironment.ts
 * @timezone America/New_York
 */
import { formatDate, formatDatePart, formatDateToISO, formatMonth, formatTime } from "../src/index.js";

describe('date formatting in a timezone behind UTC (America/New_York)', () => {
  test('runs in America/New_York timezone', () => {
    expect(new Date(2025, 0, 1).getTimezoneOffset()).toBe(300);
  });

  test('date-only string is formatted as the same local day', () => {
    expect(formatDate("2025-03-31", "days", "en-US")).toBe("3/31/2025");
    expect(formatDate("2025-03-31", "minutes", "en-GB")).toBe("31/03/2025, 00:00");
    expect(formatDatePart("2025-03-31", "day", "en-US")).toBe("31");
    expect(formatMonth("2025-03-01", "long", "en-US")).toBe("March");
    expect(formatTime("2025-03-31", "minutes", "en-GB")).toBe("00:00");
  });

  test('string with time or offset is formatted as an instant in local time', () => {
    expect(formatDate("2025-03-31T00:00:00Z", "minutes", "en-GB")).toBe("30/03/2025, 20:00");
    expect(formatDate("2025-03-31T10:15:00", "minutes", "en-GB")).toBe("31/03/2025, 10:15");
  });

  test('invalid date-only string is still rejected', () => {
    expect(() => formatDate("2025-13-01", "days", "en-US")).toThrow(RangeError);
  });

  test('formatDateToISO returns time in UTC and date only as local day', () => {
    expect(formatDateToISO("2025-03-31")).toBe("2025-03-31");
    expect(formatDateToISO("2025-03-31", true)).toBe("2025-03-31T00:00:00.000Z");
    expect(formatDateToISO(new Date(2025, 2, 31, 22, 0))).toBe("2025-03-31"); // HINT: 2025-04-01T02:00:00Z
    expect(formatDateToISO(new Date(2025, 2, 31, 22, 0), true)).toBe("2025-04-01T02:00:00.000Z");
  });
});
