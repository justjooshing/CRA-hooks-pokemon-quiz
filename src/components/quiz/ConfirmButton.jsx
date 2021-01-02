import updateRound from "../../functions/updateRound.js";

import "./ConfirmButton.css";

export default function ConfirmButton({
  whichButton,
  resetForNextQuestion,
  round,
  setPage,
  setRound,
  setWhichButton,
  addScore,
}) {
  const nextQuestion = () => {
    updateRound(round, setRound, setPage, setWhichButton);
    resetForNextQuestion();
  };

  const checkAnswer = () => {
    addScore();
    setWhichButton("next");
  };

  return (
    <div className="quiz_confirm_next_wrapper">
      <button
        type="button"
        className="quiz_confirm_button"
        onClick={
          whichButton === "confirm" ? () => checkAnswer() : () => nextQuestion()
        }
      >
        <span className="quiz_confirm_button_text">{whichButton}</span>
      </button>
    </div>
  );
}
