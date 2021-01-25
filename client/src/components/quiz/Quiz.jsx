import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import IndicatorsWrapper from "../indicators/IndicatorsWrapper";
import PokemonImage from "./PokemonImage";
import Question from "./Question";
import EasyMode from "./EasyMode/EasyMode";
import HardMode from "./HardMode/HardMode";
import LoadingScreen from "./LoadingScreen";

import {
  generatePokemonQuestions,
  generateQuestionTopics,
} from "../../functions/quizFunctions";

export default function Quiz() {
  const [pokemonQuestions, setPokemonQuestions] = useState(null);
  const [questionTopics, setQuestionTopics] = useState();
  const [round, setRound] = useState(0);
  const [whichButton, setWhichButton] = useState("skip");

  const difficulty = useSelector((state) => state.difficulty);
  // "infinite";
  const allUpdated = pokemonQuestions && questionTopics;

  useEffect(() => {
    if (pokemonQuestions) {
      setQuestionTopics(generateQuestionTopics(pokemonQuestions));
    } else if (!pokemonQuestions) {
      (async () => {
        try {
          setPokemonQuestions(await generatePokemonQuestions());
        } catch (error) {
          console.log(error.message);
        }
      })();
    }
  }, [pokemonQuestions]);

  //when round updates, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [round]);

  if (allUpdated) {
    return (
      <>
        <IndicatorsWrapper round={round} />
        <PokemonImage pokemon={pokemonQuestions[round]} />
        <Question topic={questionTopics[round]} />

        {difficulty === "easy" ? (
          <EasyMode
            pokemon={pokemonQuestions[round]}
            topics={questionTopics}
            round={round}
            setRound={setRound}
            answers={pokemonQuestions}
            whichButton={whichButton}
            setWhichButton={setWhichButton}
          />
        ) : difficulty === "hard" ? (
          <HardMode
            pokemon={pokemonQuestions[round]}
            topic={questionTopics[round]}
            round={round}
            setRound={setRound}
            whichButton={whichButton}
            setWhichButton={setWhichButton}
          />
        ) : null}
      </>
    );
  } else {
    return <LoadingScreen />;
  }
}
