import { testFn, shuffle, grabAllPokemon } from "./quizFunctions";

describe("shuffle function", () => {
  // it("doesn't return an unshuffled array", () => {
  //   const unshuffled = [1, 2, 3, 4, 5];
  //   const actual = shuffle([1, 2, 3, 4, 5]);
  //   expect(actual).not.toBe(unshuffled);
  // });
  // it("errors on empty array", () => {
  //   const error = "Shuffle array is empty";
  //   const actual = testFn([]);
  //   expect(actual).toThrowError(error);
  // });
});

describe("grab all pokemon", () => {
  it("returns an array of n pokemon names", async () => {
    const actual = await grabAllPokemon(155);
    const expected = 155;
    expect(actual.length).toEqual(expected);
  });
});
