import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setScore, setPage } from "../../../actions";

import AnswerButton from "./AnswerButton";
import ConfirmButton from "../ConfirmButton";

import { generatePossibleAnswers } from "../../../functions/quizFunctions";

import "./EasyMode.css";

export default function EasyMode({
  pokemon,
  topics,
  round,
  setRound,
  answers,
  whichButton,
  setWhichButton,
  totalNumberOfPokemon,
}) {
  const dispatch = useDispatch();

  const difficulty = useSelector((state) => state.difficulty);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answerOptions, setAnswerOptions] = useState(null);
  const correctAnswer = pokemon[topics[round]];

  useEffect(() => {
    if (!answerOptions) {
      (async () => {
        setAnswerOptions(
          await generatePossibleAnswers(answers, topics, totalNumberOfPokemon)
        );
      })();
    }
  });

  const isSelected = (answerOption) => {
    // Allow answers to be changed
    // setWhichButton("confirm");
    // Don't allow answers to be changed
    setWhichButton("next");
    setSelectedAnswer(answerOption);
  };

  const resetForNextQuestion = () => {
    if (round < 9) {
      setRound(round + 1);
    } else {
      dispatch(setPage("finished"));
    }
    setWhichButton("skip");
    setSelectedAnswer("");
  };

  const checkAnswer = () => {
    if (selectedAnswer === correctAnswer) {
      dispatch(setScore());
    }
    resetForNextQuestion();
  };

  if (answerOptions) {
    return (
      <form>
        <div className="quiz_answers_wrapper">
          {answerOptions[round].map((answerOption) => {
            return (
              <AnswerButton
                key={answerOption}
                whichButton={whichButton}
                correctAnswer={correctAnswer}
                answerOption={answerOption}
                selectedAnswer={selectedAnswer}
                isSelected={isSelected}
              />
            );
          })}
        </div>
        <ConfirmButton
          whichButton={whichButton}
          resetForNextQuestion={resetForNextQuestion}
          checkAnswer={checkAnswer}
          difficulty={difficulty}
        />
      </form>
    );
  } else {
    return null;
  }
}
