import { formatRelativeTime, Locale } from "../src";

describe('formatRelativeTime', () => {
  test.each([
    [5, "day", { style: "long" }, "en", "in 5 days"],
    [-5, "day", { style: "long" }, "en", "5 days ago"],
    [5, "day", { style: "narrow" }, "en", "in 5d"],
    [-5, "day", { style: "narrow" }, "en", "5d ago"],
    [5, "day", { style: "short" }, "en", "in 5 days"],
    [-5, "day", { style: "short" }, "en", "5 days ago"],
    [1, "day", { style: "long" }, "en", "in 1 day"],
    [-1, "day", { style: "long" }, "en", "1 day ago"],
    [1, "day", { style: "narrow" }, "en", "in 1d"],
    [-1, "day", { style: "narrow" }, "en", "1d ago"],
    [1, "day", { style: "short" }, "en", "in 1 day"],
    [-1, "day", { style: "short" }, "en", "1 day ago"],
    [1, "day", { style: "short", numeric: "auto" }, "en", "tomorrow"],
    [-1, "day", { style: "short", numeric: "auto" }, "en", "yesterday"],
    [1, "day", { style: "short", numeric: "auto" }, "pl", "jutro"],
    [2, "day", { style: "short", numeric: "auto" }, "pl", "pojutrze"],
    [-1, "day", { style: "short", numeric: "auto" }, "pl", "wczoraj"],
    [-2, "day", { style: "short", numeric: "auto" }, "pl", "przedwczoraj"],
  ] as [number, Intl.RelativeTimeFormatUnit, Intl.RelativeTimeFormatOptions, Locale, string][])
  ('format %p using %p unit, %p options, %p locale', (value, unit, options, locale, expected) => {
    const result = formatRelativeTime(value, unit, options, locale);
    expect(result).toBe(expected);
  });
});