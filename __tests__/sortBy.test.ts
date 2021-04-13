import { sortBy } from "../src";

describe('sortBy', () => {
  it('empty selectors', () => {
    const users = [
      { id: 1, name: 'fred',   age: 48 },
      { id: 2, name: 'barney', age: 34 },
      { id: 3, name: 'fred',   age: 40 },
      { id: 4, name: 'barney', age: 36 }
    ];

    const result = sortBy(users, [], ["asc"], "en");
    expect(result.map(x => x.id)).toEqual([1, 2, 3, 4]);
    expect(users === result).toBeFalsy();
  });

  it('multiple selectors', () => {
    const users = [
      { id: 1, name: 'fred',   age: 48 },
      { id: 2, name: 'barney', age: 34 },
      { id: 3, name: 'fred',   age: 40 },
      { id: 4, name: 'barney', age: 36 }
    ];

    const result = sortBy(users, [x => x.name, x => x.age], ["asc", "desc"], "en");
    expect(result.map(x => x.id)).toEqual([4, 2, 1, 3]);
  });
});