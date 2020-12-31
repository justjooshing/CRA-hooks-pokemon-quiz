import React, { useEffect, useState } from "react";
import IndicatorsWrapper from "../indicators/IndicatorsWrapper";
import PokemonImage from "./PokemonImage";

import grabAllPokemon from "../../functions/grabAllPokemon";
import generatePokemonQuestions from "../../functions/generatePokemonQuestions";
import generateQuestionTypes from "../../functions/generateQuestionTypes";

export default function Quiz({ difficulty, setPage, resetDifficulty }) {
  const [pokemonNames, setPokemonNames] = useState();
  const [pokemonQuestions, setPokemonQuestions] = useState();
  const [questionTypes, setQuestionTypes] = useState();

  const [round, setRound] = useState(0);

  const allUpdated = pokemonNames && pokemonQuestions && questionTypes;

  useEffect(() => {
    if (!pokemonNames) {
      const setUpQuiz = async () => {
        const names = await grabAllPokemon();
        setPokemonNames(names);
        const questions = await generatePokemonQuestions();
        setPokemonQuestions(questions);
      };
      setUpQuiz();
    }
  });

  useEffect(() => {
    if (pokemonQuestions) {
      const types = generateQuestionTypes(pokemonQuestions);
      setQuestionTypes(types);
    }
  }, [pokemonQuestions]);

  const logAll = () => {
    // console.log(pokemonNames);
    console.log(pokemonQuestions);
    // console.log(questionTypes);
  };

  if (allUpdated) {
    return (
      <>
        <IndicatorsWrapper
          difficulty={difficulty}
          resetDifficulty={resetDifficulty}
          setPage={setPage}
          round={round}
          setRound={setRound}
        />
        <PokemonImage pokemon={pokemonQuestions[round]} />
        <button onClick={() => logAll()}>Click</button>
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
}
