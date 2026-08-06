import { lowercaseFirstLetter } from "../src/index.js";

describe('lowercaseFirstLetter', () => {
  test.each([
    ["İtalya", "tr", "italya"],
    ["Italya", "en", "italya"],
    ["Test", "en", "test"],
    ["T", "en", "t"],
    ["t", "en", "t"],
    ["", "en", ""],
    [" ", "en", " "],
  ])('returns proper string %p using %p locale', (value, locale, expected) => {
    expect(lowercaseFirstLetter(value, locale)).toEqual(expected);
  });
});