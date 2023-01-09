import { parseNumber } from "../src";

const nonBreakingSpace = String.fromCharCode(160);
const RegularWhitespace = String.fromCharCode(32);

describe('parseNumber', () => {
  test.each([
    ["-1,623.454", false, "en-GB", -1623.454],
    ["-1,62-sd3.454", false, "en-GB", -162],
    ["1,623.454", true, "en-GB", 1623.454],
    ["-1,62-sd3.454", true, "en-GB", undefined],
    ["--1,623.454", true, "en-GB", undefined],
    ["1,623-454", true, "en-GB", undefined],
    ["1,623.454", true, "en-GB", 1623.454],
    [`-1${nonBreakingSpace}062,454`, true, "pl", -1062.454],
    [`-1${RegularWhitespace}062,454`, true, "pl", -1062.454],
    [`-1 062,454`, true, "pl", -1062.454],
    ["", false, "en-GB", undefined],
    ["", true, "en-GB", undefined],
    [" ", false, "en-GB", undefined],
    [" ", true, "en-GB", undefined],
    [nonBreakingSpace, false, "en-GB", undefined],
    [nonBreakingSpace, true, "en-GB", undefined],
    ["0", false, "en-GB", 0],
    ["0", true, "en-GB", 0],
    [",0", false, "de", 0],
    [",0", true, "de", 0],
    ["-0", false, "en-GB", 0],
    ["-0", true, "en-GB", 0],
    ["+0", false, "en-GB", 0],
    ["+0", true, "en-GB", 0],
    ["1.", false, "en-GB", 1],
    ["1.", true, "en-GB", 1],
    ["1,", false, "de", 1],
    ["1,", true, "de", 1],
    ["1.0", false, "de", 10],
    ["1.0", true, "de", 10],
    [".1", false, "en-GB", 0.1],
    [".1", true, "en-GB", 0.1],
    ["1.1.1", false, "en-GB", 1.1],
    ["1.1.1", true, "en-GB", undefined],
    ["1,1,1", false, "pl", 1.1],
    ["1,1,1", true, "pl", undefined],
    ["Infinity", false, "en-GB", undefined],
    ["Infinity", true, "en-GB", undefined],
    ["11.1e+3", false, "en-GB", 11100],
    ["11.1e+3",  true, "en-GB", 11100],
    ["11.1e-3", false, "en-GB", 0.0111],
    ["11.1e-3",  true, "en-GB", 0.0111],
    ["-11.1e-3", false, "en-GB", -0.0111],
    ["-11.1e-3",  true, "en-GB", -0.0111],
    ["-1.623,454", false, "de", -1623.454],
    [`-1${nonBreakingSpace}623,454`, false, "pl", -1623.454],
    [`-1${RegularWhitespace}623,454`, false, "pl", -1623.454],
    ["12’345.78", true, "de-LI" /* Liechtenstein */, 12345.78],
    ["12’345.78", false, "de-LI" /* Liechtenstein */, 12345.78],
    ["123,456,789", true, "en", 123456789],
    ["123,456,789,123,457,000", true, "en-GB", 123456789123457000],
    [`-10`, true, "lt-LT", -10],
    [`−10`, true, "lt-LT", -10],
    [`10٫1`, true, "ar-SA", 10.1]
  ])('parse %p using strict mode (%p) with specific locale %p', (value, mode, locale, expected) => {
    const result = parseNumber(value, mode, locale);
    expect(result).toBe(expected);
  });
});