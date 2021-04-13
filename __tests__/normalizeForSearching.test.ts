import { normalizeForSearching } from "../src";

describe('normalizeForSearching', () => {
  test.each([
    ["   Święto  123 ", "en", "swieto 123"],
    ["Überstunden", "en", "uberstunden"],
    ["İstanbul", "tr", "istanbul", ]
  ])('normalizes %p using locale %p', (value, locale, expected) => {
    expect(normalizeForSearching(value, locale)).toEqual(expected);
  });
});