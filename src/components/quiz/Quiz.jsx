import { useEffect, useState } from "react";
import IndicatorsWrapper from "../indicators/IndicatorsWrapper";
import PokemonImage from "./PokemonImage";
import Question from "./Question";
import HardMode from "./HardMode/HardMode";

// import grabAllPokemon from "../../functions/grabAllPokemon";
import generatePokemonQuestions from "../../functions/generatePokemonQuestions";
import generateQuestionTopics from "../../functions/generateQuestionTopics";

export default function Quiz({
  difficulty,
  setPage,
  resetDifficulty,
  setScore,
  score,
}) {
  // const [pokemonNames, setPokemonNames] = useState();

  // const names = await grabAllPokemon();
  // setPokemonNames(names);

  // console.log(pokemonNames);
  const [pokemonQuestions, setPokemonQuestions] = useState();
  const [questionTopics, setQuestionTopics] = useState();

  const [round, setRound] = useState(0);

  const allUpdated = pokemonQuestions && questionTopics;

  useEffect(() => {
    if (!pokemonQuestions) {
      const runGeneratePokemonQuestions = async () => {
        const questions = await generatePokemonQuestions();
        setPokemonQuestions(questions);
      };
      runGeneratePokemonQuestions();
    }
  });

  useEffect(() => {
    if (pokemonQuestions) {
      const topics = generateQuestionTopics(pokemonQuestions);
      setQuestionTopics(topics);
    }
  }, [pokemonQuestions]);

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
        <Question topic={questionTopics[round]} />

        {difficulty === "easy" ? null : (
          <HardMode
            pokemon={pokemonQuestions[round]}
            topic={questionTopics[round]}
            round={round}
            setRound={setRound}
            setPage={setPage}
            setScore={setScore}
            score={score}
          />
        )}
        {/* <button onClick={() => logAll()}>Click</button> */}
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
}
