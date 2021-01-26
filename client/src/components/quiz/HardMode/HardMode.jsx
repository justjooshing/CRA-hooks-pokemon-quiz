import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setScore, setPage } from "../../../actions";
import { checkTempAnswer } from "../../../functions/quizFunctions";

import TypeDirective from "./TypeDirective";
import AnswerInput from "./AnswerInput";
import CorrectAnswer from "./CorrectAnswer";
import ConfirmButton from "../ConfirmButton";

import "./HardMode.css";

export default function HardMode({
  pokemon,
  topic,
  round,
  setRound,
  whichButton,
  setWhichButton,
}) {
  const [tempSubmittedAnswer, setTempSubmittedAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const correctAnswer = pokemon[topic];

  const dispatch = useDispatch();

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
  }, [submittedAnswer, tempSubmittedAnswer, setWhichButton]);

  const resetForNextQuestion = () => {
    if (round < 9) {
      setRound(round + 1);
    } else {
      dispatch(setPage("finished"));
    }
    setWhichButton("skip");
    setTempSubmittedAnswer("");
    setSubmittedAnswer("");
  };

  const addScore = () => {
    let holdTempAnswer = tempSubmittedAnswer.toLowerCase();
    const result = checkTempAnswer(holdTempAnswer, correctAnswer);
    if (result.valid) {
      dispatch(setScore());
    }
    setSubmittedAnswer(result.holdTempAnswer);
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
