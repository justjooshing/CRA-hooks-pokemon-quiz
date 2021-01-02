import { useState, useEffect } from "react";

import AnswerButton from "./AnswerButton";
import ConfirmButton from "../ConfirmButton";

import { generatePossibleAnswers } from "../../../functions/quizFunctions";

import "./EasyMode.css";

export default function EasyMode({
  pokemon,
  topics,
  round,
  answers,
  setRound,
  setPage,
  score,
  setScore,
}) {
  const [whichButton, setWhichButton] = useState("skip");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answerOptions, setAnswerOptions] = useState(null);
  const correctAnswer = pokemon[topics[round]];

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
    setSelectedAnswer("");
  };

  const addScore = () => {
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }
  };

  if (answerOptions) {
    return (
      <form>
        <div className="quiz_answers_wrapper">
          {answerOptions[round].map((answerOption, index) => {
            return (
              <AnswerButton
                key={index}
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
          round={round}
          setPage={setPage}
          setRound={setRound}
          setWhichButton={setWhichButton}
          addScore={addScore}
        />
      </form>
    );
  } else {
    return null;
  }
}
