/**
 * @jest-environment ./testEnvironments/timezoneEnvironment.ts
 * @timezone Europe/Warsaw
 */
import { findIso4217Currency, findIso4217CurrencyForIso3166Country, getIso4217Currencies } from "../src/index.js";

describe('currency dates in a timezone ahead of UTC (Europe/Warsaw)', () => {
  test('runs in Europe/Warsaw timezone', () => {
    expect(new Date(2026, 0, 1).getTimezoneOffset()).toBe(-60);
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
    [new Date(2025, 11, 31, 23, 59), "BGN"],
    [new Date(2026, 0, 1, 0, 30), "EUR"], // HINT: 2025-12-31T23:30Z
  ])('findIso4217CurrencyForIso3166Country resolves Bulgaria currency for %p to %p', (day, expected) => {
    expect(findIso4217CurrencyForIso3166Country("BG", day)?.alpha3Code).toBe(expected);
    expect(getIso4217Currencies(day).find(x => x.alpha3Code === expected)).toBeDefined();
  });

  test.each([
    [new Date(2025, 2, 30, 23, 59), "ANG"],
    [new Date(2025, 2, 31, 0, 30), "XCG"], // HINT: 2025-03-30T22:30Z
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
