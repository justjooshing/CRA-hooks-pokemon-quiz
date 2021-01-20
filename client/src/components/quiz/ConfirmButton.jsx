import "./ConfirmButton.css";

export default function ConfirmButton({
  whichButton,
  resetForNextQuestion,
  setWhichButton,
  addScore,
}) {
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
          whichButton === "confirm"
            ? () => checkAnswer()
            : () => resetForNextQuestion()
        }
      >
        <span className="quiz_confirm_button_text">{whichButton}</span>
      </button>
    </div>
  );
}
