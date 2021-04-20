import { sortBy } from "../src";

describe("sortBy", () => {
  describe("given an array of people", () => {
    const users = [
      { id: 1, name: "fred", age: 48 },
      { id: 2, name: "barney", age: 34 },
      { id: 3, name: "fred", age: 40 },
      { id: 4, name: "barney", age: 36 },
    ];

    describe("when sorted", () => {
      it("returns new array", () => {
        const result = sortBy(users, [(x) => x.name]);
        expect(users === result).toBeFalsy();
      });
    });

    describe("when sorted without selectors", () => {
      it("is not sorted", () => {
        const result = sortBy(users, [], 'desc');
        expect(result).toEqual(users);
      });
    });

    describe("when sorted by name ascending and age descending", () => {
      it("is sorted first by name ascending and then by age descending", () => {
        const result = sortBy(users, [(x) => x.name, (x) => x.age], ["asc", "desc"], "en");
        expect(result.map((x) => x.id)).toEqual([4, 2, 1, 3]);
      });
    });

    describe("when sorted by name descending and age without order", () => {
      it("is sorted first by name ascending and then by age using default ascending order", () => {
        const result = sortBy(users, [(x) => x.name, (x) => x.age], ["desc"], "en");
        expect(result.map((x) => x.id)).toEqual([3, 1, 2, 4]);
      });
    });

    describe("when sorted by name and age with descending order", () => {
      it("is sorted first by name and then by age using the descending order for both selectors", () => {
        const result = sortBy(users, [(x) => x.name, (x) => x.age], "desc", "en");
        expect(result.map((x) => x.id)).toEqual([1, 3, 4, 2]);
      });
    });
  });

  describe("given invalid parameters", () => {
    it("fails to compile", () => {
      // @ts-expect-error
      () => sortBy();
      // @ts-expect-error
      () => sortBy([1, 2], x => x, ['desc']);
    });
  });
});