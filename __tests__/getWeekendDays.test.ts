import { getWeekendDays } from "../src/index.js";
import { getWeekendDaysByRegionInternal } from "../src/internal/getWeekendDaysByRegionInternal.js";

const supportsGetWeekInfo = typeof new Intl.Locale("en").getWeekInfo === "function";

const sortedWeekend = (arr: readonly number[]): number[] => [...arr].sort((a, b) => a - b);

// The list of regions comes straight from Node's own Intl data, not from our source.
const allRegions = (): string[] => {
  const displayNames = new Intl.DisplayNames(["en"], { type: "region" });
  const firstCharCode = "A".charCodeAt(0);
  const lastCharCode = "Z".charCodeAt(0);
  const regions: string[] = [];
  for (let first = firstCharCode; first <= lastCharCode; first++) {
    for (let second = firstCharCode; second <= lastCharCode; second++) {
      const code = String.fromCharCode(first) + String.fromCharCode(second);
      const name = displayNames.of(code);
      // Skip codes with no data and the "Unknown Region" (ZZ) pseudo-code.
      if (name && name !== code && !/unknown/i.test(name)) regions.push(code);
    }
  }
  return regions;
};

// Replicates getWeekendDays' fallback path: resolve the region, then map it.
const fallbackWeekend = (locale: string): number[] => {
  const loc = new Intl.Locale(locale);
  const region = (typeof loc.maximize === "function" ? loc.maximize().region : loc.region) ?? "";
  return getWeekendDaysByRegionInternal(region);
};

describe("getWeekendDays", () => {
  test.each([
    ["en-US", [6, 7]],
    ["pl-PL", [6, 7]],
    ["ar-EG", [5, 6]],
    ["he-IL", [5, 6]],
    ["fa-AF", [4, 5]],
    ["en-IN", [7]],
    ["fa-IR", [5]],
    ["ar", [5, 6]],
  ] as const)("returns the expected weekend for %s", (locale, expected) => {
    expect(sortedWeekend(getWeekendDays(locale))).toEqual(expected);
  });

  test("accepts an Intl.Locale instance", () => {
    expect(sortedWeekend(getWeekendDays(new Intl.Locale("ar-SA")))).toEqual([5, 6]);
  });

  test("falls back to the system locale when no argument is given", () => {
    const weekend = getWeekendDays();
    expect(Array.isArray(weekend)).toBe(true);
    expect(weekend.length).toBeGreaterThanOrEqual(1);
    expect(weekend.every((d) => Number.isInteger(d) && d >= 1 && d <= 7)).toBe(true);
    expect(new Set(weekend).size).toBe(weekend.length);
  });
});

(supportsGetWeekInfo ? describe : describe.skip)("fallback vs native Intl.Locale.getWeekInfo", () => {
  test("resolves the native weekend for every region Node knows", () => {
    const mismatches: string[] = [];

    for (const region of allRegions()) {
      const native = sortedWeekend(new Intl.Locale("und-" + region).getWeekInfo().weekend);
      const fallback = sortedWeekend(getWeekendDaysByRegionInternal(region));

      if (JSON.stringify(native) !== JSON.stringify(fallback)) {
        mismatches.push(`${region}: native=${JSON.stringify(native)} fallback=${JSON.stringify(fallback)}`);
      }
    }

    expect(mismatches).toEqual([]);
  });

  test("the full fallback path matches native across every language/region", () => {
    const languages = ["und", "en", "ar", "fr", "zh", "hi", "fa", "ur", "he", "uz"];
    const mismatches: string[] = [];
    let count = 0;

    for (const region of allRegions()) {
      for (const language of languages) {
        const tag = `${language}-${region}`;
        count++;

        const native = sortedWeekend(new Intl.Locale(tag).getWeekInfo().weekend);
        const fallback = sortedWeekend(fallbackWeekend(tag));

        if (JSON.stringify(native) !== JSON.stringify(fallback)) {
          mismatches.push(`${tag}: native=${JSON.stringify(native)} fallback=${JSON.stringify(fallback)}`);
        }
      }
    }

    expect(count).toBeGreaterThan(1000);
    expect(mismatches).toEqual([]);
  });
});
