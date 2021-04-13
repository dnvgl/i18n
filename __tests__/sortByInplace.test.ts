import { sortByInplace } from "../src";

describe('sortByInplace', () => {
  it('complex', () => {
    const users = [
      { id: 1, name: 'fred',   age: 48 },
      { id: 2, name: 'barney', age: 34 },
      { id: 3, name: 'fred',   age: 40 },
      { id: 4, name: 'barney', age: 36 }
    ];

    const result = sortByInplace(users, [x => x.name, x => x.age], ["asc", "desc"], "en");

    expect(users === result).toBeTruthy();
    expect(result.map(x => x.id)).toEqual([4, 2, 1, 3]);
  })
});