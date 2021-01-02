import { useEffect, useState } from "react";
import IndicatorsWrapper from "../indicators/IndicatorsWrapper";
import PokemonImage from "./PokemonImage";
import Question from "./Question";
import EasyMode from "./EasyMode/EasyMode";
import HardMode from "./HardMode/HardMode";

import generatePokemonQuestions from "../../functions/generatePokemonQuestions";
import generateQuestionTopics from "../../functions/generateQuestionTopics";

export default function Quiz({
  difficulty,
  setPage,
  setScore,
  score,
  startOver,
}) {
  const [pokemonQuestions, setPokemonQuestions] = useState(null);
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
          round={round}
          startOver={startOver}
        />
        <PokemonImage pokemon={pokemonQuestions[round]} />
        <Question topic={questionTopics[round]} />

        {difficulty === "easy" ? (
          <EasyMode
            pokemon={pokemonQuestions[round]}
            round={round}
            setRound={setRound}
            setPage={setPage}
            setScore={setScore}
            score={score}
            topics={questionTopics}
            answers={pokemonQuestions}
          />
        ) : (
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
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
}
