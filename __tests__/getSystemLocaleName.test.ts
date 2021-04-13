import { getSystemLocaleName } from "../src";

describe('getSystemLocaleName', () => {
  test.each([
    ["en", "en"],
    ["en-GB", "en-GB"],
    ["en-US", "en-US"]
  ])('returns locale name for %p', (locale, expected) => {
    const result = getSystemLocaleName(locale);
    expect(result).toBe(expected);
  });
});