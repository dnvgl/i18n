import { plural, PluralizationLang } from "../src";

describe('plural', () => {
  test.each([
    ["pies|psy|psów", "pl", 0, "psów"],
    ["pies|psy|psów", "pl", 1, "pies"],
    ["pies|psy|psów", "pl", 2, "psy"],
    ["pies|psy|psów", "pl", 3, "psy"],
    ["pies|psy|psów", "pl", 7, "psów"],
    ["pies|psy|psów", "pl", 10, "psów"],
    ["dog|dogs", "en", 0, "dogs"],
    ["dog|dogs", "en", 1, "dog"],
    ["dog|dogs", "en", 3, "dogs"],
    ["dog|dogs", "en", 10, "dogs"],
    ["只狗", "zh", 0, "只狗"],
    ["只狗", "zh", 1, "只狗"],
    ["只狗", "zh", 3, "只狗"],
    ["只狗", "zh", 10, "只狗"],
  ] as [string, PluralizationLang, number, string][])('plural pattern %p using %p locale and %p number', (value, locale, n, expected) => {
    expect(plural(value, n, locale)).toEqual(expected);
  });

  test.each([
    [["cat", "cats"], "en", 0, "cats"],
    [["cat", "cats"], "en", 1, "cat"]
  ] as [string[], PluralizationLang, number, string][])('plural array %p using %p locale and %p number', (value, locale, n, expected) => {
    expect(plural(value, n, locale)).toEqual(expected);
  });

  test.each([
    ["cat|cats", "en", "|", 0, "cats"],
    ["cat,cats", "en", ",", 0, "cats"],
    ["cat;cats", "en", ";", 0, "cats"]
  ] as [string, PluralizationLang, string, number, string][])('plural pattern %p using %p locale, %p speparator and %p number', (value, locale, separator, n, expected) => {
    expect(plural(value, n, locale, separator)).toEqual(expected);
  });

  test('plural returns empty string when index is out of bounds', () => {
    expect(plural([], 0, "en")).toEqual("");
    expect(plural("", 0, "en")).toEqual("");
  });

  test('plural returns first word when index is out of bounds and there are some words', () => {
    expect(plural("cat;cats", 0, "en", "|")).toEqual("cat;cats");
    expect(plural(["cat"], 0, "en")).toEqual("cat");
  });

  test("fails to compile", () => {
    // @ts-expect-error
    plural(["cat", "cats"], "en", 0, "|"); // HINT: last argument is not acceptable when pattern is an array
    // @ts-expect-error
    plural(["cat", "cats"], "en"); // HINT: missing arguments
  });
});