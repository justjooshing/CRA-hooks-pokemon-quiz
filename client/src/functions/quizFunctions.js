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

export const grabAllPokemon = async (totalNumberOfPokemon) => {
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
    } else if (totalNumberOfPokemon < 151) {
      throw new Error("input number less than Gen 1 number of pokemon (151)");
    }
    const allPokemonFetch = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${totalNumberOfPokemon}`
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
    return error.message;
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
  questionSet = []
) => {
  try {
    if (totalNumberOfPokemon > 898) {
      throw new Error(
        "input number more than total number of pokemon (currently 898)"
      );
    } else if (totalNumberOfPokemon < 151) {
      throw new Error("input number less than Gen 1 number of pokemon (151)");
    }
    //grab n (10) number of pokemon from the API
    while (questionSet.length < numberOfRounds) {
      const number = Math.floor(Math.random() * totalNumberOfPokemon) + 1;
      const pokemon = {};
      const nameUrl = `https://pokeapi.co/api/v2/pokemon/${number}`;
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;

      const singlePokemonResponse = await fetch(nameUrl);
      if (!singlePokemonResponse.ok) {
        const json = await singlePokemonResponse.json();
        throw new Error(json.error);
      }
      const singlePokemonJSON = await singlePokemonResponse.json();

      //Grab and assign name
      pokemon.name = singlePokemonJSON.name;

      //remove hyphens and tags from pokemon names
      if (pokemon.name.includes("nidoran")) {
        pokemon.name = "nidoran";
      } else if (pokemon.name === "mr-mime") {
        pokemon.name = "mr mime";
      } else if (pokemon.name === "mime-jr") {
        pokemon.name = "mime jr";
      } else if (pokemon.name === "deoxys-normal") {
        pokemon.name = "deoxys";
      } else if (pokemon.name === "wormadam-plant") {
        pokemon.name = "wormadam";
      } else if (pokemon.name.includes("basculin")) {
        pokemon.name = "basculin";
      } else if (pokemon.name === "porygon-z") {
        pokemon.name = "porygon z";
      } else if (pokemon.name === "giratina-altered") {
        pokemon.name = "giratina";
      } else if (pokemon.name === "shaymin-altered") {
        pokemon.name = "shaymin";
      } else if (pokemon.name === "darmanitan-standard") {
        pokemon.name = "darmanitan";
      } else if (pokemon.name === "tornadus-incarnate") {
        pokemon.name = "tornadus";
      } else if (pokemon.name === "thundurus-incarnate") {
        pokemon.name = "thundurus";
      } else if (pokemon.name === "landorus-incarnate") {
        pokemon.name = "landorus";
      } else if (pokemon.name === "keldeo-ordinary") {
        pokemon.name = "keldeo";
      } else if (pokemon.name === "meloetta-aria") {
        pokemon.name = "meloetta";
      } else if (pokemon.name === "meowstic-male") {
        pokemon.name = "meowstic";
      } else if (pokemon.name === "aegislash-shield") {
        pokemon.name = "aegislash";
      } else if (pokemon.name === "pumpkaboo-average") {
        pokemon.name = "pumpkaboo";
      } else if (pokemon.name === "gourgeist-average") {
        pokemon.name = "gourgeist";
      } else if (pokemon.name === "oricorio-baile") {
        pokemon.name = "oricorio";
      } else if (pokemon.name === "lycanroc-midday") {
        pokemon.name = "lycanroc";
      } else if (pokemon.name === "wishiwashi-solo") {
        pokemon.name = "wishiwashi";
      } else if (pokemon.name === "minior-red-meteor") {
        pokemon.name = "minior";
      } else if (pokemon.name === "mimikyu-disguised") {
        pokemon.name = "mimikyu";
      } else if (pokemon.name === "mimikyu-disguised") {
        pokemon.name = "mimikyu";
      } else if (pokemon.name === "tapu-lele") {
        pokemon.name = "tapu lele";
      } else if (pokemon.name === "tapu-koko") {
        pokemon.name = "tapu koko";
      } else if (pokemon.name === "tapu-bulu") {
        pokemon.name = "tapu bulu";
      } else if (pokemon.name === "tapu-fini") {
        pokemon.name = "tapu fini";
      } else if (pokemon.name === "toxtricity-amped") {
        pokemon.name = "toxtricity";
      } else if (pokemon.name === "mr-rime") {
        pokemon.name = "mr rime";
      } else if (pokemon.name === "eiscue-ice") {
        pokemon.name = "eiscue";
      } else if (pokemon.name === "indeedee-male") {
        pokemon.name = "indeedee";
      } else if (pokemon.name === "zacian-hero") {
        pokemon.name = "zacian";
      } else if (pokemon.name === "zamazenta-hero") {
        pokemon.name = "zamazenta";
      } else if (pokemon.name === "urshifu-single-strike") {
        pokemon.name = "urshifu";
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
    }
    return questionSet;
  } catch (error) {
    return error.message;
  }
};

export const capitaliseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generatePossibleAnswers = async (
  answers,
  topics,
  totalNumberOfPokemon
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
    } else if (totalNumberOfPokemon < 151) {
      throw new Error("input number less than Gen 1 number of pokemon (151)");
    }
    const pokemonNames = await grabAllPokemon(totalNumberOfPokemon);
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
    return error.message;
  }
};

export const checkTempAnswer = (holdTempAnswer, correctAnswer) => {
  //check for small errors and remove punctuation
  if (holdTempAnswer === "farfetch'd") {
    holdTempAnswer = "farfetchd";
  } else if (holdTempAnswer === "mr mime.") {
    holdTempAnswer = "mr mime";
  } else if (holdTempAnswer === "mime jr.") {
    holdTempAnswer = "mime jr";
  } else if (holdTempAnswer === "porygon-z") {
    holdTempAnswer = "porygon z";
  } else if (holdTempAnswer === "mr rime.") {
    holdTempAnswer = "mr rime";
  } else if (holdTempAnswer === "porygon 2") {
    holdTempAnswer = "porygon2";
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
