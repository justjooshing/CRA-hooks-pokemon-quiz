import allTypes from "../components/pokemonTypes";
import grabAllPokemon from "./grabAllPokemon";
import shuffle from "./shuffle";

const generatePossibleAnswers = async (answers, topics) => {
  if (answers) {
    const runGrabPokemonNames = async () => {
      const names = await grabAllPokemon();
      return names;
    };

    const answerSets = [];

    //Generate array of answers
    const generateAnswers = (selectedPokemon, topic) => {
      const possibleAnswers = [];

      //Add correct type answer
      possibleAnswers.push(selectedPokemon[topic]);

      //Randomly choose 3 of the wrong type answers
      while (possibleAnswers.length < 4) {
        const numberOfOptions = topic === "type" ? 37 : 151;
        const options = topic === "type" ? allTypes : pokemonNames;
        const num = Math.floor(Math.random() * numberOfOptions);
        if (!possibleAnswers.includes(options[num])) {
          possibleAnswers.push(options[num]);
        }
      }
      answerSets.push(possibleAnswers);
    };

    const generateAnswerSets = (selectedPokemon, index) => {
      const topic = topics[index];
      generateAnswers(selectedPokemon, topic);
    };
    const pokemonNames = await runGrabPokemonNames();
    answers.forEach((selectedPokemon, index) => {
      generateAnswerSets(selectedPokemon, index);
    });

    answerSets.forEach((roundOptions) => shuffle(roundOptions));

    return answerSets;
  }
};

export default generatePossibleAnswers;
