import {
  shuffle,
  grabAllPokemon,
  generateQuestionTopics,
  generatePokemonQuestions,
  generatePossibleAnswers,
  checkTempAnswer,
} from "../quizFunctions";

describe("shuffle function", () => {
  it("doesn't return an unshuffled array", () => {
    const unshuffled = [1, 2, 3, 4, 5];
    const actual = shuffle([1, 2, 3, 4, 5]);
    expect(actual).not.toEqual(unshuffled);
  });
  it("errors on empty array", () => {
    const error = "Shuffle array is empty or not an array";
    const actual = () => shuffle([]);
    expect(actual).toThrowError(error);
  });
  it("errors on object argument", () => {
    const error = "Shuffle array is empty or not an array";
    const actual = () => shuffle({ test: 1, bar: "foo" });
    expect(actual).toThrowError(error);
  });
  it("errors on string argument", () => {
    const error = "Shuffle array is empty or not an array";
    const actual = () => shuffle("tomato soup");
    expect(actual).toThrowError(error);
  });
  it("errors on no argument", () => {
    const error = "Shuffle array is empty or not an array";
    const actual = () => shuffle();
    expect(actual).toThrowError(error);
  });
});

describe("grab all pokemon", () => {
  it("returns an array of n pokemon names", async () => {
    expect.assertions(1);
    const actual = await grabAllPokemon(155);
    const expected = 155;
    expect(actual.length).toEqual(expected);
  });
  it("errors when n is too high", async () => {
    expect.assertions(1);
    const actual = await grabAllPokemon(1550);
    const error =
      "input number more than total number of pokemon (currently 898)";
    await expect(actual).toEqual(error);
  });
  it("errors when n is less than gen 1 number", async () => {
    expect.assertions(1);
    const actual = await grabAllPokemon(14);
    const error = "input number less than Gen 1 number of pokemon (151)";
    await expect(actual).toEqual(error);
  });
  it("errors when called without an argument", async () => {
    expect.assertions(1);
    const actual = await grabAllPokemon();
    const error = "total number of pokemon to grab from API not given";
    await expect(actual).toEqual(error);
  });
  it("errors when called with an object", async () => {
    expect.assertions(2);
    const error = "total number of pokemon given as object";
    const objectActual = await grabAllPokemon({ b: 1, c: "dog" });
    await expect(objectActual).toEqual(error);
    const arrayActual = await grabAllPokemon([1, 2, 3, "tuna", "banana", true]);
    await expect(arrayActual).toEqual(error);
  });
});

describe("generates type/name for question topics", () => {
  it("returns an array with length equal to questions given", () => {
    //should I be testing that the objects contain something?
    //This should be being picked up by generatePokemonQuestions
    const pokemonQuestions = [{}, {}, {}, {}, {}, {}];
    const expected = 6;
    const actual = generateQuestionTopics(pokemonQuestions);
    expect(actual.length).toEqual(expected);
  });
  it("extends an array when pokemon questions are increased", () => {
    const pokemonQuestions = [{}, {}, {}, {}, {}, {}, {}, {}];
    const currentTopics = ["type", "name", "type", "type", "name", "type"];
    const expected = 8;
    const actual = generateQuestionTopics(pokemonQuestions, currentTopics);
    expect(actual.length).toEqual(expected);
  });
  it("errors when argument is empty or not an array", () => {
    const error =
      "Cannot generate topics as pokemon questions is empty or not an array";
    const noArg = () => generateQuestionTopics();
    expect(noArg).toThrow(error);
    const obj = () => generateQuestionTopics({ foo: "bar" });
    expect(obj).toThrow(error);
    const str = () => generateQuestionTopics("potato farmer");
    expect(str).toThrow(error);
  });
});

describe("generating each individual pokemon question dataset (name, image, type)", () => {
  it("generates 10 initially", async () => {
    const totalNumberOfPokemon = 151;
    const numberOfRounds = 10;
    const actual = await generatePokemonQuestions(
      numberOfRounds,
      totalNumberOfPokemon
    );
    await expect(Object.keys(actual).length).toEqual(10);
  });
  it("generates extra questions equal to number of rounds", async () => {
    const totalNumberOfPokemon = 151;
    const numberOfRounds = 15;
    const currentPokemonQuestions = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    const actual = await generatePokemonQuestions(
      numberOfRounds,
      totalNumberOfPokemon,
      currentPokemonQuestions
    );
    await expect(Object.keys(actual).length).toEqual(15);
  });
  it("errors when n is too high", async () => {
    expect.assertions(1);
    const totalNumberOfPokemon = 1550;
    const numberOfRounds = 10;
    const actual = await generatePokemonQuestions(
      numberOfRounds,
      totalNumberOfPokemon
    );
    const error =
      "input number more than total number of pokemon (currently 898)";
    await expect(actual).toEqual(error);
  });
  it("errors when n is less than gen 1 number", async () => {
    expect.assertions(1);
    const totalNumberOfPokemon = 20;
    const numberOfRounds = 10;
    const actual = await generatePokemonQuestions(
      numberOfRounds,
      totalNumberOfPokemon
    );
    const error = "input number less than Gen 1 number of pokemon (151)";
    await expect(actual).toEqual(error);
  });
});

describe("generates multiple choice sets in easy mode", () => {
  it("returns a set of possible answers for each pokemon", async () => {
    const answers = [
      { name: "test", type: "beetle" },
      { name: "john", type: "frog" },
      { name: "greg", type: "bathtub" },
    ];
    const topics = ["type", "name", "type"];
    const totalNumber = 151;
    const actual = await generatePossibleAnswers(answers, topics, totalNumber);
    const expected = 3;
    await expect(actual.length).toEqual(expected);
  });
  it("errors when n is too high", async () => {
    expect.assertions(1);
    const answers = [
      { name: "test", type: "beetle" },
      { name: "john", type: "frog" },
      { name: "greg", type: "bathtub" },
    ];
    const totalNumber = 1500;
    const topics = ["type", "name", "type"];
    const actual = await generatePossibleAnswers(answers, topics, totalNumber);
    const error =
      "input number more than total number of pokemon (currently 898)";
    await expect(actual).toEqual(error);
  });
  it("errors when n is less than gen 1 number", async () => {
    expect.assertions(1);
    const answers = [
      { name: "test", type: "beetle" },
      { name: "john", type: "frog" },
      { name: "greg", type: "bathtub" },
    ];
    const totalNumber = 15;
    const topics = ["type", "name", "type"];
    const actual = await generatePossibleAnswers(answers, topics, totalNumber);
    const error = "input number less than Gen 1 number of pokemon (151)";
    await expect(actual).toEqual(error);
  });
});

describe("check for minor discrepancies in submitted answer", () => {
  it("removes punctuation from input", () => {
    let tempFarfetchd = "farfetch'd";
    const correctFarfetchd = "farfetchd";
    expect(checkTempAnswer(tempFarfetchd, correctFarfetchd)).toEqual({
      holdTempAnswer: correctFarfetchd,
      valid: true,
    });
    let tempMime = "mr mime.";
    const correctMime = "mr mime";
    expect(checkTempAnswer(tempMime, correctMime)).toEqual({
      holdTempAnswer: correctMime,
      valid: true,
    });
  });
  it("reverses and checks answers with /", () => {
    const tempAnswer = "fire/horse";
    const correctAnswer = "horse/fire";
    expect(checkTempAnswer(tempAnswer, correctAnswer)).toEqual({
      holdTempAnswer: correctAnswer,
      valid: true,
    });
  });
});
