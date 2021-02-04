import allTypes from "../components/pokemonTypes";

export const shuffle = (array) => {
  if (!Array.isArray(array) || !array.length) {
    throw new Error("Shuffle array is empty or not an array");
  }

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

const fixAPIName = (name) => {
  const allowed = [
    "mr-mime",
    "mime-jr",
    "mr-rime",
    "porygon-z",
    "tapu-lele",
    "tapu-koko",
    "tapu-bulu",
    "tapu-fini",
  ];
  if (allowed.some((allowedName) => allowedName === name)) {
    return name.split("-").join(" ");
  } else {
    return name.split("-")[0];
  }
};

export const grabAllPokemon = async (totalNumberOfPokemon, offsetPokemon) => {
  try {
    if (typeof totalNumberOfPokemon !== "number") {
      switch (typeof totalNumberOfPokemon) {
        case "object":
          throw new Error("total number of pokemon given as object");
        default:
          throw new Error("total number of pokemon to grab from API not given");
      }
    } else if (totalNumberOfPokemon > 898) {
      throw new Error(
        "input number more than total number of pokemon (currently 898)"
      );
    } else if (!totalNumberOfPokemon) {
      throw new Error("total number of pokemon not given or undefined");
    }
    const allPokemonFetch = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${totalNumberOfPokemon}&offset=${offsetPokemon}`
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
      pokemon.name = fixAPIName(pokemon.name);
      allPokemonNames.push(pokemon.name);
    });
    return allPokemonNames;
  } catch (error) {
    console.error(error.message);
  }
};

export const generateQuestionTopics = (pokemonQuestions, answerTopics = []) => {
  if (!Array.isArray(pokemonQuestions) || !pokemonQuestions.length) {
    throw new Error(
      "Cannot generate topics as pokemon questions is empty or not an array"
    );
  }
  while (answerTopics.length < pokemonQuestions.length) {
    const questionTopic = ["name", "type"];
    const chosenTopic = questionTopic[Math.floor(Math.random() * 2)];
    answerTopics.push(chosenTopic);
  }
  return answerTopics;
};

export const generatePokemonQuestions = async (
  numberOfRounds,
  totalNumberOfPokemon,
  offsetPokemon,
  questionSet = []
) => {
  try {
    if (totalNumberOfPokemon > 898) {
      throw new Error(
        "input number more than total number of pokemon (currently 898)"
      );
    } else if (!totalNumberOfPokemon) {
      throw new Error("total number of pokemon not given or undefined");
    }
    //grab n (10) number of pokemon from the API
    while (questionSet.length < numberOfRounds) {
      const number = Math.floor(Math.random() * totalNumberOfPokemon) + 1;
      const pokemon = {};
      const nameUrl = `https://pokeapi.co/api/v2/pokemon/${
        number + offsetPokemon
      }`;
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        number + offsetPokemon
      }.png`;

      const singlePokemonResponse = await fetch(nameUrl);
      if (!singlePokemonResponse.ok) {
        const json = await singlePokemonResponse.json();
        throw new Error(json.error);
      }
      const singlePokemonJSON = await singlePokemonResponse.json();

      //Grab and assign name
      pokemon.name = singlePokemonJSON.name;

      //remove hyphens and tags from pokemon names
      pokemon.name = fixAPIName(pokemon.name);

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
    }
    return questionSet;
  } catch (error) {
    console.error(error.message);
  }
};

export const capitaliseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generatePossibleAnswers = async (
  answers,
  topics,
  totalNumberOfPokemon,
  offsetPokemon
) => {
  try {
    if (!answers) {
      throw new Error(
        "No pokemon answers provided to build multiple choice questions from"
      );
    } else if (totalNumberOfPokemon > 898) {
      throw new Error(
        "input number more than total number of pokemon (currently 898)"
      );
    } else if (!totalNumberOfPokemon) {
      throw new Error("total number of pokemon not given or undefined");
    }
    const pokemonNames = await grabAllPokemon(
      totalNumberOfPokemon,
      offsetPokemon
    );
    const answerSets = [];

    //Generate array of answers
    const generateAnswers = (selectedPokemon, topic) => {
      const possibleAnswers = [];

      //Add correct type answer
      possibleAnswers.push(selectedPokemon[topic]);

      //Randomly choose 3 of the wrong type answers
      while (possibleAnswers.length < 4) {
        //I would like to change something here to limit the questions to that
        //generations possible answers for type, because dragon/dark doesn't make sense
        //as an answer option in gen 1
        //I would need a map for pokemonNames.length = gen = types < x
        const numberOfOptions =
          topic === "type" ? allTypes.length : pokemonNames.length;
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
  } catch (error) {
    console.error(error.message);
  }
};

export const checkTempAnswer = (holdTempAnswer, correctAnswer) => {
  //check for small errors and remove punctuation
  const removePunctuation = (answer) => {
    //regex to remove ' or . characters
    return answer.replace(/'|\./g, "");
  };

  if (holdTempAnswer === "porygon-z") {
    holdTempAnswer = "porygon z";
  } else if (holdTempAnswer === "porygon 2") {
    holdTempAnswer = "porygon2";
  } else {
    holdTempAnswer = removePunctuation(holdTempAnswer);
  }

  //check for reverse-typed types
  let reversedTempAnswer;
  if (holdTempAnswer.includes("/")) {
    reversedTempAnswer = holdTempAnswer.split("/").reverse().join("/");
  }

  if (
    holdTempAnswer === correctAnswer ||
    reversedTempAnswer === correctAnswer
  ) {
    return { holdTempAnswer: correctAnswer, valid: true };
  } else {
    return { holdTempAnswer, valid: false };
  }
};
