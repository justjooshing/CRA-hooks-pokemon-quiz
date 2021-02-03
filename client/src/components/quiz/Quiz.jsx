import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import IndicatorsWrapper from "../indicators/IndicatorsWrapper";
import PokemonImage from "./PokemonImage";
import Question from "./Question";
import EasyMode from "./EasyMode/EasyMode";
import UserInputMode from "./UserInputMode/UserInputMode";
import LoadingScreen from "./LoadingScreen";

import {
  generatePokemonQuestions,
  generateQuestionTopics,
} from "../../functions/quizFunctions";

export default function Quiz() {
  const [pokemonQuestions, setPokemonQuestions] = useState(null);
  const [questionTopics, setQuestionTopics] = useState();
  const [round, setRound] = useState(0);
  const [numberOfRounds, setNumberOfRounds] = useState(10);
  const [whichButton, setWhichButton] = useState("skip");

  const difficulty = useSelector((state) => state.difficulty);
  const allUpdated = pokemonQuestions && questionTopics;

  const slider = true;
  const generation = 1;
  const offsetPerGen = [0, 151, 251, 386, 493, 649, 721, 809];
  const pokePerGen = [151, 100, 135, 107, 156, 72, 88, 89];
  const totalNumberOfPokemon = slider
    ? offsetPerGen[generation]
    : pokePerGen[generation - 1];

  //Set inital questions
  useEffect(() => {
    if (pokemonQuestions) {
      setQuestionTopics(generateQuestionTopics(pokemonQuestions));
    } else {
      (async () => {
        try {
          setPokemonQuestions(
            await generatePokemonQuestions(numberOfRounds, totalNumberOfPokemon)
          );
        } catch (error) {
          console.error(error.message);
        }
      })();
    }
  }, [pokemonQuestions]);

  //Add extra rounds for infinite mode
  useEffect(() => {
    if (difficulty === "infinite") {
      setNumberOfRounds(numberOfRounds + 1);
      (async () => {
        try {
          setPokemonQuestions(
            await generatePokemonQuestions(
              numberOfRounds,
              totalNumberOfPokemon,
              pokemonQuestions
            )
          );
          setQuestionTopics(
            generateQuestionTopics(pokemonQuestions, questionTopics)
          );
        } catch (error) {
          console.errer(error.message);
        }
      })();
    }
  }, [round, setNumberOfRounds, difficulty]);

  //when round updates, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [round]);

  if (allUpdated) {
    return (
      <>
        <IndicatorsWrapper round={round} />
        <main>
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
              totalNumberOfPokemon={totalNumberOfPokemon}
            />
          ) : (
            <UserInputMode
              pokemon={pokemonQuestions[round]}
              topic={questionTopics[round]}
              round={round}
              setRound={setRound}
              whichButton={whichButton}
              setWhichButton={setWhichButton}
            />
          )}
        </main>
      </>
    );
  } else {
    return <LoadingScreen />;
  }
}
