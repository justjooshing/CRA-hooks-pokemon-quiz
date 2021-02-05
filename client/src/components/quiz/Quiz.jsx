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
  setPokemonRange,
} from "../../functions/quizFunctions";

export default function Quiz() {
  const difficulty = useSelector((state) => state.difficulty);
  const { gen, method } = useSelector((state) => state.pokemon_generation);

  const [pokemonQuestions, setPokemonQuestions] = useState(null);
  const [questionTopics, setQuestionTopics] = useState();
  const [round, setRound] = useState(0);
  const [numberOfRounds, setNumberOfRounds] = useState(10);
  const [whichButton, setWhichButton] = useState("skip");

  const { totalNumberOfPokemon, offsetPokemon } = setPokemonRange(method, gen);

  const allUpdated = pokemonQuestions && questionTopics;

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
      if (round > 0) {
        setNumberOfRounds(numberOfRounds + 1);
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
