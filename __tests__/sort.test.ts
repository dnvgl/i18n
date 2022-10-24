import { sort, SortOrder } from "../src";

describe('sort', () => {
  test('returns new array instance', () => {
    const input: number[] = [];
    const result = sort(input, "asc", "en");
    expect(input !== result).toBeTruthy();
  });

  test.each([
    [[1, 10, 8], "asc", [1, 8, 10]],
    [[1, 10, 8], "desc", [10, 8, 1]],
    [[Infinity, 1], "asc", [1, Infinity]],
    [[1, Infinity], "desc", [Infinity, 1]],
    [[1, -Infinity], "asc", [-Infinity, 1]],
    [[-Infinity, 1], "desc", [1, -Infinity]],
  ])('sorts numbers %p using %p order', (value, order, expected) => {
    const result = sort(value, order as SortOrder, "en");
    expect(result).toEqual(expected);
  });

  test.each([
    [[new Date(2018, 5, 10), new Date(2018, 5, 5)], "asc", [new Date(2018, 5, 5), new Date(2018, 5, 10)]],
    [[new Date(2020, 5, 5), new Date(2018, 5, 5)], "asc", [new Date(2018, 5, 5), new Date(2020, 5, 5)]]
  ])('sorts dates (Date object) %p using %p order', (value, order, expected) => {
    const result = sort(value, order as SortOrder, "en");
    expect(result).toEqual(expected);
  });

  test.each([
    [["2020-05-10", "2020-08-10"], "desc", ["2020-08-10", "2020-05-10"]],
    [["2020-05-10", "2021-03-22T15:26:52.212Z"], "desc", ["2021-03-22T15:26:52.212Z", "2020-05-10"]],
  ])('sorts dates (ISO string) %p using %p order', (value, order, expected) => {
    const result = sort(value, order as SortOrder, "en");
    expect(result).toEqual(expected);
  });

  test.each([
    [[null, 1], "asc", [null, 1]],
    [[null, 1], "desc", [1, null]],
    [[undefined, 1], "asc", [undefined, 1]],
    [[undefined, 1], "desc", [1, undefined]],
    [[NaN, 1], "asc", [NaN, 1]],
    [[NaN, 1], "desc", [1, NaN]],
    [[null, NaN, undefined, 1], "asc", [undefined, null, NaN, 1]],
    [[null, NaN, undefined, 1], "desc", [1, NaN, null, undefined]]
  ])('treats null and undefined (numbers) in the same way %p with %p order', (value, order, expected) => {
    const result = sort(value, order as SortOrder, "en");
    expect(result).toEqual(expected);
  });

  test.each([
    [[new Date(2018, 5, 10), null], "asc", [null, new Date(2018, 5, 10)]],
    [[null, new Date(2018, 5, 10), ], "desc", [new Date(2018, 5, 10), null]],
    [[new Date(2018, 5, 10), undefined], "asc", [undefined, new Date(2018, 5, 10)]],
    [[undefined, new Date(2018, 5, 10), ], "desc", [new Date(2018, 5, 10), undefined]],
  ])('treats null and undefined (dates) in the same way %p with %p order', (value, order, expected) => {
    const result = sort(value, order as SortOrder, "en");
    expect(result).toEqual(expected);
  });

  test.each([
    [["b", "ą", "a"], "asc", "pl", ["a", "ą", "b"]],
    [["a", "ą", "b"], "desc", "pl", ["b", "ą", "a"]],
    [['己', '孔', '乙'], "asc", "en", ['乙', '孔', '己']], // HINT: correct English sorting, but broken from a Chinese point of view
    [['己', '孔', '乙'], "asc", "de", ['乙', '孔', '己']], // HINT: correct German sorting, but broken from a Chinese point of view
    [['己', '孔', '乙'], "asc", "zh", ['己', '孔', '乙']], // HINT: Chinese -> Chinese (Simplified)
    [['己', '孔', '乙'], "asc", "zh-CN", ['己', '孔', '乙']], // HINT: Chinese (Simplified)
    [['己', '孔', '乙'], "asc", "zh-TW", ['乙', '己', '孔']], // HINT: Chinese (Traditional, Taiwan)
    [['己', '孔', '乙'], "asc", "zh-HK", ['乙', '己', '孔']], // HINT: Chinese (Traditional)
  ])('sorts string %p using %p order and %p locale', (value, order, locale, expected) => {
    const result = sort(value, order as SortOrder, locale);
    expect(result).toEqual(expected);
  });
});