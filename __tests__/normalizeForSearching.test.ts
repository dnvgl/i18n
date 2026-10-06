import { normalizeForSearching } from "../src/index.js";

describe('normalizeForSearching', () => {
  test.each([
    ["   Święto  123 ", "en", "swieto 123"],
    ["Überstunden", "en", "uberstunden"],
    ["İstanbul", "tr", "istanbul", ],
    ["Łódź", "pl", "lodz"],
    ["ŁUKASZ Żółć", "pl", "lukasz zolc"],
    ["Bærum Øst", "no", "baerum ost"],
    ["Straße", "de", "strasse"],
    ["Đakovo", "hr", "dakovo"],
    ["Iğdır", "tr", "igdir"],
    ["Ħamrun", "en", "hamrun"],
    ["Œuvre", "fr", "oeuvre"]
  ])('normalizes %p using locale %p', (value, locale, expected) => {
    expect(normalizeForSearching(value, locale)).toEqual(expected);
  });
});