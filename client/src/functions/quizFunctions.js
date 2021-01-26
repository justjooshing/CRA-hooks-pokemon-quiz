import allTypes from "../components/pokemonTypes";

const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const grabAllPokemon = async () => {
  try {
    const allPokemonFetch = await fetch(
      "https://pokeapi.co/api/v2/pokemon/?limit=151"
    );
    if (!allPokemonFetch.ok) {
      const json = await allPokemonFetch.json();
      throw new Error(json.error);
    }
    const allPokemonJSON = await allPokemonFetch.json();

    //Push names only into an array
    const allPokemonNames = [];
    allPokemonJSON.results.forEach((pokemon) => {
      //remove the female and male tags from the nidoran names
      if (pokemon.name.includes("nidoran")) {
        pokemon.name = "nidoran";
      }
      //remove hyphen from mr mime
      if (pokemon.name === "mr-mime") {
        pokemon.name = "mr mime";
      }
      allPokemonNames.push(pokemon.name);
    });
    return allPokemonNames;
  } catch (error) {
    console.log(error.message);
  }
};

export const generateQuestionTopics = (pokemonQuestions, answerTopics = []) => {
  while (answerTopics.length < pokemonQuestions.length) {
    const questionTopic = ["name", "type"];
    const chosenTopic = questionTopic[Math.floor(Math.random() * 2)];
    answerTopics.push(chosenTopic);
  }
  return answerTopics;
};

export const generatePokemonQuestions = async (
  numberOfPokemon,
  questionSet = []
) => {
  //grab n (10) number of pokemon from the API
  while (questionSet.length < numberOfPokemon) {
    const number = Math.floor(Math.random() * 151) + 1;
    const pokemon = {};
    const nameUrl = `https://pokeapi.co/api/v2/pokemon/${number}`;
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;

    try {
      const singlePokemonResponse = await fetch(nameUrl);
      if (!singlePokemonResponse.ok) {
        const json = await singlePokemonResponse.json();
        throw new Error(json.error);
      }
      const singlePokemonJSON = await singlePokemonResponse.json();

      //Grab and assign name
      pokemon.name = singlePokemonJSON.name;

      //remove the female and male tags from the nidoran names
      if (pokemon.name.includes("nidoran")) {
        pokemon.name = "nidoran";
      }

      //remove hypen from mr mime
      if (pokemon.name === "mr-mime") {
        pokemon.name = "mr mime";
      }

      //Grab, assign and join type
      pokemon.type = [];
      singlePokemonJSON.types.forEach((typeIndex) => {
        pokemon.type.push(typeIndex.type.name);
      });
      pokemon.type = pokemon.type.join("/");

      //Assign url
      pokemon.image = imageUrl;

      //Assign pokemon to set
      if (
        !questionSet.some((pokemonIndex) => pokemonIndex.name === pokemon.name)
      ) {
        questionSet.push(pokemon);
      }
    } catch (error) {
      console.log(error.message);
      return;
    }
  }
  return questionSet;
};

export const capitaliseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generatePossibleAnswers = async (answers, topics) => {
  try {
    const pokemonNames = await grabAllPokemon();
    if (answers) {
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

      answers.forEach((selectedPokemon, index) => {
        generateAnswers(selectedPokemon, topics[index]);
      });

      answerSets.forEach((roundOptions) => shuffle(roundOptions));
      return answerSets;
    }
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export const checkTempAnswer = (holdTempAnswer, correctAnswer) => {
  if (holdTempAnswer === "farfetch'd") {
    holdTempAnswer = "farfetchd";
  }
  if (holdTempAnswer === correctAnswer) {
    return { holdTempAnswer, valid: true };
  } else if (holdTempAnswer.includes("/")) {
    holdTempAnswer = holdTempAnswer.split("/").reverse().join("/");
    if (holdTempAnswer === correctAnswer) {
      return { holdTempAnswer, valid: true };
    } else {
      return { holdTempAnswer, valid: false };
    }
  } else {
    return { holdTempAnswer, valid: false };
  }
};
