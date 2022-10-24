import { DateFormatPrecision, getDateFnsFormat } from "../src";

describe('getDateFnsFormat', () => {
  const cases: [string, DateFormatPrecision, string][] = [
    ["pl", "days", "d'.'MM'.'yyyy"],
    ["pl", "seconds", "d'.'MM'.'yyyy', 'HH':'mm':'ss"],
    ["pl", "minutes", "d'.'MM'.'yyyy', 'HH':'mm"],
    ["de", "days", "d'.'M'.'yyyy"],
    ["de", "seconds", "d'.'M'.'yyyy', 'HH':'mm':'ss"],
    ["de", "minutes", "d'.'M'.'yyyy', 'HH':'mm"],
    ["en-US", "days", "M'/'d'/'yyyy"],
    ["en-US", "seconds", "M'/'d'/'yyyy', 'h':'mm':'ss' 'A"],
    ["en-US", "minutes", "M'/'d'/'yyyy', 'h':'mm' 'A"],
    ["en-GB", "days", "dd'/'MM'/'yyyy"],
    ["en-GB", "seconds", "dd'/'MM'/'yyyy', 'HH':'mm':'ss"],
    ["en-GB", "minutes", "dd'/'MM'/'yyyy', 'HH':'mm"],
    ["zh", "days", "yyyy'/'M'/'d"],
    ["zh", "seconds", "yyyy'/'M'/'d' 'HH':'mm':'ss"],
    ["zh", "minutes", "yyyy'/'M'/'d' 'HH':'mm"],
    ["zh-HK", "days", "d'/'M'/'yyyy"],
    ["zh-HK", "seconds", "d'/'M'/'yyyy' 'Ah':'mm':'ss"],
    ["zh-HK", "minutes", "d'/'M'/'yyyy' 'Ah':'mm"],
    ["fr-CA", "seconds", "yyyy'-'MM'-'dd' 'HH' h 'mm' min 'ss' s'"],
    ["en-AU", "seconds", "dd'/'MM'/'yyyy', 'h':'mm':'ss' 'A"],
    ["ar-sa", "seconds", "dd'‏/'MM'‏/'yyyy' 'G' في 'h':'mm':'ss' 'A"]
  ];

  test.each(cases)('returns format for %p locale when time is included: %p', (locale, precision, expected) => {
    const result = getDateFnsFormat(precision, locale);
    expect(result).toBe(expected);
  });
});