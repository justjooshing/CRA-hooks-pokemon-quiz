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

  const allUpdated = pokemonQuestions && questionTopics;

  const difficulty = useSelector((state) => state.difficulty);

  const pokemonGeneration = useSelector((state) => state.pokemon_generation);

  const compoundingNumberOfPokemon = [0, 151, 251, 386, 493, 649, 721, 809];
  const pokePerGen = [151, 100, 135, 107, 156, 72, 88, 89];
  const totalNumberOfPokemon =
    pokemonGeneration.method === "slider"
      ? compoundingNumberOfPokemon[pokemonGeneration.gen]
      : pokePerGen[pokemonGeneration.gen - 1];

  const offsetPokemon =
    pokemonGeneration.method === "slider"
      ? 0
      : compoundingNumberOfPokemon[pokemonGeneration.gen];

  //Set inital questions
  useEffect(() => {
    if (pokemonQuestions) {
      setQuestionTopics(generateQuestionTopics(pokemonQuestions));
    } else {
      (async () => {
        try {
          setPokemonQuestions(
            await generatePokemonQuestions(
              numberOfRounds,
              totalNumberOfPokemon,
              offsetPokemon
            )
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
      if (round > 1) {
        setNumberOfRounds(numberOfRounds + 1);
      }
      (async () => {
        try {
          setPokemonQuestions(
            await generatePokemonQuestions(
              numberOfRounds,
              totalNumberOfPokemon,
              offsetPokemon,
              pokemonQuestions
            )
          );
          setQuestionTopics(
            generateQuestionTopics(pokemonQuestions, questionTopics)
          );
        } catch (error) {
          console.error(error.message);
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
              offsetPokemon={offsetPokemon}
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
