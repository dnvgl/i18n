/**
 * @jest-environment ./testEnvironments/timezoneEnvironment.ts
 * @timezone America/New_York
 */
import { findIso4217Currency, findIso4217CurrencyForIso3166Country, getIso4217Currencies } from "../src/index.js";

describe('currency dates in a timezone behind UTC (America/New_York)', () => {
  test('runs in America/New_York timezone', () => {
    expect(new Date(2026, 0, 1).getTimezoneOffset()).toBe(300);
  });

  test.each([
    ["2025-03-31"],
    [new Date(2025, 2, 31)],
  ])('getIso4217Currencies resolves %p to the same day', (day) => {
    const currencies = getIso4217Currencies(day);
    expect(currencies.find(x => x.alpha3Code === "XCG")).toBeDefined();
    expect(currencies.find(x => x.alpha3Code === "ANG")).toBeUndefined();
  });

  test.each([
    ["2025-12-31", "BGN"],
    ["2026-01-01", "EUR"],
    [new Date(2025, 11, 31, 20, 0), "BGN"], // HINT: 2026-01-01T01:00Z
    [new Date(2026, 0, 1, 0, 0), "EUR"],
  ])('findIso4217CurrencyForIso3166Country resolves Bulgaria currency for %p to %p', (day, expected) => {
    expect(findIso4217CurrencyForIso3166Country("BG", day)?.alpha3Code).toBe(expected);
    expect(getIso4217Currencies(day).find(x => x.alpha3Code === expected)).toBeDefined();
  });

  test.each([
    [new Date(2025, 2, 30, 20, 0), "ANG"], // HINT: 2025-03-31T00:00Z
    [new Date(2025, 2, 31, 0, 0), "XCG"],
  ])('findIso4217Currency(532) for the current day %p returns %p', (now, expected) => {
    jest.useFakeTimers({ now });
    jest.spyOn(console, "warn").mockImplementation(() => {});

    try {
      expect(findIso4217Currency(532)?.alpha3Code).toBe(expected);
    } finally {
      jest.useRealTimers();
      jest.restoreAllMocks();
    }
  });
});
