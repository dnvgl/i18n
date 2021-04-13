import { capitalizeFirstLetter } from "../src";

describe('capitalizeFirstLetter', () => {
  test.each([
    ["italya", "tr", "İtalya"],
    ["italya", "en", "Italya"],
    ["test", "en", "Test"],
    ["t", "en", "T"],
    ["T", "en", "T"],
    ["", "en", ""],
    [" ", "en", " "],
  ])('returns proper string %p using %p locale', (value, locale, expected) => {
    expect(capitalizeFirstLetter(value, locale)).toEqual(expected);
  });
});