import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setScore, setPage } from "../../../actions";
import { checkTempAnswer } from "../../../functions/quizFunctions";

import TypeDirective from "../HardMode/TypeDirective";
import AnswerInput from "../HardMode/AnswerInput";
import CorrectAnswer from "../HardMode/CorrectAnswer";
import ConfirmButton from "../ConfirmButton";

import "../HardMode/HardMode.css";

export default function InfiniteMode({
  pokemon,
  topic,
  round,
  setRound,
  whichButton,
  setWhichButton,
}) {
  const [tempSubmittedAnswer, setTempSubmittedAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [stillPlaying, setStillPlaying] = useState(true);
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
    }
  }, [submittedAnswer, tempSubmittedAnswer]);

  const resetForNextQuestion = () => {
    if (whichButton === "skip" || !stillPlaying) {
      setStillPlaying(false);
      dispatch(setPage("finished"));
    } else {
      setRound(round + 1);
      setWhichButton("skip");
      setTempSubmittedAnswer("");
      setSubmittedAnswer("");
    }
  };

  const addScore = () => {
    let holdTempAnswer = tempSubmittedAnswer.toLowerCase();
    const result = checkTempAnswer(holdTempAnswer, correctAnswer);
    if (result.valid) {
      dispatch(setScore());
    } else {
      setStillPlaying(false);
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
