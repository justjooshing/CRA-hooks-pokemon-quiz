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
    if (round < 9) {
      setRound(round + 1);
    } else {
      setPage("finished");
    }
    setWhichButton("skip");
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
