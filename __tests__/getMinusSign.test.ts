import { getMinusSign } from "../src";

describe('getMinusSign', () => {
  test.each([
    ["en", "-"],
    ["de", "-"],
    ["pl", "-"],
    ["zh", "-"],
  ])('returns proper value for %p locale', (locale, expected) => {
    expect(getMinusSign(locale)).toBe(expected);
  });
});