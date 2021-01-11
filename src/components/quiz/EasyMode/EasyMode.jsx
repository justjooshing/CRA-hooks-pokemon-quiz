import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
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
}) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answerOptions, setAnswerOptions] = useState(null);
  const correctAnswer = pokemon[topics[round]];

  const dispatch = useDispatch();

  useEffect(() => {
    if (!answerOptions) {
      const runGenerateAnswerOptions = async () => {
        const answerSets = await generatePossibleAnswers(answers, topics);
        setAnswerOptions(answerSets);
      };
      runGenerateAnswerOptions();
    }
  });

  const isSelected = (answerOption) => {
    setWhichButton("confirm");
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

  const addScore = () => {
    if (selectedAnswer === correctAnswer) {
      dispatch(setScore());
    }
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
          setWhichButton={setWhichButton}
          addScore={addScore}
        />
      </form>
    );
  } else {
    return null;
  }
}
