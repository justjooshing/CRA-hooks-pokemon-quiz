import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setScore, setPage } from "../../../actions";
import { checkTempAnswer } from "../../../functions/quizFunctions";

import TypeDirective from "./TypeDirective";
import AnswerInput from "./AnswerInput";
import CorrectAnswer from "./CorrectAnswer";
import ConfirmButton from "../ConfirmButton";

import "./UserInputMode.css";

export default function UserInputMode({
  pokemon,
  topic,
  round,
  setRound,
  whichButton,
  setWhichButton,
}) {
  const dispatch = useDispatch();
  const difficulty = useSelector((state) => state.difficulty);

  const [tempSubmittedAnswer, setTempSubmittedAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [stillPlaying, setStillPlaying] = useState(true);
  const correctAnswer = pokemon[topic];

  const updateTempAnswer = (e) => {
    setTempSubmittedAnswer(e.target.value);
  };

  useEffect(() => {
    if (submittedAnswer) {
      setWhichButton("next");
    } else if (tempSubmittedAnswer) {
      setWhichButton("confirm");
    } else if (difficulty === "hard") {
      setWhichButton("skip");
    }
  }, [submittedAnswer, tempSubmittedAnswer, setWhichButton]);

  const resetForNextQuestion = () => {
    const runOthers = () => {
      setWhichButton("skip");
      setTempSubmittedAnswer("");
      setSubmittedAnswer("");
    };

    if (difficulty === "infinite") {
      if (whichButton === "skip" || !stillPlaying) {
        setStillPlaying(false);
        dispatch(setPage("finished"));
      } else {
        setRound(round + 1);
        runOthers();
      }
    } else if (difficulty === "hard") {
      if (round < 9) {
        setRound(round + 1);
      } else {
        dispatch(setPage("finished"));
      }
      runOthers();
    }
  };

  const addScore = () => {
    let holdTempAnswer = tempSubmittedAnswer.toLowerCase();
    const result = checkTempAnswer(holdTempAnswer, correctAnswer);
    if (result.valid) {
      dispatch(setScore());
    } else if (difficulty === "infinite") {
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
