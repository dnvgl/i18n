import { DateFormatPrecision, getMomentFormat } from "../src";

describe('getMomentFormat', () => {
  const cases: [string, DateFormatPrecision, string][] = [
    ["pl", "days", "D[.]MM[.]YYYY"],
    ["pl", "seconds", "D[.]MM[.]YYYY[, ]HH[:]mm[:]ss"],
    ["pl", "minutes", "D[.]MM[.]YYYY[, ]HH[:]mm"],
    ["de", "days", "D[.]M[.]YYYY"],
    ["de", "seconds", "D[.]M[.]YYYY[, ]HH[:]mm[:]ss"],
    ["de", "minutes", "D[.]M[.]YYYY[, ]HH[:]mm"],
    ["en-US", "days", "M[/]D[/]YYYY"],
    ["en-US", "seconds", "M[/]D[/]YYYY[, ]h[:]mm[:]ss[ ]A"],
    ["en-US", "minutes", "M[/]D[/]YYYY[, ]h[:]mm[ ]A"],
    ["en-GB", "days", "DD[/]MM[/]YYYY"],
    ["en-GB", "seconds", "DD[/]MM[/]YYYY[, ]HH[:]mm[:]ss"],
    ["en-GB", "minutes", "DD[/]MM[/]YYYY[, ]HH[:]mm"],
    ["zh", "days", "YYYY[/]M[/]D"],
    ["zh", "seconds", "YYYY[/]M[/]D[ ]HH[:]mm[:]ss"],
    ["zh", "minutes", "YYYY[/]M[/]D[ ]HH[:]mm"],
    ["zh-HK", "days", "D[/]M[/]YYYY"],
    ["zh-HK", "seconds", "D[/]M[/]YYYY[ ]Ah[:]mm[:]ss"],
    ["zh-HK", "minutes", "D[/]M[/]YYYY[ ]Ah[:]mm"],
    ["fr-CA", "seconds", "YYYY[-]MM[-]DD[, ]HH[ h ]mm[ min ]ss[ s]"],
    ["en-AU", "seconds", "DD[/]MM[/]YYYY[, ]h[:]mm[:]ss[ ]A"],
    ["ar-sa", "seconds", "DD[‏/]MM[‏/]YYYY[ ][ في ]h[:]mm[:]ss[ ]A"]
  ];

  test.each(cases)('returns format for %p locale when time is included: %p', (locale, precision, expected) => {
    const result = getMomentFormat(precision, locale);
    expect(result).toBe(expected);
  });
});