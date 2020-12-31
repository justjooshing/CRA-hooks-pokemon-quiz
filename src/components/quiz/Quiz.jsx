import React, { useEffect, useState } from "react";
import IndicatorsWrapper from "../indicators/IndicatorsWrapper";

import grabAllPokemon from "../../functions/grabAllPokemon";
import pokemonTypes from "../pokemonTypes";
import generateQuestions from "../../functions/generateQuestions";

export default function Quiz({ difficulty, setPage, resetDifficulty }) {
  // const [questionTopics, setTopics] = useState();
  const [pokemonNames, setPokemonNames] = useState();
  const [questions, setQuestions] = useState();

  useEffect(() => {
    if (!pokemonNames) {
      const setUpQuiz = async () => {
        await grabAllPokemon(setPokemonNames);
        await generateQuestions(setQuestions);
      };
      setUpQuiz();
    }
  }, [pokemonNames]);

  if (questions) {
    return (
      <>
        <IndicatorsWrapper
          difficulty={difficulty}
          resetDifficulty={resetDifficulty}
          setPage={setPage}
        />
        {Object.values(questions).map((pokemon, index) => {
          return (
            <>
              <li key={index}>{pokemon.name}</li>
            </>
          );
        })}
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
}
