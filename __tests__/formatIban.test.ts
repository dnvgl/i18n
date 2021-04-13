import { formatIban } from "../src";

const IntlWhitespace = String.fromCharCode(160);

describe('formatIban', () => {
  test.each([
    ["", ""],
    ["S", "S"],
    ["SE", "SE"],
    ["SE3", "SE3"],
    ["SE35", "SE35"],
    ["SE355", "SE35 5"],
    ["SE35 5000 0000 0549 1000 0003", "SE35 5000 0000 0549 1000 0003"],
    ["SE3550000000054910000003", "SE35 5000 0000 0549 1000 0003"]
  ])('formats %p', (value, expected) => {
    const result = formatIban(value);
    expect(result).toBe(expected);
  });

  test.each([
    ["BE71096123456769", " ", "BE71 0961 2345 6769"],
    ["SE3550000000054910000003", IntlWhitespace, `SE35${IntlWhitespace}5000${IntlWhitespace}0000${IntlWhitespace}0549${IntlWhitespace}1000${IntlWhitespace}0003`],
  ])('formats %p using %p separator', (value, separator, expected) => {
    const result = formatIban(value, separator);
    expect(result).toBe(expected);
  });
});