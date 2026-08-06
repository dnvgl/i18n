import { getMinusSign } from "../src/index.js";

describe('getMinusSign', () => {
  test.each([
    ["en", "-"],
    ["de", "-"],
    ["pl", "-"],
    ["zh", "-"],
  ])('returns proper value for %p locale', (locale, expected) => {
    expect(getMinusSign(locale)).toBe(expected);
  });
});