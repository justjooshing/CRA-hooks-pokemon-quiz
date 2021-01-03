import { useState, useEffect } from "react";

import TypeDirective from "./TypeDirective";
import AnswerInput from "./AnswerInput";
import CorrectAnswer from "./CorrectAnswer";
import ConfirmButton from "../ConfirmButton";

import { resetButtonAndRound } from "../../../functions/quizFunctions";

import "./HardMode.css";

export default function HardMode({
  pokemon,
  topic,
  round,
  setPage,
  setRound,
  score,
  setScore,
}) {
  const [whichButton, setWhichButton] = useState("skip");
  const [tempSubmittedAnswer, setTempSubmittedAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const correctAnswer = pokemon[topic];

  const updateTempAnswer = (e) => {
    setTempSubmittedAnswer(e.target.value);
  };

  useEffect(() => {
    if (submittedAnswer) {
      setWhichButton("next");
    } else if (tempSubmittedAnswer) {
      setWhichButton("confirm");
    } else {
      setWhichButton("skip");
    }
  }, [submittedAnswer, tempSubmittedAnswer]);

  const resetForNextQuestion = () => {
    resetButtonAndRound(round, setRound, setPage, setWhichButton);
    setTempSubmittedAnswer("");
    setSubmittedAnswer("");
  };

  const addScore = () => {
    let holdTempAnswer = tempSubmittedAnswer;

    if (holdTempAnswer === "farfetch'd") {
      holdTempAnswer = "farfetchd";
    }
    if (holdTempAnswer === correctAnswer) {
      setScore(score + 1);
    } else if (holdTempAnswer.includes("/")) {
      holdTempAnswer = holdTempAnswer.split("/").reverse().join("/");
      if (holdTempAnswer === correctAnswer) {
        setScore(score + 1);
      }
    }
    setSubmittedAnswer(holdTempAnswer);
  };

  return (
    <form
      className="answer_confirm_wrapper"
      onSubmit={(e) => e.preventDefault()}
    >
      {topic === "type" && <TypeDirective />}
      <div className="answer_input_wrapper">
        <AnswerInput
          tempSubmittedAnswer={tempSubmittedAnswer}
          updateTempAnswer={updateTempAnswer}
          whichButton={whichButton}
          correctAnswer={correctAnswer}
          submittedAnswer={submittedAnswer}
        />
        {whichButton === "next" && submittedAnswer !== correctAnswer && (
          <CorrectAnswer correctAnswer={correctAnswer} />
        )}
      </div>
      <ConfirmButton
        whichButton={whichButton}
        resetForNextQuestion={resetForNextQuestion}
        setWhichButton={setWhichButton}
        addScore={addScore}
      />
    </form>
  );
}
