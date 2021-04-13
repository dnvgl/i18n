import { OptionalType, sortInplace, SortOrder } from "../src";

describe('sortInplace', () => {
  test('returns the same array intance', () => {
    const input: OptionalType<number>[] = [undefined];
    const result = sortInplace(input, "asc", "en");
    expect(input === result).toBeTruthy();
  });

  test.each([
    [[null, undefined, 1], "asc", [undefined, null, 1]],
    [[null, undefined, undefined, 1, undefined], "asc", [undefined, undefined, undefined, null, 1]],
    [[null, undefined, undefined, 1, undefined], "desc", [1, null, undefined, undefined, undefined]],
  ])('handles undefined values and returns the same array intance', (values, order, expected) => {
    const result = sortInplace(values, order as SortOrder, "en");
    expect(result).toEqual(expected);
    expect(values === result).toBeTruthy();
  });
})